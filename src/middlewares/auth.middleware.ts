import { RouteHandler } from 'fastify';

const AuthMiddleware = () => {
    const auth: RouteHandler = async (request, reply) => {
        console.log(`Request received: ${request.method} ${request.url}`);
        // console.log(`Request headers: ${JSON.stringify(request.headers)}`);
    };

    return {
        auth,
    };
};

export const authMiddleware = AuthMiddleware();
