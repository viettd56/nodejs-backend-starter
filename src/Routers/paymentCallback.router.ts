import { Router } from 'express';
import { paymentCallbackController } from './paymentCallback.controller';
export const paymentCallbackRouter = Router();

paymentCallbackRouter.get('/appota-pay', paymentCallbackController.appotaCallback);
paymentCallbackRouter.post('/appota-pay', paymentCallbackController.appotaCallback);
