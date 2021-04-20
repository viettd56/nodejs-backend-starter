import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import { ICradle } from 'src/container';

interface IConfigs {
    JAEGER_HOST?: string;
    JAEGER_PORT: number;
}

export const JaegerConfig = ({ env }: ICradle) => {
    return new ValidationHelper<IConfigs>(env).validate({
        JAEGER_HOST: Joi.string(),
        JAEGER_PORT: Joi.number().default(6832),
    });
};
