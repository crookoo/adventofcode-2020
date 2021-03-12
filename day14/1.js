console.time();
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8").split("\n");
const inputArray = [];

// parse data
for (let i = 0; i < input.length; i++) {
    if (input[i][1] === 'a') {
        let tempString = input[i].slice(7).split("");
        let setBitmask = "";
        let clearBitmask = "";
        let offsetBitmask = 0;
        for (let j = 0; j < tempString.length; j++) {
            switch (tempString[j]) {
                case 'X':
                    setBitmask += "0";
                    clearBitmask += "1";
                    break;
                case '1':
                    setBitmask += "1";
                    clearBitmask += "1"
                    break;
                case '0':
                    setBitmask += "0";
                    clearBitmask += "0";
            }
        }
        offsetBitmask = setBitmask.slice(0,6);
        offsetValue = parseInt(offsetBitmask, 2);
        setBitmask = setBitmask.slice(6);
        clearBitmask = clearBitmask.slice(6);
        let tempArray = ['mask', parseInt(setBitmask, 2), parseInt(clearBitmask, 2), offsetValue]
        inputArray.push(tempArray);
    } else if (input[i][1] === 'e') {
        let tempString = input[i].split(" ");
        let tempArray = [parseInt(tempString[0].slice(4, -1)), parseInt(tempString[2])];
        inputArray.push(tempArray);
    }
}

// console.log(inputArray);

let currentSetBitmask = 0;
let currentClearBitmask = 0;
let currentOffsetValue = 0;
let currentMemoryAddress = 0;
let currentValue = 0;
let memoryMap = new Map();
let sumAllValues = 0;

for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][0] === 'mask') {
        currentSetBitmask = inputArray[i][1];
        currentClearBitmask = inputArray[i][2];
        currentOffsetValue = inputArray[i][3] * (2**30); // multiply by 2^30 because they represent the most significant bits
    } else {
        currentMemoryAddress = inputArray[i][0];
        currentValue = inputArray[i][1];
        currentValue |= currentSetBitmask;   // apply set mask (1)
        currentValue &= currentClearBitmask; // apply clear mask (0)
        currentValue += currentOffsetValue;  // add first 6 bits of mask
        memoryMap.set(currentMemoryAddress, currentValue); // save value in map
    }
}

memoryMap.forEach((key) => sumAllValues += key);

// console.log(memoryMap);
console.log(sumAllValues);
console.timeEnd();

// star1: 132293367738 too low, 385696438202 too low, 11876881438650 too high, 11612740949946 correct

// Helper function to find the hightest value: 
// result is that the highest value 893494359 has only 30 bits: 110101010000011010010001010111
// => the first 6 bits of a certain value always come from the bit mask
// => we can use binary operations for the 30 remaining bits

let biggestInput = 0;
for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][0] !== 'mask') {
        if (inputArray[i][1] > biggestInput) {
            biggestInput = inputArray[i][1];
        }
    }
}
console.log(biggestInput);