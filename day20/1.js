const parser = require('./input/inputParser');
const Tile = require('./Tile');
const input = parser.parse('input');

let tiles = [];

let currentSearchEdges = [];
let currentCompareEdges = [];
let countMatches = 0;
let countNotMatchingEdges = 0;
let puzzleResult = 1;

// initialize tiles
input.forEach((element, i) => {
    tiles.push(new Tile(element[0], element[1]));
});

// search for matches
tiles.forEach((currentTile) => {
    currentSearchEdges = currentTile.getEdges();
    currentSearchEdges.forEach((currentEdge, i) => {
        tiles.forEach((compareTile) => {
            currentCompareEdges = compareTile.getEdges();
            currentCompareEdges.forEach((compareEdge) => {
                if (currentEdge === compareEdge && currentTile.id !== compareTile.id) countMatches++;
            });
        });
        if (countMatches === 0) countNotMatchingEdges++; // found edge with no match
        countMatches = 0;
    });
    if (countNotMatchingEdges === 4) puzzleResult *= currentTile.id; // if tile has 4 edges without match -> corner tile
    countNotMatchingEdges = 0;
});

console.log(puzzleResult);

// star1: 18449208814679 correct, 1st try