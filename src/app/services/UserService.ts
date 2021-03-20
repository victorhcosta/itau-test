import { hash, compare } from 'bcryptjs';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import { IUser, IUserCreate, IUserCreateRequest, IUserCredentials } from "../models/User";
import { UserRepository } from "../repository/UserRepository";
import { environment, MAGIC_NUMBERS } from '../../constants';

const userRepository = new UserRepository();

export class UserService {
    constructor() { }

    private _validateFields(user: IUserCreateRequest) {
        const schema = Yup.object().shape({
            name: Yup.string().required('Informe seu nome'),
            surname: Yup.string().required('Informe seu sobrenome'),
            nickname: Yup.string().required('Infome seu login'),
            password: Yup.string().required('Infome sua senha').min(8, 'A senha deve ter pelo menos 8 digitos'),
        });

        return new Promise<IUserCreateRequest>((resolve, reject) => schema
            .validate(user, { abortEarly: false })
            .then(() => resolve(user))
            .catch(error => {
                const parsedErrors = (error as Yup.ValidationError).inner.map(error => ({
                    path: error.path,
                    message: error.message,
                }));

                reject({
                    message: 'Dados invalidos, Preencha o formulario corretamente',
                    errors: parsedErrors,
                });
            })
        );
    }

    private async _nicknameHasBeenUserd(nickname: string) {
        const user = await userRepository.getByNickname(nickname);

        if (user) {
            return Promise.reject('nickname já está em uso');
        }

        Promise.resolve()
    }

    async authenticate(user: IUserCredentials) {
        const userFromDB = await userRepository.getByNickname(user.nickname);

        if(!userFromDB)
            return Promise.reject('Usuário ou senha invalida');

        const isValidPassword = await compare(user.password, userFromDB.password_hash);

        if(!isValidPassword)
            return Promise.reject('Usuário ou senha invalida');

        const userToken: IUser = {
            name: userFromDB.name,
            surname: userFromDB.surname,
            nickname: userFromDB.nickname,
            balance: userFromDB.balance,
        };

        const token = jwt.sign(userToken, environment.APP_SECRET, { expiresIn: '1h' });

        return Promise.resolve(token)
    }

    async getAll() {
        return userRepository.getAll()
    }

    async create(user: IUserCreateRequest) {
        await this._validateFields(user);
        await this._nicknameHasBeenUserd(user.nickname);

        const password_hash = await hash(user.password, 8);

        const userToBeCreated: IUserCreate = {
            name: user.name,
            nickname: user.nickname,
            surname: user.surname,
            balance: MAGIC_NUMBERS.DEFAULT_BALANCE_VALUE,
            password_hash,
        };

        return userRepository.create(userToBeCreated);
    }

    async delete(nickname: string) {
        return userRepository.delete(nickname);
    }

}
