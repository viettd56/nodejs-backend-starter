import { Injectable } from '@nestjs/common';
import { Joi, ValidationHelper } from 'src/shared/helpers/Validation.helper';

type IConfigs = {
    JWT_PUBLIC_KEY: string;
    JWT_PRIVATE_KEY: string;
    JWT_ISSUER: string;
    JWT_CMS_AUD: string;
    JWT_MOBILE_AUD: string;
};

@Injectable()
export class TokenJWTConfig {
    private readonly _JWT_PUBLIC_KEY: string;
    private readonly _JWT_PRIVATE_KEY: string;
    private readonly _JWT_ISSUER: string;
    private readonly _JWT_CMS_AUD: string;
    private readonly _JWT_MOBILE_AUD: string;

    constructor() {
        const { JWT_PUBLIC_KEY, JWT_PRIVATE_KEY, JWT_ISSUER, JWT_CMS_AUD, JWT_MOBILE_AUD } =
            new ValidationHelper<IConfigs>(process.env).validate({
                JWT_ISSUER: Joi.string().default('api.sample.com'),
                JWT_PUBLIC_KEY: Joi.string().required(),
                JWT_PRIVATE_KEY: Joi.string().required(),
                JWT_CMS_AUD: Joi.string().default('api-cms.sample.com'),
                JWT_MOBILE_AUD: Joi.string().default('api-mobile.sample.com'),
            });

        this._JWT_PUBLIC_KEY = JWT_PUBLIC_KEY;
        this._JWT_PRIVATE_KEY = JWT_PRIVATE_KEY;
        this._JWT_ISSUER = JWT_ISSUER;
        this._JWT_CMS_AUD = JWT_CMS_AUD;
        this._JWT_MOBILE_AUD = JWT_MOBILE_AUD;
    }

    get JWT_PUBLIC_KEY() {
        return this._JWT_PUBLIC_KEY;
    }
    get JWT_PRIVATE_KEY() {
        return this._JWT_PRIVATE_KEY;
    }
    get JWT_ISSUER() {
        return this._JWT_ISSUER;
    }
    get JWT_CMS_AUD() {
        return this._JWT_CMS_AUD;
    }
    get JWT_MOBILE_AUD() {
        return this._JWT_MOBILE_AUD;
    }
}
