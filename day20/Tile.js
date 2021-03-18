class Tile {

    constructor(idString, rawArray) {
        this.id = parseInt(idString, 10);
        this.tileArray = rawArray.split("\n").map((line) => line.split(""));
    }

    getEdges() {
        let arr = this.tileArray;
        let len = arr.length;
        let resultList = ['', '', '', '', '', '', '', ''];

        for (let i = 0; i < len; i++) {
            resultList[0] += arr[0][i];
            resultList[1] += arr[len - 1][i];
            resultList[2] += arr[i][0];
            resultList[3] += arr[i][len - 1];
            resultList[4] += arr[0][len - 1 - i];
            resultList[5] += arr[len - 1][len - 1 - i];
            resultList[6] += arr[len - 1 - i][0];
            resultList[7] += arr[len - 1 - i][len - 1];
        }

        return resultList;
    }

}

module.exports = Tile;