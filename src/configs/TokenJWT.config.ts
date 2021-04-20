import { ValidationHelper, Joi } from 'src/helpers/Validation.helper';
import _ from 'lodash';
import { ICradle } from 'src/container';

interface IConfigs {
    JWT_RSA_PUBLIC_KEY: string;
    JWT_RSA_PRIVATE_KEY: string;
    JWT_ISSUER: string;
}

export const TokenJWTConfig = ({ env }: ICradle) => {
    return new ValidationHelper<IConfigs>(env).validate({
        JWT_RSA_PRIVATE_KEY: Joi.string().trim().replace(/\\n/g, '\n').required(),
        JWT_RSA_PUBLIC_KEY: Joi.string().trim().replace(/\\n/g, '\n').required(),
        JWT_ISSUER: Joi.string().default('server.template'),
    });
};
