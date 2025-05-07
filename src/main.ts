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
import { cmsRoutes } from './domains/cms/cms.router';
import { mobileRoutes } from './domains/mobile/mobile.router';
import { serverConfig } from './configs/Server.config';
import { swaggerService } from './domains/_shared/swagger/swagger.service';
import { fastifyService } from './domains/_shared/fastify/fastify.service';

const fastifyBasicAuth = require('@fastify/basic-auth');

// Hàm xác thực
async function validate(username, password, req, reply) {
    if (username !== 'admin' || password !== 'password') {
        throw new Error('FST_BASIC_AUTH_MISSING_OR_BAD_AUTHORIZATION_HEADER');
    }
}

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

fastify.register(helmet, { global: true });

// Đăng ký plugin
fastify.register(fastifyBasicAuth, { validate, authenticate: true });

fastifyService.setErrorHandler(fastify);

const start = async () => {
    try {
        if (serverConfig.SHOW_SWAGGER) {
            await swaggerService.registerSwagger(fastify);
            console.log(`API Documentation available at http://localhost:3000/documentation`);
        }

        fastify.addHook('preHandler', async (request, reply) => {
            request.locals = {};
        });

        // Declare a route
        fastify.register(healthCheckRoutes, {
            prefix: '',
        });

        fastify.register(sampleRoutes, {
            prefix: '/v1/sample',
        });

        fastify.register(cmsRoutes, {
            prefix: '/v1/cms',
        });

        fastify.register(mobileRoutes, {
            prefix: '/v1/mobile',
        });

        await fastify.listen({ port: 3000 });
        console.log(`Server listening at 3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
