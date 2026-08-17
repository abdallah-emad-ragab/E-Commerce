import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme/themeSlice";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        auth: authSlice,
        cart: cartSlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;