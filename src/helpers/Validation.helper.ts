/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import Joi from 'joi';
import { Exception } from './Exception.helper';
export class ValidationHelper<T> {
    private input: T;
    constructor(input: any) {
        this.input = input;
    }

    validate(joiSchema: { [k in keyof T]: Joi.SchemaLike | Joi.SchemaLike[] }) {
        try {
            return Joi.attempt(this.input, Joi.object(joiSchema), {
                allowUnknown: true,
                convert: true,
            }) as T;
        } catch (error: any) {
            throw new Exception(`Validation error: ${error.message}`);
        }
    }
}

export { Joi };
