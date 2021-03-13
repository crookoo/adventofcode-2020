const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
    .split("\n\n")
    .map(group => group.split("\n"));

// alternative solution
// source: https://github.com/AxemaFr/AdventOfCode-2020/blob/master/day-06/solution.js
let positiveCount = 0;
input.forEach(group => (positiveCount += new Set(group.join('')).size));

console.log(positiveCount);