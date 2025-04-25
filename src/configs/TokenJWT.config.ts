import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    JWT_PUBLIC_KEY: string;
    JWT_PRIVATE_KEY: string;
    JWT_ISSUER: string;
    JWT_CMS_AUD: string;
    JWT_MOBILE_AUD: string;
}

const TokenJWTConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        JWT_ISSUER: Joi.string().default('api.sample.com'),
        JWT_PUBLIC_KEY: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_CMS_AUD: Joi.string().default('api-cms.sample.com'),
        JWT_MOBILE_AUD: Joi.string().default('api-mobile.sample.com'),
    });
};

export const tokenJWTConfig = TokenJWTConfig();
