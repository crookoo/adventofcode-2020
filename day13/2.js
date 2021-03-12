const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8").split("\n");
const busIds = input[1].split(",");

const busIdArray = [];
for (let i = 0; i < busIds.length; i++) {
    if (busIds[i] !== 'x') {
        busIdArray.push([i, parseInt(busIds[i])]);

    }
}

console.log(busIdArray);

let n = 0;
let step = 1;
let nextStep = 0;

whileloop:
while (true) {

    forloop:
    for (let i = nextStep; i < busIdArray.length; i++) {

        if ((n + busIdArray[i][0]) % busIdArray[i][1] === 0) {
            if (i === busIdArray.length - 1) {  // termination condition
                console.log(n);
                break whileloop;
            }
            step *= busIdArray[i][1];
            nextStep++;
            break forloop;
        } else {
            break forloop;
        }
    }

    n += step;
}

// star2: 1615157133863 too low | 415579909629976 correct
// Algorithmus verbessert gegenüber einer ersten Version: 
// Es wird immer der nächste Wert gefunden und dann ein neuer Step berechnet.