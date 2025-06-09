import { FastifyPluginCallback } from 'fastify';
import { sampleMiddleware } from './sample.middleware';
import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { commonSchema } from 'src/domains/common/common.schema';
import { sampleService } from './sample.service';
export const sampleRoutes: FastifyPluginCallback = (app) => {
    app.addHook('preHandler', sampleMiddleware.auth);
    app.withTypeProvider<TypeBoxTypeProvider>().get(
        '/',
        {
            // preHandler: [sampleMiddleware.auth],
            schema: {
                response: {
                    200: Type.Object({
                        status: Type.Boolean(),
                    }),
                    default: commonSchema.responseDefault,
                },
                querystring: Type.Object({
                    offset: Type.Number({ default: 0, minimum: 0 }),
                    limit: Type.Number({ default: 10, minimum: 0 }),
                }),
            },
        },
        async (req, res) => {
            const { offset, limit } = req.query;
            console.log('🚀 ~ offset:', { offset, limit });
            sampleService.logic();
            return {
                status: true,
            };
        },
    );

    app.withTypeProvider<TypeBoxTypeProvider>().get(
        '/:id',
        {
            schema: {
                response: {
                    200: Type.Object({
                        status: Type.Boolean(),
                    }),
                    default: commonSchema.responseDefault,
                },
                params: Type.Object({
                    id: Type.Number(),
                }),
            },
        },
        async (req, res) => {
            const { id } = req.params;
            console.log('🚀 ~ id:', id);
            sampleService.logic();
            return {
                status: true,
            };
        },
    );

    app.withTypeProvider<TypeBoxTypeProvider>().post(
        '/',
        {
            schema: {
                response: {
                    200: Type.Object({
                        status: Type.Boolean(),
                    }),
                    default: commonSchema.responseDefault,
                },
                body: Type.Object({
                    id: Type.Optional(Type.Number()),
                }),
            },
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
