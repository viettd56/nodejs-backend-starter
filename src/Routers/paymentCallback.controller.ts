import { RequestHandler } from 'express';
import { orderHelper } from 'src/domains/Order/order.helper';
import { orderUsecase } from 'src/domains/Order/order.usecase';
import { OtherHelper } from 'src/helpers/Other.helper';
import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

const PaymentCallbackController = () => {
    const appotaCallback: RequestHandler = async (req, res, next) => {
        try {
            const { verify_id } = new ValidationHelper<{
                verify_id: string;
            }>(req.query).validate({
                verify_id: Joi.string().required(),
            });
            const orderData = await orderUsecase.verifyOrder(verify_id);

            const callBackData = {
                status: orderData.status === 'success' ? 'success' : orderData.status,
                order_id: orderData.id,
                transaction_id: orderData.transaction_id ?? '',
            };

            const sign = orderHelper.createSign(callBackData);

            return res.redirect(
                OtherHelper.addQueryString(orderData.extra_data.return_url, {
                    ...callBackData,
                    sign,
                })
            );
        } catch (error) {
            next(error);
        }
    };

    return {
        appotaCallback,
    };
};

export const paymentCallbackController = PaymentCallbackController();
