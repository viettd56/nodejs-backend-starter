import _ from 'lodash';
import moment from 'moment-timezone';
import { Exception } from 'src/exceptions/Exception';
import { sendRequestQueue } from 'src/jobs/queue/SendRequest.queue';
import { verifyOrderQueue } from 'src/jobs/queue/VerifyOrder.queue';
import { AppotaPaySubscriptionCycleModel } from 'src/models/data/AppotaPaySubscriptionCycle.model';
import { OrderModel } from 'src/models/data/Order.model';
import { UserModel } from 'src/models/data/User.model';
import { appotaPayService } from '../AppotaPay/AppotaPay.service';
import { userUsecase } from '../User/user.usecase';
import { orderHelper } from './order.helper';
import { orderRepository } from './order.repository';

const ACTIVE_PROVIDERS = ['momo', 'appota_pay'];

const OrderUsecase = () => {
    const newOrder = async ({
        user_id,
        bundle_id,
        provider,
        return_url,
        payment_method,
        amount,
        order_type,
        interval_day: _interval_day,
        notify_url,
        transaction_id,
    }: {
        user_id: string;
        bundle_id: string;
        provider: OrderModel['provider'];
        return_url: string;
        payment_method: 'ATM' | 'CC' | 'EWALLET' | 'VA' | 'MM';
        amount: number;
        order_type: OrderModel['order_type'];
        interval_day?: number;
        notify_url: string;
        transaction_id: string;
    }) => {
        if (amount <= 0) {
            throw new Exception('Amount must be greater than 0');
        }
        if (_interval_day && _interval_day <= 0) {
            throw new Exception('Interval day must be greater than 0');
        }

        const providerData = ACTIVE_PROVIDERS.find((p) => p === provider);
        if (!providerData) {
            throw new Exception('Invalid provider');
        }
        const orderWithTransactionId = await OrderModel.findOne({
            where: {
                transaction_id,
            },
        });
        if (orderWithTransactionId) {
            throw new Exception('Transaction id already exists');
        }
        const userData = await UserModel.findOne({
            where: {
                id: user_id,
            },
        });
        if (!userData) {
            throw new Exception('User not found');
        }
        if (provider === 'appota_pay') {
            await userUsecase.getAppotaPayCustomer({ user_id: userData.id.toString() });
        }
        await userData.reload();
        if (amount <= 0) {
            throw new Exception('Amount must be greater than 0');
        }
        if (order_type === 'subscription' && !_interval_day) {
            throw new Exception('Interval day is required');
        }
        if (order_type === 'subscription' && _interval_day && _interval_day <= 0) {
            throw new Exception('Interval day must be greater than 0');
        }
        const interval_day = _.round(_interval_day ?? 0);
        const { order_id, verify_id, web_link, app_link, appota_pay_plan_id } = await orderHelper.newProviderOrder({
            amount,
            bundle_type: order_type,
            provider,
            interval_count: interval_day,
            appota_pay_customer_id: userData.appota_pay_customer_id,
            payment_method,
        });
        const order = await OrderModel.create({
            id: order_id,
            user_id,
            bundle_id,
            provider,
            amount,
            order_type,
            extra_data: {
                interval_count: interval_day,
                return_url,
                notify_url,
            },
            status: 'pending',
            order_date: new Date(),
            verify_id,
            web_link,
            app_link,
            appota_pay_plan_id,
            transaction_id,
        });
        verifyOrderQueue.queue
            .add(
                'verify_order',
                {
                    verify_id,
                },
                {
                    attempts: 10,
                    delay: 10000,
                    jobId: verify_id,
                }
            )
            .catch(console.error);
        return order;
    };

    const verifyOrder = async (verify_id: string) => {
        const order = await OrderModel.findOne({
            where: {
                verify_id,
            },
            raw: true,
        });
        if (!order) {
            throw new Exception('Order not found');
        }
        if (order.status === 'success') {
            return order;
        }
        if (order.provider === 'appota_pay') {
            if (order.order_type === 'in_app') {
                const transactionData = await appotaPayService.getPaymentTransaction({
                    order_id: order.id,
                });
                if (
                    transactionData.transaction.status === 'success' &&
                    transactionData.transaction.amount === order.amount
                ) {
                    const data = await orderRepository.updateOrderSuccess(order.id);
                    const notifyUrl = data?.extra_data.notify_url;
                    if (notifyUrl) {
                        const data = {
                            status: 'success',
                            order_id: order.id,
                            transaction_id: order.transaction_id ?? '',
                        };
                        const sign = orderHelper.createSign(data);
                        // axios
                        //     .post(
                        //         notifyUrl,
                        //         {
                        //             ...data,
                        //             sign,
                        //         },
                        //         {
                        //             headers: {
                        //                 'x-type': 'direct',
                        //             },
                        //         }
                        //     )
                        //     .catch(console.error);
                        sendRequestQueue.queue
                            .add(
                                'sendRequestQueue',
                                {
                                    method: 'POST',
                                    body: {
                                        ...data,
                                        sign,
                                    },
                                    // headers: {
                                    //     'x-type': 'queue',
                                    // },
                                    url: notifyUrl,
                                },
                                {
                                    attempts: 3,
                                    backoff: {
                                        type: 'fixed',
                                        delay: 5 * 60 * 1000,
                                    },
                                }
                            )
                            .catch(console.error);
                    }
                } else if (transactionData.transaction.status === 'error') {
                    await orderRepository.updateOrderFailed(order.id);
                }
            }
            if (order.order_type === 'subscription') {
                await updateOrderCycle(order.id);
            }
        }

        return order;
    };

    const updateOrderCycle = async (order_id: string) => {
        const orderData = await OrderModel.findOne({
            where: {
                id: order_id,
            },
        });
        if (!orderData) {
            throw new Exception('Order not found');
        }
        if (orderData.order_type !== 'subscription') {
            return;
        }
        if (orderData.provider === 'appota_pay' && orderData.appota_pay_plan_id) {
            let page = 1;
            let totalPage = 1;
            do {
                const planCycle = await appotaPayService.getPlanCycles({
                    plan_id: orderData.appota_pay_plan_id,
                    page: page,
                });
                totalPage = planCycle.meta.total;
                const cyclesSuccess = planCycle.data.filter((cycle) => cycle.status === 'SUCCEEDED');
                for (const cycle of cyclesSuccess) {
                    await AppotaPaySubscriptionCycleModel.findOrCreate({
                        where: {
                            cycle_id: cycle.cycleId,
                            order_id: orderData.id,
                        },
                        defaults: {
                            cycle_id: cycle.cycleId,
                            from_date: moment(cycle.scheduledAt).tz('Asia/Ho_Chi_Minh').startOf('day').toDate(),
                            to_date: moment(cycle.scheduledAt)
                                .tz('Asia/Ho_Chi_Minh')
                                .add(orderData.extra_data.interval_count, 'days')
                                .endOf('day')
                                .toDate(),
                            extra_data: {},
                            order_id: orderData.id,
                        },
                    });
                }
                page++;
            } while (page < totalPage);
            const cycleValid = await AppotaPaySubscriptionCycleModel.findOne({
                where: {
                    order_id: orderData.id,
                },
                order: [['from_date', 'DESC']],
            });

            if (cycleValid) {
                orderData.subscription_from_date = cycleValid.from_date;
                orderData.subscription_to_date = cycleValid.to_date;
                await orderData.save();
                await orderRepository.updateOrderSuccess(orderData.id);
            }
        }
    };
    return {
        newOrder,
        verifyOrder,
        updateOrderCycle,
    };
};

export const orderUsecase = OrderUsecase();
