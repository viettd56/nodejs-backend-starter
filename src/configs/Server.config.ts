import { Injectable } from '@nestjs/common';
import { Joi, ValidationHelper } from 'src/shared/helpers/Validation.helper';

type IConfigs = {
    AUTH_KEY: string;
    DEV_KEY: string;
    IS_DEV: boolean;
    IS_DEBUG: boolean;
    SHOW_SWAGGER: boolean;
};

@Injectable()
export class ServerConfig {
    private readonly _AUTH_KEY: string;
    private readonly _DEV_KEY: string;
    private readonly _IS_DEV: boolean;
    private readonly _IS_DEBUG: boolean;
    private readonly _SHOW_SWAGGER: boolean;

    constructor() {
        const { AUTH_KEY, DEV_KEY, IS_DEV, IS_DEBUG, SHOW_SWAGGER } = new ValidationHelper<IConfigs>(
            process.env,
        ).validate({
            AUTH_KEY: Joi.string().required(),
            DEV_KEY: Joi.string().required(),
            IS_DEV: Joi.boolean().required(),
            IS_DEBUG: Joi.boolean().default(false),
            SHOW_SWAGGER: Joi.boolean().default(false),
        });

        this._AUTH_KEY = AUTH_KEY;
        this._DEV_KEY = DEV_KEY;
        this._IS_DEV = IS_DEV;
        this._IS_DEBUG = IS_DEBUG;
        this._SHOW_SWAGGER = SHOW_SWAGGER;
    }

    get AUTH_KEY() {
        return this._AUTH_KEY;
    }
    get DEV_KEY() {
        return this._DEV_KEY;
    }
    get IS_DEV() {
        return this._IS_DEV;
    }
    get IS_DEBUG() {
        return this._IS_DEBUG;
    }
    get SHOW_SWAGGER() {
        return this._SHOW_SWAGGER;
    }
}
