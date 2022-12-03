import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";
import invalidInput from "./invalidInput.js";
import validInput from "./validInput.js";

const solution = (input) => {
  const passports = input
    .split("\n\n")
    .map((s) => s.split("\n").join(" ").split(" "))
    .map((passport) => passport.map((field) => field.split(":")[0]));
  let validCount = 0;
  for (const passport of passports) {
    const length = passport.length;
    if (length === 8 || (length === 7 && !passport.includes("cid")))
      validCount++;
  }
  return validCount;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 2
console.log("Puzzle answer:", solution(puzzleInput)); // 202

const validateYear = (value, min, max, length = 4) => {
  const year = +value;
  return value.length === length && min <= year && year <= max;
};

const validateHeight = (height, min, max) => {
  return min <= height && height <= max;
};

const validateHairColor = (value) => {
  if (value.length !== 7) return false;
  if (value[0] !== "#") return false;
  for (let i = 1; i < value.length; i++) {
    // 0-9 = 48-57, a-f = 97-102
    const charCode = value.charCodeAt(i);
    const isValid =
      (48 <= charCode && charCode <= 57) || (97 <= charCode && charCode <= 102);
    if (!isValid) return false;
  }
  return true;
};

const validateEyeColor = (value) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
};

const validateField = (field, value) => {
  if (field === "byr") {
    return validateYear(value, 1920, 2002);
  } else if (field === "iyr") {
    return validateYear(value, 2010, 2020);
  } else if (field === "eyr") {
    return validateYear(value, 2020, 2030);
  } else if (field === "hgt") {
    const number = value.slice(0, value.length - 2);
    const unit = value.slice(value.length - 2, value.length);
    if (number && !isNaN(number) && ["cm", "in"].includes(unit)) {
      const limits = unit === "cm" ? [150, 193] : [59, 76];
      return validateHeight(+number, ...limits);
    }
  } else if (field === "hcl") {
    return validateHairColor(value);
  } else if (field === "ecl") {
    return validateEyeColor(value);
  } else if (field === "pid") {
    return value.length === 9 && !isNaN(value);
  }
  return false;
};

const solution2 = (input) => {
  const passports = input
    .split("\n\n")
    .map((s) => s.split("\n").join(" ").split(" "))
    .map((passport) => passport.map((field) => field.split(":")));
  let validCount = 0;
  for (const passport of passports) {
    let isValid = true;
    if (passport.length >= 7) {
      for (const [field, value] of passport) {
        if (isValid) {
          if (field === "cid") {
            if (passport.length < 8) {
              isValid = false;
            }
          } else if (!validateField(field, value)) {
            isValid = false;
          }
        }
      }
      if (isValid) validCount++;
    }
  }
  return validCount;
};

console.log("\n[ Part Two ]");
console.log("4 Invalid inputs:", solution2(invalidInput)); // 0
console.log("4 Valid inputs:", solution2(validInput)); // 4
console.log("Sample answer:", solution2(sampleInput)); // 2
console.log("Puzzle answer:", solution2(puzzleInput)); // 137
