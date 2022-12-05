import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const getLines = (input) => {
  return input
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((coord) => coord.split(",").map((n) => +n))
    );
};

const coordsToString = (x, y) => {
  return `${x},${y}`;
};

const solution = (input, includeDiagonals = false) => {
  let lines = getLines(input);
  if (!includeDiagonals) {
    // Filter for horizontal/vertical lines
    lines = lines.filter((line) => {
      const [[x1, y1], [x2, y2]] = line;
      return x1 === x2 || y1 === y2;
    });
  }
  const seenPoints = {};
  for (const [[x1, y1], [x2, y2]] of lines) {
    let x = x1;
    let y = y1;
    let last = false;
    while (last || x !== x2 || y !== y2) {
      // Record the current point as seen
      const coords = coordsToString(x, y);
      const count = seenPoints[coords];
      seenPoints[coords] = count ? count + 1 : 1;
      if (last) {
        last = false;
      } else {
        // Move towards x2,y2
        x = x + (x > x2 ? -1 : x < x2 ? 1 : 0);
        y = y + (y > y2 ? -1 : y < y2 ? 1 : 0);
        // Loop once more to record the last point
        if (x === x2 && y === y2) {
          last = true;
        }
      }
    }
  }
  return Object.values(seenPoints).filter((c) => c > 1).length;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 5
console.log("Puzzle answer:", solution(puzzleInput)); // 6225

const solution2 = (input) => {
  return solution(input, true);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 12
console.log("Puzzle answer:", solution2(puzzleInput)); // 22116
