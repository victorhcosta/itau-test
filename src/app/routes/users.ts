import { Router } from 'express';

import { UserController } from '../controllers/UserController';
import { requiresAuthentication } from '../middleware/authenticated';

const userController = new UserController();

export const userRoutes = Router();

userRoutes.get('/users', requiresAuthentication, userController.getAll);

userRoutes.post('/user/login', userController.authenticate);

userRoutes.post('/user/create-account', userController.createAccount);

userRoutes.delete('/user/delete-account', requiresAuthentication, userController.deleteAccount);
