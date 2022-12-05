import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const formatInput = (input) => {
  // Separate input lines regarding procedure from the diagram
  const [diagram, procedure] = input.split("\n\n").map((e) => e.split("\n"));
  // Convert procedure into objects with properties { move, to, from }
  const steps = procedure.map((step) => {
    const [k1, v1, k2, v2, k3, v3] = step.split(" ");
    return { [k1]: +v1, [k2]: v2, [k3]: v3 };
  });
  // Create an object to hold all of the stacks as arrays with index 0 = top of stack
  const labels = diagram[diagram.length - 1];
  const stacks = {};
  labels.split("  ").forEach((label) => (stacks[+label] = []));
  // Add input line letters to their corresponding stacks (same index)
  for (const line of diagram.slice(0, diagram.length - 1)) {
    for (let i = 0; i < line.length; i++) {
      if (line[i].match(/[A-Z]/i)) stacks[labels[i]].push(line[i]);
    }
  }
  return { steps, stacks };
};

// Return the resulting stacks after applying the given steps
const applyProcedure = (steps, stacks, retainOrder = false) => {
  for (const { move, to, from } of steps) {
    const pickUp = [];
    while (pickUp.length < move) {
      pickUp.unshift(stacks[from].shift());
    }
    if (retainOrder) pickUp.reverse();
    stacks[to].unshift(...pickUp);
  }
  return stacks;
};

const solution = (input, retainOrder = false) => {
  const { steps, stacks } = formatInput(input);
  return Object.entries(applyProcedure(steps, stacks, retainOrder))
    .sort((a, b) => +a[0] - +b[0]) // ensure stacks are in label # order
    .reduce((result, stack) => result + stack[1][0], ""); // return top crates as a string
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // CMZ
console.log("Puzzle answer:", solution(puzzleInput)); // QPJPLMNNR

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution(sampleInput, true)); // MCD
console.log("Puzzle answer:", solution(puzzleInput, true)); // BQDNWJPVJ
