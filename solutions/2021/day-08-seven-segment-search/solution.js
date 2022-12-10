import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const sortString = (s) => s.split("").sort().join("");

const formatInput = (input) => {
  return input
    .split("\n")
    .map((line) => line.split(" | "))
    .map(([patterns, output]) => ({
      patterns: patterns.split(" ").map((p) => sortString(p)),
      output: output.split(" ").map((o) => sortString(o)),
    }));
};

const isUnique = (s) => [2, 4, 3, 7].includes(s.length);

const solution = (input) => {
  return formatInput(input)
    .map(({ output }) => output.reduce((a, s) => a + +isUnique(s), 0))
    .reduce((a, b) => a + b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 26
console.log("Puzzle answer:", solution(puzzleInput)); // 532

const getSegments = (patterns) => {
  const result = {};
  for (const pattern of patterns) {
    const length = pattern.length;
    result[length] = [...(result[length] ?? []), pattern];
  }
  return result;
};

const getDiff = (d1, d2) => d1.split("").filter((n) => !d2.includes(n));
const getJoin = (d1, d2) => Array.from(new Set((d1 + d2).split("")));
const isSubset = (d1, d2) => d1.split("").every((n) => d2.includes(n));

const getPatternKeys = (patterns) => {
  let pos = {};
  const segments = getSegments(patterns);
  const keys = {
    1: segments[2][0],
    4: segments[4][0],
    7: segments[3][0],
    8: segments[7][0],
  };

  // a = 7 - 1
  pos["a"] = getDiff(keys[7], keys[1]);
  // b/d = 4 - 1
  const posBD = getDiff(keys[4], keys[1]);
  pos = { ...pos, b: [...posBD], d: [...posBD] };
  // e/g = 8 - (4 + 7)
  const posEG = getDiff(keys[8], getJoin(keys[4], keys[7]));
  pos = { ...pos, e: [...posEG], g: [...posEG] };
  // 6 has 6 segments and 1 is not a subset
  keys[6] = segments[6].filter((s) => !isSubset(keys[1], s))[0];
  segments[6] = segments[6].filter((s) => isSubset(keys[1], s));
  // c = 8 - 6
  pos["c"] = getDiff(keys[8], keys[6]);
  // f = 7 - a + c
  pos["f"] = getDiff(keys[7], pos["a"][0] + pos["c"][0]);
  // 5 has 5 segments and 6 - 5 = 1
  keys[5] = segments[5].filter((s) => getDiff(keys[6], s).length === 1)[0];
  segments[5] = segments[5].filter((s) => getDiff(keys[6], s).length !== 1);
  // e = 6 - 5
  pos["e"] = getDiff(keys[6], keys[5]);
  pos["g"] = pos["g"].filter((e) => e !== pos["e"][0]);
  // 9 has 6 segments and 9 - (4 + a) = 1
  const digit4A = getJoin(keys[4], pos["a"].join("")).join("");
  keys[9] = segments[6].filter((s) => getDiff(s, digit4A).length === 1)[0];
  segments[6] = segments[6].filter((s) => getDiff(s, digit4A).length !== 1);
  // remaining with 6 segments is 0
  keys[0] = segments[6][0];
  // d = 8 - 0
  pos["d"] = getDiff(keys[8], keys[0]);
  pos["b"] = pos["b"].filter((e) => e !== pos["d"][0]);
  // 2 has 5 segments and 2 = 8 - (b + f)
  keys[2] = segments[5].filter((s) => {
    const diff = getDiff(keys[8], pos["b"][0] + pos["f"][0]).join("");
    return !getDiff(diff, s).length;
  })[0];
  segments[5] = segments[5].filter((s) => s != keys[2]);
  // remaining with 5 segments is 3
  keys[3] = segments[5][0];

  return Object.fromEntries(Object.entries(keys).map(([k, v]) => [v, k]));
};

const decodeOutput = (patterns, output) => {
  const patternKey = getPatternKeys(patterns);
  return +output.map((s) => patternKey[s]).join("");
};

const solution2 = (input) => {
  return formatInput(input)
    .map(({ patterns, output }) => decodeOutput(patterns, output))
    .reduce((a, b) => a + b);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 61229
console.log("Puzzle answer:", solution2(puzzleInput)); // 1011284

console.log(`\n>>> ${Date.now() - start}ms <<<`);
