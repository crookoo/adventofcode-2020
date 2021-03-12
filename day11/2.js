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
        let multiplier = 1;

        while (true) {
            let neighborRow = i + neighborCoords[k][0] * multiplier;
            let neighborCol = j + neighborCoords[k][1] * multiplier;

            if (
                0 <= neighborRow &&
                neighborRow < inputRows &&
                0 <= neighborCol &&
                neighborCol < inputCols
            ) {
                if (input[neighborRow][neighborCol] === '#') {
                    return false;
                } else if (input[neighborRow][neighborCol] === 'L') {
                    break;
                }
            } else {
                break; // coordinates are no longer in grid
            }
            multiplier++;
        }
    }
    return true;
}

function atLeastFiveOccupied(i, j) {
    const minimumOccupied = 5;
    let occupiedNeighbors = 0;
    let multiplier = 1;

    for (let k = 0; k < neighborCoords.length; k++) {
        while (true) {
            let neighborRow = i + neighborCoords[k][0] * multiplier;
            let neighborCol = j + neighborCoords[k][1] * multiplier;

            if (
                0 <= neighborRow &&
                neighborRow < inputRows &&
                0 <= neighborCol &&
                neighborCol < inputCols
            ) {
                if (input[neighborRow][neighborCol] === '#') {
                    occupiedNeighbors++;
                    if (occupiedNeighbors >= minimumOccupied) return true;
                    break;
                } else if (input[neighborRow][neighborCol] === 'L') {
                    break;
                }
            } else {
                break; // coordinates are no longer in grid
            }
            multiplier++;
        }
        multiplier = 1;
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
    console.log("------------------");
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
                if (atLeastFiveOccupied(i, j)) {
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

// star2: 499 too low | 2102 correct
