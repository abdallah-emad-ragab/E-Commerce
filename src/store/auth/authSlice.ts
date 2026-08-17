import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TError, TLoading } from "../../types/shared";
import type { TUser } from "../../types/user";

interface IAuthState {
    currentUser: TUser | null;
    loading?: TLoading;
    error: TError;
}

// Check if user is logged in
const userCheck = localStorage.getItem("currentUser");
const currentUser: TUser | null = userCheck ? JSON.parse(userCheck) : null;

// Set initial state
const initialState: IAuthState = {
    currentUser,
    loading: "idle",
    error: null
}

// Create auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerUser: (state, action: PayloadAction<TUser>) => {
            const newUser = action.payload;
            const usersCheck = localStorage.getItem("users");
            const users: TUser[] = usersCheck ? JSON.parse(usersCheck) : [];
            const isUserExist = users.some((user) => user.email === newUser.email);
            if (!isUserExist) {
                users.push(newUser);
                state.currentUser = newUser;
                state.error = null;
                localStorage.setItem("users", JSON.stringify(users));
            } else {
                state.error = "User already exist";
            }
        },
        loginUser: (state, action: PayloadAction<{ email: string, password: string }>) => {
            const { email, password } = action.payload;
            const usersCheck = localStorage.getItem("users");
            const users: TUser[] = usersCheck ? JSON.parse(usersCheck) : [];
            const matchUser = users.find((user) => user.email === email && user.password === password);
            if (matchUser) {
                state.currentUser = matchUser;
                state.error = null;
                localStorage.setItem("currentUser", JSON.stringify(matchUser));
            } else {
                state.error = "Invalid email or password";
            }
        },
        logoutUser: (state) => {
            state.currentUser = null;
            state.error = null;
            localStorage.removeItem("currentUser");
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;