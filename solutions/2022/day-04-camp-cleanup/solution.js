import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const getInputPairs = (input) => {
  return input
    .split("\n")
    .map((pair) =>
      pair.split(",").map((elf) => elf.split("-").map((id) => +id))
    );
};

const solution = (input) => {
  let fullyContained = 0;
  for (const [[min1, max1], [min2, max2]] of getInputPairs(input)) {
    if ((min2 <= min1 && max1 <= max2) || (min1 <= min2 && max2 <= max1)) {
      fullyContained++;
    }
  }
  return fullyContained;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 2
console.log("Puzzle answer:", solution(puzzleInput)); // 567

const solution2 = (input) => {
  let overlap = 0;
  for (const [[min1, max1], [min2, max2]] of getInputPairs(input)) {
    if ((min1 <= min2 && min2 <= max1) || (min2 <= min1 && min1 <= max2)) {
      overlap++;
    }
  }
  return overlap;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 4
console.log("Puzzle answer:", solution2(puzzleInput)); // 907
