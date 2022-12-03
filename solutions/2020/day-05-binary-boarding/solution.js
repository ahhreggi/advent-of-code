import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const getSeatHelper = (string, lower, upper) => {
  const isLower = ["F", "L"].includes(string[0]);
  if (string.length === 1) {
    return isLower ? lower : upper;
  } else {
    return isLower
      ? getSeatHelper(string.slice(1), lower, Math.floor((upper + lower) / 2))
      : getSeatHelper(string.slice(1), Math.ceil((upper + lower) / 2), upper);
  }
};

const getSeatId = (string) => {
  const row = getSeatHelper(string.slice(0, 7), 0, 127);
  const col = getSeatHelper(string.slice(7), 0, 7);
  return row * 8 + col;
};

const solution = (input) => {
  return input
    .split("\n")
    .map((s) => getSeatId(s))
    .sort((a, b) => b - a)[0];
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 820
console.log("Puzzle answer:", solution(puzzleInput)); // 826

const solution2 = (input, useTestSeats = false) => {
  const seats = useTestSeats
    ? [5, 6, 7, 8, 10, 11]
    : input
        .split("\n")
        .map((s) => getSeatId(s))
        .sort((a, b) => a - b);
  const offset = seats[0];
  for (let i = 0; i < seats.length; i++) {
    const seatId = i + offset;
    if (seats[i] !== seatId) {
      return seatId;
    }
  }
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput, true)); // 9
console.log("Puzzle answer:", solution2(puzzleInput)); // 678
