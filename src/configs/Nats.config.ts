import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import { ICradle } from 'src/container';

interface IConfigs {
    NATS_URL?: string;
    NATS_TOKEN?: string;
}

export const NatsConfig = ({ env }: Pick<ICradle, 'env'>) => {
    return new ValidationHelper<IConfigs>(env).validate({
        NATS_URL: Joi.string().required(),
        NATS_TOKEN: Joi.string(),
    });
};
