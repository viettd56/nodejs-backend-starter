import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { CmsLoginUsecase } from './usecase/login.usecase';
import { commonSchema } from 'src/shared/common/common.schema';

/**
 * CMS Login Router provider for NestJS.
 */
@Injectable()
export class CmsLoginRouter {
    constructor(private readonly loginUsecase: CmsLoginUsecase) {}

    public cmsLoginRoutes: FastifyPluginCallback = (app) => {
        app.withTypeProvider<TypeBoxTypeProvider>().post(
            '',
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
                const data = this.loginUsecase.login();
                return {
                    status: true,
                    data,
                };
            },
        );
    };
}
