import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getCategoryById, addCatagory } from "../services/category";

const initialState = {
    categories: [],
    category: {},
    status: 'idle',
    error: null
};

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const categories = await getCategories();
    return categories;
});

export const fetchCategoryById = createAsyncThunk("categories/fetchCategoryById", async (id) => {
    const category = await getCategoryById(id);
    return category;
});

export const addCategory = createAsyncThunk("categories/addCategory", async (category) => {
    const categoryId = await addCatagory(category);
    return { ...category, id: categoryId };
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.category = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default categorySlice.reducer;