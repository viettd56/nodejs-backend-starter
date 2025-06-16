import { Injectable } from '@nestjs/common';
import { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import helmet from '@fastify/helmet';
import { ConfigsService } from 'src/configs/configs.service';
import { Exception } from 'src/shared/helpers/Exception.helper';

@Injectable()
export class FastifyPluginService {
    constructor(private readonly configsService: ConfigsService) {}

    public setErrorHandler(fastify: FastifyInstance): void {
        fastify.setErrorHandler(function (err, request, reply) {
            const id = nanoid();
            // request.log.error({ err, id });
            console.error({ err, id });
            if (err instanceof Exception) {
                reply.status(500).send({
                    status: false,
                    message: err.message,
                    request_id: id,
                });
                return;
            }
            if (err.code === 'FST_ERR_VALIDATION') {
                reply.status(400).send({
                    status: false,
                    message: err.message,
                    request_id: id,
                });
                return;
            }
            if (err.code === 'FST_BASIC_AUTH_MISSING_OR_BAD_AUTHORIZATION_HEADER') {
                throw err;
            }
            if (err.message === 'FST_BASIC_AUTH_MISSING_OR_BAD_AUTHORIZATION_HEADER') {
                throw err;
            }
            reply.status(500).send({ status: false, message: 'Internal server error', request_id: id });
        });
    }

    private validate(authKey: string) {
        return (username: string, password: string, req: any, reply: any, done: any) => {
            if (username !== 'admin' || password !== authKey) {
                console.log('🚀 ~ FastifyPluginService ~ validate ~ username:', username);
                console.log('🚀 ~ FastifyPluginService ~ validate ~ password:', password);
                console.log(
                    '🚀 ~ FastifyPluginService ~ validate ~ this.configsService.serverConfig.AUTH_KEY:',
                    authKey,
                );
                done(new Error('FST_BASIC_AUTH_MISSING_OR_BAD_AUTHORIZATION_HEADER'));
            } else {
                done();
            }
        };
    }

    public setBasicAuth(fastify: FastifyInstance): void {
        // Register plugin
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fastifyBasicAuth = require('@fastify/basic-auth');
        fastify.register(fastifyBasicAuth, {
            validate: this.validate(this.configsService.serverConfig.AUTH_KEY),
            authenticate: true,
        });
    }

    public setCommonMiddleware(fastify: FastifyInstance): void {
        fastify.register(helmet, { global: true });

        fastify.addHook('preHandler', async (request: any, reply: any) => {
            request.locals = {};
        });
    }
}
