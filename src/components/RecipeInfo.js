import React, { useEffect, useState} from "react";
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
}
)
    




return(
    <React.Fragment>
     <div className="RecipeInfo">
        {show.map((meal) =>(
            <div>
                            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb} alt={meal.strMeal}/>
            <div className="pp">
            <p>{meal.strInstructions}</p>
            </div>
            <div classnName="ingredients">
            <h3 >{meal.strIngredient1} {meal.strMeasure1}</h3>
            <h3>{meal.strIngredient2} {meal.strMeasure2}</h3>
            <h3>{meal.strIngredient3} {meal.strMeasure3}</h3>
            <h3>{meal.strIngredient4} {meal.strMeasure4}</h3>
            <h3>{meal.strIngredient5} {meal.strMeasure5}</h3>
            <h3>{meal.strIngredient6} {meal.strMeasure6}</h3>
            <h3>{meal.strIngredient7} {meal.strMeasure7}</h3>
            <h3>{meal.strIngredient8} {meal.strMeasure8}</h3>
            <h3>{meal.strIngredient9} {meal.strMeasure9}</h3>
            <h3>{meal.strIngredient10} {meal.strMeasure10}</h3>
            <h3>{meal.strIngredient11} {meal.strMeasure11}</h3>
            <h3>{meal.strIngredient12} {meal.strMeasure12}</h3>
            <h3>{meal.strIngredient13} {meal.strMeasure13}</h3>
            <h3>{meal.strIngredient14} {meal.strMeasure14}</h3>
            <h3>{meal.strIngredient15} {meal.strMeasure15}</h3>
            <h3>{meal.strIngredient16} {meal.strMeasure16}</h3>
            <h3>{meal.strIngredient17} {meal.strMeasure17}</h3>
            <h3>{meal.strIngredient18} {meal.strMeasure18}</h3>
            <h3>{meal.strIngredient19} {meal.strMeasure19}</h3>
            <h3>{meal.strIngredient20} {meal.strMeasure20}</h3>
            </div>

            <iframe src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`} title="YouTube video player" allow="autoplay; fullscreen"></iframe>
            </div>

        ))}
     </div>
    </React.Fragment>
)
}


export default RecipeInfo;