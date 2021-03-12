import { input } from './input.js';

// star1: 1179 correct
let acc = 0;
let index = 0;
let visitedIndexes = [];
let noLoopDetected = true;

while (noLoopDetected) {
    visitedIndexes.push(index);                 // remember index for loop detection

    if (input[index][0] === 'nop') {
        index++;
    }
    else if (input[index][0] === 'acc') {
        acc += input[index][1];
        index++;
    }
    else if (input[index][0] === 'jmp') {
        index += input[index][1];
    }

    if (visitedIndexes.indexOf(index) !== -1) noLoopDetected = false;
}

console.log(acc);

// star2: 1089 correct
acc = 0;
index = 0;
visitedIndexes = [];
let currentOperation = '';

outerLoop:
for (let i = 0; i < input.length; i++) {

    innerLoop:
    while (true) {
        currentOperation = input[index][0];
        visitedIndexes.push(index);

        if (index === i && currentOperation === 'nop') {    // swap operations one by one
            currentOperation = 'jmp';
        } else if (index === i && currentOperation === 'jmp') {
            currentOperation = 'nop';
        }

        if (currentOperation === 'nop') {
            index++;
        }
        else if (currentOperation === 'acc') {
            acc += input[index][1];
            index++;
        }
        else if (currentOperation === 'jmp') {
            index += input[index][1];
        }

        if (visitedIndexes.indexOf(index) !== -1) {     // found an infinite loop
            acc = 0;
            index = 0;
            visitedIndexes = [];
            break innerLoop;
        } else if (index === input.length - 1) {        // success! reached the last statement
            console.log(i, input[i]);                   // print the sinner index and statement
            break outerLoop;                            // leave while and outer for loop
        }
    }
}

console.log(acc);