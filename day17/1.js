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
let initZ = 1 + 2 * cycles;
let initX = input[0].length + 2 * cycles;
let initY = input.length + 2 * cycles;
let matrix = create3dArray(initZ, initX, initY);

// fill matrix with initial values
let zLevel = Math.floor(initZ / 2);
let offset = cycles;

for (let j = 0; j < input.length; j++) {
    for (let k = 0; k < input[j].length; k++) {
        matrix[zLevel][j + offset][k + offset] = input[j][k];
    }
}

// cycle through matrix
let tempMatrix = [];
let activeNeighbors = 0;
let valueOfCurrentCube = 0;

for (let c = 0; c < cycles; c++) {
    tempMatrix = create3dArray(initZ, initX, initY); // create new empty matrix filled with zeros
    // print3dArray(matrix);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            for (let k = 0; k < matrix[i][j].length; k++) {
                valueOfCurrentCube = matrix[i][j][k];
                activeNeighbors = countActiveNeighbors(i, j, k, matrix);
                switch (valueOfCurrentCube) {
                    case 1:
                        if (activeNeighbors === 2 || activeNeighbors === 3) tempMatrix[i][j][k] = 1;
                        break;
                    case 0:
                        if (activeNeighbors === 3) tempMatrix[i][j][k] = 1;
                        break;
                };
            }
        }
    }
    matrix = tempMatrix; // point matrix to resulting tempMatrix
}

print3dArray(matrix);
console.log(countNumberIn3dArray(1, matrix));

// star1: 395 correct, 1st try


//-- Helper functions --

function create3dArray(z, x, y) {
    return [...Array(z)].map(() => [...Array(x)].map(() => Array(y).fill(0)));
}

function print3dArray(array) {
    let level = - Math.floor(array.length / 2);
    for (let i = 0; i < array.length; i++) {
        console.log(`${level}:`)
        for (let j = 0; j < array[i].length; j++) {
            let row = '';
            for (let k = 0; k < array[i][j].length; k++) {
                row += array[i][j][k];
            }
            console.log(row);
        }
        console.log()
        level++;
    }
}

function countNumberIn3dArray(char, array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            for (let k = 0; k < array[i][j].length; k++) {
                if (array[i][j][k] === char) result++;
            }
        }
    }
    return result;
}

function countActiveNeighbors(i, j, k, array) {
    const neighborCoords = [
        [-1, -1, -1], [-1, -1, 0], [-1, -1, 1], [-1, 0, -1], [-1, 0, 0], [-1, 0, 1], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1],
        [0, -1, -1], [0, -1, 0], [0, -1, 1], [0, 0, -1], [0, 0, 1], [0, 1, -1], [0, 1, 0], [0, 1, 1],
        [1, -1, -1], [1, -1, 0], [1, -1, 1], [1, 0, -1], [1, 0, 0], [1, 0, 1], [1, 1, -1], [1, 1, 0], [1, 1, 1]
    ];
    let activeNeighbors = 0;

    for (let m = 0; m < neighborCoords.length; m++) {
        let neighborLevel = i + neighborCoords[m][0];
        let neighborRow = j + neighborCoords[m][1];
        let neighborCol = k + neighborCoords[m][2];

        if (0 <= neighborLevel &&
            neighborLevel < array.length &&
            0 <= neighborRow &&
            neighborRow < array[0].length &&
            0 <= neighborCol &&
            neighborCol < array[0][0].length &&
            array[neighborLevel][neighborRow][neighborCol] === 1
        ) {
            activeNeighbors++
        };
    }

    return activeNeighbors;
}