const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8").split("\n");
const inputArray = [];

const create2dArray = (rows, columns) =>
    [...Array(rows)].map(() => Array(columns).fill(null));

// parse data
for (let i = 0; i < input.length; i++) {
    if (input[i][1] === 'a') {
        let maskArray = ['mask', input[i].slice(7)]; // cut away first 7 chars
        inputArray.push(maskArray);
    } else if (input[i][1] === 'e') { // filter mem -> second character is 'e'
        let memoryInput = input[i].split(" ");
        let addressBinary = parseInt(memoryInput[0].slice(4, -1)).toString(2); // parse address to binary representation
        let addressFullBinary = `00000000000000000000000000000000000${addressBinary}`.slice(-36); // fill zeros from left
        let memoryArray = [addressFullBinary, parseInt(memoryInput[2])];
        inputArray.push(memoryArray);
    }
}

// console.log(inputArray);

let currentBitmask = [];
let numberOfX = 0;
let listOfMemoryAddresses;
let currentMemoryAddress = '';
let currentMemoryValue = 0;
let divider = 1;
let memoryMap = new Map();
let sumAllValues = 0;


for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][0] === 'mask') {
        currentBitmask = inputArray[i][1];
        numberOfX = (currentBitmask.match(new RegExp("X", "g")) || []).length;
        numberOfX = 2 ** numberOfX;
        listOfMemoryAddresses = create2dArray(numberOfX, currentBitmask.length); // prepare 2d array to hold memory addresses
    } else {
        currentMemoryAddress = inputArray[i][0];
        currentMemoryValue = inputArray[i][1];

        for (let j = 0; j < currentBitmask.length; j++) {
            for (let k = 0; k < numberOfX; k++) { // fill 2d array
                switch (currentBitmask[j]) {
                    case "1":
                        listOfMemoryAddresses[k][j] = "1";
                        break;
                    case "0":
                        listOfMemoryAddresses[k][j] = currentMemoryAddress[j];
                        break;
                    case "X":
                        if (Math.floor(k / divider) % 2 === 0) {
                            listOfMemoryAddresses[k][j] = "0";
                        } else {
                            listOfMemoryAddresses[k][j] = "1";
                        }
                        break;
                }
            }
            if (currentBitmask[j] === "X") divider *= 2; // if current bitmask was X -> set new divider (similar to truth table)
        }

        divider = 1; // reset divider

        // write value to all memory addresses
        for (let j = 0; j < listOfMemoryAddresses.length; j++) {
            memoryMap.set((parseInt(listOfMemoryAddresses[j].join(''), 2)), currentMemoryValue);
        }

    }
}

memoryMap.forEach((key) => sumAllValues += key);

// console.log(memoryMap);
console.log(sumAllValues);

// star2: 3394509207186 correct (1st try)