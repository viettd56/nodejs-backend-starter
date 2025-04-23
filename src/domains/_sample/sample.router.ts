import { FastifyPluginCallback } from 'fastify';
import { sampleMiddleware } from './sample.middleware';
import { sampleSchema } from './sample.schema';

export const sampleRoutes: FastifyPluginCallback = (app) => {
    app.addHook('preHandler', sampleMiddleware.auth);

    app.get(
        '/sample',
        {
            // preHandler: [sampleMiddleware.auth],
            schema: sampleSchema.getSamples.schema,
        },
        async (request, reply) => {
            const query = request.query;
            return {
                status: true,
            };
        },
    );
    app.get(
        '/sample/:id',
        {
            schema: sampleSchema.getSamples.schema,
        },
        async (request, reply) => {
            const { id } = request.params as any;
            return {
                status: true,
            };
        },
    );
    app.post(
        '/sample',
        {
            schema: sampleSchema.getSamples.schema,
        },
        async (request, reply) => {
            const body = request.body;
            return {
                status: true,
            };
        },
    );
};
