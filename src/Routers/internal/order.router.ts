import { Router } from 'express';
import { orderInternalController } from './order.controller';
import { internalMiddleware } from 'src/middlewares/internal.middleware';

export const orderInternalRouter = Router();

orderInternalRouter.use(internalMiddleware.checkIPs);
orderInternalRouter.use(internalMiddleware.auth);
orderInternalRouter.post('/new-order', orderInternalController.newOrder);
orderInternalRouter.get('/user-orders', orderInternalController.getUserOrders);
orderInternalRouter.get('/detail/:order_id', orderInternalController.getDetailOrder);
orderInternalRouter.get(
    '/detail-by-transaction-id/:transaction_id',
    orderInternalController.getDetailOrderByTransactionId
);
orderInternalRouter.post('/verify-order', orderInternalController.verifyOrder);
