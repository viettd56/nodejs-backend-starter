import { commonSchema } from '../common/common.schema';
import { Type } from '@sinclair/typebox';

const SampleSchema = () => {
    const getSamples = {
        response: {
            200: Type.Object({
                status: Type.Boolean(),
            }),
            default: commonSchema.responseDefault,
        },
    };

    return {
        getSamples,
    };
};

export const sampleSchema = SampleSchema();
