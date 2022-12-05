import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const formatInput = (input) => {
  const adapters = input
    .split("\n")
    .sort((a, b) => a - b)
    .map((n) => +n);
  return [0, ...adapters, adapters[adapters.length - 1] + 3];
};

const solution = (input) => {
  const jolts = formatInput(input);
  const joltDifferences = { 1: 0, 3: 0 };
  for (let i = 1; i < jolts.length; i++) {
    const diff = jolts[i] - jolts[i - 1];
    joltDifferences[diff]++;
  }
  return joltDifferences["1"] * joltDifferences["3"];
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 220
console.log("Puzzle answer:", solution(puzzleInput)); // 2030

// Return an object mapping each jolt to a list of values that could come next
const getAllPossibilities = (jolts) => {
  const allPossibilities = {};
  for (let i = 0; i < jolts.length; i++) {
    const nextValues = [];
    let j = i + 1;
    while (j < jolts.length && jolts[j] - jolts[i] <= 3) {
      nextValues.push(jolts[j]);
      j++;
    }
    allPossibilities[jolts[i]] = nextValues;
  }
  return allPossibilities;
};

// Return the # of possible paths all jolts in map to the end
const getPaths = (map) => {
  const paths = {};
  // Record paths in reverse order so that previous records can be used as a reference
  const jolts = Object.entries(map).sort((a, b) => +b[0] - +a[0]);
  for (const [jolt, nextValues] of jolts) {
    // The end value has a certain fixed path count of 1
    // All other values have paths equal to the sum of those that precede it
    paths[jolt] = !nextValues.length
      ? 1
      : nextValues.reduce((sum, jolt) => sum + paths[jolt], 0);
  }
  return paths;
};

const solution2 = (input) => {
  return getPaths(getAllPossibilities(formatInput(input)))["0"];
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 19208
console.log("Puzzle answer:", solution2(puzzleInput)); // 42313823813632
