import { Type } from '@sinclair/typebox';

const CommonSchema = () => {
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
