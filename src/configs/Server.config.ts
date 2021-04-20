import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';
import _ from 'lodash';
import { ICradle } from 'src/container';

export type ENV = 'dev' | 'debug' | 'production' | 'dev_docker' | 'test' | 'test_ci';
export type SERVER = 'GRAPHQL' | 'RESTFUL';

interface IConfigs {
    NODE_ENV: ENV;
    HASH_PASSWORD: string;
    ENCRYPTION_KEY: string;
    TIMEZONE: string;
    REMOVE_JOB_ON_COMPLETE: boolean;
    RUN_SERVER: SERVER;
}

export const ServerConfig = ({ env }: ICradle) => {
    return new ValidationHelper<IConfigs>(env).validate({
        NODE_ENV: Joi.string().default('production'),
        HASH_PASSWORD: Joi.string().min(8).max(128).required(),
        ENCRYPTION_KEY: Joi.string().length(32).required(),
        TIMEZONE: Joi.string().default('Asia/Ho_Chi_Minh'),
        REMOVE_JOB_ON_COMPLETE: Joi.boolean().default(true),
        RUN_SERVER: Joi.string(),
    });
};
