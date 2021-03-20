import { Router } from 'express';

import { userRoutes } from './app/routes/users';

export const routes = Router();

routes.use(userRoutes);
