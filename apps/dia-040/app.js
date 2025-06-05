// Juego de Snake - Día 40
class SnakeGame {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.gameLoop = null;
    this.isRunning = false;
    this.isPaused = false;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
    this.snake = [];
    this.food = null;
    this.direction = "right";
    this.nextDirection = "right";
    this.gridSize = 25;
    this.cellSize = 16;
    this.speed = 150;
    this.theme = "classic";
    
    this.initializeElements();
    this.setupEventListeners();
    this.updateDisplay();
  }

  initializeElements() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.gameOverlay = document.getElementById("gameOverlay");
    this.overlayTitle = document.getElementById("overlayTitle");
    this.overlayMessage = document.getElementById("overlayMessage");
    this.overlayStartBtn = document.getElementById("overlayStartBtn");
    this.scoreEl = document.getElementById("score");
    this.highScoreEl = document.getElementById("highScore");
    this.speedEl = document.getElementById("speed");
    this.lengthEl = document.getElementById("length");
    this.difficultySelect = document.getElementById("difficultySelect");
    this.gridSizeSelect = document.getElementById("gridSizeSelect");
    this.themeSelect = document.getElementById("themeSelect");
  }

  setupEventListeners() {
    this.startBtn.addEventListener("click", () => this.startGame());
    this.pauseBtn.addEventListener("click", () => this.togglePause());
    this.resetBtn.addEventListener("click", () => this.resetGame());
    this.overlayStartBtn.addEventListener("click", () => this.startGame());
    
    this.difficultySelect.addEventListener("change", () => this.updateSettings());
    this.gridSizeSelect.addEventListener("change", () => this.updateSettings());
    this.themeSelect.addEventListener("change", () => this.updateTheme());
    
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
  }

  updateSettings() {
    const difficulty = this.difficultySelect.value;
    const gridSize = this.gridSizeSelect.value;
    
    switch (difficulty) {
      case "easy":
        this.speed = 200;
        break;
      case "medium":
        this.speed = 150;
        break;
      case "hard":
        this.speed = 100;
        break;
    }
    
    switch (gridSize) {
      case "small":
        this.gridSize = 20;
        this.cellSize = 20;
        break;
      case "medium":
        this.gridSize = 25;
        this.cellSize = 16;
        break;
      case "large":
        this.gridSize = 30;
        this.cellSize = 13.33;
        break;
    }
    
    this.canvas.width = this.gridSize * this.cellSize;
    this.canvas.height = this.gridSize * this.cellSize;
    
    if (this.isRunning) {
      this.resetGame();
    }
  }

  updateTheme() {
    this.theme = this.themeSelect.value;
    const gameContainer = document.querySelector(".game-container");
    gameContainer.className = "game-container " + this.theme;
  }

  startGame() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.isPaused = false;
    this.score = 0;
    this.snake = [{ x: Math.floor(this.gridSize / 2), y: Math.floor(this.gridSize / 2) }];
    this.direction = "right";
    this.nextDirection = "right";
    this.food = this.generateFood();
    
    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;
    this.gameOverlay.style.display = "none";
    
    this.updateDisplay();
    this.gameLoop = setInterval(() => this.update(), this.speed);
  }

  togglePause() {
    if (!this.isRunning) return;
    
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      clearInterval(this.gameLoop);
      this.pauseBtn.textContent = "▶️ Continuar";
      this.overlayTitle.textContent = "Juego Pausado";
      this.overlayMessage.textContent = "Presiona Continuar para reanudar";
      this.gameOverlay.style.display = "flex";
    } else {
      this.pauseBtn.textContent = "⏸️ Pausar";
      this.gameOverlay.style.display = "none";
      this.gameLoop = setInterval(() => this.update(), this.speed);
    }
  }

  resetGame() {
    this.isRunning = false;
    this.isPaused = false;
    clearInterval(this.gameLoop);
    
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.pauseBtn.textContent = "⏸️ Pausar";
    
    this.overlayTitle.textContent = "¡Bienvenido!";
    this.overlayMessage.textContent = "Presiona Iniciar para comenzar a jugar";
    this.gameOverlay.style.display = "flex";
    
    this.draw();
  }

  update() {
    if (this.isPaused) return;
    
    this.direction = this.nextDirection;
    
    const head = { ...this.snake[0] };
    
    switch (this.direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }
    
    if (this.checkCollision(head)) {
      this.gameOver();
      return;
    }
    
    this.snake.unshift(head);
    
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.food = this.generateFood();
      this.updateDisplay();
    } else {
      this.snake.pop();
    }
    
    this.draw();
  }

  checkCollision(head) {
    if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
      return true;
    }
    
    return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
  }

  generateFood() {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };
    } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
    
    return food;
  }

  gameOver() {
    this.isRunning = false;
    clearInterval(this.gameLoop);
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("snakeHighScore", this.highScore.toString());
    }
    
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    
    this.overlayTitle.textContent = "¡Game Over!";
    this.overlayMessage.textContent = `Puntuación: ${this.score}`;
    this.gameOverlay.style.display = "flex";
    
    this.updateDisplay();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawSnake();
    this.drawFood();
  }

  drawSnake() {
    this.snake.forEach((segment, index) => {
      this.ctx.fillStyle = index === 0 ? "#4ade80" : "#22c55e";
      this.ctx.fillRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize - 1,
        this.cellSize - 1
      );
      
      if (this.theme === "neon") {
        this.ctx.strokeStyle = "#00ffff";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(
          segment.x * this.cellSize,
          segment.y * this.cellSize,
          this.cellSize - 1,
          this.cellSize - 1
        );
      }
    });
  }

  drawFood() {
    this.ctx.fillStyle = "#ef4444";
    this.ctx.fillRect(
      this.food.x * this.cellSize,
      this.food.y * this.cellSize,
      this.cellSize - 1,
      this.cellSize - 1
    );
    
    if (this.theme === "neon") {
      this.ctx.strokeStyle = "#ff00ff";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        this.food.x * this.cellSize,
        this.food.y * this.cellSize,
        this.cellSize - 1,
        this.cellSize - 1
      );
    }
  }

  handleKeyPress(e) {
    if (!this.isRunning || this.isPaused) return;
    
    switch (e.key) {
      case "ArrowUp":
        if (this.direction !== "down") this.nextDirection = "up";
        break;
      case "ArrowDown":
        if (this.direction !== "up") this.nextDirection = "down";
        break;
      case "ArrowLeft":
        if (this.direction !== "right") this.nextDirection = "left";
        break;
      case "ArrowRight":
        if (this.direction !== "left") this.nextDirection = "right";
        break;
      case " ":
        e.preventDefault();
        this.togglePause();
        break;
      case "r":
      case "R":
        this.resetGame();
        break;
    }
  }

  updateDisplay() {
    this.scoreEl.textContent = this.score;
    this.highScoreEl.textContent = this.highScore;
    this.speedEl.textContent = Math.floor(1000 / this.speed);
    this.lengthEl.textContent = this.snake.length;
  }
}

let snakeGame;

document.addEventListener("DOMContentLoaded", () => {
  snakeGame = new SnakeGame();
});
