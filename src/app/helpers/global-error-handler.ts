import { NextFunction, Request, Response } from 'express';

import { BusinessError } from './business-error';

export const clientErrorHandler = (error: BusinessError, request: Request, response: Response, _next: NextFunction) => {
    console.info(`request: ${request.route?.path} lançou o erro: ${error.message}`);

    return response.status(error.statusCode).json({ message: error.message });
};

export const internalServerErrorHandler = (error: Error, request: Request, response: Response, _next: NextFunction) => {
    console.info(`request: ${request.route?.path} lançou o erro: ${error.message}`);
    return response.status(500).json({ message: 'Erro interno' });
};
