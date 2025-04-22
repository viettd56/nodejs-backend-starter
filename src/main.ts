import Fastify from 'fastify';
import { appRoutes } from './routers/app.router';

const fastify = Fastify({
    // logger: true,
});

// Declare a route
fastify.register(appRoutes);

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
