import Fastify from 'fastify';
import { sampleRoutes } from './domains/_sample/sample.router';
import { Exception } from './helpers/Exception.helper';
import { nanoid } from 'nanoid';

const fastify = Fastify({
    // logger: { level: 'error`' },
    trustProxy: true,
});

// Declare a route
fastify.register(sampleRoutes, {
    prefix: '/v1',
});

fastify.setErrorHandler(function (err, request, reply) {
    const id = nanoid();
    // request.log.error({ err, id });
    console.error({ err, id });
    if (err instanceof Exception) {
        reply.status(500).send({
            status: false,
            message: err.message,
            request_id: id,
        });
        return;
    }
    reply.status(500).send({ status: false, message: 'Internal server error', request_id: id });
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
