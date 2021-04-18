const parser = require('./input/inputParser');
const input = parser.parse('input');

console.log(input);

const cardPublicKey = input[0];
const doorPublicKey = input[1];
let value = 1;
let subjectNumber = 7;
const divider = 20201227;
let counter = 0;
let cardLoopSize = 0;
let doorLoopSize = 0;
let cardsLoopSizeNotFound = true;
let doorsLoopSizeNotFound = true;

while (cardsLoopSizeNotFound || doorsLoopSizeNotFound) {
    counter++;
    value = value * subjectNumber;
    value = value % divider;
    if (value === cardPublicKey) {
        cardLoopSize = counter;
        cardsLoopSizeNotFound = false;
    }
    if (value === doorPublicKey) {
        doorLoopSize = counter;
        doorsLoopSizeNotFound = false;
    }
}

console.log('Cards loop size: ' + cardLoopSize);
console.log('Doors loop size: ' + doorLoopSize);

function calculateEncyptionKey(loopSize, otherPublicKey) {
    let value = 1;
    let subjectNumber = otherPublicKey;
    const divider = 20201227;

    for (let i = 0; i < loopSize; i++) {
        value = value * subjectNumber;
        value = value % divider;
    }

    return value;
}

console.log(calculateEncyptionKey(cardLoopSize, doorPublicKey));
console.log(calculateEncyptionKey(doorLoopSize, cardPublicKey));

// star1: 11576351 correct, 1st try