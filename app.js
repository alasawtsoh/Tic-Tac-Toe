let cells = document.querySelectorAll("[data-cell]");
let moves = [];
let currentMoveIndex = -1;
let choice = false;
let winner = null;
let counter = 0;

document.getElementById("winner").textContent = "It's O's turn";

cells.forEach((cell, i) => {
  cell.addEventListener("click", handleclick, { once: true });
});

function handleclick(e) {
  let cell = e.target;
  let move = {
    cellIndex: Array.from(cells).indexOf(cell),
    player: choice ? "X" : "O",
  };
  moves.push(move);
  currentMoveIndex++;
  
  counter++;
  if (choice === true) {
    cell.textContent = "X";
  } else {
    cell.textContent = "O";
  }
  winner = check("X");
  winner = check("O");
  if (counter == 9 && !winner) {
    document.getElementById("winner").textContent = "It's a draw";
    document.querySelector(".replay").classList.toggle("hide");
  }
  winner && document.querySelector(".replay").classList.toggle("hide");

  choice = !choice;
  updateButtons();
}

function check(pick) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      setWinner(cells[a].textContent);
      return pick;
    }
  }
}

function setWinner(p) {
  document.getElementById("winner").textContent = p + " is the winner ";

  cells.forEach((cell, i) => {
    cell.removeEventListener("click", handleclick, { once: true });
  });
}

function clean() {
  window.location.reload();
}


function showPrevious() {
  if (currentMoveIndex >= 0) {
    const move = moves[currentMoveIndex];
    const { cellIndex, player } = move;
    cells[cellIndex].textContent = "";
    choice = player === "X";
    document.getElementById("winner").textContent =
      choice ? "It's X's turn" : "It's O's turn";
    currentMoveIndex--;
    updateButtons();
  }
}

function showNext() {
  if (currentMoveIndex < moves.length - 1) {
    currentMoveIndex++;
    const move = moves[currentMoveIndex];
    const { cellIndex, player } = move;
    cells[cellIndex].textContent = player;
    choice = player === "X";
    document.getElementById("winner").textContent =
      choice ? "It's X's turn" : "It's O's turn";
    updateButtons();
  }
}

// function showPrevious() {
//   currentMoveIndex--;
//   const move = moves[currentMoveIndex];
//   if (move) {
//     const { cellIndex, player } = move;
//     cells[cellIndex].textContent = "";
//     choice = player === "X";
//     document.getElementById("winner").textContent =
//       choice ? "It's X's turn" : "It's O's turn";
//     updateButtons();
//   }
// }

// function showNext() {
//   currentMoveIndex++;
//   const move = moves[currentMoveIndex];
//   if (move) {
//     const { cellIndex, player } = move;
//     cells[cellIndex].textContent = player;
//     choice = player === "X";
//     document.getElementById("winner").textContent =
//       choice ? "It's X's turn" : "It's O's turn";
//     updateButtons();
//   }
// }

function updateButtons() {
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  previousButton.disabled = currentMoveIndex <= 0;
  nextButton.disabled = currentMoveIndex >= moves.length - 1;
}
