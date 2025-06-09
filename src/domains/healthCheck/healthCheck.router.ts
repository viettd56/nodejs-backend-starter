import { FastifyPluginCallback } from 'fastify';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { healthCheckService } from './healthCheck.service';
import { commonSchema } from 'src/domains/common/common.schema';

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
            const data = healthCheckService.check();
            return data;
        },
    );
};
