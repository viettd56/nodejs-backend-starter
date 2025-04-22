import cors from 'cors';
import express from 'express';
import errorhandler from 'strong-error-handler';
import { Exception } from './exceptions/Exception';
import { sequelize } from './models/sequelize';
import { serverConfig } from './configs/Server.config';
import { orderInternalRouter } from './Routers/internal/order.router';
import { paymentCallbackRouter } from './Routers/paymentCallback.router';
import { monitorRouter } from './Routers/monitor';
import { internalMiddleware } from './middlewares/internal.middleware';

export const app = express();
console.log('🚀 ~ serverConfig.IS_DEV:', serverConfig.IS_DEV);
app.set('trust proxy', true);
app.use(
    serverConfig.IS_DEV === true
        ? cors()
        : cors({
              origin: ['http://localhost', 'http://localhost:3000', /[a-zA-Z0-9\-\_\s]+\.tdmediadev.com/],
              optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
          })
);
app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            status: true,
            message: 'ok',
        });
    } catch (error) {
        console.log('🚀 ~ app.get ~ error:', error);
        res.sendStatus(500);
    }
});
app.use(express.json());
app.use('/monitor', monitorRouter);

// app.use('/v1/orders', orderInternalRouter);
app.use('/v1/internal/orders', orderInternalRouter);
app.use('/v1/payment-callback', paymentCallbackRouter);

app.post('/migrate', async (req, res, next) => {
    await sequelize.authenticate();
    await sequelize.createSchema('data', {}).catch(console.error);
    await sequelize.sync();
    res.send('OK');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof Exception) {
        res.status(400).json({
            status: false,
            message: err.message,
            error_code: err.code,
        });
        return;
    }
    next(err);
});

app.use(
    errorhandler({
        debug: process.env.NODE_ENV !== 'production',
        log: true,
    })
);
