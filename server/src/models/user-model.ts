import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema: Schema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add a email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        age: {
            type: Number
        }
    },
    {
        collection: 'user-table',
        timestamps: true
    }
);

export const User = model('User', userSchema);

