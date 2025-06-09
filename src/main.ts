/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
import Fastify from 'fastify';
import { logger } from './helpers/Logger.helper';
import { healthCheckRoutes } from './router/common/healthCheck/healthCheck.router';
import { cmsRoutes } from './router/cms/cms.router';
import { mobileRoutes } from './router/mobile/mobile.router';
import { serverConfig } from './configs/Server.config';
import { swaggerService } from './domains/swagger/swagger.service';
import { fastifyService } from './domains/fastify/fastify.service';

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

fastifyService.setCommonMiddleware(fastify);
fastifyService.setBasicAuth(fastify);
fastifyService.setErrorHandler(fastify);

const start = async () => {
    try {
        if (serverConfig.SHOW_SWAGGER) {
            await swaggerService.registerSwagger(fastify);
            console.log(`API Documentation available at http://localhost:3000/documentation`);
        }

        // Declare a route
        fastify.register(healthCheckRoutes, {
            prefix: '',
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
