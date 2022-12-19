import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const formatInput = (input) => {
  let [minX, maxX, maxY] = [Infinity, -Infinity, -Infinity];
  const paths = input.split("\n").map((s) =>
    s
      .split(" -> ")
      .map((s) => s.split(","))
      .map(([x, y]) => {
        minX = Math.min(+x, minX);
        maxX = Math.max(+x, maxX);
        maxY = Math.max(+y, maxY);
        return [+x + 1, +y];
      })
  );
  return { paths, minX, maxX, maxY };
};

const drawGrid = (input, part2 = false) => {
  const { paths, minX, maxX, maxY } = formatInput(input);
  const offsetX = minX - maxY;
  const grid = new Array(maxY + 1)
    .fill()
    .map(() => new Array(maxX - offsetX + maxY * 2).fill().map(() => "."));
  // Draw paths
  for (const path of paths) {
    for (let i = 0; i < path.length - 1; i++) {
      let [x, y] = path[i];
      let [endX, endY] = path[i + 1];
      grid[y][x - offsetX] = "#";
      while (x !== endX || y !== endY) {
        x += x < endX ? 1 : x > endX ? -1 : 0;
        y += y < endY ? 1 : y > endY ? -1 : 0;
        grid[y][x - offsetX] = "#";
      }
    }
  }
  // Draw abyss/cave floor
  let lastIdx = grid.length - 1;
  if (!part2) {
    grid[lastIdx] = grid[lastIdx].map((e) => (e === "#" ? "#" : "v"));
  } else {
    grid.push(...new Array(2).fill().map(() => [...grid[0]]));
    grid[lastIdx + 2] = grid[lastIdx + 2].map((e) => "#");
  }
  return { grid, sandCoords: [500 - offsetX + 1, 0] };
};

const dropSand = (grid, sandCoords, part2 = false) => {
  let [x, y] = sandCoords;
  while (grid[y + 1][x] === ".") y++;
  if ((!part2 && grid[y + 1][x - 1] === "v") || grid[y + 1][x + 1] === "v") {
    return { grid, endReached: true };
  }
  if (grid[y + 1][x - 1] === ".") {
    return dropSand(grid, [x - 1, y]);
  } else if (grid[y + 1][x + 1] === ".") {
    return dropSand(grid, [x + 1, y]);
  }
  grid[y][x] = "o";
  if (part2 && x === sandCoords[0] && y === sandCoords[1]) {
    return { grid, endReached: true };
  }
  return { grid, endReached: false };
};

const solution = (input, printMap = false) => {
  let { grid, sandCoords } = drawGrid(input);
  let loop = true;
  let units = 0;
  while (loop) {
    const { grid: updatedGrid, endReached } = dropSand(grid, sandCoords);
    grid = updatedGrid;
    units++;
    if (endReached) loop = false;
  }
  if (printMap) console.log(grid.map((e) => e.join("")).join("\n"));
  return units - 1;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput, true)); // 24
console.log("Puzzle answer:", solution(puzzleInput)); // 799

const solution2 = (input, printMap = false) => {
  let { grid, sandCoords } = drawGrid(input, true);
  let loop = true;
  let units = 0;
  while (loop) {
    const { grid: updatedGrid, endReached } = dropSand(grid, sandCoords, true);
    grid = updatedGrid;
    units++;
    if (endReached) loop = false;
  }
  if (printMap) console.log(grid.map((e) => e.join("")).join("\n"));
  return units;
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput, true)); // 93
console.log("Puzzle answer:", solution2(puzzleInput)); // 29076

console.log(`\n>>> ${Date.now() - start}ms <<<`);
