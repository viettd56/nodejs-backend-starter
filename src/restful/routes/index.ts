import express from 'express';
import { ICradle } from 'src/container';

export const RESTfulRouter = ({ httpMiddleware, noteRouter, serverHealthRouter }: ICradle) => {
    const router = express.Router();

    router.use('/', httpMiddleware.consoleLog);

    router.use('/server-health', serverHealthRouter.router);

    router.use('/note', noteRouter.router);

    return {
        router,
    };
};
