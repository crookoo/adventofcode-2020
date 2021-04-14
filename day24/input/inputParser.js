const readInputFromFile = (filename) => {
    const { readFileSync } = require("fs");
    const { resolve } = require("path");
    return readFileSync(resolve(__dirname, `./${filename}.txt`), "utf-8");
};

const parse = (filename) => {
    const rawInput = readInputFromFile(filename);
    return parsedInput = rawInput
        .split("\n");
};

exports.parse = parse;