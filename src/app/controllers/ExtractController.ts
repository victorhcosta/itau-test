import { Request, Response } from 'express';

import { ExtractService } from "../services/ExtractService";

const extractService = new ExtractService();

export class ExtractController {
    constructor() { }

    async getAll(request: Request, response: Response) {
        const { loggedUser } = request;

        if (!loggedUser?.nickname)
            return response.status(400).json({ message: 'Não foi possível identificar o usuário' })

        return extractService
            .getAll(loggedUser.nickname)
            .then(extract => response.json(extract))
            .catch(error => response.status(400).json({ message: error.message }));
    }

    async makeDeposit(request: Request, response: Response) {
        const { body, loggedUser } = request;

        if (!loggedUser?.nickname)
            return response.status(400).json({ message: 'Não foi possível identificar o usuário' })

        return extractService
            .makeDeposit(body.value, loggedUser.nickname)
            .then(() => response.json({ message: 'Deposito realizado com sucesso' }))
            .catch(error => response.status(400).json({ message: error.message }));
    }

    async makeWithdraw(request: Request, response: Response) {
        const { body, loggedUser } = request;

        if (!loggedUser?.nickname)
            return response.status(400).json({ message: 'Não foi possível identificar o usuário' })

        return extractService
            .makeWithdraw(body.value, loggedUser.nickname)
            .then(() => response.json({ message: 'Saque realizado com sucesso' }))
            .catch(error => response.status(400).json({ message: error.message }));
    }

    async makeTransaction(request: Request, response: Response) {
        const { body, loggedUser } = request;

        if (!loggedUser?.nickname)
            return response.status(400).json({ message: 'Não foi possível identificar o usuário' })

        return extractService
            .makeTransaction(body, loggedUser.nickname)
            .then(() => response.json({ message: 'Transação realizada com sucesso' }))
            .catch(error => response.status(400).json({ message: error.message }));
    }

}
