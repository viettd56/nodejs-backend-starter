import express from 'express';
import { ICradle } from 'src/container';

export const ServerHealthRouter = ({ serverHealthController }: ICradle) => {
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        try {
            await serverHealthController.check();

            res.send({
                status: true,
                message: 'ok',
            });
        } catch (e) {
            res.status(500).send({
                status: false,
                message: e.message,
            });
        }
    });

    return {
        router,
    };
};
