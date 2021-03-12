console.time();
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8").split("\n");
const inputArray = [];

// parse data
for (let i = 0; i < input.length; i++) {
    if (input[i][1] === 'a') {
        let tempArray = ['mask', input[i].slice(7).split("")];
        inputArray.push(tempArray);
    } else if (input[i][1] === 'e') { // filter mem -> second character is 'e'
        let memoryInput = input[i].split(" ");
        let memoryBinaryValue = parseInt(memoryInput[2]).toString(2); // parse to binary representation
        let memoryBinary = `00000000000000000000000000000000000${memoryBinaryValue}`.slice(-36); // fill zeros from left
        let memoryBinaryArray = memoryBinary.split("");
        let memoryArray = [parseInt(memoryInput[0].slice(4, -1)), memoryBinaryArray];
        inputArray.push(memoryArray);
    }
}

// console.log(inputArray);

let currentBitmask = [];
let currentMemoryAddress = 0;
let currentMemoryValue = [];
let memoryMap = new Map();
let sumAllValues = 0;


for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][0] === 'mask') {
        currentBitmask = inputArray[i][1];
    } else {
        currentMemoryAddress = inputArray[i][0];
        currentMemoryValue = inputArray[i][1];
        for (let j = 0; j < currentBitmask.length; j++) {
            switch (currentBitmask[j]) {
                case "1":
                    currentMemoryValue[j] = "1";
                    break;
                case "0":
                    currentMemoryValue[j] = "0";
                    break;
            }
        }
        let currentValue = currentMemoryValue.join('');
        currentValue = parseInt(currentValue, 2);
        memoryMap.set(currentMemoryAddress, currentValue); // save value in map
    }
}

memoryMap.forEach((key) => sumAllValues += key);

// console.log(memoryMap);
console.log(sumAllValues);
console.timeEnd();

// star1: 11612740949946 correct
