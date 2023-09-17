import './App.css';
import React from 'react';
import RecipeFinder from './components/RecipeFinder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeInfo from './components/RecipeInfo';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipeFinder />} />
          <Route path="/:idMeal" element={<RecipeInfo />}  />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
