import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    APPOTA_PAY_GATEWAY_URL: string;
    APPOTA_PAY_API_KEY: string;
    APPOTA_PAY_SECRET_KEY: string;
    APPOTA_PAY_PARTNER_CODE: string;
    APPOTA_PAY_OUT_IP: string;
    APPOTA_PAY_CALLBACK_URL: string;
    APPOTA_PAY_IPN_URL: string;
}

const AppotaPayConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        APPOTA_PAY_GATEWAY_URL: Joi.string().required(),
        APPOTA_PAY_API_KEY: Joi.string().required(),
        APPOTA_PAY_SECRET_KEY: Joi.string().required(),
        APPOTA_PAY_PARTNER_CODE: Joi.string().required(),
        APPOTA_PAY_OUT_IP: Joi.string().required(),
        APPOTA_PAY_CALLBACK_URL: Joi.string().default('https://api.tdmediadev.com/v1/payment-callback/appota-pay'),
        APPOTA_PAY_IPN_URL: Joi.string().default('https://api.tdmediadev.com/v1/ipn/verify'),
    });
};

export const appotaPayConfig = AppotaPayConfig();
