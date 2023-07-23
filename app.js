let cells = document.querySelectorAll("[data-cell]");

// this will give each element an event listener
cells.forEach((cell, i) => {
  cell.addEventListener("click", handleclick, { once: true });
});
let choice = false;
let winner = null;
var counter = 0;

document.getElementById("winner").textContent = "It's O's turn";
function handleclick(e) {
  // change the value in that cell
  choice
    ? (document.getElementById("winner").textContent = "It's O's turn")
    : (document.getElementById("winner").textContent = "It's X's turn");
  counter++;
  let cell = e.target;
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
}

function check(pick) {
  //Array with possible winning combinations
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

  //Prevent clicking the board after winner is set
  cells.forEach((cell, i) => {
    cell.removeEventListener("click", handleclick, { once: true });
  });
}
function clean() {
  window.location.reload();
}

// Try the most easy
// DRY : don't repeat yorself
// check for back practice
// emprove your app
