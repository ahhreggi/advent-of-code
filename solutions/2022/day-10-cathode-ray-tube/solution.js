import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const formatInput = (input) => {
  return input.split("\n").map((s) => +s.split(" ")[1]); // map to # (addx arg) or NaN
};

const solution = (input) => {
  const program = formatInput(input);
  const signals = {}; // initialize object with target signals
  for (let i = 20; i <= 220; i += 40) signals[i] = true;
  let [x, cycle] = [1, 1];
  const pending = [];
  while (program.length) {
    if (signals[cycle]) signals[cycle] = cycle * x; // record target signal strengths
    if (pending[0]) x += pending.shift(); // apply next in pending if not NaN
    else pending.unshift(program.shift()); // store next program arg
    cycle++;
  }
  return Object.values(signals).reduce((a, b) => a + b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 13140
console.log("Puzzle answer:", solution(puzzleInput)); // 14240

const solution2 = (input) => {
  const program = formatInput(input);
  let [x, cycle] = [1, 1];
  let [position, current] = [0, ""];
  const [pending, rows] = [[], []];
  while (program.length) {
    current += Math.abs(x - (position % 40)) <= 1 ? "⬜" : "⬛"; // draw pixel
    if (current.length === 40) {
      rows.push(current);
      current = "";
    }
    if (pending[0]) x += pending.shift(); // apply next in pending if not NaN
    else pending.unshift(program.shift()); // store next program arg
    position++;
    cycle++;
  }
  return rows;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput));
// ⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬛⬛
// ⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛⬛⬛⬜⬜⬜⬛
// ⬜⬜⬜⬜⬛⬛⬛⬛⬜⬜⬜⬜⬛⬛⬛⬛⬜⬜⬜⬜⬛⬛⬛⬛⬜⬜⬜⬜⬛⬛⬛⬛⬜⬜⬜⬜⬛⬛⬛⬛
// ⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛
// ⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜
// ⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛
console.log("Puzzle answer:", solution2(puzzleInput)); // PLULKBZH
// ⬜⬜⬜⬛⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬜⬜⬛⬛⬜⬜⬜⬜⬛⬜⬛⬛⬜⬛
// ⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬛⬜⬛⬛⬜⬛⬛⬜⬛⬛⬛⬛⬜⬛⬜⬛⬛⬜⬛
// ⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬜⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛⬜⬛⬛⬜⬜⬜⬜⬛
// ⬜⬜⬜⬛⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬛⬜⬛⬛⬜⬛⬛⬜⬛⬛⬜⬛⬛⬛⬜⬛⬛⬜⬛
// ⬜⬛⬛⬛⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬛⬜⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛
// ⬜⬛⬛⬛⬛⬜⬜⬜⬜⬛⬛⬜⬜⬛⬛⬜⬜⬜⬜⬛⬜⬛⬛⬜⬛⬜⬜⬜⬛⬛⬜⬜⬜⬜⬛⬜⬛⬛⬜⬛

console.log(`\n>>> ${Date.now() - start}ms <<<`);
