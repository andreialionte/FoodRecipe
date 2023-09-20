import { useState } from "react";
import "./styles/styles.css";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { auth } from "./auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";



const RecipeFinder = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchData = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;



    try {
      const response = await fetch(url);
      setIsLoading(true);
      if(!response.ok){
        throw new Error("Something went wrong");
      }
      const data  = await response.json();
      const { meals } = data;

      if(!meals){
        throw new Error("No meal found");
      }

      setError(null); // Reset error state

      console.log(meals);
      setMeals(meals);
    } catch (error) {
      setError(error.message)
      console.log(error);
    }
    setIsLoading(false);
  };

  const serachHandler = (event) => {
    setSearchTerm(event.target.value);
  }

  const handlerKeyPress = (event) => {
    if(event.key === "Enter"){
      fetchData();
    }
  }


const loading = isLoading && <div>Loading...</div>

const navigate = useNavigate();
const [user] = useAuthState(auth); // what this do "?" is if user is null, it will not throw an error


  return (
    <React.Fragment>
      <div>
        <h1>Hello, {user && user.displayName ? user.displayName : "Guest"}</h1>
      </div>
    <div className="Meal">
      <h1>Meal Finder</h1>
      <input
        type="text"
        placeholder="Search for meals or keywords"
        onChange={serachHandler}
        onKeyPress={handlerKeyPress}
      />
      <button onClick={fetchData}>Search</button>
      {error && <h1>{error}</h1>}
      {/* when searchTerm is empty, dont run fetchData */}
      {serachHandler.length === 0 && false}
      {loading}
      <div className="meal-position">
         {meals.map((meal) =>(
          <div>
          <h1>{meal.strMeal}</h1>
          <img src={meal.strMealThumb} alt="meal" onClick={() => {navigate(meal.idMeal)}} key={meal.key} />
          <span className="category">
          <h3>{meal.strCategory} {meal.strTags}, origin {meal.strArea}</h3>
          </span>
          </div> 
         ))} 
        </div>
    </div>
    </React.Fragment>
  );
}

export default RecipeFinder 