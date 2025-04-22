import { RequestHandler } from 'express';
import { appotaPayHelper } from 'src/domains/AppotaPay/AppotaPay.helper';
import { orderUsecase } from 'src/domains/Order/order.usecase';
import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';
import { verifyOrderQueue } from 'src/jobs/queue/VerifyOrder.queue';
import { OrderModel } from 'src/models/data/Order.model';

const IpnInternalController = () => {
    const appotaIpn: RequestHandler = async (req, res, next) => {
        try {
            const { data, signature } = new ValidationHelper<{
                data: string;
                signature: string;
            }>(req.body).validate({
                data: Joi.string().required(),
                signature: Joi.string().required(),
            });
            console.log('🚀 ~ constappotaIpn:RequestHandler= ~ { data, signature }:', { data, signature });

            const jsonData = appotaPayHelper.verifyCallbackData(data, signature);

            if (jsonData.event === 'subscription.cycle.succeeded') {
                const planId = jsonData.data.planId;
                if (planId) {
                    const orderData = await OrderModel.findOne({
                        where: {
                            appota_pay_plan_id: planId,
                        },
                        raw: true,
                    });
                    if (orderData) {
                        await verifyOrderQueue.queue.add(
                            'verifyOrderQueue',
                            {
                                verify_id: orderData.verify_id,
                            },
                            {
                                attempts: 10,
                                jobId: orderData.verify_id,
                            }
                        );
                    }
                }
            }

            return res.send('OK');
        } catch (error) {
            next(error);
        }
    };

    return {
        appotaIpn,
    };
};

export const ipnInternalController = IpnInternalController();
