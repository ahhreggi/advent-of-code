import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const formatInput = (input) =>
  input.split("\n").map((s) => s.split("").map((n) => +n));

const solution = (input) => {
  const map = formatInput(input);
  const lowPoints = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const height = map[i][j];
      const up = i > 0 ? map[i - 1][j] > height : true;
      const down = i < map.length - 1 ? map[i + 1][j] > height : true;
      const left = j > 0 ? map[i][j - 1] > height : true;
      const right = j < map[0].length - 1 ? map[i][j + 1] > height : true;
      if (up && down && left && right) lowPoints.push(height);
    }
  }
  return lowPoints.map((v) => v + 1).reduce((a, b) => a + b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 15
console.log("Puzzle answer:", solution(puzzleInput)); // 494

// const solution2 = (input) => {
//   return input.split("\n");
// };

// console.log("\n[ Part Two ]");
//   console.log("Sample answer:", solution2(sampleInput));
//   console.log("Puzzle answer:", solution2(puzzleInput));

console.log(`\n>>> ${Date.now() - start}ms <<<`);
