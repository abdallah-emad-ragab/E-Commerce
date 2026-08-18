import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/products";
import type { TError, TLoading } from "../../types/shared";

interface IWhishlistSlice {
    itemsId: number[];
    error: TError;
    productsFullInfo: TProduct[];
    isLoading: TLoading;
}

// Read saved items using the unified key
const items = localStorage.getItem("wishlist_items");
const initialItems: number[] = items ? JSON.parse(items) : [];

const initialState: IWhishlistSlice = {
    itemsId: initialItems,
    error: null,
    productsFullInfo: [],
    isLoading: "idle"
}

const whishSlice = createSlice({
    name: "whishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            if (state.itemsId.includes(productId)) {
                state.itemsId = state.itemsId.filter((id) => id !== productId);
                state.productsFullInfo = state.productsFullInfo.filter(
                    (product) => product.id !== productId
                );
            } else {
                state.itemsId.push(productId);
            }
            localStorage.setItem("wishlist_items", JSON.stringify(state.itemsId));
        },
        clearWhishlist: (state) => {
            state.itemsId = [];
            state.productsFullInfo = [];
            localStorage.removeItem("wishlist_items");
        }
    }
});

export const { toggleWishlist, clearWhishlist } = whishSlice.actions;
export default whishSlice.reducer;