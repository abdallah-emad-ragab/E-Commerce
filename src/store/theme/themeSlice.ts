import { createSlice } from "@reduxjs/toolkit";

const savedTheme = JSON.parse(localStorage.getItem("isDarkMode") as string) || false;

if (savedTheme) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
} else {
    document.documentElement.setAttribute("data-bs-theme", "light");
}

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: savedTheme
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
            if (state.isDarkMode) {
                document.documentElement.setAttribute("data-bs-theme", "dark");
            } else {
                document.documentElement.setAttribute("data-bs-theme", "light");
            }
        }
    }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;