import { FastifyPluginCallback } from 'fastify';
import { cmsLoginRoutes } from './login/login.router';

export const cmsRoutes: FastifyPluginCallback = (app) => {
    app.register(cmsLoginRoutes, {
        prefix: '/login',
    });
};
