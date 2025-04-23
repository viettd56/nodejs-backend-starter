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
            schema: sampleSchema.getSamples,
        },
        async (req, res) => {
            const { offset, limit } = new ValidationHelper<{
                offset: number;
                limit: number;
            }>(req.query).validate({
                offset: Joi.number().default(0),
                limit: Joi.number().default(10),
            });
            console.log('🚀 ~ offset:', offset);
            sampleService.logic();
            return {
                status: true,
            };
        },
    );

    app.get(
        '/sample/:id',
        {
            schema: sampleSchema.getSamples,
        },
        async (req, res) => {
            const { id } = new ValidationHelper<{
                id: number;
            }>(req.params).validate({
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
            schema: sampleSchema.getSamples,
        },
        async (req, res) => {
            const { id } = new ValidationHelper<{
                id: number;
            }>(req.body).validate({
                id: Joi.number().default(0),
            });
            console.log('🚀 ~ id:', id);
            sampleService.logic();
            return {
                status: true,
            };
        },
    );
};
