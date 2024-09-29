import React from 'react';
import '../styles/Category.css'; // Make sure to include this CSS file

const Category = () => {
  return (
    <div className="category-container">
      <ul className="category-list">
        <li className="category-item">Soft drink</li>
        <li className="category-item">Burger</li>
        <li className="category-item">Spaghetti</li>
        <li className="category-item">Pizza</li>
      </ul>
    </div>
  );
}

export default Category;
