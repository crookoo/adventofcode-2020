const fs = require("fs");
const path = require("path");
let input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
    .split("\n")
    .map(x => [x.slice(0, 1), parseInt(x.slice(1))]);

const compassDirections = ['E', 'N', 'W', 'S'];
let currentDirectionIndex = 0;
let coordEast = 0;
let coordNorth = 0;
let manhattanDistance = 0;

function move(direction, value) {
    switch (direction) {
        case 'F':
            move(compassDirections[currentDirectionIndex], value);
            break;
        case 'E':
            coordEast += value;
            break;
        case 'N':
            coordNorth += value;
            break;
        case 'W':
            coordEast -= value;
            break;
        case 'S':
            coordNorth -= value;
            break;
    }
}

for (let i = 0; i < input.length; i++) {
    let currentType = input[i][0];
    let currentValue = input[i][1];
    let turns = 0;

    switch (currentType) {
        case 'L':
            turns = currentValue / 90;
            currentDirectionIndex = (currentDirectionIndex + turns % 4 + 4) % 4; // idea: https://stackoverflow.com/a/54427125
            break;
        case 'R':
            turns = currentValue / 90;
            currentDirectionIndex = (currentDirectionIndex - turns % 4 + 4) % 4;
            break;
        default:
            move(currentType, currentValue);
    }
}

manhattanDistance = Math.abs(coordEast) + Math.abs(coordNorth);
console.log(coordEast, coordNorth, manhattanDistance);

// star1: 1533 correct - 1st try