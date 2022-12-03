import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";
import sampleInput2 from "./sampleInput2.js";

// Get a mapping of each color and the { [innerColor]: <quantity> } they carry
const getInputColors = (input) => {
  const colors = {};
  input
    .split("\n")
    .map((s) => s.split(" contain "))
    .forEach(([outer, inners]) => {
      const inner = {};
      for (const desc of inners.split(", ")) {
        const [count, adj, color] = desc.split(" ");
        if (!isNaN(count)) {
          inner[`${adj} ${color}`] = +count;
        }
      }
      colors[outer.split(" ").slice(0, 2).join(" ")] = inner;
    });
  return colors;
};

// Return true if the given color is a carrier of the target, false otherwise
const isCarrier = (colors, color, target) => {
  let carries = false;
  const innerColors = Object.keys(colors[color]);
  // Direct carrier
  if (innerColors.includes(target)) {
    carries = true;
  } else {
    // Indirect carrier
    for (const innerColor of innerColors) {
      if (isCarrier(colors, innerColor, target)) carries = true;
    }
  }
  return carries;
};

const solution = (input, target = "shiny gold") => {
  const colors = getInputColors(input);
  let count = 0;
  for (const color of Object.keys(colors)) {
    if (isCarrier(colors, color, target)) count++;
  }
  return count;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 4
console.log("Puzzle answer:", solution(puzzleInput)); // 265

// Return how many bags are required inside a bag with the given outer color
const countBags = (colors, color, bagCount = 0) => {
  const innerColors = Object.entries(colors[color]);
  if (innerColors.length) {
    for (const [innerColor, innerColorCount] of innerColors) {
      // Count the # of bags inside each innerColor then multiply by its quantity
      // Initial bagCount is set to 1 since we want to count the innerColor bag itself
      bagCount += countBags(colors, innerColor, 1) * innerColorCount;
    }
  }
  return bagCount;
};

const solution2 = (input, target = "shiny gold") => {
  return countBags(getInputColors(input), target);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput2)); // 126
console.log("Puzzle answer:", solution2(puzzleInput)); // 14177
