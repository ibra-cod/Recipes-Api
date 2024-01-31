import {addToRecipes, getRecipes} from "../js/recipes.js";

// Variables declarations 
const popUp = document.getElementById('popUp')
export const savedRecipes =  getRecipes('recipes');

// console.log(savedRecipes);

export const flashMessages = function (message, cssTag) {
    const flashMessage = document.getElementById('flashMessage')

     flashMessage.innerHTML =
             `
                 <div class="${cssTag}"> 
                     <p> ${message}</p>
                 </div>
             `
 
   
        setTimeout(() => {
           
            flashMessage.style.display = 'none';
         }, 4000);
           
 }



// Display all the Food Data
const displayAllFoods = function (food,savedRecipes) {

   const containerCards = document.querySelector('.containerCards')
    if (food) {
    containerCards.innerHTML = '';
        for (const value of food) {
             containerCards.innerHTML += 
             `
                 <div class="cardContainer" data-id="${value.idMeal}">
                     <div class="cardDivImage">
                         <img src="${value.strMealThumb}" class id="imgFood" alt="">
                     </div>
                     <div class="info meal">
                        <div class="info> <p>${value.strMeal}</p> 
                            <p> ${value.strArea} </p> 
                        </div>
                        <div class="info> <p>${value.strMeal}</p> </div>
                     </div>
                       <div class="div-btns"> 
                        <button class="ViewMore" type="button"> View more </button>
                        <button id="btn_view" class="btnView" type="button" href="../viewMore.html"> Save recipe </button>
                       </div
                 </div>
             `

     }
    } 
        const btn_view = document.querySelectorAll('.btnView');
        // btn_view.forEach(x => {
        //     x.addEventListener('click' , function () {
        //         addToRecipes(food, x)
        //          flashMessages('Your recipe have been added success fully','alert-success')
        //     })
        // });

        btn_view.forEach(x => {
            x.addEventListener('click' , function () {
                        addToRecipes(food, x)
                        flashMessages('Your recipe have been added success fully','alert-success')
            })
        });

        const viewMore = document.querySelectorAll('.ViewMore')
        viewMore.forEach(btn => btn.addEventListener('click' , function () {
            const  grandParentDataset = btn.parentElement.parentElement.dataset.id; 
            hidePopUp(popUp, grandParentDataset, food)
        }));

       
           

        



} 

const displayPopUp = function (popUp,grandParentDataset, food) {
            popUp.innerHTML = '';
            if (food !== undefined ) {
                for (const value of food) {
                    if (value.idMeal == grandParentDataset) {
                        popUp.innerHTML = 
                        `
                          <div class=imageContainer> 
                                <img class="img" src="${value.strMealThumb}">
                          </div> 
                          <div class=ingrediantsContainer> 
                                <h3>Ingredients<h3>
                               <ul> 
                                    <li> ${value.strIngredient1} </li>
                                    <li> ${value.strIngredient2} </li>
                                    <li> ${value.strIngredient3} </li>
                                    <li> ${value.strIngredient4} </li>
                                    <li> ${value.strIngredient5} </li>
                                    <li> ${value.strIngredient6} </li>
                                    <li> ${value.strIngredient7} </li>
                                    <li> ${value.strIngredient8} </li>
                                    <li> ${value.strIngredient9} </li>
                               </ul>
                          </div>
    
                          <div class=ingrediantsContainer> 
                                <h3>Measure<h3>
                               <ul> 
                                    <li> ${value.strMeasure1} </li>
                                    <li> ${value.strMeasure2} </li>
                                    <li> ${value.strMeasure3} </li>
                                    <li> ${value.strMeasure4} </li>
                                    <li> ${value.strMeasure5} </li>
                                    <li> ${value.strMeasure6} </li>
                                    <li> ${value.strMeasure7} </li>
                                    <li> ${value.strMeasure8} </li>
                                    <li> ${value.strMeasure9} </li>
                               </ul>
                          </div>
    
                            <div>
                            <img  class="imgPopUp" id="imagePopUp" src="./images/close.png" alt="">
                            </div>
                        `
                    }
    
                }
            }

            const imagePopUp = document.getElementById('imagePopUp')

            if (imagePopUp !== null) {
                imagePopUp.addEventListener('click', function () {
                    hidePopUp(popUp)
                })
            }

}

const hidePopUp = function (popUp, grandParentDataset, food) {

        if (popUp) {
            displayPopUp(popUp, grandParentDataset, food)
        }
        else  {
            popUp.parentElement.style.display = "none"
        }
}





const getDataWithInput = function (savedRecipes) {
    let input = document.getElementById("myInput");
    if (input) {
        input.addEventListener('keyup' , function  () {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(r => r.json())
            .then(data => displayAllFoods(data.meals,savedRecipes))

        })

        input.value = ""
    }  
}


getDataWithInput(savedRecipes)


const displayAllSavedRecipes = function (data) {
    const cardContainer = document.getElementById('savedElements')
    cardContainer.innerHTML = ''
    if (data.length === 0 || data.length < 1 ) {
        console.log('You have no saved Recipes');
    }

    for (const key of data) {
       cardContainer.innerHTML += 
       `
       <div class="elements-save" class="clickable"> 
            <div class="cardDivImage">
                <img id="imgFood" class="img clickable" src="${key.image}" alt="">
            </div>
            <div class="infoMeal">
                <p id="p" >${key.mealName}</p>
                <p>description</p>
            </div>
       </div>
        
       `
    }

}

displayAllSavedRecipes(savedRecipes)




















