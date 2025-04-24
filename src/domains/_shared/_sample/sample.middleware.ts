import { RouteHandler } from 'fastify';
import { sampleService } from './sample.service';

const SampleMiddleware = () => {
    const auth: RouteHandler = async (request, reply) => {
        sampleService.logic();
    };

    return {
        auth,
    };
};

export const sampleMiddleware = SampleMiddleware();
