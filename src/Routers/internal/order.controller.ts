import { RequestHandler } from 'express';
import moment from 'moment';
import { WhereOptions } from 'sequelize';
import { orderUsecase } from 'src/domains/Order/order.usecase';
import { userUsecase } from 'src/domains/User/user.usecase';
import { Exception } from 'src/exceptions/Exception';
import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';
import { verifyOrderQueue } from 'src/jobs/queue/VerifyOrder.queue';
import { OrderModel } from 'src/models/data/Order.model';

const OrderInternalController = () => {
    const newOrder: RequestHandler = async (req, res, next) => {
        try {
            const {
                bundle_id,
                provider,
                user_id,
                return_url,
                payment_method,
                amount,
                order_type,
                interval_day,
                notify_url,
                transaction_id,
            } = new ValidationHelper<{
                user_id: string;
                bundle_id: string;
                provider: OrderModel['provider'];
                return_url: string;
                notify_url?: string;
                payment_method: 'ATM' | 'CC' | 'EWALLET' | 'VA' | 'MM';
                amount: number;
                order_type: OrderModel['order_type'];
                interval_day?: number;
                transaction_id?: string;
            }>(req.body).validate({
                bundle_id: Joi.string().required(),
                provider: Joi.string().required(),
                user_id: Joi.string().required(),
                return_url: Joi.string().max(1280).required(),
                payment_method: Joi.string().allow('ATM', 'CC', 'EWALLET', 'VA', 'MM').default('ATM').optional(),
                amount: Joi.number().min(1000).required(),
                order_type: Joi.string().valid('subscription', 'in_app').required(),
                notify_url: Joi.string().uri().max(1280).optional(),
                interval_day: Joi.number().min(1).optional(),
                transaction_id: Joi.string().optional(),
            });

            const userData = await userUsecase.getUserByVtvGoId({ vtv_go_id: user_id });

            const orderData = await orderUsecase.newOrder({
                user_id: userData.id,
                bundle_id,
                provider,
                return_url,
                payment_method,
                amount,
                order_type,
                interval_day,
                notify_url: notify_url ?? '',
                transaction_id: transaction_id ?? moment().unix().toString(),
            });

            return res.json({
                status: true,
                data: {
                    id: orderData.id,
                    amount: orderData.amount,
                    status: orderData.status,
                    provider: orderData.provider,
                    bundle_id: orderData.bundle_id,
                    order_type: orderData.order_type,
                    order_date: orderData.order_date,
                    web_link: orderData.web_link ?? null,
                    app_link: orderData.app_link ?? null,
                    transaction_id: orderData.transaction_id,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    const getUserOrders: RequestHandler = async (req, res, next) => {
        try {
            const { offset, limit, user_id, status } = new ValidationHelper<{
                offset: number;
                limit: number;
                user_id: string;
                status: string;
            }>(req.query).validate({
                offset: Joi.number().required(),
                limit: Joi.number().max(100).required(),
                user_id: Joi.string().required(),
                status: Joi.string().valid('pending', 'success').optional(),
            });

            const userData = await userUsecase.getUserByVtvGoId({ vtv_go_id: user_id });

            const filter: WhereOptions<OrderModel['_attributes']> = {
                user_id: userData.id,
            };

            if (status) {
                filter.status = status;
            }

            const { rows, count } = await OrderModel.findAndCountAll({
                where: filter,
                offset,
                limit,
                order: [['order_date', 'DESC']],
            });

            return res.json({
                status: true,
                data: {
                    data: rows.map((data) => {
                        return {
                            id: data.id,
                            bundle_id: data.bundle_id,
                            order_type: data.order_type,
                            amount: data.amount,
                            status: data.status,
                            provider: data.provider,
                            order_date: data.order_date,
                            subscription_from_date: data.subscription_from_date,
                            subscription_to_date: data.subscription_to_date,
                            transaction_id: data.transaction_id,
                        };
                    }),
                    total: count,
                    offset,
                    limit,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    const getDetailOrder: RequestHandler = async (req, res, next) => {
        try {
            const { order_id } = new ValidationHelper<{
                order_id: string;
            }>(req.params).validate({
                order_id: Joi.string().required(),
            });

            const data = await OrderModel.findOne({
                where: {
                    id: order_id,
                },
            });

            if (!data) {
                throw new Exception('Order not found');
            }

            return res.json({
                status: true,
                data: {
                    id: data.id,
                    amount: data.amount,
                    bundle_id: data.bundle_id,
                    order_type: data.order_type,
                    status: data.status,
                    provider: data.provider,
                    order_date: data.order_date,
                    subscription_from_date: data.subscription_from_date,
                    subscription_to_date: data.subscription_to_date,
                    transaction_id: data.transaction_id,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    const verifyOrder: RequestHandler = async (req, res, next) => {
        try {
            const { verify_id } = new ValidationHelper<{
                verify_id: string;
            }>(req.body).validate({
                verify_id: Joi.string().required(),
            });

            await verifyOrderQueue.queue
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

            const orderData = await orderUsecase.verifyOrder(verify_id);

            return res.json({
                status: true,
                data: {
                    id: orderData.id,
                    bundle_id: orderData.bundle_id,
                    order_type: orderData.order_type,
                    amount: orderData.amount,
                    status: orderData.status,
                    provider: orderData.provider,
                    order_date: orderData.order_date,
                    subscription_from_date: orderData.subscription_from_date,
                    subscription_to_date: orderData.subscription_to_date,
                    transaction_id: orderData.transaction_id,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    const getDetailOrderByTransactionId: RequestHandler = async (req, res, next) => {
        try {
            const { transaction_id } = new ValidationHelper<{
                transaction_id: string;
            }>(req.params).validate({
                transaction_id: Joi.string().required(),
            });

            const data = await OrderModel.findOne({
                where: {
                    transaction_id,
                },
            });

            if (!data) {
                throw new Exception('Order not found');
            }

            return res.json({
                status: true,
                data: {
                    id: data.id,
                    amount: data.amount,
                    bundle_id: data.bundle_id,
                    order_type: data.order_type,
                    status: data.status,
                    provider: data.provider,
                    order_date: data.order_date,
                    subscription_from_date: data.subscription_from_date,
                    subscription_to_date: data.subscription_to_date,
                    transaction_id: data.transaction_id,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    return {
        newOrder,
        getUserOrders,
        verifyOrder,
        getDetailOrder,
        getDetailOrderByTransactionId,
    };
};

export const orderInternalController = OrderInternalController();
