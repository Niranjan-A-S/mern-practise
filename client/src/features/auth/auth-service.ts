import axios, { AxiosResponse } from "axios";
import { IUserData, IUserResponse } from "../../types";

const API_URL = 'http://localhost:8000/api/users';

const register = async (userData: IUserData): Promise<number> => {
    const response: AxiosResponse<IUserResponse> = await axios.post(API_URL, userData);

    return response.status;
};
const login = async (userData: Omit<IUserData, 'name'>): Promise<IUserResponse> => {
    const response: AxiosResponse<IUserResponse> = await axios.post(API_URL + '/login', userData);
    localStorage.setItem('user', response.data as any)
    return response.data;
};


export const authService = {
    register, login
};
