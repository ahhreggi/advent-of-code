import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

// The easy way
// const strToArray = (str) => eval(str)

// The fun way
const strToArray = (str, currentArray = [], currentNum = "") => {
  if (!str.length) return currentArray[0];
  const char = str[0];
  if (char === "[") {
    const { updatedStr, nested } = strToArray(str.slice(1), []);
    return strToArray(updatedStr.slice(1), [...currentArray, nested]);
  } else if (char === "]") {
    if (currentNum) currentArray.push(+currentNum);
    return { updatedStr: str, nested: currentArray };
  } else if (char !== ",") {
    return strToArray(str.slice(1), currentArray, currentNum + char);
  } else {
    if (currentNum) currentArray.push(+currentNum);
    return strToArray(str.slice(1), currentArray);
  }
};

const getPackets = (input, groupSize = 2) => {
  const packets = input.split("\n").filter((v) => v);
  return groupSize > 1
    ? packets.reduce((groups, line, i) => {
        const groupIdx = Math.floor(i / groupSize);
        if (!groups[groupIdx]) groups[groupIdx] = [];
        groups[groupIdx].push(strToArray(line));
        return groups;
      }, [])
    : packets.map((line) => strToArray(line));
};

// Return 1 if order is correct, -1 if incorrect, or 0 if equal
const compare = (left, right) => {
  // If either value is undefined, return comparison
  if (!left && left !== 0) return 1;
  if (!right && right !== 0) return -1;
  // If either value is a list, compare both as lists
  const [isArrayL, isArrayR] = [Array.isArray(left), Array.isArray(right)];
  if (isArrayL || isArrayR) {
    left = isArrayL ? left : [left];
    right = isArrayR ? right : [right];
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const result = compare(left[i], right[i]);
      if (result !== 0) return result;
    }
    return 0;
  }
  // If both values are integers, return comparison
  return left === right ? 0 : left < right ? 1 : -1;
};

const solution = (input) => {
  const correctPairs = [];
  getPackets(input).forEach(([left, right], i) => {
    if (compare(left, right) !== -1) correctPairs.push(i + 1);
  });
  return correctPairs.reduce((a, b) => a + b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 13
console.log("Puzzle answer:", solution(puzzleInput)); // 4809

const solution2 = (input) => {
  const [divider1, divider2] = [[[2]], [[6]]];
  const packets = [...getPackets(input, 1), divider1, divider2];
  packets.sort((a, b) => compare(b, a));
  const divIdx1 = packets.findIndex((p) => compare(p, divider1) === 0) + 1;
  const divIdx2 = packets.findIndex((p) => compare(p, divider2) === 0) + 1;
  return divIdx1 * divIdx2;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 140
console.log("Puzzle answer:", solution2(puzzleInput)); // 22600

console.log(`\n>>> ${Date.now() - start}ms <<<`);
