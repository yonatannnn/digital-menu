import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemSlice";
import categoryReducer from "./categorySlice";

const store =  configureStore({
    reducer: {
        items: itemReducer,
        categories: categoryReducer
    }
});

export default store;
