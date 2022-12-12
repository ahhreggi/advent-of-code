import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const formatInput = (input) =>
  input.split("\n").map((s) => s.split("").map((n) => +n));

// Return the four adjacent coordinates of the given row, col in map
const getAdjCoords = (map, row, col) => {
  return {
    up: row > 0 ? [row - 1, col] : undefined,
    down: row < map.length - 1 ? [row + 1, col] : undefined,
    left: col > 0 ? [row, col - 1] : undefined,
    right: col < map[0].length - 1 ? [row, col + 1] : undefined,
  };
};

const solution = (input) => {
  let sum = 0;
  formatInput(input).forEach((e, row, grid) =>
    e.forEach((val, col) => {
      const height = val;
      let count = 0;
      for (const adj of Object.values(getAdjCoords(grid, row, col))) {
        if (!adj || grid[adj[0]][adj[1]] > height) count++;
      }
      sum += count === 4 ? height + 1 : 0;
    })
  );
  return sum;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 15
console.log("Puzzle answer:", solution(puzzleInput)); // 494

// Return the coords of locations connected to the current row, col
const getBasinCoords = (map, row, col, basinCoords = {}) => {
  // Skip the current coordinate if it's not a basin or was previously visited
  if (map[row][col] === 9) return basinCoords;
  const coords = `${row},${col}`;
  if (coords in basinCoords) return basinCoords;
  // Otherwise, inspect and track all connected coordinates
  basinCoords[coords] = true;
  const adjCoords = getAdjCoords(map, row, col, basinCoords);
  for (const [row, col] of Object.values(adjCoords).filter((v) => v)) {
    basinCoords = {
      ...basinCoords,
      ...getBasinCoords(map, row, col, basinCoords),
    };
  }
  return basinCoords;
};

const solution2 = (input) => {
  const map = formatInput(input);
  const [basins, locations] = [[], []];
  // Store the coords of all locations on the map
  map.forEach((r, row) => r.map((c, col) => locations.push(`${row},${col}`)));
  while (locations.length) {
    const [row, col] = locations
      .shift()
      .split(",")
      .map((n) => +n);
    // Retrieve the current basin's coordinates and store the length
    const currentBasin = Object.keys(getBasinCoords(map, row, col));
    basins.push(currentBasin.length);
    // Remove the current basin's coordinates from the location pool
    currentBasin.forEach((b) => locations.splice(locations.indexOf(b), 1));
  }
  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 1134
console.log("Puzzle answer:", solution2(puzzleInput)); // 1048128

console.log(`\n>>> ${Date.now() - start}ms <<<`);
