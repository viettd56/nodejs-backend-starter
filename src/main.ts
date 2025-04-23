import Fastify from 'fastify';
import { sampleRoutes } from './domains/_sample/sample.router';
import { Exception } from './helpers/Exception.helper';

const fastify = Fastify({
    // logger: true,
    trustProxy: true,
});

// Declare a route
fastify.register(sampleRoutes, {
    prefix: '/v1',
});

fastify.setErrorHandler(function (err, request, reply) {
    if (err instanceof Exception) {
        reply.status(500).send({
            status: false,
            message: err.message,
        });
        return;
    }
    reply.status(500).send({ status: false, message: 'Internal server error' });
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log(`Server listening at 3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
