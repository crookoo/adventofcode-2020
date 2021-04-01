const parser = require('./input/inputParser');
const Game = require('./Game');
const input = parser.parse('input-test');

let cupGame = new Game(input, 0, 10);
cupGame.makeMoves();
console.log(cupGame.collectResultPartOne());

// star1: 46978532 correct, 1st try

// let cupGame2 = new Game(input, 1000000, 100000);
// cupGame2.makeMoves();
// console.log(cupGame2.collectResultPartTwo());