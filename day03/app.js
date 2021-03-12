import { input } from './input.js';

// star1: 257 correct
let sum3 = 0;

for (let i = 1; i < input.length; i++) {
    sum3 += parseInt(input[i][(i*3) % 31]);
    // console.log(input[i], i, i*3, (i*3)%31, input[i][(i*3) % 31]);
}

console.log(sum3);

// start2: 1744787392 correct
let sum1 = 0;
let sum5 = 0;
let sum7 = 0;
let sum2 = 0;
let result = 0;

for (let i = 1; i < input.length; i++) {
    sum1 += parseInt(input[i][(i) % 31]);
    sum5 += parseInt(input[i][(i*5) % 31]);
    sum7 += parseInt(input[i][(i*7) % 31]);
}

for (let i = 1; i < input.length / 2; i++) {
    sum2 += parseInt(input[i*2][i % 31]);
}

result = sum1 * sum3 * sum5 * sum7 * sum2;
console.log(result);
