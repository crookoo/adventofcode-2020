const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8").split("\n");
const earliestTimestamp = input[0];
const busIds = input[1].split(",").filter(x => { return x != "x" });

let nextDeparture = 0;
let bestDistance = 0;
let bestBusId = 0;
let puzzleResult = 0;

for (let i = 0; i < busIds.length; i++) {
    nextDeparture = busIds[i] - earliestTimestamp % busIds[i];
    if (i === 0 || nextDeparture < bestDistance) {
        bestDistance = nextDeparture;
        bestBusId = busIds[i];
    }

}

puzzleResult = bestDistance * bestBusId;
console.log(bestDistance, bestBusId, puzzleResult);

// star1: 3865 correct - 1st attempt