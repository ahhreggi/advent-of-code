import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const getHeightMap = (input) => {
  let [start, end] = [[], []];
  const heightMap = input.split("\n").map((r, row) => {
    return r.split("").map((c, col) => {
      if (c === "S") start = { row, col };
      else if (c === "E") end = { row, col };
      return c === "S" ? 0 : c === "E" ? 26 : c.charCodeAt(0) - 96;
    });
  });
  return { heightMap, start, end };
};

const isValidPath = (map, currHeight, { row, col }) => {
  const [maxRow, maxCol] = [map.length - 1, map[0].length - 1];
  if (row < 0 || maxRow < row || col < 0 || maxCol < col) return false;
  return map[row][col] - currHeight <= 1;
};

const coordsToStr = ({ row, col }) => `${row},${col}`;

const getShortestPath = ({ heightMap, start, end }) => {
  const queue = [{ ...start, steps: 0 }];
  const visited = new Set();

  while (queue.length) {
    let { row, col, steps: currSteps } = queue.shift();

    // If the end is reached, return the # of steps it took to get there
    if (row === end.row && col === end.col) return currSteps;

    // Skip visited coordinates
    const key = coordsToStr({ row, col });
    if (visited.has(key)) continue;
    visited.add(key);

    // Otherwise, explore all valid squares adjacent to the current position
    const currHeight = heightMap[row][col];
    const steps = currSteps + 1;

    const up = { row: row - 1, col, steps };
    if (isValidPath(heightMap, currHeight, up)) queue.push(up);
    const down = { row: row + 1, col, steps };
    if (isValidPath(heightMap, currHeight, down)) queue.push(down);
    const left = { row, col: col - 1, steps };
    if (isValidPath(heightMap, currHeight, left)) queue.push(left);
    const right = { row, col: col + 1, steps };
    if (isValidPath(heightMap, currHeight, right)) queue.push(right);
  }
};

const solution = (input) => {
  return getShortestPath(getHeightMap(input));
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 31
console.log("Puzzle answer:", solution(puzzleInput)); // 481

const solution2 = (input) => {
  const { heightMap, end } = getHeightMap(input);
  let shortest = Infinity;
  for (let row = 0; row < heightMap.length; row++) {
    for (let col = 0; col < heightMap[0].length; col++) {
      const height = heightMap[row][col];
      if (height === 1) {
        const steps = getShortestPath({ heightMap, start: { row, col }, end });
        shortest = steps < shortest ? steps : shortest;
      }
    }
  }
  return shortest;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 29
console.log("Puzzle answer:", solution2(puzzleInput)); // 480

console.log(`\n>>> ${Date.now() - start}ms <<<`);
