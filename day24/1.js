const parser = require('./input/inputParser');
const Floor = require('./Floor');
const input = parser.parse('input');

let floor = new Floor(input);
floor.handleTileList();
console.log(floor.countBlackTiles());

// star1: 394 correct, 1st try