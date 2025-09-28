// Tic-Tac-Toe Game App
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = '2players'; // 2players, vsComputer, computerVsComputer
let scores = { X: 0, O: 0 };
let stats = {
  gamesPlayed: 0,
  draws: 0,
  fastestWin: null
};
let history = [];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Elements
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const playerX = document.getElementById('playerX');
const playerO = document.getElementById('playerO');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const newGameBtn = document.getElementById('newGameBtn');
const resetBtn = document.getElementById('resetBtn');
const changeModeBtn = document.getElementById('changeModeBtn');
const gamesPlayed = document.getElementById('gamesPlayed');
const draws = document.getElementById('draws');
const fastestWin = document.getElementById('fastestWin');
const historyList = document.getElementById('historyList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadHistory();
  setupGame();
  
  // Event listeners
  newGameBtn.addEventListener('click', newGame);
  resetBtn.addEventListener('click', resetGame);
  changeModeBtn.addEventListener('click', changeGameMode);
  
  // Board cell clicks
  gameBoard.addEventListener('click', handleCellClick);
});

function setupGame() {
  updateDisplay();
  updateStats();
  updateHistory();
}

function handleCellClick(e) {
  if (!e.target.classList.contains('cell')) return;
  
  const index = parseInt(e.target.dataset.index);
  
  if (board[index] !== '' || !gameActive) return;
  
  makeMove(index);
  
  if (gameMode === 'vsComputer' && gameActive && currentPlayer === 'O') {
    setTimeout(makeComputerMove, 500);
  } else if (gameMode === 'computerVsComputer' && gameActive) {
    setTimeout(makeComputerMove, 1000);
  }
}

function makeMove(index) {
  board[index] = currentPlayer;
  updateCell(index);
  
  if (checkWin()) {
    endGame('win');
  } else if (checkDraw()) {
    endGame('draw');
  } else {
    switchPlayer();
  }
}

function makeComputerMove() {
  if (!gameActive) return;
  
  let move;
  
  if (gameMode === 'computerVsComputer') {
    // Simple AI for computer vs computer
    move = getRandomMove();
  } else {
    // Slightly smarter AI for vs computer
    move = getBestMove();
  }
  
  if (move !== null) {
    makeMove(move);
  }
}

function getRandomMove() {
  const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function getBestMove() {
  // Try to win
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      if (checkWin()) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }
  
  // Try to block
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'X';
      if (checkWin()) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }
  
  // Take center if available
  if (board[4] === '') return 4;
  
  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === '');
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any available cell
  return getRandomMove();
}

function checkWin() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCells(combination, board[a]);
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return board.every(cell => cell !== '');
}

function highlightWinningCells(combination, winner) {
  combination.forEach(index => {
    const cell = gameBoard.children[index];
    cell.classList.add('winning');
    // Asegurar que el color del texto sea blanco para el ganador
    cell.style.color = 'white';
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateDisplay();
}

function endGame(result) {
  gameActive = false;
  
  if (result === 'win') {
    scores[currentPlayer]++;
    const moves = board.filter(cell => cell !== '').length;
    if (!stats.fastestWin || moves < stats.fastestWin) {
      stats.fastestWin = moves;
    }
    gameStatus.textContent = `¡${currentPlayer} gana!`;
  } else {
    stats.draws++;
    gameStatus.textContent = '¡Empate!';
  }
  
  stats.gamesPlayed++;
  saveStats();
  updateStats();
  
  // Add to history
  const gameResult = {
    winner: result === 'win' ? currentPlayer : 'Draw',
    moves: board.filter(cell => cell !== '').length,
    timestamp: new Date().toLocaleString(),
    mode: gameMode
  };
  history.unshift(gameResult);
  if (history.length > 10) history.pop();
  saveHistory();
  updateHistory();
}

function newGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  gameStatus.textContent = 'Turno de X';
  
  // Clear board display
  Array.from(gameBoard.children).forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winning');
    cell.style.color = ''; // Reset color
  });
  
  updateDisplay();
  
  if (gameMode === 'computerVsComputer') {
    setTimeout(makeComputerMove, 1000);
  }
}

function resetGame() {
  scores.X = 0;
  scores.O = 0;
  stats.gamesPlayed = 0;
  stats.draws = 0;
  stats.fastestWin = null;
  history = [];
  
  saveStats();
  saveHistory();
  updateStats();
  updateHistory();
  newGame();
}

function changeGameMode() {
  const modes = ['2players', 'vsComputer', 'computerVsComputer'];
  const currentIndex = modes.indexOf(gameMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  gameMode = modes[nextIndex];
  
  const modeNames = {
    '2players': '2 Jugadores',
    'vsComputer': 'vs Computadora',
    'computerVsComputer': 'IA vs IA'
  };
  
  gameStatus.textContent = `Modo: ${modeNames[gameMode]}`;
  
  if (gameMode === 'computerVsComputer') {
    setTimeout(makeComputerMove, 1000);
  }
}

function updateCell(index) {
  const cell = gameBoard.children[index];
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
}

function updateDisplay() {
  // Update player indicators
  playerX.classList.toggle('active', currentPlayer === 'X');
  playerO.classList.toggle('active', currentPlayer === 'O');
  
  // Update scores
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  
  if (gameActive) {
    gameStatus.textContent = `Turno de ${currentPlayer}`;
  }
}

function updateStats() {
  gamesPlayed.textContent = stats.gamesPlayed;
  draws.textContent = stats.draws;
  fastestWin.textContent = stats.fastestWin ? `${stats.fastestWin} movimientos` : '-';
}

function updateHistory() {
  historyList.innerHTML = '';
  
  history.forEach(game => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="result">${game.winner === 'Draw' ? 'Empate' : `Ganó ${game.winner}`}</div>
      <div class="details">${game.moves} movimientos • ${game.timestamp}</div>
    `;
    historyList.appendChild(item);
  });
}

function saveStats() {
  localStorage.setItem('tictactoe-stats', JSON.stringify(stats));
  localStorage.setItem('tictactoe-scores', JSON.stringify(scores));
}

function loadStats() {
  const savedStats = localStorage.getItem('tictactoe-stats');
  const savedScores = localStorage.getItem('tictactoe-scores');
  
  if (savedStats) {
    stats = JSON.parse(savedStats);
  }
  if (savedScores) {
    scores = JSON.parse(savedScores);
  }
}

function saveHistory() {
  localStorage.setItem('tictactoe-history', JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem('tictactoe-history');
  if (saved) {
    history = JSON.parse(saved);
  }
} 