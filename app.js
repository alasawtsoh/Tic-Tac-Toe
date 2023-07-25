const cells = document.querySelectorAll("[data-cell]");
const historyLog = document.querySelector(".history-log");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let history = [];
let currentMoveIndex = -1;
let inHistoryMode = false; // Flag to indicate whether in history navigation mode

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return gameBoard.every((cell) => cell);
}

function handleNormalClick(index) {
    if (currentMoveIndex < history.length - 1) {
      history.splice(currentMoveIndex + 1);
    }
  
    if (gameBoard[index] === "" && !checkWin() && !checkDraw()) {
      gameBoard[index] = currentPlayer;
      const move = { player: currentPlayer, index: index };
      history.push(move);
  
      currentMoveIndex = history.length - 1;
      renderBoard();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
  
      if (checkWin()) {
        setTimeout(() => {
          alert(`${move.player} wins!`);
        }, 100);
      } else if (checkDraw()) {
        setTimeout(() => {
          alert("It's a draw!");
        }, 100);
      }
    }
  }
  
  function handleClick(index) {
    if (inHistoryMode) {
      // Handle click during history navigation
      exitHistoryMode(); // Exit history mode to enable normal clicks
      handleNormalClick(index); // Perform the normal click
    } else {
      handleNormalClick(index); // Handle normal click
    }
  }
  
  
  function renderBoard() {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard[index];
    });
    

  // Update history log
  historyLog.innerHTML = "";
  for (const move of history) {
    const { player, index } = move;
    const moveItem = document.createElement("div");
    moveItem.textContent = `${player} placed at position ${index}`;
    historyLog.appendChild(moveItem);
  }
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
  });
  
  renderBoard();
  
  function showPrevious() {
    if (currentMoveIndex > 0) {
      inHistoryMode = true;
      currentMoveIndex--;
      const move = history[currentMoveIndex];
      gameBoard = history.slice(0, currentMoveIndex + 1).map((move) => (move.player === "X" ? "X" : "O"));
      currentPlayer = move.player === "X" ? "O" : "X";
      renderBoard();
      exitHistoryMode(); // Call exitHistoryMode to reattach event listeners
    }
  }

 function showNext() {
  if (currentMoveIndex < history.length - 1) {
    inHistoryMode = true;
    currentMoveIndex++;
    const move = history[currentMoveIndex];
    gameBoard[move.index] = move.player;
    currentPlayer = move.player === "X" ? "O" : "X";
    renderBoard();
    exitHistoryMode(); // Call exitHistoryMode to reattach event listeners
  }
}
  

  function removeCellEventListeners() {
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleNormalClick);
    });
  }

 function exitHistoryMode() {
  inHistoryMode = false;
  removeCellEventListeners(); // Remove cell event listeners during history navigation
  renderBoard(); // Update the board after exiting history mode
}
  
  
  function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    history = [];
    currentMoveIndex = -1; // Reset the move index
    renderBoard();
    addCellEventListeners(); // Add cell event listeners after resetting the game
  }
  
  function addCellEventListeners() {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!inHistoryMode) {
          handleNormalClick(index);
        }
      });
    });
  }
  
  addCellEventListeners();
  
  function replayGame() {
    resetGame();
  } 
  
  
  let playerXScore = 0;
let playerOScore = 0;

function updateScoreboard() {
  const playerXScoreElement = document.getElementById("player-x-score");
  const playerOScoreElement = document.getElementById("player-o-score");

  playerXScoreElement.textContent = `Player X: ${playerXScore}`;
  playerOScoreElement.textContent = `Player O: ${playerOScore}`;
}