import { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import { Exception } from 'src/helpers/Exception.helper';

const FastifyService = () => {
    const setErrorHandler = (fastify: FastifyInstance) => {
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
    };

    return {
        setErrorHandler,
    };
};

export const fastifyService = FastifyService();
