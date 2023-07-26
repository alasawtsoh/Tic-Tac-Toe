let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let moveHistory = [];
let moveHistoryIndex = -1;
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const cells = document.querySelectorAll('.cell');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const restartButton = document.getElementById('restartButton');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreDrawElement = document.getElementById('scoreDraw');
const historyLog = document.getElementById('historyLog');
const clearHistoryButton = document.getElementById('clearHistoryButton');


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
  });

  undoButton.addEventListener('click', undoMove);
  redoButton.addEventListener('click', redoMove);
  restartButton.addEventListener('click', resetBoard);
  clearHistoryButton.addEventListener('click', clearHistory);
  


  function checkWinner() {
    // Define all the possible winning combinations
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  

  // Check each winning combination to see if there's a winner
  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner ('X' or 'O')
    }
  }

  return null; // No winner yet
}

function checkDraw() {
  // Check if all cells are filled and no winner
  return board.every(cell => cell !== '') && !checkWinner();
}

function makeMove(index) {
    if (board[index] === '' && !checkWinner() && !checkDraw()) {
      board[index] = currentPlayer;
      moveHistory.push(index);
      moveHistoryIndex = moveHistory.length - 1;
      cells[index].innerText = currentPlayer;
  
      const winner = checkWinner();
      if (winner) {
        updateScores(winner);
        setTimeout(() => {
          alert(winner === 'X' ? 'Player X wins!' : 'Player O wins!');
        }, 10);
      } else if (checkDraw()) {
        updateScores('Draw');
        setTimeout(() => {
          alert('It\'s a draw!');
        }, 10);
      }
  
      // Update currentPlayer after checking for winner or draw
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
      // Add the move to the history log
      historyLog.innerHTML += `<li>Player ${currentPlayer} moved to cell ${index}</li>`;
      historyLog.scrollTop = historyLog.scrollHeight; // Auto-scroll to the bottom of the log
    }
  }

  function updateScores(winner) {
  if (winner === 'X') {
    scoreX++;
    if (scoreXElement) {
      scoreXElement.innerText = scoreX;
    }
  } else if (winner === 'O') {
    scoreO++;
    if (scoreOElement) {
      scoreOElement.innerText = scoreO;
    }
  } else if (winner === 'Draw') {
    scoreDraw++;
    if (scoreDrawElement) {
      scoreDrawElement.innerText = scoreDraw;
    }
  }
}

// Initial scores display
if (scoreXElement) {
    scoreXElement.innerText = scoreX;
  }
  if (scoreOElement) {
    scoreOElement.innerText = scoreO;
  }
  if (scoreDrawElement) {
    scoreDrawElement.innerText = scoreDraw;
  }


  function undoMove() {
    if (moveHistoryIndex >= 0) {
      const index = moveHistory[moveHistoryIndex];
      board[index] = '';
      cells[index].innerText = '';
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      moveHistoryIndex--;
  
      // Remove the corresponding entry from the history log
      if (moveHistory.length > 0) {
        historyLog.removeChild(historyLog.children[moveHistoryIndex + 1]);
      }
    }
  }


  function redoMove() {
    if (moveHistoryIndex < moveHistory.length - 1) {
      moveHistoryIndex++;
      const index = moveHistory[moveHistoryIndex];
      board[index] = currentPlayer;
      cells[index].innerText = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
      // Add the redo move entry to the history log
      historyLog.innerHTML += `<li>Player ${currentPlayer} moved to cell ${index}</li>`;
      historyLog.scrollTop = historyLog.scrollHeight; // Auto-scroll to the bottom of the log
    }
  }


function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  moveHistory = [];
  moveHistoryIndex = -1;
  cells.forEach(cell => cell.innerText = '');
  historyLog.innerHTML = '';
}

function clearHistory() {
    // Clear the history log
    historyLog.innerHTML = '';
  }