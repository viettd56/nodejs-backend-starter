import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { commonSchema } from 'src/common/common.schema';
import { HealthCheckUsecase } from './usecase/health-check.usecase';

/**
 * Service for signing and verifying JWT tokens with caching.
 */
@Injectable()
export class HealthCheckRouter {
    constructor(private readonly healthCheckUsecase: HealthCheckUsecase) {}
    public healthCheckRoutes: FastifyPluginCallback = (app) => {
        app.withTypeProvider<TypeBoxTypeProvider>().get(
            '/health-check',
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
                const data = this.healthCheckUsecase.healthCheck();
                return data;
            },
        );
    };
}
