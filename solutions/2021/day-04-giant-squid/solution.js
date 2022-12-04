import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

const formatBoard = (board) => {
  return board.map((row) =>
    row
      .split(" ")
      .filter((n) => n.length)
      .map((n) => +n)
  );
};

const formatInput = (input) => {
  const inputList = input.split("\n");
  const draws = inputList[0].split(",").map((n) => +n);
  const boards = [];
  let currentBoard = [];
  for (let i = 2; i < inputList.length; i++) {
    if (inputList[i] === "") {
      boards.push(formatBoard(currentBoard));
      currentBoard = [];
    } else {
      currentBoard.push(inputList[i]);
      if (i === inputList.length - 1) {
        boards.push(formatBoard(currentBoard));
      }
    }
  }
  return { draws, boards };
};

// Return the number of draws to win and score of the given board
const getWinStats = (board, draws) => {
  // Map out the coordinates of each number on the board
  const numberMap = {};
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const number = board[row][col];
      numberMap[number] = [row, col];
    }
  }
  // Keep track of the # of drawn numbers per row/column
  const rowDrawCounter = Object.assign({}, [0, 0, 0, 0, 0]);
  const columnDrawCounter = Object.assign({}, [0, 0, 0, 0, 0]);
  let drawCount = 0;
  // For each draw
  for (const draw of draws) {
    drawCount++;
    // Get the coordinates of it on the board if it exists
    if (draw in numberMap) {
      const [row, col] = numberMap[draw];
      delete numberMap[draw];
      // Keep track of draws for the affected row and column
      rowDrawCounter[row]++;
      columnDrawCounter[col]++;
      // Check if the row/column won
      if (rowDrawCounter[row] === 5 || columnDrawCounter[col] === 5) {
        // Get the sum of the unmarked numbers
        const unmarkedSum = Object.keys(numberMap)
          .map((n) => +n)
          .reduce((a, b) => a + b);
        return { drawCount, score: draw * unmarkedSum };
      }
    }
  }
};

const solution = (input) => {
  // Separate the draws from the boards
  const { draws, boards } = formatInput(input);
  return (
    boards
      // Determine how many draws are required for each board to win
      .map((board) => getWinStats(board, draws))
      // Return the score of the board that wins first
      .sort((a, b) => a.drawCount - b.drawCount)[0].score
  );
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 4512
console.log("Puzzle answer:", solution(puzzleInput)); // 50008

const solution2 = (input) => {
  // Separate the draws from the boards
  const { draws, boards } = formatInput(input);
  return (
    boards
      // Determine how many draws are required for each board to win
      .map((board) => getWinStats(board, draws))
      // Return the score of the board that wins last
      .sort((a, b) => b.drawCount - a.drawCount)[0].score
  );
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 1924
console.log("Puzzle answer:", solution2(puzzleInput)); // 17408
