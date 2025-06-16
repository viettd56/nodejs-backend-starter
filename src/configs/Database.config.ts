import { Injectable } from '@nestjs/common';
import { Joi, ValidationHelper } from 'src/shared/helpers/Validation.helper';

type IConfigs = {
    DATABASE_URL: string;
    DATABASE_READ_URL: string;
};

@Injectable()
export class DatabaseConfig {
    private _DATABASE_URL: string;
    private _DATABASE_READ_URL: string;
    constructor() {
        const { DATABASE_URL, DATABASE_READ_URL } = new ValidationHelper<IConfigs>(process.env).validate({
            DATABASE_URL: Joi.string().required(),
            DATABASE_READ_URL: Joi.string().required(),
        });

        this._DATABASE_URL = DATABASE_URL;
        this._DATABASE_READ_URL = DATABASE_READ_URL;
    }

    get DATABASE_URL() {
        return this._DATABASE_URL;
    }

    get DATABASE_READ_URL() {
        return this._DATABASE_READ_URL;
    }
}
