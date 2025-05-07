import { RouteHandler } from 'fastify';
import { sampleService } from './sample.service';

const SampleMiddleware = () => {
    const auth: RouteHandler = async (request, reply) => {
        request.user = {
            user_id: 'sample',
        };
        request.logged = true;
        sampleService.logic();
    };

    return {
        auth,
    };
};

export const sampleMiddleware = SampleMiddleware();
