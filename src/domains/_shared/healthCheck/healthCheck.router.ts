import { FastifyPluginCallback } from 'fastify';
import { healthCheckSchema } from './healthCheck.schema';
import { healthCheckService } from './healthCheck.service';

export const healthCheckRoutes: FastifyPluginCallback = (app) => {
    app.get(
        '/',
        {
            schema: healthCheckSchema.getHealthCheck,
        },
        async (req, res) => {
            const data = healthCheckService.check();
            return data;
        },
    );
};
