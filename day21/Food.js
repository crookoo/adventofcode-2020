class Food {

    constructor(rawInput) {
        this.ingredients = rawInput[0].split(' ');
        this.allergens = rawInput[1].split(', ');
    }

}

module.exports = Food;