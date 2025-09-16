// Select elements
const choices = document.querySelectorAll(".choice");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const hurrayScreen = document.getElementById("hurrayScreen");
const lostScreen = document.getElementById("lostScreen");
const tieScreen = document.getElementById("tieScreen");

const playerPick = document.getElementById("playerPick");
const computerPick = document.getElementById("computerPick");
const resultMessage = document.getElementById("resultMessage");

const playAgainBtn = document.getElementById("playAgain");
const nextButton = document.getElementById("nextButton");
const restartBtns = document.querySelectorAll(".restartGame");

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

const rulesBtn = document.getElementById("rulesButton");
const closeRulesBtn = document.getElementById("closeRules");
const rulesBox = document.getElementById("rulesBox");

// Scores
let playerScore = 0;
let computerScore = 0;
const WIN_SCORE = 15;

// Options
const options = ["rock", "paper", "scissors"];
const choiceIcons = {
  rock: '<i class="fas fa-hand-fist"></i>',
  paper: '<i class="fas fa-hand"></i>',
  scissors: '<i class="fas fa-hand-scissors"></i>',
};
const borderColors = {
  rock: "#0B5EA4",
  paper: "#F9A825",
  scissors: "#9B00FF",
};

// Random computer choice
function getComputerChoice() {
  return options[Math.floor(Math.random() * 3)];
}

// Winner check
function checkWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "win";
  }
  return "lose";
}

// Handle choice click
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();

    // Switch screens
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // Reset glow
    playerPick.classList.remove("glow");
    computerPick.classList.remove("glow");

    // Show picks
    playerPick.innerHTML = choiceIcons[playerChoice];
    playerPick.style.border = `10px solid ${borderColors[playerChoice]}`;
    computerPick.innerHTML = choiceIcons[computerChoice];
    computerPick.style.border = `10px solid ${borderColors[computerChoice]}`;

    // Decide result
    const result = checkWinner(playerChoice, computerChoice);
    if (result === "win") {
      playerScore++;
      resultMessage.textContent = "YOU WIN! AGAINST PC";
      playerPick.classList.add("glow");
    } else if (result === "lose") {
      computerScore++;
      resultMessage.textContent = "YOU LOSE! AGAINST PC";
      computerPick.classList.add("glow");
    } else {
      resultMessage.textContent = "TIE UP!";
    }

    // Update scores
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    // Show "Next" only when player wins
    nextButton.classList.toggle("hidden", result !== "win");

    // Final win/loss/tie
    if (playerScore >= WIN_SCORE && computerScore >= WIN_SCORE) {
      resultScreen.classList.add("hidden");
      tieScreen.classList.remove("hidden");
    } else if (playerScore >= WIN_SCORE) {
      resultScreen.classList.add("hidden");
      hurrayScreen.classList.remove("hidden");
    } else if (computerScore >= WIN_SCORE) {
      resultScreen.classList.add("hidden");
      lostScreen.classList.remove("hidden");
    }
  });
});

// Play again
playAgainBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  playerPick.classList.remove("glow");
  computerPick.classList.remove("glow");
});

// Restart (Hurray/Lost/Tie)
restartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    hurrayScreen.classList.add("hidden");
    lostScreen.classList.add("hidden");
    tieScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    document.querySelector(".header").classList.remove("hidden");
  });
});

// Next button
nextButton.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  document.querySelector(".header").classList.add("hidden");
  hurrayScreen.classList.remove("hidden");
  nextButton.classList.add("hidden");
});

// Rules button
rulesBtn.addEventListener("click", () => {
  rulesBox.classList.remove("hidden");
});
closeRulesBtn.addEventListener("click", () => {
  rulesBox.classList.add("hidden");
});
