import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { CmsLoginRouter } from './login/login.router';

/**
 * CMS Router provider for NestJS.
 */
@Injectable()
export class CmsRouter {
    constructor(private readonly cmsLoginRouter: CmsLoginRouter) {}

    public cmsRoutes: FastifyPluginCallback = (app) => {
        app.register(this.cmsLoginRouter.cmsLoginRoutes, {
            prefix: '/login',
        });
    };
}
