import { Router } from 'express';
import { ipnInternalController } from './ipn.controller';

export const ipnInternalRouter = Router();

ipnInternalRouter.post('/appota-pay', ipnInternalController.appotaIpn);
