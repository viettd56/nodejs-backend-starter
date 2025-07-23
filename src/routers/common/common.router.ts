import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { HealthCheckRouter } from './healthCheck/healthCheck.router';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { commonSchema } from 'src/shared/common/common.schema';
import moment from 'moment-timezone';

/**
 * Mobile Router provider for NestJS.
 */
@Injectable()
export class CommonRouter {
    constructor(private readonly healthCheckRouter: HealthCheckRouter) {}

    public commonRoutes: FastifyPluginCallback = (app) => {
        app.register((app) => {
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
                    return {
                        status: true,
                        timestamp: moment().unix(),
                    };
                },
            );
        });

        app.register(this.healthCheckRouter.healthCheckRoutes, {
            prefix: '/health-check',
        });
    };
}
