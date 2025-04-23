import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    AUTH_KEY: string;
    DEV_KEY: string;
    IS_DEV: boolean;
    IS_DEBUG: boolean;
    DATABASE_URL: string;
    DATABASE_READ_URL: string;
}
const ServerConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        AUTH_KEY: Joi.string(),
        DEV_KEY: Joi.string(),
        IS_DEV: Joi.boolean().required(),
        IS_DEBUG: Joi.boolean().default(false),
        DATABASE_URL: Joi.string().required(),
        DATABASE_READ_URL: Joi.string().required(),
    });
};

export const serverConfig = ServerConfig();
