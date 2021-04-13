const parser = require('./input/inputParser');
const Game = require('./GameMap');
const input = parser.parse('input');

let cupGame = new Game(input, 1000000, 10000000);
cupGame.makeMoves();
console.log(cupGame.collectResultPartTwo());

// star2: 163035127721 correct
// solution works with circular linked list inside a map / runtime: 3.17s