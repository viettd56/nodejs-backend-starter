/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
import Fastify from 'fastify';
import { sampleRoutes } from './domains/_shared/_sample/sample.router';
import { Exception } from './helpers/Exception.helper';
import { nanoid } from 'nanoid';
// import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { logger } from './helpers/Logger.helper';
import { healthCheckRoutes } from './domains/_shared/healthCheck/healthCheck.router';
import { cmsLoginRoutes } from './domains/cms/login/login.router';
import { mobileLoginRoutes } from './domains/mobile/login/login.router';

// Override console.log
console.log = (...args) => {
    for (const arg of args) {
        logger.info(arg); // Log with info level
    }
};

console.error = (...args) => {
    for (const arg of args) {
        logger.error(arg); // Log with info level
    }
};

const fastify = Fastify({
    // logger: { level: 'error`' },
    // logger: true,
    trustProxy: true,
});

// fastify.register(cors, {
//     origin: ['https://sample.com'],
// });

fastify.register(helmet, { global: true });

// Declare a route
fastify.register(healthCheckRoutes, {
    prefix: '/',
});

fastify.register(sampleRoutes, {
    prefix: '/v1/sample',
});

fastify.register(cmsLoginRoutes, {
    prefix: '/v1/cms/login',
});

fastify.register(mobileLoginRoutes, {
    prefix: '/v1/mobile/login',
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
