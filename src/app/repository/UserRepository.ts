import { Collection } from 'mongodb';

import { mongoClient } from '../../config/mongodb';
import { IUser, IUserCreate } from '../models/User';

export class UserRepository {
    private _collection: Collection;

    constructor() {
        mongoClient('users')
        .then(collection => this._collection = collection);
    }

    async getByNickname(nickname: string) {
        return this._collection.findOne<IUserCreate>({
            nickname: nickname
        });
    }

    async getAll() {
        return this._collection.find<IUser>({}, {
            projection: {
                password_hash: false,
                balance: false,
            }
        }).toArray();
    }

    async create(user: IUserCreate) {
        this._collection.insertOne(user);
    }

    async delete(nickname: string) {
        return this._collection.deleteOne({ nickname });
    }

    async updateBalance(nickname: string, value: number) {
        return this._collection.updateOne({ nickname }, {
            $set: {
                balance: value
            }
        })
    }

}
