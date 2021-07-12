class Floor {
    longestPath = 0;

    constructor(rawTileList, floorExtension) {
        this.tileList = rawTileList.map((rawTilePath) => this.parseTilePath(rawTilePath));
        this.maxFloorLength = (this.longestPath + floorExtension) * 2 + 1;
        this.floorPlan = [...Array(this.maxFloorLength)].map(() => Array(this.maxFloorLength).fill(0));
        this.centerTile = Math.floor(this.maxFloorLength / 2);
    }

    parseTilePath(input) {
        let result = [];
        let i = 0;
        let pathLength = 0;

        while (i < input.length) {
            switch (input.charAt(i)) {
                case 'e':
                    result.push('E');
                    i++;
                    break;
                case 'w':
                    result.push('W');
                    i++;
                    break;
                case 'n':
                    if (input.charAt(i + 1) === 'e') result.push('NE')
                    if (input.charAt(i + 1) === 'w') result.push('NW')
                    i += 2;
                    break;
                case 's':
                    if (input.charAt(i + 1) === 'e') result.push('SE')
                    if (input.charAt(i + 1) === 'w') result.push('SW')
                    i += 2;
            }
            pathLength++;
        }
        if (pathLength > this.longestPath) this.longestPath = pathLength;
        return result;
    }

    handleTileList() {
        let i = 0;
        let j = 0;

        this.tileList.forEach((tilePath) => {
            i = this.centerTile;
            j = this.centerTile;
            tilePath.forEach((move) => {
                switch (move) {
                    case 'NW':
                        i--;
                        j--;
                        break;
                    case 'NE':
                        i--;
                        break;
                    case 'W':
                        j--;
                        break;
                    case 'E':
                        j++;
                        break;
                    case 'SW':
                        i++;
                        break;
                    case 'SE':
                        i++;
                        j++;
                }
            })
            this.flipTile(i, j);
        })
    }

    flipTile(i, j) {
        this.floorPlan[i][j] = (this.floorPlan[i][j] === 0) ? 1 : 0;
    }

    countBlackTiles() {
        let numberOfBlackTiles = 0;
        this.floorPlan.forEach((row) => {
            row.forEach((tile) => {
                if (tile === 1) numberOfBlackTiles++;
            })
        })

        return numberOfBlackTiles;
    }

    checkAndFlipTiles(days) {
        for (let k = 0; k < days; k++) {
            let tempFloorCopy = [...Array(this.maxFloorLength)].map(() => Array(this.maxFloorLength).fill(0));
            for (let i = 0; i < this.floorPlan.length; i++) {
                for (let j = 0; j < this.floorPlan[i].length; j++) {
                    tempFloorCopy[i][j] = this.countBlackNeighbors(i, j);
                }
            }
            for (let i = 0; i < this.floorPlan.length; i++) {
                for (let j = 0; j < this.floorPlan[i].length; j++) {
                    if (this.floorPlan[i][j] === 1 && (tempFloorCopy[i][j] === 0 || tempFloorCopy[i][j] > 2)) this.flipTile(i, j);
                    if (this.floorPlan[i][j] === 0 && tempFloorCopy[i][j] === 2) this.flipTile(i, j);
                }
            }
        }
    }

    countBlackNeighbors(i, j) {
        const neighborCoords = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, 0], [1, 1]];
        let blackNeighbors = 0;

        for (let m = 0; m < neighborCoords.length; m++) {
            let neighborRow = i + neighborCoords[m][0];
            let neighborCol = j + neighborCoords[m][1];

            if (0 <= neighborRow &&
                neighborRow < this.floorPlan.length &&
                0 <= neighborCol &&
                neighborCol < this.floorPlan[0].length &&
                this.floorPlan[neighborRow][neighborCol] === 1
            ) {
                blackNeighbors++;
            };
        }

        return blackNeighbors;
    }

}

export { Floor };