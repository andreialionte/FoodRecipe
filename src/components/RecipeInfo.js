import React, { Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./RecipeInfo.css";

const RecipeInfo = () => {

    const { idMeal } = useParams();    const [show, setShow] = useState([])


useEffect(() => {
    const fetchData = async() => {

        
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        const options = {
            method: "GET",
        }
        try{
            const response = await fetch(url, options);
            const data = await response.json();
            const { meals } = data;
            if (meals) {
                setShow(meals);
              }
        }
        catch(error){
            console.log(error);
            
        }
         console.log(show);
    }
    fetchData();
}, [idMeal])
    



return(
    <Fragment>
     <div className="RecipeInfo">
        {show.map((meal) =>(
            <div>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h1>{meal.strMeal}</h1>
            <p>{meal.strInstructions}</p>
            <p>{meal.strArea}</p>
            <iframe src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`} title="YouTube video player" allow="autoplay; fullscreen"></iframe>
            </div>

        ))}
     </div>
    </Fragment>
)
}


export default RecipeInfo;