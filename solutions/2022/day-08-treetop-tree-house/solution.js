import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

// Return the score and visibility of a tree within a row/column
const evalTree = (trees, index) => {
  const score = { before: index, after: trees.length - index - 1 };
  const visible = { before: true, after: true };
  for (let i = 0; i < trees.length; i++) {
    if (trees[i] >= trees[index]) {
      if (i < index) {
        score.before = index - i;
        visible.before = false;
      } else if (i > index) {
        score.after = i - index;
        i = trees.length;
        visible.after = false;
      }
    }
  }
  return {
    score: score.before * score.after,
    visible: visible.before || visible.after,
  };
};

// Return the score and visibility of a tree within a grid
const getTree = (grid, row, col, part2 = false) => {
  const vertical = evalTree(
    grid.map((r) => r[col]),
    row
  );
  if (!part2 && vertical.visible) return vertical; // skip redundant horizontal check
  const horizontal = evalTree(grid[row], col);
  return {
    visible: horizontal.visible || vertical.visible,
    score: horizontal.score * vertical.score,
  };
};

const formatInput = (input, part2 = false) =>
  input
    .split("\n")
    .map((e, y, grid) => e.split("").map((e, x) => getTree(grid, y, +x, part2)))
    .flat();

const solution = (input) => {
  return formatInput(input).reduce((count, tree) => count + +tree.visible, 0);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 21
console.log("Puzzle answer:", solution(puzzleInput)); // 1851

const solution2 = (input) => {
  return formatInput(input, true).reduce((max, t) => Math.max(t.score, max), 0);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 8
console.log("Puzzle answer:", solution2(puzzleInput)); // 574080

console.log(`\n>>> ${Date.now() - start}ms <<<`);
