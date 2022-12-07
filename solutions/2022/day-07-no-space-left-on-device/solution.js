import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

// Return an empty directory object
const createDir = (name, isRoot = false) => ({ name, size: 0, isRoot });

// Construct and return a directory tree object using the given terminal output array
const buildTree = (output, tree = createDir("/", true)) => {
  if (!output.length) {
    return tree.isRoot ? tree : { updatedOutput: output, subTree: tree };
  }
  const [prefix, name] = output[0].split(" ");
  if (prefix === "cd") {
    // Return the current subdirectory and updated output
    if (name === "..") return { updatedOutput: output, subTree: tree };
    // Move and build into an existing subdirectory
    const { subTree, updatedOutput } = buildTree(output.slice(1), tree[name]);
    output = updatedOutput;
    tree = { ...tree, [name]: subTree, size: tree.size + subTree.size };
    // Initialize a new directory
  } else if (prefix === "dir") {
    tree = { ...tree, [name]: createDir(name) };
    // Store a file's size
  } else if (!isNaN(prefix)) {
    tree.size += +prefix;
  }
  return buildTree(output.slice(1), tree);
};

// Return an array of all directory sizes in a tree
const getSizes = (tree, min = 0, max = 70000000) => {
  const sizes = min <= tree.size && tree.size <= max ? [tree.size] : [];
  for (const item of Object.values(tree)) {
    if (item.name) sizes.push(...getSizes(item, min, max));
  }
  return sizes;
};

const formatInput = (input) => {
  return input
    .split("\n")
    .map((l) => (l[0] === "$" ? l.slice(2) : l))
    .slice(1);
};

const solution = (input) => {
  const tree = buildTree(formatInput(input));
  return getSizes(tree, 0, 100000).reduce((a, b) => a + b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 95437
console.log("Puzzle answer:", solution(puzzleInput)); // 1428881

const solution2 = (input) => {
  const tree = buildTree(formatInput(input));
  const minimum = 30000000 - (70000000 - tree.size);
  return getSizes(tree, minimum).sort((a, b) => a - b)[0];
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 24933642
console.log("Puzzle answer:", solution2(puzzleInput)); // 10475598

console.log(`\n>>> ${Date.now() - start}ms <<<`);
