import { RouteHandler } from 'fastify';
import { sampleService } from './sample.service';

const SampleMiddleware = () => {
    const auth: RouteHandler = async (request, reply) => {
        request.locals.user_id = 'sample';
        request.locals.logged = true;
        sampleService.logic();
    };

    return {
        auth,
    };
};

export const sampleMiddleware = SampleMiddleware();
