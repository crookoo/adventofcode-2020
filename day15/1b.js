console.time();
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8").split(",").map((x) => parseInt(x));

console.log(input);

const finalTurn = 2020;
// const finalTurn = 30000000;
let turn = 0;
let currentValues = [];
let memoryMap = new Map();
let nextNumber = 0;
let lastOccurence = null;

// fill memory with starting numbers
for (let startingNumber of input) {
    turn++;
    currentValues = [turn, null];
    memoryMap.set(startingNumber, currentValues);
}

// make turns
while (turn < finalTurn) {
    turn++;

    nextNumber = currentValues[1] === null ? 0 : currentValues[0] - currentValues[1];
    lastOccurence = memoryMap.has(nextNumber) ? memoryMap.get(nextNumber)[0] : null;

    currentValues = [turn, lastOccurence];

    memoryMap.set(nextNumber, currentValues);
}

// console.log(memoryMap);
console.log(nextNumber);
console.timeEnd();

// star1: 211 correct, 1st try
// star2: 2159626 -> algorithm was good enough to calculate this straight away