import { input } from './input.js';

// F:0 B:1
// L:0 R:1

// star1: 871 correct
let seatIds = [];

for (let i = 0; i < input.length; i++) {
    let binaryString = input[i].replace(/F|L/g, 0).replace(/B|R/g, 1);
    let row = parseInt(binaryString.slice(0,7), 2);
    let col = parseInt(binaryString.slice(-3), 2);
    let seatID = row * 8 + col;
    seatIds.push(seatID);
}

seatIds.sort((a, b) => a-b);
console.log(seatIds[seatIds.length - 1]);

// star2: 640 correct
for (let i = 0; i < seatIds.length; i++) {
    if (seatIds[i + 1] - seatIds[i] === 2) {
        console.log(seatIds[i] + 1);
    }
}
