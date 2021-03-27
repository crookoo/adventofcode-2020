const parser = require('./input/inputParser');
const Game = require('./Game');
const input = parser.parse('input');

let crabGame = new Game(input);

console.log(crabGame.playGame());

// star1: 35370 correct, 1st try