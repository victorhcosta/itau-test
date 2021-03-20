export interface IUser {
    name: string;
    surname: string;
    nickname: string;
    balance: number;
};

export interface IUserCreate extends IUser {
    password_hash: string;
};


export interface IUserCreateRequest extends IUser {
    password: string;
};

export interface IUserCredentials {
    nickname: string;
    password: string;
};
