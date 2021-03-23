const parser = require('./input/inputParser');
const PuzzleMap = require('./Map');
const Tile = require('./Tile');

const input = parser.parse('input');

let puzzleMap = new PuzzleMap(input);  // fill map with tiles
puzzleMap.findMatchingsAndRotate();    // initial matching and in place rearranging
// puzzleMap.printArrangedTiles();        // print map to see it tiles fit
console.log(puzzleMap.solvePartOne());

// star1: 18449208814679 correct, 1st try

// parse map as single tile in order to perform tile methods on it
let wholePictureTile = new Tile('0', puzzleMap.convertArrangedTilesToString()); 
console.log(wholePictureTile.solvePartTwo());

// star2: 1559 correct, 3rd try