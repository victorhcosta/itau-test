import { Request } from 'express';

import { IUser } from '../app/models/User';

export type RequestWithUserData = {
    loggedUser?: IUser;
}

declare module 'express' {
  export interface Request extends RequestWithUserData {}
}
