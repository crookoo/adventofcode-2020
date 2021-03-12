import { input } from './input.js';

//const input = [['abc', 'abd']]

// star1: 6633 correct
let countSums = 0;
let answerSet = '';
let sumSet = 0;

for (let i = 0; i < input.length; i++) {                    // iterate over groups
    for (let j = 0; j < input[i].length; j++) {             // iterate over persons
        for (let k = 0; k < input[i][j].length; k++) {      // iterate over answers (single letters)
            if (answerSet.indexOf(input[i][j][k]) < 0) {    // check if answer is in set of collected answers
                sumSet++;                                   // if answer is new -> count new answer
                answerSet += input[i][j][k];                // remember answer as collected
            }
        }
    }
    countSums += sumSet;    // add sum of group answers to global sum
    answerSet = '';         // empty set of answers of a group
    sumSet = 0;             // empty sum of answers of a group
}

console.log(countSums);

// star2: 3202 correct
let tempSet = '';
countSums = 0;
answerSet = '';
sumSet = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (j > 0) {                                            // if group has more than one person
            sumSet = 0;                                         // reset sum of group
            for (let k = 0; k < input[i][j].length; k++) {      // iterate over single letters of persons answer
                if (answerSet.indexOf(input[i][j][k]) >= 0) {   // check if answer existed before
                    sumSet++;                                   // count group answer
                    tempSet += input[i][j][k];                  // remember answer in temp set
                }
            }
            answerSet = tempSet;                                // update answer list
            tempSet = '';                                       // reset temp set for next person
        } else if (j === 0) {
            answerSet = input[i][j];                            // initial set of answers
            sumSet = input[i][j].length;
        }
    }
    countSums += sumSet;                                        // add sum of group answers to global sum
}

console.log(countSums);