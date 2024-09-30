import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemSlice";
import categoryReducer from "./categorySlice";
import ingredientReducer from "./ingredientSlice";

const store =  configureStore({
    reducer: {
        items: itemReducer,
        categories: categoryReducer,
        ingredients: ingredientReducer
    }
});

export default store;
