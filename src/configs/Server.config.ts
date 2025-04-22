import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

interface IConfigs {
    IS_DEBUG: boolean;
    DEBUG_KEY: string;
    INTERNAL_API_KEY: string;
    IS_DEV: boolean;
    MONITOR_KEY: string;
    ADMIN_IPS: string;
    SIGN_PUBLIC_KEY: string;
    SIGN_PRIVATE_KEY: string;
    INTERNAL_IPS: string;
}

const ServerConfig = () => {
    return new ValidationHelper<IConfigs>(process.env).validate({
        IS_DEBUG: Joi.boolean().default(false),
        IS_DEV: Joi.boolean().default(false),
        DEBUG_KEY: Joi.string().required(),
        INTERNAL_API_KEY: Joi.string().required(),
        MONITOR_KEY: Joi.string().required(),
        ADMIN_IPS: Joi.string().default('103.53.170.145'),
        SIGN_PUBLIC_KEY: Joi.string().required(),
        SIGN_PRIVATE_KEY: Joi.string().required(),
        INTERNAL_IPS: Joi.string().default('113.190.233.178;123.30.172.8;103.53.170.145'),
    });
};

export const serverConfig = ServerConfig();
