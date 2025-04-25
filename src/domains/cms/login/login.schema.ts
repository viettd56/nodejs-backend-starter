import { commonSchema } from 'src/domains/_shared/common/common.schema';

const LoginSchema = () => {
    const login = {
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'boolean' },
                    data: {
                        type: 'object',
                        properties: {
                            access_token: { type: 'string' },
                            refresh_token: { type: 'string' },
                        },
                    },
                },
            },
            default: commonSchema.responseDefault,
        },
    };

    return {
        login,
    };
};

export const loginSchema = LoginSchema();
