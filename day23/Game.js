class Game {

    constructor(seedInput, maxValueFillup, moves) {
        this.moves = moves;
        let seed = seedInput.map(char => parseInt(char));
        this.highestCup = Math.max(...seed);
        this.lowestCup = Math.min(...seed);
        this.cups = seed.concat(this.numberArrayWithOffset(maxValueFillup, this.highestCup));
        if (this.highestCup < maxValueFillup) this.highestCup = maxValueFillup;
    }

    makeMoves() {
        const pickupAmount = 3;
        let currentCup = this.cups[0];
        let currentIndex = 0;
        let destinationIndex = 0;
        let threeCups = [];
        let threeCupsIndex = [];
        let saveIndex = 0;

        for (let j = 0; j < this.moves; j++) {

            // pick up cups
            for (let i = 1; i <= pickupAmount; i++) {
                saveIndex = this.getIndex(currentIndex + i);
                threeCups.push(this.cups[saveIndex]);
                threeCupsIndex.push(saveIndex);
            }

            // delete picked up cups
            threeCupsIndex.sort((a, b) => a - b);

            for (let i = threeCupsIndex.length - 1; i >= 0; i--) {
                this.cups.splice(threeCupsIndex[i], 1);
            }

            // insert picked up cups
            destinationIndex = this.getDestinationIndex(currentCup, threeCups);
            this.cups.splice(destinationIndex + 1, 0, ...threeCups);

            // calculate next current cup
            currentIndex = this.getIndex(this.cups.indexOf(currentCup) + 1);
            currentCup = this.cups[currentIndex];

            // empty helper arrays
            threeCups.length = 0;
            threeCupsIndex.length = 0;
        }

    }

    getIndex(inputIndex) {
        const arrLength = this.cups.length;
        return ((inputIndex) % arrLength + arrLength) % arrLength;
    }

    getDestinationIndex(currentCup, threeCups) {
        let destinationCandidate = currentCup - 1;
        if (destinationCandidate < this.lowestCup) destinationCandidate = this.highestCup;
        while (threeCups.indexOf(destinationCandidate) !== -1) {
            destinationCandidate--;
            if (destinationCandidate < this.lowestCup) destinationCandidate = this.highestCup;
        }
        return this.cups.indexOf(destinationCandidate);
    }

    collectResultPartOne() {
        const cupsLength = this.cups.length;
        let resultString = '';
        let indexOfOne = this.cups.indexOf(1);
        for (let j = indexOfOne + 1; j < cupsLength + indexOfOne; j++) {
            resultString += this.cups[this.getIndex(j)];
        }
        return resultString;
    }

    collectResultPartTwo() {
        let result = 0;
        let indexOfOne = this.cups.indexOf(1);
        let indexNext = this.getIndex(indexOfOne + 1);
        let indexAfterNext = this.getIndex(indexOfOne + 2);
        result = this.cups[indexNext] * this.cups[indexAfterNext];
        return result;
    }

    numberArrayWithOffset(maxValue, offset) {
        return [...Array(maxValue + 1).keys()].slice(offset + 1);
    }

}

module.exports = Game;