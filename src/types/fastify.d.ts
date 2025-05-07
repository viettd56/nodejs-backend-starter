import { FastifyRequest } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        locals: {
            user_id?: string;
            logged?: boolean;
        };
    }
}
