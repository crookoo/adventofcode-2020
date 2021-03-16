const array = require('lodash/array');
const parser = require('./input/inputParser');
const input = parser.parse('input-part2-test2');

const rules = input[0].split("\n").map((rule) => rule.split(/: | \| /g));
const messages = input[1].split("\n").map((message) => message.split(""));


// save terminating rules separately
let terminatingRules = array.remove(rules, (rule) => rule[1][0] === '"');
terminatingRules.forEach((rule) => rule[1] = rule[1].replace(/"/g, '')); // remove " from string

// split rules if more than one right side
rules.forEach((rule) => {
    if (rule.length === 3) {
        rules.push([rule[0], rule[2]])
        rule.pop();
    }
});

// check for chain rules
rules.forEach((rule) => {
 if (!(/ /.test(rule[1]))) console.log("Chain rule!")
});


console.log(rules);
console.log(terminatingRules);

let puzzleResult = 0;
let messageNumber = 0;
const messageTotal = messages.length;
let wordLength = 0;
let table = null;
let fieldOneArray = '';
let fieldTwoArray = '';
let combination = '';
let messageString = '';

messages.forEach((message) => {
    messageNumber++;
    messageString = message.join('');
    wordLength = message.length;
    table = create3dArray(wordLength, wordLength, 0);

    // CYK algorithm: first line
    for (let i = 0; i < wordLength; i++) {
        terminatingRules.forEach((terminal) => {
            if (message[i] === terminal[1]) table[0][i].push(terminal[0]);
        });
    };

    // CYK algorithm: line 2-n
    for (let i = 1; i < wordLength; i++) {
        for (let j = 0; j < wordLength - i; j++) {
            for (let k = 0; k < i; k++) {
                fieldOneArray = table[k][j];
                fieldTwoArray = table[i - (k + 1)][j + (k + 1)];
                fieldOneArray.forEach((fieldOne) => {
                    fieldTwoArray.forEach((fieldTwo) => {
                        combination = fieldOne + " " + fieldTwo;
                        rules.forEach((rule) => {
                            if (combination === rule[1]) table[i][j].push(rule[0]);
                        });
                    });
                });
            }
        }
    }

    if (table[wordLength - 1][0][0] === '0') {
        puzzleResult++;
    }
    console.log(messageNumber + "/" + messageTotal, puzzleResult, messageString);

    fieldOneArray = '';
    fieldTwoArray = '';
    combination = '';
});

console.log(puzzleResult);

// star1: 136 too low | 224 correct, 2nd try
// star2: 436 correct - algorithm worked also for the changed rules

//-- Helper function: create 3d array with no prefilling
function create3dArray(x, y, z) {
    return [...Array(x)].map(() => [...Array(y)].map(() => Array(z)));
}