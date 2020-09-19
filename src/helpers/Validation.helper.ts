import Joi from '@hapi/joi';

export class ValidationHelper<T> {
    private input: T;
    constructor(input) {
        this.input = input;
    }

    validate(joiSchema: { [k in keyof T]: Joi.SchemaLike | Joi.SchemaLike[] }) {
        const { error, value } = Joi.validate(this.input, Joi.object(joiSchema), {
            allowUnknown: true,
        });

        if (error) {
            throw new Error(`Validation error: ${error.message}`);
        }

        return value;
    }
}

export function Validation<T>(input: T) {
    const validate = (joiSchema: { [k in keyof T]: Joi.SchemaLike | Joi.SchemaLike[] }) => {
        const { error, value } = Joi.validate(input, Joi.object(joiSchema), {
            allowUnknown: true,
        });

        if (error) {
            throw new Error(`Validation error: ${error.message}`);
        }

        return value;
    };

    return {
        validate,
    };
}

export const isMongoId = () => {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/);
};

export { Joi };
