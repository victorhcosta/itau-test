import { MAGIC_NUMBERS } from '../../constants';
import { ExtractRepository } from '../repository/ExtractRepository';
import { UserRepository } from '../repository/UserRepository';
import {
    IExtractRegister,
    IDeposit,
    IWithdraw,
} from '../models/Extract';

const extractRepository = new ExtractRepository();
const userRepository = new UserRepository();

export class ExtractService {

    private _filterRegisters(moviments: IExtractRegister[]) {
        return moviments
            .map(register => register.value)
            .reduce((sum, registerValue) => Number((sum + registerValue).toFixed(MAGIC_NUMBERS.DECIMAL_PLACES)), 0)
    }

    private async _updateBalance(moviments: IExtractRegister[], nickname: string) {
        const deposits = moviments.filter(register => register.operationType === 'deposit');
        const totalDeposit = this._filterRegisters(deposits);

        const withdraws = moviments.filter(register => register.operationType === 'withdraw');
        const totalWithdraw = this._filterRegisters(withdraws);

        const balance = totalDeposit - totalWithdraw;
        const roundedBalance = Number(balance.toFixed(MAGIC_NUMBERS.DECIMAL_PLACES));
        await userRepository.updateBalance(nickname, roundedBalance);
    }

    private _roundValue(value: number) {
        return Number(value.toFixed(MAGIC_NUMBERS.DECIMAL_PLACES))
    }

    private _validateValue(roundedValue: number) {
        const isValidValue = roundedValue > 0.01;

        if(!isValidValue)
            return Promise.reject('O valor minimo para deposito é R$0,01');
    }

    async getAll(nickname: string) {
        return extractRepository.getAll(nickname);
    }

    async makeDeposit(value: number, nickname: string) {
        const roundedValue = this._roundValue(value);
        this._validateValue(roundedValue);
        const deposit: IDeposit = {
            value: roundedValue,
            operationType: 'deposit',
            ownerAccountNickName: nickname.trim(),
            from: '',
            to: nickname.trim(),
            date: new Date(),
        };

        const moviments = await extractRepository.makeDeposit(deposit);

        await this._updateBalance(moviments, nickname);
    }

    async makeWithdraw(value: number, nickname: string) {
        const roundedValue = this._roundValue(value);
        this._validateValue(roundedValue);
        const withdraw: IWithdraw = {
            value: roundedValue,
            operationType: 'withdraw',
            ownerAccountNickName: nickname.trim(),
            from: nickname.trim(),
            to: '',
            date: new Date(),
        };

        const moviments = await extractRepository.makeWithdraw(withdraw);

        await this._updateBalance(moviments, nickname);
    }

    async makeTransaction(transaction: Partial<IExtractRegister>, nickname: string) {
        if (!transaction?.to)
            return Promise.reject({ message: 'Informe para quem vai ser realizada a transação' })

        if (!transaction?.value)
            return Promise.reject({ message: 'Informe o valor da transação' })

        const roundedValue = this._roundValue(transaction?.value);
        this._validateValue(roundedValue);

        const user = await userRepository.getByNickname(transaction.to);

        if (!user)
            return Promise.reject({ message: 'Usuário invalido' });

        const deposit: IDeposit = {
            value: roundedValue,
            operationType: 'deposit',
            ownerAccountNickName: transaction.to.trim(),
            from: nickname.trim(),
            to: transaction.to.trim(),
            date: new Date(),
        };

        const withdraw: IWithdraw = {
            value: roundedValue,
            operationType: 'withdraw',
            ownerAccountNickName: nickname.trim(),
            from: nickname.trim(),
            to: transaction.to.trim(),
            date: new Date(),
        };

        const deposits = await extractRepository.makeDeposit(deposit);
        const withdraws = await extractRepository.makeWithdraw(withdraw);
        const moviments = [...deposits, ...withdraws];

        await this._updateBalance(moviments, nickname);
    }

}
