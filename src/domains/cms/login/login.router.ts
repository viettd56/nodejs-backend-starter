import { FastifyPluginCallback } from 'fastify';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { loginService } from './login.service';
import { commonSchema } from 'src/domains/_shared/common/common.schema';

export const cmsLoginRoutes: FastifyPluginCallback = (app) => {
    app.withTypeProvider<TypeBoxTypeProvider>().post(
        '/',
        {
            schema: {
                body: Type.Object({
                    id: Type.Optional(Type.Number({ default: 0 })),
                }),
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
            },
        },
        async (req, res) => {
            const { id } = req.body;
            const data = loginService.logic();
            return {
                status: true,
                data,
            };
        },
    );
};
