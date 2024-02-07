

import {savedRecipes } from "../js/main.js";

// getRecipes takes one parameter the name that have been set local.storage.setItem
// parse the parameter then return it
export const getRecipes = function (key) {
    const value = JSON.parse(localStorage.getItem(key)) ?? []
    if(localStorage) {
        return value
    };
}
// getRecipes takes one parameter the name that have been set local.storage.setItem
const saveRecipes = function (key, value) {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}


// Set all the recipes from the LocalServer
export const addToRecipes = function (data, btn) {
const  parentDataset = btn.parentElement.parentElement.parentElement.dataset.id; 
  for (const item of data) {
    if (item.idMeal === parentDataset) {
            savedRecipes.
                unshift(
                        {
                            id: item.idMeal, 
                            mealName : item.strMeal, 
                            image : item.strMealThumb, 
                            city: item.strArea 
                        }
                    )
                    console.log(saveRecipes);
                    saveRecipes('recipes', savedRecipes)
    } 
      
  } 
   
}
