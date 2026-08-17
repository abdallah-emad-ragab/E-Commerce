import { categories } from "../data/categories";
import { products } from "../data/products";
import { users } from "../data/users";

export const initialData = (): void => {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    // if (!localStorage.getItem("categories")) {
    //     localStorage.setItem("categories", JSON.stringify(categories));
    // }
    // if (!localStorage.getItem("products")) {
    //     localStorage.setItem("products", JSON.stringify(products));
    // }
}