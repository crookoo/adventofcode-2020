const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8").split("\n").map((x) => x.split(""));

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        input[i][j] = input[i][j] === '#' ? 1 : 0;
    }
}

let cycles = 6;

// preparing 3d matrix with enough space to calculate cycles
let initW = 1 + 2 * cycles;
let initZ = 1 + 2 * cycles;
let initX = input[0].length + 2 * cycles;
let initY = input.length + 2 * cycles;
let matrix = create4dArray(initW, initZ, initX, initY);

// fill matrix with initial values
let zLevel = Math.floor(initZ / 2);
let wLevel = Math.floor(initW / 2);
let offset = cycles;

for (let j = 0; j < input.length; j++) {
    for (let k = 0; k < input[j].length; k++) {
        matrix[wLevel][zLevel][j + offset][k + offset] = input[j][k];
    }
}

// cycle through matrix
let tempMatrix = [];
let activeNeighbors = 0;
let valueOfCurrentCube = 0;

for (let c = 0; c < cycles; c++) {
    tempMatrix = create4dArray(initW, initZ, initX, initY); // create new empty matrix filled with zeros
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            for (let k = 0; k < matrix[i][j].length; k++) {
                for (let l = 0; l < matrix[i][j][k].length; l++) {
                    valueOfCurrentCube = matrix[i][j][k][l];
                    activeNeighbors = countActiveNeighbors(i, j, k, l, matrix);
                    switch (valueOfCurrentCube) {
                        case 1:
                            if (activeNeighbors === 2 || activeNeighbors === 3) tempMatrix[i][j][k][l] = 1;
                            break;
                        case 0:
                            if (activeNeighbors === 3) tempMatrix[i][j][k][l] = 1;
                            break;
                    };
                }
            }
        }
    }
    matrix = tempMatrix; // point matrix to resulting tempMatrix
}

console.log(countNumberIn4dArray(1, matrix));

// star2: 2296 correct, 1st try


//-- Helper functions --

function create4dArray(w, z, x, y) {
    return [...Array(w)].map(() => [...Array(z)].map(() => [...Array(x)].map(() => Array(y).fill(0))));
}


function countNumberIn4dArray(number, array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            for (let k = 0; k < array[i][j].length; k++) {
                for (let l = 0; l < array[i][j][k].length; l++) {
                    if (array[i][j][k][l] === number) result++;
                }
            }
        }
    }
    return result;
}

function countActiveNeighbors(w, i, j, k, array) {
    const neighborCoords = [
        [-1, -1, -1, -1], [-1, -1, -1, 0], [-1, -1, -1, 1], [-1, -1, 0, -1], [-1, -1, 0, 0], [-1, -1, 0, 1], [-1, -1, 1, -1], [-1, -1, 1, 0], [-1, -1, 1, 1],
        [-1, 0, -1, -1], [-1, 0, -1, 0], [-1, 0, -1, 1], [-1, 0, 0, -1], [-1, 0, 0, 0], [-1, 0, 0, 1], [-1, 0, 1, -1], [-1, 0, 1, 0], [-1, 0, 1, 1],
        [-1, 1, -1, -1], [-1, 1, -1, 0], [-1, 1, -1, 1], [-1, 1, 0, -1], [-1, 1, 0, 0], [-1, 1, 0, 1], [-1, 1, 1, -1], [-1, 1, 1, 0], [-1, 1, 1, 1],

        [0, -1, -1, -1], [0, -1, -1, 0], [0, -1, -1, 1], [0, -1, 0, -1], [0, -1, 0, 0], [0, -1, 0, 1], [0, -1, 1, -1], [0, -1, 1, 0], [0, -1, 1, 1],
        [0, 0, -1, -1], [0, 0, -1, 0], [0, 0, -1, 1], [0, 0, 0, -1], [0, 0, 0, 1], [0, 0, 1, -1], [0, 0, 1, 0], [0, 0, 1, 1],
        [0, 1, -1, -1], [0, 1, -1, 0], [0, 1, -1, 1], [0, 1, 0, -1], [0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, -1], [0, 1, 1, 0], [0, 1, 1, 1],

        [1, -1, -1, -1], [1, -1, -1, 0], [1, -1, -1, 1], [1, -1, 0, -1], [1, -1, 0, 0], [1, -1, 0, 1], [1, -1, 1, -1], [1, -1, 1, 0], [1, -1, 1, 1],
        [1, 0, -1, -1], [1, 0, -1, 0], [1, 0, -1, 1], [1, 0, 0, -1], [1, 0, 0, 0], [1, 0, 0, 1], [1, 0, 1, -1], [1, 0, 1, 0], [1, 0, 1, 1],
        [1, 1, -1, -1], [1, 1, -1, 0], [1, 1, -1, 1], [1, 1, 0, -1], [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 1, -1], [1, 1, 1, 0], [1, 1, 1, 1]
    ];
    let activeNeighbors = 0;

    for (let m = 0; m < neighborCoords.length; m++) {
        let neighborW = w + neighborCoords[m][0];
        let neighborLevel = i + neighborCoords[m][1];
        let neighborRow = j + neighborCoords[m][2];
        let neighborCol = k + neighborCoords[m][3];

        if (0 <= neighborW &&
            neighborW < array.length &&
            0 <= neighborLevel &&
            neighborLevel < array[0].length &&
            0 <= neighborRow &&
            neighborRow < array[0][0].length &&
            0 <= neighborCol &&
            neighborCol < array[0][0][0].length &&
            array[neighborW][neighborLevel][neighborRow][neighborCol] === 1
        ) {
            activeNeighbors++
        };
    }

    return activeNeighbors;
}