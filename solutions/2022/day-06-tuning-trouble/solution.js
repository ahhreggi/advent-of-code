import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const solution = (input, markerLength = 4) => {
  const buffer = input.split("");
  let seen = [];
  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i];
    const lastIdx = seen.indexOf(char);
    seen.push(char);
    if (lastIdx >= 0) {
      seen = seen.splice(lastIdx + 1);
    }
    if (seen.length === markerLength) return i + 1;
  }
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 7
console.log("Puzzle answer:", solution(puzzleInput)); // 1155

const solution2 = (input) => {
  return solution(input, 14);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 19
console.log("Puzzle answer:", solution2(puzzleInput)); // 2789

console.log(`\n>>> ${Date.now() - start}ms <<<`);
