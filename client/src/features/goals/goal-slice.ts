import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGoal, IGoalStore } from "../../types";
import { goalService } from "./goal-service";

const initialState: IGoalStore = {
    goals: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const createGoal = createAsyncThunk<any, IGoal, { rejectValue: string }>('goal/createGoal', async (goalData, thunkAPI: any) => {
    try {
        const token = thunkAPI?.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            error?.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getGoal = createAsyncThunk<any, any, { rejectValue: string }>('goal/getGoal', async (_, thunkAPI: any) => {
    try {
        const token = thunkAPI?.getState().auth.user.token;
        return await goalService.getGoal(token);
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            error?.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteGoal = createAsyncThunk<any, any, { rejectValue: string }>('goal/deleteGoal', async (goalId, thunkAPI: any) => {
    try {
        const token = thunkAPI?.getState().auth.user.token;
        return await goalService.deleteGoal(goalId, token);
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            error?.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const goalSlice = createSlice({
    initialState,
    name: 'goal',
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;

            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter(goal => goal._id !== action.payload.id);
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    }
});

export const { reducer, actions: { reset } } = goalSlice;