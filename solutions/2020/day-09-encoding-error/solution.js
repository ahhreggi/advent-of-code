import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const getInvalid = (numbers, preamble) => {
  for (let i = preamble; i < numbers.length; i++) {
    const number = numbers[i];
    const window = numbers.slice(i - preamble, i);
    const sums = {};
    for (let j = 0; j < window.length - 1; j++) {
      for (let k = j + 1; k < window.length; k++) {
        sums[window[j] + window[k]] = [j, k];
      }
    }
    if (!(number in sums)) return number;
  }
};

const solution = (input, preamble) => {
  const numbers = input.split("\n").map((n) => +n);
  return getInvalid(numbers, preamble);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput, 5)); // 127
console.log("Puzzle answer:", solution(puzzleInput, 25)); // 88311122

const solution2 = (input, preamble) => {
  const numbers = input.split("\n").map((n) => +n);
  const invalid = getInvalid(numbers, preamble);
  for (let i = 0; i < numbers.length; i++) {
    let sum = 0;
    let currentSet = [];
    let index = i;
    while (sum < invalid) {
      const number = numbers[index];
      sum += number;
      currentSet.push(number);
      index++;
    }
    if (sum === invalid) {
      const sorted = currentSet.sort((a, b) => a - b);
      return sorted[0] + sorted[sorted.length - 1];
    }
  }
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput, 5));
console.log("Puzzle answer:", solution2(puzzleInput, 25));
