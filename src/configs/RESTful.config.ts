import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import { ICradle } from 'src/container';

interface IConfigs {
    DEBUG_RESTFUL: boolean;
    RESTFUL_PORT: number;
}

export const RESTfulConfig = ({ env }: Pick<ICradle, 'env'>) => {
    return new ValidationHelper<IConfigs>(env).validate({
        DEBUG_RESTFUL: Joi.boolean().default(false),
        RESTFUL_PORT: Joi.number().default(3000),
    });
};
