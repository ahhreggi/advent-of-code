import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const calculateFuel = (positions, targetPos, constant = true) => {
  let fuel = positions.map((p) => Math.abs(p - targetPos));
  fuel = constant ? fuel : fuel.map((f) => (f * (f + 1)) / 2);
  return fuel.reduce((a, b) => a + b);
};

const solution = (input, constant = true) => {
  let maxPos = 0;
  const positions = input.split(",").map((n) => {
    maxPos = +n > maxPos ? +n : maxPos;
    return +n;
  });
  let minFuel;
  for (let i = 0; i < maxPos; i++) {
    const fuel = calculateFuel(positions, i, constant);
    if (minFuel <= fuel) return minFuel;
    minFuel = fuel;
  }
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 37
console.log("Puzzle answer:", solution(puzzleInput)); // 356179

const solution2 = (input) => {
  return solution(input, false);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 168
console.log("Puzzle answer:", solution2(puzzleInput)); // 99788435

console.log(`\n>>> ${Date.now() - start}ms <<<`);
