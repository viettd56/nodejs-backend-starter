import { Joi, ValidationHelper } from '../helpers/Validation.helper';

interface IConfigs {
    REDIS_CACHE_HOST: string;
    REDIS_CACHE_PORT: number;
    REDIS_CACHE_PASSWORD: string;
    REDIS_CACHE_PREFIX: string;
    REDIS_CACHE_TLS: boolean;
    REDIS_CACHE_DB: number;
    REDIS_BULL_HOST: string;
    REDIS_BULL_PORT: number;
    REDIS_BULL_PASSWORD: string;
    REDIS_BULL_PREFIX: string;
    REDIS_BULL_TLS: boolean;
}
const RedisConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        REDIS_CACHE_HOST: Joi.string().required(),
        REDIS_CACHE_PORT: Joi.number().default(6379),
        REDIS_CACHE_PASSWORD: Joi.string().required(),
        REDIS_CACHE_PREFIX: Joi.string().default('vtv-go-payment-staging:'),
        REDIS_CACHE_TLS: Joi.boolean().default(false),
        REDIS_CACHE_DB: Joi.number().default(1), // 1 for dev, 2 for production
        REDIS_BULL_HOST: Joi.string().required(),
        REDIS_BULL_PORT: Joi.number().default(6379),
        REDIS_BULL_PASSWORD: Joi.string().required(),
        REDIS_BULL_PREFIX: Joi.string().default('vtv-go-payment-staging:'),
        REDIS_BULL_TLS: Joi.boolean().default(false),
    });
};

export const redisConfig = RedisConfig();
