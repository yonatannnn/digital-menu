// src/App.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import EditDeleteItem from './components/EditDeleteItem';
import ItemsList from './components/ItemList';
import itemSlice from './redux/itemSlice';
import ItemsForEdit from './components/ItemsForEdit';
import Intro from './components/Intro';
import MainCategory from './components/MainCategory';
import Category from './components/Category';

function App() {
  return (
    <div className="App">
      <Intro />
      <MainCategory />
      <Category />
      <ItemsList />
    </div>
  );
}

export default App;
