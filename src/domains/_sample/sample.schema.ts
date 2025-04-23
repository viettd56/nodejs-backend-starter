const SampleSchema = () => {
    const getSamples = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'boolean' },
                    },
                },
                default: {
                    type: 'object',
                    properties: {
                        status: { type: 'boolean' },
                        message: { type: 'string' },
                    },
                },
            },
        },
    };

    return {
        getSamples,
    };
};

export const sampleSchema = SampleSchema();
