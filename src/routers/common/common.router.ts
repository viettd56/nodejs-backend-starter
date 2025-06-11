import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { HealthCheckRouter } from './healthCheck/healthCheck.router';

/**
 * Mobile Router provider for NestJS.
 */
@Injectable()
export class CommonRouter {
    constructor(private readonly healthCheckRouter: HealthCheckRouter) {}

    public commonRoutes: FastifyPluginCallback = (app) => {
        app.register(this.healthCheckRouter.healthCheckRoutes, {
            prefix: '',
        });
    };
}
