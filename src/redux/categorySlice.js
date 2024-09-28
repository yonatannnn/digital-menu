import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    category: {},
    status: 'idle',
    error: null
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchCategories: (state) => {
            state.status = 'loading';
        },
        fetchCategoriesSuccess: (state, action) => {
            state.status = 'succeeded';
            state.categories = action.payload;
        },
        fetchCategoriesFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        fetchCategoryById: (state) => {
            state.status = 'loading';
        },
        fetchCategoryByIdSuccess: (state, action) => {
            state.status = 'succeeded';
            state.category = action.payload;
        },
        fetchCategoryByIdFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        addCategory: (state) => {
            state.status = 'loading';
        },
        addCategorySuccess: (state) => {
            state.status = 'succeeded';
        },
        addCategoryFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure, fetchCategoryById, fetchCategoryByIdSuccess, fetchCategoryByIdFailure, addCategory, addCategorySuccess, addCategoryFailure } = categorySlice.actions;

export default categorySlice.reducer;