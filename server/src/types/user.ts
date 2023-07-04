import { Request } from 'express';
import { Document } from 'mongoose';


export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    age?: number,
}

export interface IAuthRequest extends Request {
    user?: IUser;
}
