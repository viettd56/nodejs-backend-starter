import { FastifyPluginCallback } from 'fastify';
import { authMiddleware } from 'src/middlewares/auth.middleware';

export const appRoutes: FastifyPluginCallback = (app) => {
    app.get(
        '/',
        {
            preHandler: [authMiddleware.auth],
            schema: {
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            status: { type: 'boolean' },
                            query: { type: 'string' },
                        },
                    },
                    default: {
                        type: 'object',
                        properties: {
                            status: { type: 'boolean' },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const query = request.query;
            return {
                status: true,
                query,
            };
        },
    );
    app.get('/:id', { preHandler: [authMiddleware.auth] }, async (request, reply) => {
        const { id } = request.params as any;
        return {
            status: true,
            id,
        };
    });
    app.post('/', { preHandler: [authMiddleware.auth] }, async (request, reply) => {
        const body = request.body;
        return {
            status: true,
            body,
        };
    });
};
