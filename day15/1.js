console.time();
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8").split(",").map((x) => parseInt(x));

console.log(input);

const finalTurn = 2020;
// const finalTurn = 30000000;
let turn = 0;
let memoryMap = new Map();
let lastNumber = 0;
let lastValues = [];
let lastOccurence = null;
let currentNumber = 0;

// fill memory with starting numbers
for (let j = 0; j < input.length; j++) {
    turn++;
    memoryMap.set(input[j], [turn, null]);
    lastNumber = input[j];
}

// make turns
while (turn < finalTurn) {
    turn++;

    lastValues = memoryMap.get(lastNumber);
    currentNumber = lastValues[1] === null ? 0 : lastValues[0] - lastValues[1];
    lastOccurence = memoryMap.has(currentNumber) ? memoryMap.get(currentNumber)[0] : null;

    memoryMap.set(currentNumber, [turn, lastOccurence]);
    lastNumber = currentNumber;
}

// console.log(memoryMap);
console.log(lastNumber);
console.timeEnd();

// star1: 211 correct, 1st try
// star2: 2159626 -> algorithm was good enough to calculate this straight away