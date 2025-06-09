import { FastifyPluginCallback } from 'fastify';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { commonSchema } from 'src/domains/common/common.schema';
import { login } from './usecase/login.usecase';

export const mobileLoginRoutes: FastifyPluginCallback = (app) => {
    app.withTypeProvider<TypeBoxTypeProvider>().post(
        '/',
        {
            schema: {
                response: {
                    200: Type.Object({
                        status: Type.Boolean(),
                        data: Type.Object({
                            access_token: Type.String(),
                            refresh_token: Type.String(),
                        }),
                    }),
                    default: commonSchema.responseDefault,
                },
                body: Type.Object({
                    id: Type.Optional(Type.Number({ default: 0 })),
                }),
            },
        },
        async (req, res) => {
            const { id } = req.body;
            const data = login();
            return {
                status: true,
                data,
            };
        },
    );
};
