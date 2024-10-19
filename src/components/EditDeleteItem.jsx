import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById, updateItem, deleteItem } from '../redux/itemSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditDeleteItem = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector((state) => state.items.item);
  const status = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);

  const [formValues, setFormValues] = useState({
    name: '',
    ingredients: '',
    price: 0,
  });

  // Fetch the item data on component mount
  useEffect(() => {
    
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  // Update form values when item is loaded
  useEffect(() => {
    if (item) {
      setFormValues({
        name: item.name || '',
        ingredients: item.ingredients || '',
        price: item.price || 0,
      });
    }
  }, [item]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission for updating the item
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({ id, item: formValues })).then(() => {
      // Navigate to a different route after success (e.g., item list)
      navigate('/items');
    });
  };

  // Handle item deletion
  const handleDelete = () => {
    dispatch(deleteItem(id)).then(() => {
      // Navigate to a different route after deletion
      navigate('/items');
    });
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ingredients</label>
          <textarea
            name="description"
            value={formValues.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Item</button>
      </form>

      <button onClick={handleDelete} style={{ marginTop: '20px', color: 'red' }}>
        Delete Item
      </button>
    </div>
  );
};

export default EditDeleteItem;
