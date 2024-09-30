// redux/ingredientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients, addIngredient } from "../services/ingredient";

const initialState = {
    ingredients: [],
    status: 'idle',
    error: null
};

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
    const ingredients = await getIngredients();
    return ingredients;
});

export const addNewIngredient = createAsyncThunk("ingredients/addNewIngredient", async (ingredient) => {
    const ingredientId = await addIngredient(ingredient);
    return { ...ingredient, id: ingredientId };
});

const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewIngredient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewIngredient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients.push(action.payload);
            })
            .addCase(addNewIngredient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default ingredientSlice.reducer;
