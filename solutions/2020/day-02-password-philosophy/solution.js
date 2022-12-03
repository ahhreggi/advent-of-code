import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const solution = (input) => {
  const passwords = input.split("\n").map((s) => s.split(": "));
  let validCount = 0;
  for (const [policyString, password] of passwords) {
    const [rangeStr, letter] = policyString.split(" ");
    const [min, max] = rangeStr.split("-").map((n) => +n);
    let count = 0;
    for (const char of password) {
      if (char === letter) count++;
    }
    if (min <= count && count <= max) validCount++;
  }
  return validCount;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 2
console.log("Puzzle answer:", solution(puzzleInput)); // 500

const solution2 = (input) => {
  const passwords = input.split("\n").map((s) => s.split(": "));
  let validCount = 0;
  for (const [policyString, password] of passwords) {
    const [rangeStr, letter] = policyString.split(" ");
    const [index1, index2] = rangeStr.split("-").map((n) => +n - 1);
    const check1 = password[index1] === letter;
    const check2 = password[index2] === letter;
    if (check1 !== check2) validCount++;
  }
  return validCount;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 1
console.log("Puzzle answer:", solution2(puzzleInput)); // 313
