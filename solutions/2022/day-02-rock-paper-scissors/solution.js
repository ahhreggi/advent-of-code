import sampleInput from "./sampleInput.js";
import puzzleInput from "./puzzleInput.js";

// Return the shape that corresponds to the given letter
const getShape = (letter) => {
  const map = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors",
  };
  return map[letter];
};

// Return the score that corresponds to the given shape
const getShapeScore = (shape) => {
  const scores = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };
  return scores[shape];
};

// Calculate the score given a pair of [opponent, player]
const calculateScore = (combination) => {
  const [opponent, player] = combination;
  const opponentShape = getShape(opponent);
  const playerShape = getShape(player);
  const playerScore = getShapeScore(playerShape);
  let totalScore = playerScore;
  // draw
  if (opponentShape === playerShape) {
    totalScore += 3;
    // win
  } else if (
    (opponentShape === "rock" && playerShape === "paper") ||
    (opponentShape === "paper" && playerShape === "scissors") ||
    (opponentShape === "scissors" && playerShape === "rock")
  ) {
    totalScore += 6;
  }
  return totalScore;
};

const getCombinations = (input) => {
  return input.split("\n").map((s) => s.split(" "));
};

const solution = (input) => {
  return getCombinations(input)
    .map((c) => calculateScore(c))
    .reduce((a, b) => a + b);
};

console.log("[ Part One ]");
console.log("Sample answer:", solution(sampleInput)); // 15
console.log("Puzzle answer:", solution(puzzleInput)); // 11449

const getResultScore = (letter) => {
  const map = {
    X: 0,
    Y: 3,
    Z: 6,
  };
  return map[letter];
};

// Return the shape required to win/lose against the given shape
const getPairing = (shape, win) => {
  const map = {
    rock: ["paper", "scissors"],
    paper: ["scissors", "rock"],
    scissors: ["rock", "paper"],
  };
  return win ? map[shape][0] : map[shape][1];
};

// Calculate the score given opponent move and the result outcome
const calculateScore2 = (combination) => {
  const [opponent, result] = combination;
  const resultScore = getResultScore(result);
  const opponentShape = getShape(opponent);
  let playerShape;
  // lose
  if (resultScore === 0) {
    playerShape = getPairing(opponentShape, false);
    // draw
  } else if (resultScore === 3) {
    playerShape = opponentShape;
    // win
  } else if (resultScore === 6) {
    playerShape = getPairing(opponentShape, true);
  }
  const playerScore = getShapeScore(playerShape);
  return playerScore + resultScore;
};

const solution2 = (input) => {
  return getCombinations(input)
    .map((game) => calculateScore2(game))
    .reduce((a, b) => a + b);
};

console.log("\n[ Part Two ]");
console.log("Sample answer:", solution2(sampleInput)); // 12
console.log("Puzzle answer:", solution2(puzzleInput)); // 13187
