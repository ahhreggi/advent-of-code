import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const getRightIdx = (rowLength, i, distance = 3) => {
  let targetIdx = i + distance;
  return targetIdx > rowLength - 1
    ? Math.floor(targetIdx % rowLength)
    : targetIdx;
};

const solution = (input, rightDistance = 3, downDistance = 1) => {
  const map = input.split("\n");
  let col = 0;
  let row = 0;
  let trees = 0;
  while (row < map.length - 1) {
    col = getRightIdx(map[0].length, col, rightDistance);
    row += downDistance;
    if (map[row][col] === "#") trees++;
  }
  return trees;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 7
console.log("Puzzle answer:", solution(puzzleInput)); // 209

const solution2 = (input) => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  let result = 1;
  for (const slope of slopes) {
    result *= solution(input, ...slope);
  }
  return result;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 336
console.log("Puzzle answer:", solution2(puzzleInput)); // 1574890240
