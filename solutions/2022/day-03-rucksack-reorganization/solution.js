import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

// Convert char (a-z, A-Z) into a priority value (1-52)
const getPriority = (char) => {
  const charCode = char.charCodeAt(0);
  return charCode - (charCode >= 97 ? 96 : 38);
};

// Return an array of intersecting elements between two strings
const getCommon = (first, second) => {
  return first.split("").filter((item) => second.split("").includes(item));
};

const solution = (input) => {
  return (
    input
      .split("\n")
      // Split string into two groups
      .map((s) => {
        const mid = s.length / 2;
        return [s.slice(0, mid), s.slice(mid)];
      })
      // Get single intersection between first and second group
      .map((group) => getCommon(...group)[0])
      // Return sum of priorities
      .reduce((sum, char) => sum + getPriority(char), 0)
  );
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 157
console.log("Puzzle answer:", solution(puzzleInput)); // 7597

const solution2 = (input) => {
  return (
    input
      .split("\n")
      // Split rucksacks into groups of 3
      .reduce((groups, rucksack, i) => {
        const groupIdx = Math.floor(i / 3);
        if (!groups[groupIdx]) {
          groups[groupIdx] = [];
        }
        groups[groupIdx].push(rucksack);
        return groups;
      }, [])
      // Get single intersection between (intersection of first & second) and third groups
      .map((group) => getCommon(getCommon(...group).join(""), group[2])[0])
      // Return sum of priorities
      .reduce((sum, char) => sum + getPriority(char), 0)
  );
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 70
console.log("Puzzle answer:", solution2(puzzleInput)); // 2607
