import express from 'express';

import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import basicAuth from 'express-basic-auth';
import { serverConfig } from '../configs/Server.config';
import { verifyOrderQueue } from 'src/jobs/queue/VerifyOrder.queue';
import { sendRequestQueue } from 'src/jobs/queue/SendRequest.queue';
const basicAuthMiddleware = basicAuth({
    // list of users and passwords
    users: {
        admin_monitor: serverConfig.MONITOR_KEY,
    },
    // sends WWW-Authenticate header, which will prompt the user to fill
    // credentials in
    challenge: true,
});

// const queueMQ = new Queue('queueMQName');

const serverAdapter = new ExpressAdapter();

const opts = {
    readOnlyMode: false,
    allowRetries: true,
};

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [
        new BullMQAdapter(verifyOrderQueue.queue, {
            readOnlyMode: false,
            allowRetries: true,
        }),
        new BullMQAdapter(sendRequestQueue.queue, {
            readOnlyMode: false,
            allowRetries: true,
        }),
    ],
    serverAdapter: serverAdapter,
});

export const monitorRouter = express.Router();

serverAdapter.setBasePath('/monitor/queues');
monitorRouter.use(
    '/queues',
    (req, res, next) => {
        if (
            serverConfig.IS_DEBUG === true &&
            req.ip &&
            serverConfig.ADMIN_IPS &&
            serverConfig.ADMIN_IPS.split(';').includes(req.ip)
        ) {
            return next();
        }
        return res.status(403).json({
            message: 'Forbidden',
        });
    },
    basicAuthMiddleware,
    serverAdapter.getRouter()
);
