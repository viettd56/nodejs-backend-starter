import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    JWT_PUBLIC_KEY: string;
    JWT_PRIVATE_KEY: string;
    JWT_ISSUER: string;
    JWT_AUD: string;
}

const TokenJWTConfig = () => {
    const data = new ValidationHelper<IConfigs>(process.env).validate({
        JWT_ISSUER: Joi.string().default('api-payment-staging.vtvgo.vn'),
        JWT_PUBLIC_KEY: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_AUD: Joi.string().default('api-payment-staging.vtvgo.vn'),
    });
    const config: IConfigs = {
        JWT_PUBLIC_KEY: data.JWT_PUBLIC_KEY,
        JWT_PRIVATE_KEY: data.JWT_PRIVATE_KEY,
        JWT_ISSUER: data.JWT_ISSUER,
        JWT_AUD: data.JWT_AUD,
    };
    if (config.JWT_PUBLIC_KEY) {
        config.JWT_PUBLIC_KEY = config.JWT_PUBLIC_KEY.trim().replace(/\\n/g, '\n');
    }
    if (config.JWT_PRIVATE_KEY) {
        config.JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY.trim().replace(/\\n/g, '\n');
    }
    return config;
};

export const tokenJWTConfig = TokenJWTConfig();
