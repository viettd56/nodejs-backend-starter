import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { MobileLoginRouter } from './login/login.router';

/**
 * Mobile Router provider for NestJS.
 */
@Injectable()
export class MobileRouter {
    constructor(private readonly mobileLoginRouter: MobileLoginRouter) {}

    public mobileRoutes: FastifyPluginCallback = (app) => {
        app.register(this.mobileLoginRouter.mobileLoginRoutes, {
            prefix: '/login',
        });
    };
}
