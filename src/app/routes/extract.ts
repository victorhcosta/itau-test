import { Router } from 'express';

import { ExtractController } from '../controllers/ExtractController';
import { requiresAuthentication } from '../middleware/authenticated';

const extractController = new ExtractController();

export const extractRoutes = Router();

extractRoutes.get('/extract', requiresAuthentication, extractController.getAll);

extractRoutes.post('/extract/deposit', requiresAuthentication, extractController.makeDeposit);

extractRoutes.post('/extract/withdraw', requiresAuthentication, extractController.makeWithdraw);

extractRoutes.post('/extract/transaction', requiresAuthentication, extractController.makeTransaction);
