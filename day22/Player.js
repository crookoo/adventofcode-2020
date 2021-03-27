class Player {
    initialCardStack = [];

    constructor(rawInput) {
        let input = rawInput.split(':\n');
        this.name = input[0];
        this.cards = input[1].split('\n').map((card) => parseInt(card));
    }

    calculateScore() {
        let score = 0;
        let multiplier = 1;
        for (let i = this.cards.length - 1; i >= 0; i--) {
            score += this.cards[i] * multiplier;
            multiplier++;
        }
        return score;
    }
}

module.exports = Player;