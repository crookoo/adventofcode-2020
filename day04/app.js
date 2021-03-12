import { input } from './input.js';

// star1: 204 correct
let sum = 0;

for (let i = 0; i < input.length; i++) {
    if (allFieldsPresent(input[i])) sum++;
}

console.log(sum);

// start2: 179 correct
let sum2 = 0;
for (let i = 0; i < input.length; i++) {
    if (allFieldsPresent(input[i]) && allFieldsValid(input[i])) sum2++;
}

console.log(sum2);

function allFieldsPresent(input) {
    let validation = true;

    if (input.byr === undefined ||
        input.iyr === undefined ||
        input.eyr === undefined ||
        input.hgt === undefined ||
        input.hcl === undefined ||
        input.ecl === undefined ||
        input.pid === undefined) return false;

    return validation;
}

function allFieldsValid(input) {
    let validation = true;

    if (!hasFourDigits(input.byr) || parseInt(input.byr) < 1920 || parseInt(input.byr) > 2002) return false;
    if (!hasFourDigits(input.iyr) || parseInt(input.iyr) < 2010 || parseInt(input.iyr) > 2020) return false;
    if (!hasFourDigits(input.eyr) || parseInt(input.eyr) < 2020 || parseInt(input.eyr) > 2030) return false;
    if (!hasCorrectHgtFormat(input.hgt) || !hasCorrectHgtDimension(input.hgt)) return false;
    if (!hasCorrectHclFormat(input.hcl)) return false;
    if (!hasCorrectEclValue(input.ecl)) return false;
    if (!hasCorrectPidFormat(input.pid)) return false;

    return validation;
}

function hasFourDigits(data) {
    let checkPattern = /^[0-9]{4}$/;
    return checkPattern.test(data);
}

function hasCorrectHgtFormat(data) {
    let checkPattern = /^[0-9]+(cm|in)$/;
    return checkPattern.test(data);
}

function hasCorrectHgtDimension(data) {
    let numberWithoutUnit = parseInt(data.slice(0, -2));
    let unit = data.slice(-2);
    let validation = true;
    if (unit === 'cm' && (numberWithoutUnit < 150 || numberWithoutUnit > 193)) return false;
    if (unit === 'in' && (numberWithoutUnit < 59 || numberWithoutUnit > 76)) return false;
    return validation;
}

function hasCorrectHclFormat(data) {
    let checkPattern = /^#[0-9a-f]{6}$/;
    return checkPattern.test(data);
}

function hasCorrectEclValue(data) {
    if (data === 'amb' || data === 'blu' || data === 'brn' || data === 'gry' ||
        data === 'grn' || data === 'hzl' || data === 'oth') {
        return true;
    } else {
        return false;
    };
}

function hasCorrectPidFormat(data) {
    let checkPattern = /^[0-9]{9}$/;
    return checkPattern.test(data);
}
