const parser = require('./input/inputParser');
const FoodList = require('./FoodList');
const input = parser.parse('input');

let foodList = new FoodList(input);
let ingredientAllergenPair = foodList.findAndDeleteAllergens();
console.log(foodList.getTotalIngredientAmount());

// star1: 2072 correct, 1st try

let ingredientString = '';
ingredientAllergenPair.sort().forEach((pair) => {
    ingredientString += pair[1] + ',';
});
ingredientString = ingredientString.slice(0,-1);
console.log(ingredientString);

// star2: fdsfpg,jmvxx,lkv,cbzcgvc,kfgln,pqqks,pqrvc,lclnj correct, 1st try