import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const parseMonkey = (desc) => {
  const divisor = +desc[2].split(" by ")[1];
  return {
    inspects: 0,
    items: desc[0].split(": ")[1].split(", "),
    operation: desc[1].split(" = ")[1].split(" "),
    divisor,
    getNextMonkey: (value) => +desc[value % divisor ? 4 : 3].split("monkey")[1],
  };
};

const parseInput = (input) => {
  const lines = input.split("\n").map((s) => s.trim());
  const monkeys = {};
  while (lines.length) {
    monkeys[lines.shift().split(" ")[1][0]] = parseMonkey(lines.splice(0, 6));
  }
  return monkeys;
};

const evalOperation = (operation, value) => {
  const [op1, operator, op2] = operation.map((v) => (v === "old" ? value : v));
  return operator === "*" ? +op1 * +op2 : +op1 + +op2;
};

const analyzeMonkeys = (monkeys, part2 = false) => {
  const divisor = Object.values(monkeys)
    .map((m) => m.divisor)
    .reduce((a, b) => a * b);
  for (const [id, monkey] of Object.entries(monkeys)) {
    const { items, operation, getNextMonkey } = monkey;
    for (let item of items) {
      item = Math.floor(evalOperation(operation, item) / (part2 ? 1 : 3));
      monkeys[getNextMonkey(item)].items.push((item %= divisor));
    }
    monkeys[id].inspects += items.length;
    monkeys[id].items = [];
  }
  return monkeys;
};

const solution = (input, rounds = 20, part2 = false) => {
  let monkeys = parseInput(input);
  for (let round = 0; round < rounds; round++) {
    monkeys = analyzeMonkeys(monkeys, part2);
  }
  return Object.values(monkeys)
    .map((v) => v.inspects)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput, 20, false)); // 10605
console.log("Puzzle answer:", solution(puzzleInput, 20, false)); // 50830

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution(sampleInput, 10000, true)); // 2713310158
console.log("Puzzle answer:", solution(puzzleInput, 10000, true)); // 14399640002

console.log(`\n>>> ${Date.now() - start}ms <<<`);
