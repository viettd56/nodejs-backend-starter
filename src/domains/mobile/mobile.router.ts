import { FastifyPluginCallback } from 'fastify';
import { mobileLoginRoutes } from './login/login.router';

export const mobileRoutes: FastifyPluginCallback = (app) => {
    app.register(mobileLoginRoutes, {
        prefix: '/login',
    });
};
