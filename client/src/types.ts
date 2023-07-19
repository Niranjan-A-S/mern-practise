import { HTMLInputTypeAttribute } from "react";

export interface IFormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type ILoginFormState = Pick<IFormState, 'email' | 'password'>

export interface IFormControlData {
    name: keyof IFormState;
    value: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
}

export interface IAuthStore {
    user: any;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

export interface IGoalStore extends Omit<IAuthStore, 'user'> {
    goals: any[];
}

export type IUserData = Omit<IFormState, 'confirmPassword'>

export interface IUserResponse extends IUserData {
    token: string;
}

export interface IGoal {
    text: string
}

export interface IGoalItem {
    _id: string;
    text: string;
    createdAt: string;
}

export interface IGoalItemProps {
    goal: IGoalItem;
}