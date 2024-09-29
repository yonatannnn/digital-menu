// src/redux/itemsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems, getItemById, getItemsByCategory, addItem as addFirebaseItem } from "../services/item";

// Thunks to handle async operations with Firebase
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
    const items = await getItems();
    return items;
});

export const fetchItemById = createAsyncThunk("items/fetchItemById", async (id) => {
    const item = await getItemById(id);
    return item;
});

export const fetchItemsByCategory = createAsyncThunk("items/fetchItemsByCategory", async (category) => {
    const items = await getItemsByCategory(category);
    return items;
});

export const addItem = createAsyncThunk("items/addItem", async ({ item, file }) => {
    const itemId = await addFirebaseItem(item, file);
    return itemId;
});


// Items slice
const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        item: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetchItems
        builder.addCase(fetchItems.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        });
        builder.addCase(fetchItems.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

        // fetchItemById
        builder.addCase(fetchItemById.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchItemById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.item = action.payload;
        });
        builder.addCase(fetchItemById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

        // fetchItemsByCategory
        builder.addCase(fetchItemsByCategory.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchItemsByCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        });
        builder.addCase(fetchItemsByCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

        // addItem
        builder.addCase(addItem.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items.push(action.payload);
        });        
        builder.addCase(addItem.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export default itemsSlice.reducer;
