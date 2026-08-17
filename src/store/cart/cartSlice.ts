import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/products";
import type { TError, TLoading } from "../../types/shared";

interface ICart {
    items: { [key: string]: number }; // key: productId, value: quantity
    productsFullInfo: TProduct[];
    loading: TLoading;
    error: TError;
}

// Read saved cart from localStorage if exists
const savedCart = localStorage.getItem("cart_items");
const initialItems = savedCart ? JSON.parse(savedCart) : {};

const initialState: ICart = {
    items: initialItems,
    productsFullInfo: [],
    loading: "idle",
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            if (state.items[productId]) {
                state.items[productId] += 1;
            } else {
                state.items[productId] = 1;
            }
            localStorage.setItem("cart_items", JSON.stringify(state.items));
        },
        changeQuantity: (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
            const { productId, quantity } = action.payload;
            if (quantity > 0) {
                state.items[productId] = quantity;
            } else {
                delete state.items[productId];
                state.productsFullInfo = state.productsFullInfo.filter((el) => el.id !== productId);
            }
            localStorage.setItem("cart_items", JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            delete state.items[action.payload];
            state.productsFullInfo = state.productsFullInfo.filter((el) => el.id !== action.payload);
            localStorage.setItem("cart_items", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = {};
            state.productsFullInfo = [];
            localStorage.removeItem("cart_items");
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;