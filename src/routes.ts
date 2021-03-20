import { Router } from 'express';

import { extractRoutes } from './app/routes/extract';
import { userRoutes } from './app/routes/users';

export const routes = Router();

routes.use(extractRoutes);
routes.use(userRoutes);
