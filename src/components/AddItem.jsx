import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/itemSlice';
import { fetchCategories, addCategory } from '../redux/categorySlice';
import { fetchIngredients, addNewIngredient } from '../redux/ingredientSlice';
import '../styles/AddItemForm.css';

const AddItemForm = () => {
    const [itemData, setItemData] = useState({ name: '', category: '', price: '', ingredients: [] });
    const [file, setFile] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newIngredientName, setNewIngredientName] = useState('');
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const status = useSelector((state) => state.categories.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
            dispatch(fetchIngredients());
        }
    }, [status, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem({ item: itemData, file }));
    };

    const handleAddCategory = () => {
        if (newCategoryName) {
            dispatch(addCategory({ name: newCategoryName, mainCategory: itemData.mainCategory }));
            setNewCategoryName('');
        }
    };

    const handleAddIngredient = () => {
        if (newIngredientName) {
            dispatch(addNewIngredient({ name: newIngredientName }));
            setNewIngredientName('');
        }
    };

    const handleIngredientToggle = (ingredient) => {
        setItemData((prevState) => {
            const isSelected = prevState.ingredients.includes(ingredient);
            return {
                ...prevState,
                ingredients: isSelected
                    ? prevState.ingredients.filter((i) => i !== ingredient)
                    : [...prevState.ingredients, ingredient],
            };
        });
    };

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <input 
                type="text" 
                placeholder="Item Name" 
                value={itemData.name} 
                onChange={(e) => setItemData({ ...itemData, name: e.target.value })} 
                className="input-item-name"
            />
            <select 
                value={itemData.category} 
                onChange={(e) => {
                    if (e.target.value === "new-category") {
                        setNewCategoryName('');
                    }
                    setItemData({ ...itemData, category: e.target.value });
                }} 
                className="select-category"
            >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))}
                <option value="new-category">Add New Category</option>
            </select>
            {itemData.category === "new-category" && (
                <div className="add-category-container">
                    <input 
                        type="text" 
                        placeholder="New Category Name" 
                        value={newCategoryName} 
                        onChange={(e) => setNewCategoryName(e.target.value)} 
                        className="input-new-category"
                    />
                    <select 
                        value={itemData.mainCategory} 
                        onChange={(e) => setItemData({ ...itemData, mainCategory: e.target.value })} 
                        className="select-main-category"
                    >
                        <option value="" disabled>Select Main Category</option>
                        <option value="Food">Food</option>
                        <option value="Drink">Drink</option>
                    </select>
                    <button type="button" onClick={handleAddCategory} className="btn-add-category">
                        Add Category
                    </button>
                </div>
            )}
            <div className="ingredients-selection">
                <h4>Select Ingredients:</h4>
                {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="ingredient-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={itemData.ingredients.includes(ingredient.name)} 
                                onChange={() => handleIngredientToggle(ingredient.name)} 
                            />
                            {ingredient.name}
                        </label>
                    </div>
                ))}
                <div className="add-ingredient-container">
                    <input 
                        type="text" 
                        placeholder="New Ingredient Name" 
                        value={newIngredientName} 
                        onChange={(e) => setNewIngredientName(e.target.value)} 
                        className="input-new-ingredient"
                    />
                    <button type="button" onClick={handleAddIngredient} className="btn-add-ingredient">
                        Add Ingredient
                    </button>
                </div>
            </div>
            <input 
                type="number" 
                placeholder="Price" 
                value={itemData.price} 
                onChange={(e) => setItemData({ ...itemData, price: e.target.value })} 
                className="input-price"
            />
            <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} 
                className="input-file-upload"
            />
            <button type="submit" className="btn-add-item">Add Item</button>
        </form>
    );
};

export default AddItemForm;
