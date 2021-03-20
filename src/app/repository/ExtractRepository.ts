import { Collection } from 'mongodb';

import { mongoClient } from '../../config/mongodb';
import {
    IExtractRegister,
    IDeposit,
    IWithdraw,
} from '../models/Extract';

export class ExtractRepository {
    private _collection: Collection;

    constructor() {
        mongoClient('extract')
        .then(collection => this._collection = collection);
    }

    async getAll(nickname: string) {
        return this._collection.find<IExtractRegister>({
            ownerAccountNickName: nickname
        }, {
            projection: {
                _id: false,
            }
        }).toArray();
    }

    async getDeposits(nickname: string) {
        return this._collection.find<IExtractRegister>({
            ownerAccountNickName: nickname,
            operationType: 'deposit',
        }, {
            projection: {
                _id: false,
            }
        }).toArray();
    }

    async getWithdraws(nickname: string) {
        return this._collection.find<IExtractRegister>({
            ownerAccountNickName: nickname,
            operationType: 'withdraw',
        }, {}).toArray();
    }

    async getBalance(nickname: string) {
        return this._collection.find<IExtractRegister>({
            ownerAccountNickName: nickname
        }, {
            projection: {
                value: true,
                operationType: true,
            }
        }).toArray();
    }

    async makeDeposit(deposit: IDeposit) {
        await this._collection.insertOne(deposit);
        return this.getAll(deposit.ownerAccountNickName);
    }

    async makeWithdraw(withdraw: IWithdraw) {
        await this._collection.insertOne(withdraw);
        return this.getAll(withdraw.ownerAccountNickName);
    }

}
