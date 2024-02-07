import {addToRecipes, getRecipes} from "../js/recipes.js";

// Variables declarations 
const popUp = document.getElementById('popUp')
export const savedRecipes =  getRecipes('recipes');
console.log(savedRecipes);

const flashMessages = function (message, cssTag, timer = 2000) {
    const flashMessage = document.getElementById('flashMessage')
     flashMessage.innerHTML =
             `
                 <div class="${cssTag}"> 
                     <p> ${message}</p>
                 </div>
             `
            setTimeout(() => {
                flashMessage.style.display = 'none';
         }, timer);
         flashMessage.style.display = 'block';

 }


// Display all the Food Data
const displayAllFoods = function (food) {

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
                        <div class="infoMeal2">
                            <p>${value.strMeal}</p> 
                            <p> ${value.strArea} </p> 
                        </div>
                        <div class="info> <p>${value.strMeal}</p> </div>
                    </div>
                    <div class="div-btns"> 
                        <button class="ViewMore" type="button"> View more </button>
                        <button id="btn_view" class="btnView" type="button" href="../viewMore.html"> Save recipe 
                        </button>
                    </div>
                </div>
             `
     }
    } 
        const btn_view = document.querySelectorAll('.btnView');
        // btn_view.forEach(x => {
        //     // console.log(x.parentElement.parentElement.parentElement.dataset);
        //     x.addEventListener('click' , function () {
        //         console.log(x.parentElement.parentElement.parentElement);
        //         addToRecipes(food, x)
        //          flashMessages('Your recipe have been added success fully','alert-success')
        //     })
        // });

        btn_view.forEach(x => {
            const parentElement = x.parentElement.parentElement.parentElement.dataset
            console.log(parentElement);
            x.addEventListener('click' , function () {
                const result = savedRecipes.filter(item => item.id === parentElement)
                if (result == false) {
                    addToRecipes(food, x)
                    flashMessages('Added Succesfully !' , 'alert-success', 1000)
                } else {
                    flashMessages(' Already Added !' , 'alert-danger', 1000)
                }
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
                                    <p>${value.mealName}" </p>
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
    const savedElements = document.getElementById('savedElements')
    if (savedElements) {
        savedElements.innerHTML = ''
   

    for (const key of data) {
        savedElements.innerHTML += 
       `
       <div id="elementSaved" class="elements-save" data-id="${key.id}" > 
            <div class="cardDivImage">
                <img id="imgFood" class="img clickable" src="${key.image}" alt="">
            </div>
            <div class="infoMeal">
                <div class="info">
                    <p id="p" >${key.mealName}</p>
                </div>
                <div class="info">
                    <p></p>
                </div>
                <div class="info">
                    <button id='BtnInfo' class='infoBtn'> see more </button>
                </div>
            </div>
            </div>
            
       </div>
        
       `
    }
    }
    // const BtnInfo = document.getElementById('BtnInfo')
    // const elementSaved = document.getElementById('elementSaved')
    // const elementSavedDataset = elementSaved.parentElement.parentElement.dataset.id
}

displayAllSavedRecipes(savedRecipes)




















