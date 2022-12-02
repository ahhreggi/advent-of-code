import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const solution = (input) => {
  let depth = 0;
  let horizontal = 0;
  const moves = input.split("\n").map((s) => s.split(" "));
  for (let [direction, distance] of moves) {
    distance = +distance;
    if (direction === "forward") {
      horizontal += distance;
    } else if (direction === "down") {
      depth += distance;
    } else if (direction === "up") {
      depth -= distance;
    }
  }
  return depth * horizontal;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput));
console.log("Puzzle answer:", solution(puzzleInput));

const solution2 = (input) => {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;
  const moves = input.split("\n").map((s) => s.split(" "));
  for (let [direction, distance] of moves) {
    distance = +distance;
    if (direction === "forward") {
      horizontal += distance;
      depth += aim * distance;
    } else if (direction === "down") {
      aim += distance;
    } else if (direction === "up") {
      aim -= distance;
    }
  }
  return depth * horizontal;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput));
console.log("Puzzle answer:", solution2(puzzleInput));
