import axios from "axios";
import { IGoal } from "../../types";

const API_URL = 'http://localhost:8000/api/goals';

const generateConfig = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const createGoal = async (goalData: IGoal, token: string) => {
    const response = await axios.post(API_URL, goalData, generateConfig(token));
    return response.data;
}
export const getGoal = async (token: string) => {
    const response = await axios.get(API_URL, generateConfig(token));
    return response.data;
}

export const deleteGoal = async (id: string, token: string) => {
    const response = await axios.delete(`${API_URL}/${id}`, generateConfig(token));
    return response.data;
}

export const goalService = { createGoal, getGoal, deleteGoal };

