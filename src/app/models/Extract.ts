export interface IExtractRegister {
    value: number;
    operationType: 'deposit' | 'withdraw';
    from: string;
    to: string;
    ownerAccountNickName: string;
    date: Date;
};

export interface IDeposit extends IExtractRegister {
    operationType: 'deposit';
};

export interface IWithdraw extends IExtractRegister {
    operationType: 'withdraw';
};
