import { commonSchema } from '../common/common.schema';

const HealthCheckSchema = () => {
    const getHealthCheck = {
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'boolean' },
                    timestamp: { type: 'number' },
                },
            },
            default: commonSchema.responseDefault,
        },
    };

    return {
        getHealthCheck,
    };
};

export const healthCheckSchema = HealthCheckSchema();
