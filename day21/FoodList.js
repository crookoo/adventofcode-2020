const Food = require('./Food');

class FoodList {

    constructor(rawInput) {
        this.list = this.parse(rawInput);
    }

    parse(inputArray) {
        let foodList = [];
        inputArray.forEach((food) => {
            foodList.push(new Food(food));
        });
        return foodList;
    }

    findAndDeleteAllergens() {
        let foods = this.list;
        let ingredientList = [];
        let tempIngredientList = [];
        let ingredientAllergenPair = [];

        foods.forEach((food) => {
            food.allergens.forEach((allergen) => {

                // initially fill ingredient list
                ingredientList = food.ingredients;

                foods.forEach((compareFood) => {
                    compareFood.allergens.forEach((compareAllergen) => {

                        // if two foods have same allergens
                        if (allergen === compareAllergen) {

                            // look for and collect same ingredients
                            ingredientList.forEach((ingredient) => {
                                compareFood.ingredients.forEach((compareIngredient) => {
                                    if (ingredient === compareIngredient) {
                                        tempIngredientList.push(ingredient);
                                    }
                                });
                            });

                            // deep copy collected ingredient list for next comparison
                            ingredientList = JSON.parse(JSON.stringify(tempIngredientList));
                            tempIngredientList = [];
                        }

                    });
                });
                // at the end of the comparision: print out remaining ingredients
                if (ingredientList.length === 1) {
                    console.log(allergen, ingredientList);
                    ingredientAllergenPair.push([allergen, ingredientList[0]])
                    this.deleteFoundPair(allergen, ingredientList[0]);
                }
            });
        });
        return ingredientAllergenPair;
    }

    deleteFoundPair(lookupAllergen, lookupIngredient) {
        this.list.forEach((food) => {
            food.ingredients = food.ingredients.filter((ingredient) => ingredient !== lookupIngredient);
            food.allergens = food.allergens.filter((allergen) => allergen !== lookupAllergen);
        })
    }

    getTotalIngredientAmount() {
        let countIngredients = 0;
        this.list.forEach((food) => {
            countIngredients += food.ingredients.length;
        });
        return countIngredients;
    }
}

module.exports = FoodList;