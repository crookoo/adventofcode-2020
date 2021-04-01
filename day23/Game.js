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
        // const cupsLength = this.cups.length;
        let currentCup = this.cups[0];
        // let indexCurrentCup = this.cups.indexOf(currentCup);
        let indexCurrentCup = 0;
        // let threeCups = [];
        // let threeCupsIndex = [];
        // let currentIndex = 0;
        let destinationIndex = 0;

        for (let j = 0; j < this.moves; j++) {
            destinationIndex = this.getDestinationIndex(indexCurrentCup);

            // for (let i = 1; i <= pickupAmount; i++) {
            //     currentIndex = ((indexCurrentCup + i) % cupsLength + cupsLength) % cupsLength;
            //     threeCups.push(this.cups[currentIndex]);
            //     threeCupsIndex.push(currentIndex);
            // }

            // threeCupsIndex.sort((a, b) => a - b);

            // for (let i = threeCupsIndex.length - 1; i >= 0; i--) {
            //     this.cups.splice(threeCupsIndex[i], 1);
            // }

            // this.cups.splice(destinationIndex + 1, 0, ...threeCups);

            let breakSignal = false;
            for (let i = 1; i <= pickupAmount; i++) {
                if (destinationIndex < indexCurrentCup) {
                    if (this.getIndex(indexCurrentCup + i) < indexCurrentCup) {
                        if (breakSignal) {
                            this.cups.splice(this.getIndex(destinationIndex + 1), 0, this.cups.splice(this.getIndex(indexCurrentCup + i - 1), 1)[0]);
                        } else {
                            this.cups.splice(this.getIndex(destinationIndex + i - 1), 0, this.cups.splice(this.getIndex(indexCurrentCup + i), 1)[0]);
                            breakSignal = true;
                        }
                    } else {
                        this.cups.splice(this.getIndex(destinationIndex + i), 0, this.cups.splice(this.getIndex(indexCurrentCup + i), 1)[0]);
                    }
                } else {
                    this.cups.splice(this.getIndex(destinationIndex), 0, this.cups.splice(this.getIndex(indexCurrentCup + 1), 1)[0]);
                }
            }

            console.log(this.cups.join());

            indexCurrentCup = this.getIndex(this.cups.indexOf(currentCup) + 1);
            currentCup = this.cups[indexCurrentCup];
            // threeCups.length = 0;
            // threeCupsIndex.length = 0;
        }

        // for (let j = 0; j < this.moves; j++) {
        //     for (let i = 1; i <= pickupAmount; i++) {
        //         this.cups.splice(this.getDestinationIndex(currentCup, threeCups) + 1, 0, ...threeCups);
        //     }
        // }

    }

    getIndex(inputIndex) {
        const arrLength = this.cups.length;
        return ((inputIndex) % arrLength + arrLength) % arrLength;
    }

    getDestinationIndex(indexCurrentCup) {
        let currentCup = this.cups[indexCurrentCup];
        let destinationCandidate = currentCup - 1;
        if (destinationCandidate < this.lowestCup) destinationCandidate = this.highestCup;
        for (let j = 0; j < 3; j++) {
            for (let i = 1; i <= 3; i++) {
                if (this.cups[this.getIndex(indexCurrentCup + i)] === destinationCandidate) {
                    destinationCandidate--;
                    if (destinationCandidate < this.lowestCup) destinationCandidate = this.highestCup;
                }
            }
        }
        // while (threeCups.indexOf(destinationCandidate) !== -1) {
        //     destinationCandidate--;
        //     if (destinationCandidate < this.lowestCup) destinationCandidate = this.highestCup;
        // }
        return this.cups.indexOf(destinationCandidate);
    }

    collectResultPartOne() {
        const cupsLength = this.cups.length;
        let resultString = '';
        let indexOfOne = this.cups.indexOf(1);
        for (let j = indexOfOne + 1; j < cupsLength + indexOfOne; j++) {
            resultString += this.cups[(j % cupsLength + cupsLength) % cupsLength];
        }
        return resultString;
    }

    collectResultPartTwo() {
        const cupsLength = this.cups.length;
        let result = 0;
        let indexOfOne = this.cups.indexOf(1);
        let indexNext = ((indexOfOne + 1) % cupsLength + cupsLength) % cupsLength;
        let indexAfterNext = ((indexOfOne + 2) % cupsLength + cupsLength) % cupsLength;
        result = this.cups[indexNext] * this.cups[indexAfterNext];
        return result;
    }

    numberArrayWithOffset(maxValue, offset) {
        return [...Array(maxValue + 1).keys()].slice(offset + 1);
    }

}

module.exports = Game;