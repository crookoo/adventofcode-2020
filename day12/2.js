const fs = require("fs");
const path = require("path");
let input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
    .split("\n")
    .map(x => [x.slice(0, 1), parseInt(x.slice(1))]);

let coordEast = 0;
let coordNorth = 0;
let waypointEast = 10;
let waypointNorth = 1;
let manhattanDistance = 0;

function rotateWaypoint(direction, rotationInDegree) {
    let swapTemp = 0;
    let turns = rotationInDegree / 90;
    rotationIndex = ((direction * turns) % 4 + 4) % 4;
    switch (rotationIndex) {
        case 1: // turn 90° or -270°
            swapTemp = waypointEast; // temp variable for swapping values
            waypointEast = -waypointNorth;
            waypointNorth = swapTemp;
            break;
        case 2: // turn 180° or -180°
            waypointEast = -waypointEast;
            waypointNorth = -waypointNorth;
            break;
        case 3: // turn 270° or -90°
            swapTemp = waypointEast;
            waypointEast = waypointNorth;
            waypointNorth = -swapTemp;
            break;
        default: break;
    }
}

for (let i = 0; i < input.length; i++) {
    let currentType = input[i][0];
    let currentValue = input[i][1];

    switch (currentType) {
        case 'L':
            rotateWaypoint(1, currentValue);
            break;
        case 'R':
            rotateWaypoint(-1, currentValue);
            break;
        case 'F':
            coordEast += waypointEast * currentValue;
            coordNorth += waypointNorth * currentValue;
            break;
        case 'E':
            waypointEast += currentValue;
            break;
        case 'N':
            waypointNorth += currentValue;
            break;
        case 'W':
            waypointEast -= currentValue;
            break;
        case 'S':
            waypointNorth -= currentValue;
            break;
    }
    // console.log(waypointEast, waypointNorth, coordEast, coordNorth);
}

manhattanDistance = Math.abs(coordEast) + Math.abs(coordNorth);
console.log(coordEast, coordNorth, manhattanDistance);

// star2: 25235 correct - 1st try