import { RequestHandler } from 'express';
import { orderUsecase } from 'src/domains/Order/order.usecase';
import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';
import { verifyOrderQueue } from 'src/jobs/queue/VerifyOrder.queue';

const PaymentIpnController = () => {
    const verifyOrder: RequestHandler = async (req, res, next) => {
        try {
            const { verify_id } = new ValidationHelper<{
                verify_id: string;
            }>(req.query).validate({
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
                        delay: 15 * 60000,
                        jobId: verify_id,
                    }
                )
                .catch(console.error);

            const orderData = await orderUsecase.verifyOrder(verify_id);

            if (orderData.provider === 'appota_pay') {
                return res.json({
                    status: 'ok',
                });
            }

            return res.json({
                status: true,
            });
        } catch (error) {
            next(error);
        }
    };

    return {
        verifyOrder,
    };
};

export const paymentIpnController = PaymentIpnController();
