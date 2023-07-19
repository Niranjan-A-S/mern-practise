import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthStore, IUserData, IUserResponse } from "../../types";
import { authService } from "./auth-service";

const user = localStorage.getItem('user');

const initialState: IAuthStore = {
    user: user ? JSON.parse(user) : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const register = createAsyncThunk<number, IUserData, { rejectValue: string }>(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                error?.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk<IUserResponse, Omit<IUserData, 'name'>>('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            error?.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        },
        logout: state => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    },
});

export const { reducer, actions: { reset, logout } } = authSlice;
