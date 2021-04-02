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

let cupGame3 = new Game(input, 1000000, 100);
cupGame3.makeMoves();
console.log(cupGame3.collectResultPartTwo());

let cupGame4 = new Game(input, 1000000, 100);
cupGame4.makeMovesInplace();
console.log(cupGame4.collectResultPartTwo());

// star2: attempt to slow