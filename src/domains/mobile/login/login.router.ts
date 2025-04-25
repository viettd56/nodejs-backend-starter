import { FastifyPluginCallback } from 'fastify';
import { Joi, ValidationHelper } from 'src/helpers/Validation.helper';
import { loginSchema } from './login.schema';
import { loginService } from './login.service';

export const mobileLoginRoutes: FastifyPluginCallback = (app) => {
    app.post(
        '/',
        {
            schema: loginSchema.login,
        },
        async (req, res) => {
            const { id } = new ValidationHelper<{
                id: number;
            }>(req.body).validate({
                id: Joi.number().default(0),
            });
            const data = loginService.logic();
            return {
                status: true,
                data,
            };
        },
    );
};
