import { Injectable } from '@nestjs/common';
import { FastifyPluginCallback } from 'fastify';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { commonSchema } from 'src/common/common.schema';
import { MobileLoginUsecase } from './usecase/login.usecase';

/**
 * Mobile Login Router provider for NestJS.
 */
@Injectable()
export class MobileLoginRouter {
    constructor(private readonly loginUsecase: MobileLoginUsecase) {}

    public mobileLoginRoutes: FastifyPluginCallback = (app) => {
        app.withTypeProvider<TypeBoxTypeProvider>().post(
            '/',
            {
                schema: {
                    body: Type.Object({
                        id: Type.String(),
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
                const data = this.loginUsecase.login(id);
                return {
                    status: true,
                    data,
                };
            },
        );
    };
}
