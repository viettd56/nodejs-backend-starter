import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import { ICradle } from 'src/container';

interface IConfigs {
    MOLECULER_SERVICE_NAME: string;
}

export const MoleculerConfig = ({ env }: Pick<ICradle, 'env'>) => {
    return new ValidationHelper<IConfigs>(env).validate({
        MOLECULER_SERVICE_NAME: Joi.string().default('template'),
    });
};
