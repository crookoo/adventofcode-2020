const Cup = require('./Cup');

class GameMap {

    constructor(seedInput, maxValueFillup, moves) {
        this.firstLabel = seedInput[0];
        this.moves = moves;
        this.highestCup = Math.max(...seedInput);
        this.lowestCup = Math.min(...seedInput);
        this.cups = this.parse(seedInput.concat(this.numberArrayWithOffset(maxValueFillup, this.highestCup)));
        if (this.highestCup < maxValueFillup) this.highestCup = maxValueFillup;
    }

    parse(inputArray) {
        let cupsMap = new Map();
        let nextCup = null;

        // fill map with cups from back to front
        for (let i = inputArray.length - 1; i >= 0; i--) {
            nextCup = new Cup(inputArray[i], nextCup);
            cupsMap.set(inputArray[i], nextCup);
        }
        
        // point last element to first element
        let lastElement = cupsMap.get(inputArray[inputArray.length - 1]);
        lastElement.next = nextCup;
        return cupsMap;
    }

    makeMoves() {
        let currentCup = this.cups.get(this.firstLabel);
        let destinationCup = null;
        let destinationAfter = null;
        let pickupFirst = null;
        let pickupLast = null;

        for (let j = 0; j < this.moves; j++) {
            destinationCup = this.getDestinationCup(currentCup);
            destinationAfter = destinationCup.next;
            pickupFirst = currentCup.next;
            pickupLast = pickupFirst.next.next;

            // change pointers
            currentCup.next = pickupLast.next;
            destinationCup.next = pickupFirst;
            pickupLast.next = destinationAfter;

            // new current cup
            currentCup = currentCup.next;

            // console.log(this.stateToString());
        }

    }

    getDestinationCup(currentCup) {
        const pickupAmount = 3;
        let oneRoundWithoutHit = true;
        let destinationCandidate = currentCup.value - 1;
        let checkCup = currentCup.next;
        if (destinationCandidate < this.lowestCup) destinationCandidate = this.highestCup;
        for (let j = 0; j < pickupAmount; j++) {
            for (let i = 0; i < pickupAmount; i++) {
                if (checkCup.value === destinationCandidate) {
                    oneRoundWithoutHit = false;
                    destinationCandidate--;
                    if (destinationCandidate < this.lowestCup) destinationCandidate = this.highestCup;
                }
                checkCup = checkCup.next;
            }
            if (oneRoundWithoutHit) {
                break;
            } else {
                checkCup = currentCup.next;
                oneRoundWithoutHit = true;
            }
        }
        return this.cups.get(destinationCandidate);
    }

    stateToString() {
        let result = 'cups: ';
        let currentCup = this.cups.get(this.firstLabel);
        for (let i = 0; i < this.cups.size; i++) {
            result += currentCup.value + ' ';
            currentCup = currentCup.next;
        }
        return result;
    }

    collectResultPartOne() {
        let result = '';
        let cupOne = this.cups.get(1);
        let currentCup = cupOne.next;
        while (currentCup !== cupOne) {
            result += currentCup.value;
            currentCup = currentCup.next;
        }
        return result;
    }

    collectResultPartTwo() {
        let cupOne = this.cups.get(1);
        return cupOne.next.value * cupOne.next.next.value;
    }

    numberArrayWithOffset(maxValue, offset) {
        return [...Array(maxValue + 1).keys()].slice(offset + 1);
    }

}

module.exports = GameMap;