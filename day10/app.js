const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8')
    .split('\n')
    .sort((a, b) => a - b)
    .map(x => +x)
    .slice(0,31);
    // .slice(30,64);
    // .slice(63);

// star1: 1998 correct
// let lastRating = 0;
// let count1JoltDifference = 0;
// let count3JoltDifference = 0;
// let result = 0;

// for (let i = 0; i < input.length; i++) {
//     if (input[i] - lastRating === 1) count1JoltDifference++;
//     if (input[i] - lastRating === 3) count3JoltDifference++;
//     lastRating = input[i];
// }

// result = count1JoltDifference * (count3JoltDifference + 1);
// input.unshift(0);
console.log(input);
console.log(input.length);
// console.log(count1JoltDifference, count3JoltDifference, result);

// start2: 19208*38416*470596 = 347.250.213.298.688 correct
const lastElement = input[input.length - 1];
console.log(lastElement);
let countPossibilities = 0;


function check(nextIndex) {
    for (let i = nextIndex; i < nextIndex + 3; i++) {
        // let foundIndex = input.indexOf(nextIndex);

        if (input.indexOf(i) >= 0) {
            if (i === lastElement) {
                countPossibilities++;
            } else {
                check(i + 1);
            }
        }
    }
}

check(1);
// check(47);
// check(98);

// let multiplier = 0;
// let tempMultiplier = 0;

// for (let i = 0; i < input.length; i++) {
//     for (let j = 1; j <= 3; j++) {
//         let numberToCheck = input[i] + j;
//         if (input.indexOf(numberToCheck) >= 0) {
//             tempMultiplier++;
//         }
//     }
//     if (tempMultiplier === 3) {
//         multiplier += 4;
//     } else if (tempMultiplier === 2) {
//         multiplier += 2;
//     } else if (tempMultiplier === 1) {
//         multiplier += 0;
//     }
//     tempMultiplier = 0;
// }

console.log(countPossibilities);