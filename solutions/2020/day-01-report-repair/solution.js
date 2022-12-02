import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const solution = (input) => {
  const entries = input.split("\n").map((n) => +n);
  const differences = {};
  for (let i = 0; i < entries.length - 1; i++) {
    const diff = 2020 - entries[i];
    if (entries[i] in differences) {
      return entries[i] * entries[differences[entries[i]]];
    } else {
      differences[diff] = i;
    }
  }
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 514579
console.log("Puzzle answer:", solution(puzzleInput)); // 1016619

const solution2 = (input) => {
  const entries = input.split("\n").map((n) => +n);
  const differences = {};
  for (let i = 0; i < entries.length - 1; i++) {
    const diff = 2020 - entries[i];
    if (!(entries[i] in differences)) {
      differences[diff] = i;
    }
  }
  for (let i = 0; i < entries.length - 2; i++) {
    for (let j = i + 1; j < entries.length - 1; j++) {
      const sum = entries[i] + entries[j];
      if (sum in differences) {
        const thirdIdx = differences[sum];
        if (thirdIdx !== i && thirdIdx !== j) {
          return entries[i] * entries[j] * entries[thirdIdx];
        }
      }
    }
  }
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 241861950
console.log("Puzzle answer:", solution2(puzzleInput)); // 218767230
