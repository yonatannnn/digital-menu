// src/redux/itemsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems, getItemById, getItemsByCategory, addItem as addFirebaseItem, updateItem as editFirebaseItem, deleteItem as deleteFirebaseItem } from "../services/item";

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

export const updateItem = createAsyncThunk("items/editItem", async ({ id, item }) => {
    const updatedItem = await editFirebaseItem(id, item);
    return updatedItem;
});

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
    await deleteFirebaseItem(id);
    return id;
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

        // editItem
        builder.addCase(updateItem.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(updateItem.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        });
        builder.addCase(updateItem.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

        // deleteItem
        builder.addCase(deleteItem.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = state.items.filter(item => item.id !== action.payload);
        });
        builder.addCase(deleteItem.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export default itemsSlice.reducer;
