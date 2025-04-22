import { Router } from 'express';
import { paymentIpnController } from './paymentIpn.controller';

export const paymentIpnRouter = Router();

paymentIpnRouter.get('/verify', paymentIpnController.verifyOrder);
