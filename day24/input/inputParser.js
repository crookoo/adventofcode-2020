import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const readInputFromFile = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return readFileSync(resolve(__dirname, `./${filename}.txt`), "utf-8");
};

const parse = (filename) => {
    const rawInput = readInputFromFile(filename);
    const parsedInput = rawInput
        .split("\n");
    return parsedInput;
};

export { parse };