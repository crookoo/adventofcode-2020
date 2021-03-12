const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
    .replace(/ /g, "")
    .split("\n")
    .map((x) => x.split(""));


let lastBracketOpen = null;
let sum = 0;

for (let j = 0; j < input.length; j++) {

    whileloop:
    while (true) { // loop through expression until no more brackets exist

        forloop:
        for (let i = 0; i < input[j].length; i++) {
            switch (input[j][i]) {
                case '(':
                    lastBracketOpen = i;
                    break;
                case ')':
                    handleBracket(input[j], lastBracketOpen, i);
                    lastBracketOpen = null;
                    break forloop;
                default:
                    if (i === input[j].length - 1) {
                        sum += calculate(input[j], 0, input[j].length - 1);
                        break whileloop;
                    }
            }
        }
    }
}

console.log(sum);

// star1: 69490582260 correct, 1st try


function handleBracket(currentExpression, start, end) {
    let result = calculate(currentExpression, start + 1, end - 1);
    currentExpression.splice(start, end - start + 1, result);
}

function calculate(currentExpression, start, end) {
    let result = parseInt(currentExpression[start]);
    for (let i = start + 1; i < end; i += 2) {
        switch (currentExpression[i]) {
            case '+':
                result += parseInt(currentExpression[i + 1]);
                break;
            case '*':
                result *= parseInt(currentExpression[i + 1]);
                break;
        }
    }
    return result;
}