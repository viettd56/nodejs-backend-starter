import { FastifyPluginCallback } from 'fastify';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { commonSchema } from 'src/domains/common/common.schema';
import { healthCheck } from './usecase/health-check.usecase';

export const healthCheckRoutes: FastifyPluginCallback = (app) => {
    app.withTypeProvider<TypeBoxTypeProvider>().get(
        '/',
        {
            schema: {
                response: {
                    200: Type.Object({
                        status: Type.Boolean(),
                        timestamp: Type.Number(),
                    }),
                    default: commonSchema.responseDefault,
                },
            },
        },
        async (req, res) => {
            const data = healthCheck();
            return data;
        },
    );
};
