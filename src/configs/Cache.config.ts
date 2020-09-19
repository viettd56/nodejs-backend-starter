import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import { ICradle } from 'src/container';

interface IConfigs {
    CACHE_TTL: number;
}
export const CacheConfig = ({ env }: Pick<ICradle, 'env'>) => {
    return new ValidationHelper<IConfigs>(env).validate({
        CACHE_TTL: Joi.number().default(60),
    });
};
