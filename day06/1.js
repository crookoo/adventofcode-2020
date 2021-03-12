const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
    .split("\n\n")
    .map(group => group.split("\n"));

// alternative solution
let positiveCount = 0;
input.forEach(group => (positiveCount += new Set(group.join('')).size));

console.log(positiveCount);