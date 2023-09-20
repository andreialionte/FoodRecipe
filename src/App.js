import './App.css';
import React from 'react';
import RecipeFinder from './components/RecipeFinder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeInfo from './components/RecipeInfo';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         <Route index element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipeFinder" element={<RecipeFinder />} />
          <Route path="/recipeFinder/:idMeal" element={<RecipeInfo />}  />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
