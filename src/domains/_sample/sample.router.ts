import { FastifyPluginCallback } from 'fastify';
import { sampleMiddleware } from './sample.middleware';
import { sampleSchema } from './sample.schema';
import { sampleService } from './sample.service';
import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';

export const sampleRoutes: FastifyPluginCallback = (app) => {
    app.addHook('preHandler', sampleMiddleware.auth);

    app.get(
        '/sample',
        {
            // preHandler: [sampleMiddleware.auth],
            schema: sampleSchema.getSamples.schema,
        },
        async (request, reply) => {
            const { offset, limit } = new ValidationHelper<{
                offset: number;
                limit: number;
            }>(request.query).validate({
                offset: Joi.number().default(0),
                limit: Joi.number().default(10),
            });
            sampleService.logic();
            return {
                status: true,
            };
        },
    );
    app.get(
        '/sample/:id',
        {
            schema: sampleSchema.getSamples.schema,
        },
        async (request, reply) => {
            const { id } = new ValidationHelper<{
                id: number;
            }>(request.params).validate({
                id: Joi.number().default(0),
            });
            console.log('🚀 ~ id:', id);
            sampleService.logic();
            return {
                status: true,
            };
        },
    );
    app.post(
        '/sample',
        {
            schema: sampleSchema.getSamples.schema,
        },
        async (request, reply) => {
            const { id } = new ValidationHelper<{
                id: number;
            }>(request.body).validate({
                id: Joi.number().default(0),
            });
            sampleService.logic();
            return {
                status: true,
            };
        },
    );
};
