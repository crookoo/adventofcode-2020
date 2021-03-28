const parser = require('./input/inputParser');
const Game = require('./Game');
const input = parser.parse('input');

let crabGame = new Game(input);
console.log(crabGame.playGameOne());

// star1: 35370 correct, 1st try

let recursiveGame = new Game(input);
console.log(recursiveGame.playGameTwo());

// star2: 34051 too low, 36246 correct, 2nd try