const parser = require('./input/inputParser');
const input = parser.parse('input');

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

// star2: 362464596624526 correct, 1st try


//-- Helper functions --

function handleBracket(currentExpression, start, end) {
    let result = calculate(currentExpression, start + 1, end - 1);
    currentExpression.splice(start, end - start + 1, result);
}

function calculate(currentExpression, start, end) {
    let tempExpression = JSON.parse(JSON.stringify(currentExpression));
    let result = parseInt(tempExpression[start]);
    let plusDone = false;

    whileloop:
    while (true) {

        forloop:
        for (let i = start + 1; i < end; i += 2) {
            switch (tempExpression[i]) {
                case '+':
                    result += parseInt(tempExpression[i + 1]);
                    if (i === end - 1 && end - start < 3) break whileloop;
                    tempExpression.splice(i - 1, 3, result);
                    result = parseInt(tempExpression[start]);
                    end -= 2;
                    break forloop;
                case '*':
                    if (plusDone) {
                        result *= parseInt(tempExpression[i + 1]);
                        if (i === end - 1) break whileloop;
                    } else {
                        result = parseInt(tempExpression[i + 1]);
                    }
                    if (i === end - 1) {
                        plusDone = true;
                        result = parseInt(tempExpression[start]);
                    }
                    break;
            }
        }
    }

    return result;
}