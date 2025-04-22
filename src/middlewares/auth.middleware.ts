import { FastifyRequest, FastifyReply } from 'fastify';

const AuthMiddleware = () => {
    const auth = async (request: FastifyRequest, reply: FastifyReply) => {
        console.log(`Request received: ${request.method} ${request.url}`);
        console.log(`Request headers: ${JSON.stringify(request.headers)}`);
    };

    return {
        auth,
    };
};

export const authMiddleware = AuthMiddleware();
