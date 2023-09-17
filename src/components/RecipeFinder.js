import { useState } from "react";
import "./styles/styles.css";
import { useNavigate } from "react-router-dom";

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





  return (
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
          <div onClick={() =>{navigate(meal.idMeal)}} key={meal.key}>
          <h1>{meal.strMeal}</h1>
          {/* <p>{meal.strInstructions}, <strong>This is {meal.strArea} origin</strong></p> */}
          <img src={meal.strMealThumb} alt="meal"/>
          <span className="category">
          <h3>{meal.strCategory} {meal.strTags}, origin {meal.strArea}</h3>
          </span>
          </div>
         ))}
        </div>
    </div>
  );
}

export default RecipeFinder 