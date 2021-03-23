class Tile {
    collectMatchings = [];

    constructor(idString, rawArray) {
        this.id = parseInt(idString, 10);
        this.tileArray = rawArray.split("\n").map((line) => line.split(""));
    }

    getAllEdges() {
        let arr = this.tileArray;
        let len = arr.length;
        let resultList = ['', '', '', '', '', '', '', ''];

        for (let i = 0; i < len; i++) {
            resultList[0] += arr[0][i];
            resultList[1] += arr[i][len - 1];
            resultList[2] += arr[len - 1][len - 1 - i];
            resultList[3] += arr[len - 1 - i][0];
            resultList[4] += arr[0][len - 1 - i];
            resultList[5] += arr[len - 1 - i][len - 1];
            resultList[6] += arr[len - 1][i];
            resultList[7] += arr[i][0];
        }

        return resultList;
    }

    getEdges() {
        let arr = this.tileArray;
        let len = arr.length;
        let resultList = ['', '', '', ''];

        for (let i = 0; i < len; i++) {
            resultList[0] += arr[0][i];
            resultList[1] += arr[i][len - 1];
            resultList[2] += arr[len - 1][len - 1 - i];
            resultList[3] += arr[len - 1 - i][0];
        }

        return resultList;
    }

    print() {
        let row = '';
        this.tileArray.forEach((line) => {
            line.forEach((char) => {
                row += char;
            })
            console.log(row);
            row = '';
        })
        console.log(); // empty line
    }

    flip() {
        this.tileArray.forEach((line) => {
            line.reverse();
        });
    }

    rotateToRight(steps90degrees = 1) {
        let arr = this.tileArray;
        let len = arr.length;
        let tempArray = [...Array(len)].map(() => Array(len).fill(null));

        for (let k = 0; k < steps90degrees; k++) {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    tempArray[i][j] = arr[len - 1 - j][i];
                }
            }
            for (let matching of this.collectMatchings) {
                matching.edgeNumber = (matching.edgeNumber + 1) % 4;
            }
            arr = JSON.parse(JSON.stringify(tempArray));
        }
        this.tileArray = arr;
    }

    flipAndRotate(outgoingEdge, incomingEdge) {
        switch (outgoingEdge) {
            case 0:
                switch (incomingEdge) {
                    case 3:
                    case 7:
                        this.rotateToRight(3);
                        break;
                    case 0:
                    case 4:
                        this.rotateToRight(2);
                        break;
                    case 1:
                    case 5:
                        this.rotateToRight(1);
                        break;
                    default:
                }
                break;
            case 1:
                switch (incomingEdge) {
                    case 2:
                    case 4:
                        this.rotateToRight(3);
                        break;
                    case 3:
                    case 5:
                        this.rotateToRight(2);
                        break;
                    case 0:
                    case 6:
                        this.rotateToRight(1);
                        break;
                    default:
                }
                break;
            case 2:
                switch (incomingEdge) {
                    case 1:
                    case 5:
                        this.rotateToRight(3);
                        break;
                    case 2:
                    case 6:
                        this.rotateToRight(2);
                        break;
                    case 3:
                    case 7:
                        this.rotateToRight(1);
                        break;
                    default:
                }
                break;
            case 3:
                switch (incomingEdge) {
                    case 0:
                    case 6:
                        this.rotateToRight(3);
                        break;
                    case 1:
                    case 7:
                        this.rotateToRight(2);
                        break;
                    case 2:
                    case 4:
                        this.rotateToRight(1);
                        break;
                    default:
                }
                break;
        }

        if (incomingEdge < 4) this.flip();
    }

    toStringWithoutNewlines() {
        let collectorString = '';
        this.tileArray.forEach((line) => collectorString += line.join(''));
        collectorString = collectorString.slice(0, -1);

        return collectorString;
    }

    monsterSearch() {
        const puzzleWidth = this.tileArray[0].length;
        const monsterWidth = 19;
        const charsToNextLine = puzzleWidth - monsterWidth;
        const monsterPattern = '#.{' + charsToNextLine + '}?#.{4}#{2}?.{4}#{2}?.{4}#{3}?.{' + charsToNextLine + '}?#.{2}?#.{2}?#.{2}?#.{2}?#.{2}?#'
        const monsterRegEx = new RegExp(monsterPattern, 'g');
        const searchString = this.toStringWithoutNewlines();

        // search beginning from every index in order to find overlapping monsters
        // source: https://stackoverflow.com/a/33903830/9482164
        let matches = [];
        let currentMatch = [];

        while (currentMatch = monsterRegEx.exec(searchString)) {
            matches.push(currentMatch);
            monsterRegEx.lastIndex = currentMatch.index + 1;
        }

        return matches;
    }

    findMonster() {
        let foundMonster = null;
        for (let i = 0; i < 8; i++) {
            foundMonster = this.monsterSearch();
            if (foundMonster.length > 0) {
                // this.print();
                let puzzleWidth = this.tileArray[0].length;
                foundMonster.forEach((match) => {
                    let index = match.index;
                    let x = index % puzzleWidth;
                    let y = Math.floor(index / puzzleWidth);
                    // console.log('match found at: ' + index + ' y: ' + y + ' x: ' + x);
                });
                return foundMonster.length;
            }
            this.rotateToRight();
            if (i === 3) this.flip();
        }
        return 0;
    }

    countCharacter(character) {
        let counter = 0;
        let arr = this.tileArray;
        arr.forEach((line) => {
            line.forEach((char) => {
                if (char === character) counter++;
            });
        });
        return counter;
    }

    solvePartTwo() {
        const totalChars = this.countCharacter('#');
        const monsterAmount = this.findMonster();
        const monsterChars = 15; // counted by hand
        let result = totalChars - (monsterAmount * monsterChars);
        return result;
    }

}

module.exports = Tile;