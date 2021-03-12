import { input } from './input.js';
// const input = ['bright gray', [2, 'bright gold'], [5, 'dull lavender']]

// star1: 287 correct
let bagCollection = [];

function collectOuterBags(insideBagName) {
    for (let i = 0; i < input.length; i++) {
        if (input[i][1][0] !== 'no other') {
            for (let j = 1; j < input[i].length; j++) {
                if (input[i][j][1] === insideBagName) {
                    if (bagCollection.indexOf(input[i][0]) < 0) {   // if outer bag not yet in collection
                        bagCollection.push(input[i][0]);            // put outer bag in collection
                        collectOuterBags(input[i][0]);              // recursive lookup for outer bag
                    }
                }
            }
        }
    }
}

collectOuterBags('shiny gold');

//bagCollection.sort();
//console.log(bagCollection);
console.log(bagCollection.length);
//console.log(input.length);

// star2: 48160 correct
let bagSum = 0;

function countBagsInside(outerBagName, multiplier) {
    for (let i = 0; i < input.length; i++) {
        if (input[i][1][0] !== 'no other') {
            if (input[i][0] === outerBagName) {
                // console.log(input[i]);
                for (let j = 1; j < input[i].length; j++) {
                    bagSum += (multiplier * input[i][j][0]);
                    countBagsInside(input[i][j][1], multiplier * input[i][j][0])
                }
            }
        }
    }
}

countBagsInside('shiny gold', 1);
console.log(bagSum);