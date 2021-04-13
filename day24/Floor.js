class Floor {
    longestPath = 0;

    constructor(rawTileList) {
        this.tileList = rawTileList.map((rawTilePath) => this.parseTilePath(rawTilePath));
        let maxFloorLength = this.longestPath * 2 + 1;
        this.floorPlan = [...Array(maxFloorLength)].map(() => Array(maxFloorLength).fill(0));
        this.centerTile = Math.floor(maxFloorLength / 2);
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
            this.floorPlan[i][j] = (this.floorPlan[i][j] === 0) ? 1 : 0;
        })
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

}

module.exports = Floor;