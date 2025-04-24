const CommonSchema = () => {
    const responseDefault = {
        type: 'object',
        properties: {
            status: { type: 'boolean' },
            message: { type: 'string' },
            request_id: { type: 'string' },
        },
    };

    return {
        responseDefault,
    };
};

export const commonSchema = CommonSchema();
