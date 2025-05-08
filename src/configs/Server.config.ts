import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    AUTH_KEY: string;
    DEV_KEY: string;
    IS_DEV: boolean;
    IS_DEBUG: boolean;
    SHOW_SWAGGER: boolean;
}
const ServerConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        AUTH_KEY: Joi.string().required(),
        DEV_KEY: Joi.string().required(),
        IS_DEV: Joi.boolean().required(),
        IS_DEBUG: Joi.boolean().default(false),
        SHOW_SWAGGER: Joi.boolean().default(false),
    });
};

export const serverConfig = ServerConfig();
