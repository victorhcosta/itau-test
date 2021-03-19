import express from 'express';
import cors from 'cors';
import compression from 'compression';
import logger from 'morgan';
import helmet from 'helmet';

import { environment } from './constants';
import { routes } from './routes';
import { clientErrorHandler, internalServerErrorHandler } from './app/helpers/global-error-handler';

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(logger(environment.LOG_MODE));
app.use(helmet());
app.use(routes);
app.use(clientErrorHandler);
app.use(internalServerErrorHandler);
