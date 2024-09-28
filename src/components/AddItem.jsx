import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/itemSlice';

const AddItem = () => {
    const [item, setItem] = useState({
        name: '',
        price: '',
        ingredients: '',
        category: ''
    });

    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.items);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Split ingredients by commas to create an array
        const formattedItem = {
            ...item,
            ingredients: item.ingredients.split(',').map((ing) => ing.trim())
        };
        // Dispatch the addItem thunk to add an item to Firebase
        dispatch(addItem(formattedItem));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={item.name} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="price" 
                placeholder="Price" 
                value={item.price} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="ingredients" 
                placeholder="Ingredients (comma separated)" 
                value={item.ingredients} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="category" 
                placeholder="Category" 
                value={item.category} 
                onChange={handleChange} 
            />
            <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Adding...' : 'Add Item'}
            </button>
            {status === 'failed' && <p>Error: {error}</p>}
        </form>
    );
};

export default AddItem;
