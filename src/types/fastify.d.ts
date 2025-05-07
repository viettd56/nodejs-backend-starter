import { FastifyRequest } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            user_id: string;
        };
        logged?: boolean;
    }
}
