import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const solution = (input) => {
  const depths = input.split("\n").map((n) => +n);
  let count = 0;
  depths.forEach((depth, i) => i > 0 && depths[i - 1] < depth && count++);
  return count;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 7
console.log("Puzzle answer:", solution(puzzleInput)); // 1292

const getWindowSum = (list, i) => {
  let leftIdx = i < 2 ? 0 : i - 2;
  return list.slice(leftIdx, i + 1).reduce((a, b) => a + b, 0);
};

const solution2 = (input) => {
  const depths = input.split("\n").map((n) => +n);
  const windowSums = depths.map((n, i) => getWindowSum(depths, i)).slice(2);
  let count = 0;
  windowSums.forEach((sum, i) => i > 0 && windowSums[i - 1] < sum && count++);
  return count;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 5
console.log("Puzzle answer:", solution2(puzzleInput)); // 1262
