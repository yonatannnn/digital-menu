import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/itemSlice';

const AddItemForm = () => {
    const [itemData, setItemData] = useState({ name: '', category: '' });
    const [file, setFile] = useState(null); // To handle image file
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem({ item: itemData, file }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Item Name" 
                value={itemData.name} 
                onChange={(e) => setItemData({ ...itemData, name: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Category" 
                value={itemData.category} 
                onChange={(e) => setItemData({ ...itemData, category: e.target.value })} 
            />
            <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} // Select file to upload
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItemForm;
