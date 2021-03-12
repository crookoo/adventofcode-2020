const fs = require("fs");
const path = require("path");
let input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8").split("\n").map(x => x.split(''));
let inputCopy = JSON.parse(JSON.stringify(input)); // deep copy of input
const neighborCoords = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

const inputRows = input.length;
const inputCols = input[0].length;

function noOccupied(i, j) {
    for (let k = 0; k < neighborCoords.length; k++) {
        let neighborRow = i + neighborCoords[k][0];
        let neighborCol = j + neighborCoords[k][1];

        if (
            0 <= neighborRow &&
            neighborRow < inputRows &&
            0 <= neighborCol &&
            neighborCol < inputCols &&
            input[neighborRow][neighborCol] === '#'
        ) {
            return false;
        }
    }
    return true;
}

function atLeastFourOccupied(i, j) {
    let occupiedNeighbors = 0;
    
    for (let k = 0; k < neighborCoords.length; k++) {
        let neighborRow = i + neighborCoords[k][0];
        let neighborCol = j + neighborCoords[k][1];

        if (
            0 <= neighborRow &&
            neighborRow < inputRows &&
            0 <= neighborCol &&
            neighborCol < inputCols &&
            input[neighborRow][neighborCol] === '#'
        ) {
            occupiedNeighbors++;
            if (occupiedNeighbors >= 4) return true;
        }
    }
    return false;
}

function print2dArray(array) {
    for (let i = 0; i < array.length; i++) {
        row = '';
        for (let j = 0; j < array[0].length; j++) {
            row += array[i][j];
        }
        console.log(row);
    }
}

let occupiedSeats = 0;
let lastMoveOccupiedSeats = 0;

while (true) {
    for (let i = 0; i < inputRows; i++) {
        for (let j = 0; j < inputCols; j++) {
            if (input[i][j] === "L" && noOccupied(i, j)) {
                inputCopy[i][j] = "#";
                occupiedSeats++;
            } else if (input[i][j] === "#") {
                if (atLeastFourOccupied(i, j)) {
                    inputCopy[i][j] = "L";
                } else {
                    occupiedSeats++;
                }
            }
        }
    }

    if (occupiedSeats - lastMoveOccupiedSeats === 0) { 
        break; 
    }

    lastMoveOccupiedSeats = occupiedSeats;
    occupiedSeats = 0;
    input = JSON.parse(JSON.stringify(inputCopy));
}

console.log(occupiedSeats);

// star1: 2720 + 2719 too high | 2699 wrong | 2321 correct

// alternative check method:
// equal method from https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript