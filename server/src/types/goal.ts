import { Document, Types } from 'mongoose';

export interface IGoal extends Document {
    user: Types.ObjectId,
    text: string
}
