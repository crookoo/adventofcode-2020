const Tile = require('./Tile');

class PuzzleMap {
    arrangedTiles = [];

    constructor(mapInputArray) {
        this.tiles = this.parseTiles(mapInputArray);
    }

    parseTiles(inputArray) {
        let tileList = new Map();
        inputArray.forEach((element) => {
            tileList.set(parseInt(element[0]), new Tile(element[0], element[1]));
        });
        return tileList;
    }

    findMatchingsAndRotate() {
        let queue = [];
        let alreadyVisited = [];
        let currentTile = this.tiles.values().next().value;
        // currentTile.rotateToRight(2);
        // currentTile.flip();
        queue.push(currentTile);

        while (queue.length > 0) {
            currentTile = queue.shift();
            alreadyVisited.push(currentTile);

            currentTile.getFirstFourEdges().forEach((currentEdge, i) => {
                this.tiles.forEach((compareTile) => {
                    compareTile.getAllEdges().forEach((compareEdge, j) => {
                        if (currentEdge === compareEdge && currentTile.id !== compareTile.id) {
                            currentTile.collectMatchings.push({ edgeNumber: i, matchingTile: compareTile.id });
                            compareTile.flipAndRotate(i, j);
                            if (queue.indexOf(compareTile) === -1
                                && alreadyVisited.indexOf(compareTile) === -1) {
                                queue.push(compareTile);
                            }
                        }
                    });
                });
            });
        }
    }

    solvePartOne() {
        let puzzleResult = 1;

        this.tiles.forEach((tile) => {
            // if tile has only 2 matching edges
            if (tile.collectMatchings.length === 2) {
                puzzleResult *= tile.id;
            }
        });

        return puzzleResult;
    }

    getFirstCornerTile() {
        for (let tileKeyValuePair of this.tiles) {
            let tile = tileKeyValuePair[1];
            if (tile.collectMatchings.length === 2
                && tile.collectMatchings[0].edgeNumber === 1
                && tile.collectMatchings[1].edgeNumber === 2) {
                return tile;
            }
        };
        return null;
    }

    arrangeTiles() {
        let arr = [];
        let rowCounter = 0;
        let nextTile = this.getFirstCornerTile();
        let nextRightMatching = nextTile.collectMatchings.find((matching) => matching.edgeNumber === 1);
        let nextBottomMatching = nextTile.collectMatchings.find((matching) => matching.edgeNumber === 2);

        arr[rowCounter] = [];
        arr[rowCounter].push(nextTile);

        while (nextBottomMatching) {
            nextBottomMatching = nextTile.collectMatchings.find((matching) => matching.edgeNumber === 2);

            while (nextRightMatching) {
                nextTile = this.tiles.get(nextRightMatching.matchingTile);
                arr[rowCounter].push(nextTile);
                nextRightMatching = nextTile.collectMatchings.find((matching) => matching.edgeNumber === 1);
            }

            rowCounter++;
            if (!nextBottomMatching) break;
            nextTile = this.tiles.get(nextBottomMatching.matchingTile);
            arr[rowCounter] = [];
            arr[rowCounter].push(nextTile);
            nextRightMatching = nextTile.collectMatchings.find((matching) => matching.edgeNumber === 1);
        }

        this.arrangedTiles = arr;

        return arr;
    }

    printArrangedTiles() {
        let arr = [];
        if (typeof this.arrangedTiles !== 'undefined' && this.arrangedTiles.length > 0) {
            arr = this.arrangedTiles;
        } else {
            arr = this.arrangeTiles();
        }
        let printArray = [...Array(arr[0][0].tileArray.length)].map(() => Array().fill(null));

        let row = '';
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                for (let k = 0; k < arr[i][j].tileArray.length; k++) {
                    arr[i][j].tileArray[k].forEach((char) => row += char + ' ');
                    printArray[k] = printArray[k] + row + '  ';
                    row = '';
                }
            }
            printArray.forEach((line) => console.log(line));
            printArray = [...Array(10)].map(() => Array().fill(null));
            console.log();
        }
    }

    convertArrangedTilesToString() {
        let arr = [];
        let wholePictureString = '';
        if (typeof this.arrangedTiles !== 'undefined' && this.arrangedTiles.length > 0) {
            arr = this.arrangedTiles;
        } else {
            arr = this.arrangeTiles();
        }
        let printArray = [...Array(arr[0][0].tileArray.length - 2)].map(() => '');

        let row = '';
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                for (let k = 1; k < arr[i][j].tileArray.length - 1; k++) {
                    for (let l = 1; l < arr[i][j].tileArray[0].length - 1; l++) {
                        row += arr[i][j].tileArray[k][l];
                    }
                    printArray[k - 1] = printArray[k - 1] + row;
                    row = '';
                }
            }
            printArray.forEach((line) => {
                wholePictureString += line + '\n';
            });
            printArray = [...Array(arr[0][0].tileArray.length - 2)].map(() => '');
        }
        wholePictureString = wholePictureString.slice(0, -1); // delete last line break
        return wholePictureString;
    }

}

module.exports = PuzzleMap;