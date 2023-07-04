import { Schema, model } from 'mongoose';
import { IGoal } from '../types';

const goalSchema = new Schema<IGoal>(
    {
        text: {
            type: String,
            required: [true, 'Please add a text value'],
            ref: 'User'
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        collection: 'goals-data',
        timestamps: true
    },
);

export const Goal = model('Goal', goalSchema);

