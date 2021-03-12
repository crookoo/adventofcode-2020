import { input } from './input.js';

// star1: 439 correct
let sum = 0;
for (let i = 0; i < input.length; i++) {
    let searchPattern = input[i][2];
    let regEx = new RegExp(searchPattern, "g");
    let foundChars = input[i][3].match(regEx);
    foundChars = foundChars === null ? 0 : foundChars.length; // if none found: parse null to 0
    if (input[i][0] <= foundChars && foundChars <= input[i][1]) sum++;
}

// star2: 584 correct
let sum2 = 0;
for (let i = 0; i < input.length; i++) {
    let firstPos = input[i][0];
    let secondPos = input[i][1];
    let charToCompare = input[i][2];
    let wordToCheck = input[i][3];

    let firstPosTrue = wordToCheck[firstPos-1] === charToCompare;
    let secondPosTrue = wordToCheck[secondPos-1] === charToCompare;

    // XOR
    if ( firstPosTrue ? !secondPosTrue : secondPosTrue ) sum2++;
}

console.log(sum);
console.log(sum2);