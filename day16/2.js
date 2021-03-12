const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8").split("\n\n");

let rules = input[0].split("\n").map((x) => x.split(/: | or |-/));
for (let i = 0; i < rules.length; i++) {
    for (let j = 1; j < rules[0].length; j++) {
        rules[i][j] = parseInt(rules[i][j]);
    }
}

let yourTicket = input[1].split("\n");
yourTicket.shift(); // delete first element of array
yourTicket = yourTicket[0].split(",").map((x) => parseInt(x));

let nearbyTickets = input[2].split("\n");
nearbyTickets.shift();
nearbyTickets = nearbyTickets.map((x) => x.split(",").map((y) => parseInt(y)));

// find and delete invalid tickets
for (let i = nearbyTickets.length - 1; i >= 0; i--) {
    for (let j = nearbyTickets[i].length - 1; j >= 0; j--) {
        if (!checkTicketNumber(i, j)) {
            nearbyTickets.splice(i, 1);
            break;
        }
    }

}

function checkTicketNumber(i, j) {
    for (let k = 0; k < rules.length; k++) {
        if (nearbyTickets[i][j] >= rules[k][1] && nearbyTickets[i][j] <= rules[k][2]) return true;
        if (nearbyTickets[i][j] >= rules[k][3] && nearbyTickets[i][j] <= rules[k][4]) return true;
    }
    return false;
}

// find fields
let countCandidates = 0;
let currentColumn = 0;
let puzzleResult = 1;

for (let m = 0; m < nearbyTickets[0].length; m++) {
    for (let k = 0; k < rules.length; k++) {
        for (let i = 0; i < nearbyTickets[0].length; i++) {
            for (let j = 0; j < nearbyTickets.length; j++) {
                if (nearbyTickets[j][i] < rules[k][1]
                    || nearbyTickets[j][i] > rules[k][2] && nearbyTickets[j][i] < rules[k][3]
                    || nearbyTickets[j][i] > rules[k][4]) { // check if number is NOT in rule range
                    break;
                }
                if (j === nearbyTickets.length - 1) {
                    countCandidates++; // count candidates for that rule
                    currentColumn = i;
                }
            }
        }
        if (countCandidates === 1) { // only one candidate
            console.log(yourTicket[currentColumn], rules[k][0]);
            if (rules[k][0].startsWith("departure")) puzzleResult *= yourTicket[currentColumn];
            deleteColumn(currentColumn);
        }
        countCandidates = 0;
    }
}

console.log(puzzleResult);

// helper function to delete column in ticket arrays
function deleteColumn(j) {
    for (let i = 0; i < nearbyTickets.length; i++) {
        nearbyTickets[i].splice(j, 1);
    }
    yourTicket.splice(j, 1);
}

// star2: 1069784384303 correct, 1st try