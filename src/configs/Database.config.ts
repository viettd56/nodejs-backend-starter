import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import { ICradle } from 'src/container';

interface IConfigs {
    MONGODB_URI: string;
    REDIS_CACHE_HOST: string;
    REDIS_CACHE_PORT: number;
    REDIS_CACHE_PASSWORD?: string;
    REDIS_CACHE_PREFIX: string;
    REDIS_BULL_HOST: string;
    REDIS_BULL_PORT: number;
    REDIS_BULL_PASSWORD?: string;
    REDIS_BULL_PREFIX: string;
}

export const DatabaseConfig = ({ env }: Pick<ICradle, 'env'>) => {
    return new ValidationHelper<IConfigs>(env).validate({
        MONGODB_URI: Joi.string().required(),
        REDIS_CACHE_HOST: Joi.string().required(),
        REDIS_CACHE_PORT: Joi.number().default(6379),
        REDIS_CACHE_PASSWORD: Joi.string(),
        REDIS_CACHE_PREFIX: Joi.string().required(),
        REDIS_BULL_HOST: Joi.string().required(),
        REDIS_BULL_PORT: Joi.number().default(6379),
        REDIS_BULL_PASSWORD: Joi.string(),
        REDIS_BULL_PREFIX: Joi.string().required(),
    });
};
