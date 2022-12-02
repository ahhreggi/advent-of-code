import puzzleInput from "./puzzleInput.js";
import sampleInput from "./sampleInput.js";

const solution = (calories, top = 1) => {
  return calories
    .split("\n\n") // convert input into list of strings (each is an elf)
    .map(strList => strList
      .split('\n') // convert each string into a list of strings (calories)
      .map(strNum => +strNum) // convert string into numbers
      .reduce((a, b) => a + b) // convert numbers lists into sums
    )
    .sort((a, b) => b - a) // sort in desc order
    .slice(0, top) // get top X
    .reduce((a, b) => a + b) // get total sum of top X
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 24000
console.log("Puzzle answer:", solution(puzzleInput)); // 68923

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution(sampleInput, 3)); // 45000
console.log("Puzzle answer:", solution(puzzleInput, 3)); // 200044
