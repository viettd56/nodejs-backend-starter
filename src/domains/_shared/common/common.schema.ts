import { Type } from '@sinclair/typebox';

const CommonSchema = () => {
    // const responseDefault = {
    //     type: 'object',
    //     properties: {
    //         status: { type: 'boolean' },
    //         message: { type: 'string' },
    //         request_id: { type: 'string' },
    //     },
    // };

    const responseDefault = Type.Object({
        status: Type.Boolean(),
        message: Type.String(),
        request_id: Type.String(),
    });

    return {
        responseDefault,
    };
};

export const commonSchema = CommonSchema();
