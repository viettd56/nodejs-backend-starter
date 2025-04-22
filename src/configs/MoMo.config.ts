import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    MOMO_PARTNER_CODE: string;
    MOMO_ACCESS_KEY: string;
    MOMO_SECRET_KEY: string;
    MOMO_API_URL: string;
}

const MoMoConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        MOMO_PARTNER_CODE: Joi.string().required(),
        MOMO_ACCESS_KEY: Joi.string().required(),
        MOMO_SECRET_KEY: Joi.string().required(),
        MOMO_API_URL: Joi.string().required(),
    });
};

export const momoConfig = MoMoConfig();
