import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    JWT_PUBLIC_KEY: string;
    JWT_PRIVATE_KEY: string;
    JWT_ISSUER: string;
    JWT_AUD: string;
}

const TokenJWTConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        JWT_ISSUER: Joi.string().default('api-payment-staging.vtvgo.vn'),
        JWT_PUBLIC_KEY: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_AUD: Joi.string().default('api-payment-staging.vtvgo.vn'),
    });
};

export const tokenJWTConfig = TokenJWTConfig();
