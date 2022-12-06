import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const solution = (input) => {
  return input.split("\n");
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput));
console.log("Puzzle answer:", solution(puzzleInput));

// const solution2 = (input) => {
//   return input.split("\n");
// };

// console.log("\n[ Part Two ]");
//   console.log("Sample answer:", solution2(sampleInput));
//   console.log("Puzzle answer:", solution2(puzzleInput));

console.log(`\n>>> ${Date.now() - start}ms <<<`);
