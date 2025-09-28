// Juego de Sudoku - Día 37
class SudokuGame {
  constructor() {
    this.board = Array(9).fill().map(() => Array(9).fill(0));
    this.solution = Array(9).fill().map(() => Array(9).fill(0));
    this.selectedCell = null;
    this.startTime = null;
    this.gameTime = 0;
    this.errorCount = 0;
    this.hintCount = 3;
    this.isGameComplete = false;
    
    this.initializeElements();
    this.setupEventListeners();
    this.newGame();
  }

  initializeElements() {
    this.sudokuGrid = document.getElementById("sudokuGrid");
    this.newGameBtn = document.getElementById("newGameBtn");
    this.solveBtn = document.getElementById("solveBtn");
    this.checkBtn = document.getElementById("checkBtn");
    this.hintBtn = document.getElementById("hintBtn");
    this.difficultySelect = document.getElementById("difficultySelect");
    this.gameTimeEl = document.getElementById("gameTime");
    this.errorCountEl = document.getElementById("errorCount");
    this.hintCountEl = document.getElementById("hintCount");
    this.gameStatusEl = document.getElementById("gameStatus");
  }

  setupEventListeners() {
    this.newGameBtn.addEventListener("click", () => this.newGame());
    this.solveBtn.addEventListener("click", () => this.solveGame());
    this.checkBtn.addEventListener("click", () => this.checkGame());
    this.hintBtn.addEventListener("click", () => this.giveHint());
    this.difficultySelect.addEventListener("change", () => this.newGame());
    
    document.querySelectorAll(".number-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const number = parseInt(e.target.dataset.number);
        this.selectNumber(number);
      });
    });
  }

  newGame() {
    this.generatePuzzle();
    this.renderBoard();
    this.startTime = Date.now();
    this.gameTime = 0;
    this.errorCount = 0;
    this.hintCount = 3;
    this.isGameComplete = false;
    this.selectedCell = null;
    this.updateDisplay();
    this.updateStatus("¡Nuevo juego iniciado! Selecciona una celda y un número.");
    this.startTimer();
  }

  generatePuzzle() {
    // Generar solución completa
    this.generateSolution();
    
    // Copiar solución
    this.solution = this.board.map(row => [...row]);
    
    // Remover números según la dificultad
    const difficulty = this.difficultySelect.value;
    let cellsToRemove = 0;
    
    switch (difficulty) {
      case "easy":
        cellsToRemove = 30;
        break;
      case "medium":
        cellsToRemove = 45;
        break;
      case "hard":
        cellsToRemove = 60;
        break;
    }
    
    // Remover números aleatoriamente
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (this.board[row][col] !== 0) {
        this.board[row][col] = 0;
        removed++;
      }
    }
  }

  generateSolution() {
    // Limpiar tablero
    this.board = Array(9).fill().map(() => Array(9).fill(0));
    
    // Llenar diagonal 3x3
    this.fillDiagonal();
    
    // Resolver el resto
    this.solveSudoku();
  }

  fillDiagonal() {
    for (let i = 0; i < 9; i += 3) {
      this.fillBox(i, i);
    }
  }

  fillBox(row, col) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.shuffleArray(numbers);
    
    let index = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[row + i][col + j] = numbers[index++];
      }
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  solveSudoku() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(row, col, num)) {
              this.board[row][col] = num;
              
              if (this.solveSudoku()) {
                return true;
              }
              
              this.board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  isValidMove(row, col, num) {
    // Verificar fila
    for (let x = 0; x < 9; x++) {
      if (this.board[row][x] === num) {
        return false;
      }
    }
    
    // Verificar columna
    for (let x = 0; x < 9; x++) {
      if (this.board[x][col] === num) {
        return false;
      }
    }
    
    // Verificar caja 3x3
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    
    return true;
  }

  renderBoard() {
    this.sudokuGrid.innerHTML = "";
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement("div");
        cell.className = "sudoku-cell";
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        if (this.board[row][col] !== 0) {
          cell.textContent = this.board[row][col];
          cell.classList.add("given");
        }
        
        cell.addEventListener("click", () => this.selectCell(row, col));
        this.sudokuGrid.appendChild(cell);
      }
    }
  }

  selectCell(row, col) {
    if (this.isGameComplete) return;
    
    // Remover selección anterior
    document.querySelectorAll(".sudoku-cell.selected").forEach(cell => {
      cell.classList.remove("selected");
    });
    
    // Seleccionar nueva celda
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (cell && !cell.classList.contains("given")) {
      cell.classList.add("selected");
      this.selectedCell = { row, col };
    }
  }

  selectNumber(number) {
    if (!this.selectedCell || this.isGameComplete) return;
    
    const { row, col } = this.selectedCell;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if (number === 0) {
      // Borrar número
      this.board[row][col] = 0;
      cell.textContent = "";
      cell.classList.remove("error", "correct", "hint");
    } else {
      // Verificar si es válido
      const isValid = this.isValidMove(row, col, number);
      
      this.board[row][col] = number;
      cell.textContent = number;
      
      if (isValid) {
        cell.classList.remove("error");
        cell.classList.add("correct");
        setTimeout(() => cell.classList.remove("correct"), 1000);
      } else {
        cell.classList.remove("correct");
        cell.classList.add("error");
        this.errorCount++;
        this.updateDisplay();
        setTimeout(() => cell.classList.remove("error"), 1000);
      }
    }
    
    // Verificar si el juego está completo
    if (this.isBoardComplete()) {
      this.completeGame();
    }
  }

  isBoardComplete() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  completeGame() {
    this.isGameComplete = true;
    this.stopTimer();
    this.updateStatus("¡Felicidades! Has completado el Sudoku.", "success");
  }

  solveGame() {
    if (this.isGameComplete) return;
    
    // Copiar solución al tablero
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.board[row][col] = this.solution[row][col];
      }
    }
    
    this.renderBoard();
    this.updateStatus("¡Sudoku resuelto!", "success");
    this.isGameComplete = true;
    this.stopTimer();
  }

  checkGame() {
    if (this.isGameComplete) return;
    
    let hasErrors = false;
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const num = this.board[row][col];
        
        if (num !== 0) {
          const isValid = this.isValidMove(row, col, num);
          
          if (isValid) {
            cell.classList.remove("error");
            cell.classList.add("correct");
          } else {
            cell.classList.remove("correct");
            cell.classList.add("error");
            hasErrors = true;
          }
        }
      }
    }
    
    if (hasErrors) {
      this.updateStatus("Se encontraron errores en el tablero.", "error");
    } else {
      this.updateStatus("¡No hay errores! Continúa jugando.", "success");
    }
  }

  giveHint() {
    if (this.isGameComplete || this.hintCount <= 0) return;
    
    // Encontrar celdas vacías
    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }
    
    if (emptyCells.length === 0) return;
    
    // Seleccionar celda aleatoria
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const { row, col } = randomCell;
    
    // Mostrar número correcto
    this.board[row][col] = this.solution[row][col];
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.textContent = this.solution[row][col];
    cell.classList.add("hint");
    
    this.hintCount--;
    this.updateDisplay();
    this.updateStatus(`Pista dada. Te quedan ${this.hintCount} pistas.`, "warning");
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.gameTime = Math.floor((Date.now() - this.startTime) / 1000);
      this.updateDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateDisplay() {
    const minutes = Math.floor(this.gameTime / 60);
    const seconds = this.gameTime % 60;
    this.gameTimeEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    this.errorCountEl.textContent = this.errorCount;
    this.hintCountEl.textContent = this.hintCount;
  }

  updateStatus(message, type = "") {
    this.gameStatusEl.textContent = message;
    this.gameStatusEl.className = "game-status";
    if (type) {
      this.gameStatusEl.classList.add(type);
    }
  }
}

let sudokuGame;

document.addEventListener("DOMContentLoaded", () => {
  sudokuGame = new SudokuGame();
});
