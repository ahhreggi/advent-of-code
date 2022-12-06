import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

// Return the number of fish currently at each of the internal timers
const getTimers = (fishes) => {
  const timers = Object.assign({}, new Array(9).fill(0));
  for (const fish of fishes) timers[fish]++;
  return timers;
};

// Return the internal fish timers after 1 day
const updateTimers = (timers) => {
  const updatedTimers = {};
  for (const timer of Object.keys(timers)) {
    if (timer === "6") {
      updatedTimers[timer] = timers["0"] + timers["7"];
    } else if (timer === "8") {
      updatedTimers[timer] = timers["0"];
    } else {
      updatedTimers[timer] = timers[+timer + 1];
    }
  }
  return updatedTimers;
};

// Given initial timers, return the number of fish after X days
const countFish = (timers, days) => {
  for (let i = 0; i < days; i++) {
    timers = updateTimers(timers);
  }
  return Object.values(timers).reduce((a, b) => a + b);
};

const solution = (input, days = 80) => {
  const fishes = input.split(",").map((n) => +n);
  return countFish(getTimers(fishes), days);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput, 80)); // 5934
console.log("Puzzle answer:", solution(puzzleInput, 80)); // 359999

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution(sampleInput, 256)); // 26984457539
console.log("Puzzle answer:", solution(puzzleInput, 256)); // 1631647919273
