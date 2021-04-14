const parser = require('./input/inputParser');
const Floor = require('./Floor');
const input = parser.parse('input');

let floor = new Floor(input, 100);
floor.handleTileList();
console.log(floor.countBlackTiles());

// star1: 394 correct, 1st try

floor.checkAndFlipTiles(100);
console.log(floor.countBlackTiles());

// star2: 4036 correct, 1st try