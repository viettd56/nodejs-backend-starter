import { commonSchema } from '../common/common.schema';

const SampleSchema = () => {
    const getSamples = {
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'boolean' },
                },
            },
            default: commonSchema.responseDefault,
        },
    };

    return {
        getSamples,
    };
};

export const sampleSchema = SampleSchema();
