import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const solution = (input) => {
  return input
    .split("\n\n")
    .map((s) => new Set(s.split("\n").join("")).size)
    .reduce((a, b) => a + b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 11
console.log("Puzzle answer:", solution(puzzleInput)); // 7283

const getGroupCount = (group) => {
  let count = 0;
  const seen = {};
  for (const member of group) {
    // Count the # of occurrences a question was answered yes to within the group
    for (const answer of member) {
      seen[answer] = seen[answer] ? seen[answer] + 1 : 1;
      // Count the ones answered yes to by all group members
      if (seen[answer] === group.length) count++;
    }
  }
  return count;
};

const solution2 = (input) => {
  return input
    .split("\n\n")
    .map((s) => s.split("\n").sort((a, b) => b.length - a.length))
    .reduce((total, group) => total + getGroupCount(group), 0);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 6
console.log("Puzzle answer:", solution2(puzzleInput)); // 3520
