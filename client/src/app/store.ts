import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "../features/auth";
import { reducer as goalReducer } from "../features/goals";
import { IAuthStore, IGoalStore } from "../types";
import { TypedUseSelectorHook, useSelector } from "react-redux";


export const store = configureStore<{ auth: IAuthStore, goal: IGoalStore }>({
    reducer: {
        auth: authReducer,
        goal: goalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export const customUseSelector: TypedUseSelectorHook<RootState> = useSelector;
