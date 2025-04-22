import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authMiddleware } from 'src/middlewares/auth.middleware';

export function appRoutes(app: FastifyInstance) {
    app.get('/', { preHandler: [authMiddleware.auth] }, async (request: FastifyRequest, reply: FastifyReply) => {
        const query = request.query;
        return {
            status: true,
            query,
        };
    });
    app.get('/:id', { preHandler: [authMiddleware.auth] }, async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as any;
        return {
            status: true,
            id,
        };
    });
    app.post('/', { preHandler: [authMiddleware.auth] }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body;
        return {
            status: true,
            body,
        };
    });
}
