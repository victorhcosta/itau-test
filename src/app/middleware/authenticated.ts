import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { environment } from '../../constants';
import { IUser } from '../models/User';

export const requiresAuthentication = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { authorization } = request.headers;

        if (!authorization)
            return response.status(401).json({ message: 'Faça login para poder acessar essa funcionalidade' });

        const token = authorization.split('Bearer ')[1];

        if (!token)
            return response.status(401).json({ message: 'Token inválido' });

        const decodedUserData = jwt.verify(token, environment.APP_SECRET) as IUser;

        request.loggedUser = decodedUserData;

        return next();
    } catch (error) {
        return response.status(401).json({ message: 'Token inválido' });
    }
};
