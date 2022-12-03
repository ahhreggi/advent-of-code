import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const transpose = (matrix) => {
  const result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    const rotated = [];
    for (let j = 0; j < matrix.length; j++) {
      rotated.push(matrix[j][i]);
    }
    result.push(rotated);
  }
  return result;
};

const getBitCount = (bits, top = true) => {
  let zero = 0;
  let one = 0;
  for (const bit of bits) bit === "0" ? zero++ : one++;
  if (zero === one) return top ? "1" : "0";
  return (top ? zero > one : zero < one) ? "0" : "1";
};

const binaryToDecimal = (binary) => {
  // return parseInt(binary.join(""), 2);
  return binary
    .reverse()
    .map((bit, i) => (+bit ? Math.pow(2, i) : 0))
    .reduce((a, b) => a + b);
};

const getDecimalRate = (report, rateType) => {
  return binaryToDecimal(
    report.map((col) => getBitCount(col, rateType === "gamma"))
  );
};

const solution = (input) => {
  const transposed = transpose(input.split("\n").map((row) => row.split("")));
  const gamma = getDecimalRate(transposed, "gamma");
  const epsilon = getDecimalRate(transposed, "epsilon");
  return gamma * epsilon;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 198
console.log("Puzzle answer:", solution(puzzleInput)); // 3309596

const formatInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const filterByPos = (report, top = true, pos = 0) => {
  if (report.length === 1) return binaryToDecimal(report[0]);
  const transposed = transpose(report);
  const bit = getBitCount(transposed[pos], top) ?? (top ? "1" : "0");
  const filteredReports = report.filter((n) => n[pos] === bit);
  return filterByPos(filteredReports, top, pos + 1);
};

const solution2 = (input) => {
  const oxygen = filterByPos(formatInput(input), true);
  const scrubber = filterByPos(formatInput(input), false);
  return oxygen * scrubber;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 230
console.log("Puzzle answer:", solution2(puzzleInput)); // 2981085
