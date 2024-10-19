import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../redux/itemSlice';
import { useNavigate } from 'react-router-dom';

const ItemsForEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const items = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);

  // Fetch items when the component mounts
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Navigate to the Edit page
  const handleEdit = (id) => {
    navigate(`/items/edit/${id}`);
  };

  if (status === 'loading') {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>Error loading items: {error}</p>;
  }

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            {/* Edit button to navigate to Edit page */}
            <button onClick={() => handleEdit(item.id)} style={{ marginLeft: '10px' }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsForEdit;
