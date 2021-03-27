const Player = require('./Player');

class Game {

    constructor(rawInput) {
        this.player1 = new Player(rawInput[0]);
        this.player2 = new Player(rawInput[1]);
    }

    playGame() {
        let cardPlayer1 = null;
        let cardPlayer2 = null;

        while(this.player1.cards.length && this.player2.cards.length) {
            cardPlayer1 = this.player1.cards.shift();
            cardPlayer2 = this.player2.cards.shift();
            if (cardPlayer1 > cardPlayer2) {
                this.player1.cards.push(cardPlayer1);
                this.player1.cards.push(cardPlayer2);
            } else if (cardPlayer1 < cardPlayer2) {
                this.player2.cards.push(cardPlayer2);
                this.player2.cards.push(cardPlayer1);
            } else {
                console.log("It's a draw!");
            }
        }

        if (this.player1.cards.length) {
            return this.player1.calculateScore();
        } else {
            return this.player2.calculateScore();
        }
    }
}

module.exports = Game;