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
yourTicket.shift(); // delete label
yourTicket = yourTicket[0].split(",").map((x) => parseInt(x));

let nearbyTickets = input[2].split("\n");
nearbyTickets.shift();
nearbyTickets = nearbyTickets.map((x) => x.split(",").map((y) => parseInt(y)));

let errorRate = 0;

// iterate over all nearby tickets and find invalid numbers
for (let i = 0; i < nearbyTickets.length; i++) {
    for (let j = 0; j < nearbyTickets[i].length; j++) {
        if (!checkTicketNumber(i, j)) errorRate += nearbyTickets[i][j]; // if in no range add number to error rate
    }

}

console.log(errorRate);

// check if ticket number is in any of the rules ranges
function checkTicketNumber(i, j) {
    for (let k = 0; k < rules.length; k++) {
        if (nearbyTickets[i][j] >= rules[k][1] && nearbyTickets[i][j] <= rules[k][2]) return true;
        if (nearbyTickets[i][j] >= rules[k][3] && nearbyTickets[i][j] <= rules[k][4]) return true;
    }
    return false;
}

// star1: 18142 correct, 1st try