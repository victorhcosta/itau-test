import { Request, Response } from 'express';

import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
    constructor() {
    }

    async authenticate(request: Request, response: Response) {
        const user = request.body;

        return userService
            .authenticate(user)
            .then(token => response.json({ token }))
            .catch(error => response.status(400).json(error.message ? error : { message: error }));
    }

    async getAll(_request: Request, response: Response) {
        return userService
            .getAll()
            .then(users => response.json(users))
            .catch(error => response.status(400).json({ message: error.message }));
    }

    async createAccount(request: Request, response: Response) {
        const user = request.body;

        return userService
            .create(user)
            .then(() => response.status(201).json({ message: 'Usuário criado com sucesso' }))
            .catch(error => response.status(400).json(error.message ? error : { message: error }));
    }

    async deleteAccount(request: Request, response: Response) {
        const { loggedUser } = request;

        if(!loggedUser?.nickname)
            return response.status(400).json({ message: 'Não foi possível identificar o usuário' })

        return userService
            .delete(loggedUser?.nickname)
            .then(() => response.json({ message: 'Usuário removido com sucesso com sucesso' }))
            .catch(error => response.status(400).json({ message: error.message }));
    }

}
