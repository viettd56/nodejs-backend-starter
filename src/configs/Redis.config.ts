import { Injectable } from '@nestjs/common';
import { Joi, ValidationHelper } from '../helpers/Validation.helper';

type IConfigs = {
    REDIS_CACHE_HOST: string;
    REDIS_CACHE_PORT: number;
    REDIS_CACHE_PASSWORD: string;
    REDIS_CACHE_PREFIX: string;
    REDIS_CACHE_TLS: boolean;
    REDIS_CACHE_DB: number;
    REDIS_BULL_HOST: string;
    REDIS_BULL_PORT: number;
    REDIS_BULL_PASSWORD: string;
    REDIS_BULL_PREFIX: string;
    REDIS_BULL_TLS: boolean;
};

@Injectable()
export class RedisConfig {
    private readonly _REDIS_CACHE_HOST: string;
    private readonly _REDIS_CACHE_PORT: number;
    private readonly _REDIS_CACHE_PASSWORD: string;
    private readonly _REDIS_CACHE_PREFIX: string;
    private readonly _REDIS_CACHE_TLS: boolean;
    private readonly _REDIS_CACHE_DB: number;
    private readonly _REDIS_BULL_HOST: string;
    private readonly _REDIS_BULL_PORT: number;
    private readonly _REDIS_BULL_PASSWORD: string;
    private readonly _REDIS_BULL_PREFIX: string;
    private readonly _REDIS_BULL_TLS: boolean;

    constructor() {
        const {
            REDIS_CACHE_HOST,
            REDIS_CACHE_PORT,
            REDIS_CACHE_PASSWORD,
            REDIS_CACHE_PREFIX,
            REDIS_CACHE_TLS,
            REDIS_CACHE_DB,
            REDIS_BULL_HOST,
            REDIS_BULL_PORT,
            REDIS_BULL_PASSWORD,
            REDIS_BULL_PREFIX,
            REDIS_BULL_TLS,
        } = new ValidationHelper<IConfigs>(process.env).validate({
            REDIS_CACHE_HOST: Joi.string().required(),
            REDIS_CACHE_PORT: Joi.number().default(6379),
            REDIS_CACHE_PASSWORD: Joi.string().required(),
            REDIS_CACHE_PREFIX: Joi.string().default('template-dev-cache:'),
            REDIS_CACHE_TLS: Joi.boolean().default(false),
            REDIS_CACHE_DB: Joi.number().default(1), // 1 for dev, 2 for production
            REDIS_BULL_HOST: Joi.string().required(),
            REDIS_BULL_PORT: Joi.number().default(6379),
            REDIS_BULL_PASSWORD: Joi.string().required(),
            REDIS_BULL_PREFIX: Joi.string().default('template-dev-bull:'),
            REDIS_BULL_TLS: Joi.boolean().default(false),
        });

        this._REDIS_CACHE_HOST = REDIS_CACHE_HOST;
        this._REDIS_CACHE_PORT = REDIS_CACHE_PORT;
        this._REDIS_CACHE_PASSWORD = REDIS_CACHE_PASSWORD;
        this._REDIS_CACHE_PREFIX = REDIS_CACHE_PREFIX;
        this._REDIS_CACHE_TLS = REDIS_CACHE_TLS;
        this._REDIS_CACHE_DB = REDIS_CACHE_DB;
        this._REDIS_BULL_HOST = REDIS_BULL_HOST;
        this._REDIS_BULL_PORT = REDIS_BULL_PORT;
        this._REDIS_BULL_PASSWORD = REDIS_BULL_PASSWORD;
        this._REDIS_BULL_PREFIX = REDIS_BULL_PREFIX;
        this._REDIS_BULL_TLS = REDIS_BULL_TLS;
    }

    get REDIS_CACHE_HOST() {
        return this._REDIS_CACHE_HOST;
    }
    get REDIS_CACHE_PORT() {
        return this._REDIS_CACHE_PORT;
    }
    get REDIS_CACHE_PASSWORD() {
        return this._REDIS_CACHE_PASSWORD;
    }
    get REDIS_CACHE_PREFIX() {
        return this._REDIS_CACHE_PREFIX;
    }
    get REDIS_CACHE_TLS() {
        return this._REDIS_CACHE_TLS;
    }
    get REDIS_CACHE_DB() {
        return this._REDIS_CACHE_DB;
    }
    get REDIS_BULL_HOST() {
        return this._REDIS_BULL_HOST;
    }
    get REDIS_BULL_PORT() {
        return this._REDIS_BULL_PORT;
    }
    get REDIS_BULL_PASSWORD() {
        return this._REDIS_BULL_PASSWORD;
    }
    get REDIS_BULL_PREFIX() {
        return this._REDIS_BULL_PREFIX;
    }
    get REDIS_BULL_TLS() {
        return this._REDIS_BULL_TLS;
    }
}
