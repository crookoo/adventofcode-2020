import { input } from './input.js';

// start 1: 21806024 correct
let foundMatch = false;
for (let k = 25; k < input.length; k++) {

    innerLoop:
    for (let i = k - 25; i < k; i++) {
        for (let j = i + 1; j < k; j++) {
            if (input[i] + input[j] === input[k]) {
                foundMatch = true;
                break innerLoop;
            }
        }
    }

    if (!foundMatch) console.log(input[k]);
    foundMatch = false;
}

// star2: 2986195 correct
const searchValue = 21806024;
let sumRange = 2;
let checkSum = 0;
let resultSet = [];
let result = 0;

outerLoop:
while (true) {
    for (let i = 0; i <= input.length - sumRange; i++) {
        for (let j = i; j < i + sumRange; j++) {
            checkSum += input[j];
        }
        if (checkSum === searchValue) {
            for (let k = i; k < i + sumRange; k++) {
                resultSet.push(input[k]);
            }
            resultSet.sort((a, b) => a - b);
            result = resultSet[0] + resultSet[resultSet.length - 1];
            break outerLoop;
        }
        checkSum = 0;
    }
    sumRange++;
}

console.log(result);