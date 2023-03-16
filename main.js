const board = [[], [], [], [], [], [], []];
const colorChoice = ['yellow', 'red'];
let player;
const columns = 7;
const holes = 6;
const buttons = document.querySelector('section.buttons');
const displayBoard = document.querySelector('.board');
const header = document.querySelector('header');
const winnerCount = 4;
const startBtn = header.querySelector('button');
let isStart = false;

function buildBoard() {
  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.className = 'columns';
    column.dataset.index = i;
    for (let j = 0; j < holes; j++) {
      const hole = document.createElement('div');
      const piece = document.createElement('div');
      hole.className = 'holes';
      hole.dataset.index = j;
      hole.appendChild(piece);
      column.appendChild(hole);
    }
    displayBoard.appendChild(column);
  }
}

buildBoard();

function renderButtonsColor(color) {
  color = color === colorChoice[0] ? colorChoice[1] : colorChoice[0];
  const allButtons = buttons.querySelectorAll('button');
  allButtons.forEach((btn) => {
    btn.className = '';
    btn.className = color;
  });
}

function renderPiece(event) {
  const indexOfColumn = Number(event.target.dataset.index);
  const indexOfHole = board[indexOfColumn].length - 1;
  const hole = document.querySelector(
    `.columns[data-index='${indexOfColumn}'] > .holes[data-index='${indexOfHole}']`
  );
  const piece = hole.querySelector('div');
  piece.className = board[indexOfColumn][indexOfHole];
  checkWinner(indexOfColumn, indexOfHole, board[indexOfColumn][indexOfHole]);
}

function dropPieces(event) {
  player = player === colorChoice[0] ? colorChoice[1] : colorChoice[0];
  const index = event.target.dataset.index;
  board[index].push(player);
  renderPiece(event);
  renderButtonsColor(player);
}

function endGame(color) {
  const h2 = document.createElement('h2');
  h2.className = color;
  h2.innerText = `${color.toUpperCase()} WIN!!!`;
  header.appendChild(h2);
  buttons.removeEventListener('click', dropPieces);
}

function checkWinner(column, hole, color) {
  let count = 1;
  //   console.log(column, hole, color);
  // ==============***** Vertical Condition *****=====================

  for (let i = hole - 1; i >= 0; i--) {
    if (board[column][i] !== color) break;
    count++;
  }

  //==================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    count = 1;
  }

  // ==============***** Horizontal Condition *****===================

  for (let i = column + 1; i < board.length; i++) {
    if (board[i][hole] !== color) break;
    count++;
  }
  for (let i = column - 1; i >= 0; i--) {
    if (board[i][hole] !== color) break;
    count++;
  }

  //==================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    count = 1;
  }

  // ==============***** left to right Diagonal Condition *****===================

  for (let i = 1; i < 4; i++) {
    if (column + i > 6) break;
    if (board[column + i][hole + i] !== color) break;
    count++;
  }
  for (let i = 1; i < 4; i++) {
    if (column - i < 0) break;
    if (board[column - i][hole - i] !== color) break;
    count++;
  }

  //==================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    count = 1;
  }

  // ==============***** right to left Diagonal Condition *****===================

  for (let i = 1; i < 4; i++) {
    if (column - i < 0) break;
    if (board[column - i][hole + i] !== color) break;
    count++;
  }
  for (let i = 1; i < 4; i++) {
    if (column + i > 6) break;
    if (board[column + i][hole - i] !== color) break;
    count++;
  }

  //============================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    count = 1;
  }
}

function startGame() {
  if (isStart) return;
  player = colorChoice[Math.floor(Math.random() * colorChoice.length)];
  renderButtonsColor(player);
  isStart = true;
  buttons.addEventListener('click', dropPieces);
}

startBtn.addEventListener('click', startGame);
