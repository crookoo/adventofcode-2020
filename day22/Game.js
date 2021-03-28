const Player = require('./Player');

class Game {

    constructor(rawInput) {
        this.player1 = new Player(rawInput[0]);
        this.player2 = new Player(rawInput[1]);
    }

    playGameOne() {
        let cardPlayer1 = null;
        let cardPlayer2 = null;

        while (this.player1.cards.length && this.player2.cards.length) {
            cardPlayer1 = this.player1.cards.shift();
            cardPlayer2 = this.player2.cards.shift();
            if (cardPlayer1 > cardPlayer2) {
                this.player1.cards.push(cardPlayer1);
                this.player1.cards.push(cardPlayer2);
            } else if (cardPlayer1 < cardPlayer2) {
                this.player2.cards.push(cardPlayer2);
                this.player2.cards.push(cardPlayer1);
            }
        }

        if (this.player1.cards.length) {
            return 'Player 1 wins with ' + this.player1.calculateScore() + ' points.';
        } else {
            return 'Player 2 wins with ' + this.player2.calculateScore() + ' points.';
        }
    }

    playGameTwo() {
        if (this.playSubgame(this.player1.cards, this.player2.cards)) {
            return 'Player 1 wins with ' + this.player1.calculateScore() + ' points.';
        } else {
            return 'Player 2 wins with ' + this.player2.calculateScore() + ' points.';
        }
    }

    playSubgame(player1Cards, player2Cards) {
        let cardPlayer1 = null;
        let cardPlayer2 = null;
        let stackHistory = [];
        let currentStackConfiguration = '';

        while (player1Cards.length && player2Cards.length) {

            // termination condition
            currentStackConfiguration = player1Cards.join() + '-' + player2Cards.join();
            if (stackHistory.indexOf(currentStackConfiguration) === -1) {
                stackHistory.push(currentStackConfiguration);
            } else {
                return true;
            }

            // draw cards
            cardPlayer1 = player1Cards.shift();
            cardPlayer2 = player2Cards.shift();

            if (player1Cards.length >= cardPlayer1 && player2Cards.length >= cardPlayer2) {
                // new recursive game
                let player1SubgameCards = JSON.parse(JSON.stringify(player1Cards.slice(0, cardPlayer1)));
                let player2SubgameCards = JSON.parse(JSON.stringify(player2Cards.slice(0, cardPlayer2)));
                if (this.playSubgame(player1SubgameCards, player2SubgameCards)) {
                    player1Cards.push(cardPlayer1);
                    player1Cards.push(cardPlayer2);
                } else {
                    player2Cards.push(cardPlayer2);
                    player2Cards.push(cardPlayer1);
                };
            } else {
                if (cardPlayer1 > cardPlayer2) {
                    player1Cards.push(cardPlayer1);
                    player1Cards.push(cardPlayer2);
                } else if (cardPlayer1 < cardPlayer2) {
                    player2Cards.push(cardPlayer2);
                    player2Cards.push(cardPlayer1);
                }
            }
        }

        if (player1Cards.length) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Game;