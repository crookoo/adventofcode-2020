const parser = require('./input/inputParser');
const Game = require('./Game');
const input = parser.parse('input');

let cupGame = new Game(input, 0, 100);
cupGame.makeMoves();
console.log(cupGame.collectResultPartOne());

let cupGame2 = new Game(input, 0, 100);
cupGame2.makeMovesInplace();
console.log(cupGame2.collectResultPartOne());

// star1: 46978532 correct, 1st try