import sampleInput from "./sampleInput.js";
import sampleInput2 from "./sampleInput2.js";
import puzzleInput from "./puzzleInput.js";

const start = Date.now();

const solution = (input, n = 2) => {
  const knots = [...new Array(n--).fill().map(() => ({ x: 0, y: 0 }))];
  const visited = new Set();
  for (const [dir, dist] of input.split("\n").map((e) => e.split(" "))) {
    for (let i = 0; i < +dist; i++) {
      const axis = ["L", "R"].includes(dir) ? "x" : "y";
      knots[0][axis] += ["L", "U"].includes(dir) ? -1 : 1;
      for (let k = 0; k < n; k++) {
        const dx = knots[k].x - knots[k + 1].x;
        const dy = knots[k].y - knots[k + 1].y;
        const [dxVal, dyVal] = [Math.sign(dx), Math.sign(dy)];
        if (Math.abs(dx) > 1) {
          knots[k + 1].x += dxVal;
          knots[k + 1].y += dy !== 0 ? dyVal : 0;
        } else if (Math.abs(dy) > 1) {
          knots[k + 1].y += dyVal;
          knots[k + 1].x += dx !== 0 ? dxVal : 0;
        }
      }
      visited.add(`${knots[n].x},${knots[n].y}`);
    }
  }
  return visited.size;
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput, 2)); // 13
console.log("Puzzle answer:", solution(puzzleInput, 2)); // 5902

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution(sampleInput2, 10)); // 36
console.log("Puzzle answer:", solution(puzzleInput, 10)); // 2445

console.log(`\n>>> ${Date.now() - start}ms <<<`);
