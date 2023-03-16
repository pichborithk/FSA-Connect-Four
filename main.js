let board = [[], [], [], [], [], [], []];
const colorChoice = ['yellow', 'red'];
let player;
const columns = 7;
const holes = 6;
const buttons = document.querySelector('section.buttons');
const displayBoard = document.querySelector('.board');
const header = document.querySelector('header');
const winnerCount = 4;
const startBtn = header.querySelector('#start');
const resetBtn = header.querySelector('#reset');
let isPlaying = false;

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
  const piece = displayBoard.querySelector(
    `.columns[data-index='${indexOfColumn}'] > .holes[data-index='${indexOfHole}'] > div`
  );
  piece.className = board[indexOfColumn][indexOfHole];
  checkWinner(
    indexOfColumn,
    indexOfHole,
    board[indexOfColumn][indexOfHole],
    piece
  );
}

function dropPieces(event) {
  if (event.target.tagName !== 'BUTTON') return;
  const index = event.target.dataset.index;
  if (board[index].length && board[index].length >= holes) return;
  player = player === colorChoice[0] ? colorChoice[1] : colorChoice[0];
  board[index].push(player);
  renderPiece(event);
  if (isPlaying) renderButtonsColor(player);
}

function endGame(color) {
  const h2 = document.createElement('h2');
  h2.className = color;
  h2.innerText = `${color.toUpperCase()} WIN!!!`;
  header.appendChild(h2);
  buttons.removeEventListener('click', dropPieces);
  isPlaying = false;
}

function checkWinner(column, hole, color, currentPiece) {
  let count = 1;
  //   console.log(column, hole, color);
  // ==============***** Vertical Condition *****=====================

  currentPiece.classList.add('winner');
  for (let i = hole - 1; i >= 0; i--) {
    if (board[column][i] !== color) break;
    const piece = displayBoard.querySelector(
      `[data-index='${column}'] > [data-index='${i}'] > div`
    );
    piece.classList.add('winner');
    count++;
  }

  //==================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    const allPieces = displayBoard.querySelectorAll('div.winner');
    allPieces.forEach((piece) => piece.classList.remove('winner'));
    count = 1;
  }

  // ==============***** Horizontal Condition *****===================
  currentPiece.classList.add('winner');
  for (let i = column + 1; i < board.length; i++) {
    if (board[i][hole] !== color) break;
    const piece = displayBoard.querySelector(
      `[data-index='${i}'] > [data-index='${hole}'] > div`
    );
    piece.classList.add('winner');
    count++;
  }
  for (let i = column - 1; i >= 0; i--) {
    if (board[i][hole] !== color) break;
    const piece = displayBoard.querySelector(
      `[data-index='${i}'] > [data-index='${hole}'] > div`
    );
    piece.classList.add('winner');
    count++;
  }

  //==================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    const allPieces = displayBoard.querySelectorAll('div.winner');
    allPieces.forEach((piece) => piece.classList.remove('winner'));
    count = 1;
  }

  // ==============***** left to right Diagonal Condition *****===================
  currentPiece.classList.add('winner');
  for (let i = 1; i < 4; i++) {
    if (column + i > 6) break;
    if (board[column + i][hole + i] !== color) break;
    const piece = displayBoard.querySelector(
      `[data-index='${column + i}'] > [data-index='${hole + i}'] > div`
    );
    piece.classList.add('winner');
    count++;
  }
  for (let i = 1; i < 4; i++) {
    if (column - i < 0) break;
    if (board[column - i][hole - i] !== color) break;
    const piece = displayBoard.querySelector(
      `[data-index='${column - i}'] > [data-index='${hole - i}'] > div`
    );
    piece.classList.add('winner');
    count++;
  }

  //==================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    const allPieces = displayBoard.querySelectorAll('div.winner');
    allPieces.forEach((piece) => piece.classList.remove('winner'));
    count = 1;
  }

  // ==============***** right to left Diagonal Condition *****===================
  currentPiece.classList.add('winner');
  for (let i = 1; i < 4; i++) {
    if (column - i < 0) break;
    if (board[column - i][hole + i] !== color) break;
    const piece = displayBoard.querySelector(
      `[data-index='${column - i}'] > [data-index='${hole + i}'] > div`
    );
    piece.classList.add('winner');
    count++;
  }
  for (let i = 1; i < 4; i++) {
    if (column + i > 6) break;
    if (board[column + i][hole - i] !== color) break;
    const piece = displayBoard.querySelector(
      `[data-index='${column + i}'] > [data-index='${hole - i}'] > div`
    );
    piece.classList.add('winner');
    count++;
  }

  //============================================================================

  if (count === winnerCount) {
    endGame(color);
    return;
  } else {
    const allPieces = displayBoard.querySelectorAll('div.winner');
    allPieces.forEach((piece) => piece.classList.remove('winner'));
    count = 1;
  }
}

function startGame() {
  if (isPlaying) return;
  player = colorChoice[Math.floor(Math.random() * colorChoice.length)];
  renderButtonsColor(player);
  isPlaying = true;
  buttons.addEventListener('click', dropPieces);
}

function resetGame() {
  board = [[], [], [], [], [], [], []];
  if (header.querySelector('h2')) header.querySelector('h2').remove();
  const allPieces = displayBoard.querySelectorAll('.holes > div');
  allPieces.forEach((piece) => (piece.className = ''));
  const allButtons = buttons.querySelectorAll('button');
  allButtons.forEach((btn) => {
    btn.className = '';
  });
  buttons.removeEventListener('click', dropPieces);
  isPlaying = false;
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
