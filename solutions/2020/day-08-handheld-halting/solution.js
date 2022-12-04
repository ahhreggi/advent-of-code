import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const getInstructions = (input) => {
  return input
    .split("\n")
    .map((ins) => ins.split(" "))
    .map(([op, arg]) => [op, +arg]);
};

// Return whether the instructions result in an infinite loop + the accumulator
// If runTest is true, flip nop/jmp and test if it terminates, then return the accumulator
const getStats = (instructions, runTest = false) => {
  let seen = {};
  let accumulator = 0;
  let line = 0;
  while (line < instructions.length) {
    if (line in seen) return { infinite: true, accumulator };
    const [op, arg] = instructions[line];
    seen[line] = true;
    if (op === "acc") {
      accumulator += arg;
      line++;
    } else if (op === "nop") {
      if (runTest) {
        const { infinite, accumulator } = testInstructions(
          instructions,
          line,
          arg,
          "jmp"
        );
        if (!infinite) return accumulator;
      }
      line++;
    } else if (op === "jmp") {
      if (runTest) {
        const { infinite, accumulator } = testInstructions(
          instructions,
          line,
          arg,
          "nop"
        );
        if (!infinite) return accumulator;
      }
      line += arg;
    }
  }
  return { infinite: false, accumulator };
};

// Test and return whether flipping the op results in an infinite loop + the accumulator
const testInstructions = (instructions, line, arg, newOp) => {
  const newInstructions = [...instructions];
  newInstructions[line] = [newOp, arg];
  return getStats(newInstructions);
};

const solution = (input) => {
  return getStats(getInstructions(input)).accumulator;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 5
console.log("Puzzle answer:", solution(puzzleInput)); // 2051

const solution2 = (input) => {
  return getStats(getInstructions(input), true);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 8
console.log("Puzzle answer:", solution2(puzzleInput)); // 2304
