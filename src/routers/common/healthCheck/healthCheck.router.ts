import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { HealthCheckUsecase } from './usecase/health-check.usecase';
import { commonSchema } from 'src/shared/common/common.schema';

/**
 * Service for signing and verifying JWT tokens with caching.
 */
@Injectable()
export class HealthCheckRouter {
    constructor(private readonly healthCheckUsecase: HealthCheckUsecase) {}
    public healthCheckRoutes: FastifyPluginCallback = (app) => {
        app.withTypeProvider<TypeBoxTypeProvider>().get(
            '',
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
