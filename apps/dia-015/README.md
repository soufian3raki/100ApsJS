# ⭕ Día 15: Tic-Tac-Toe

## 📋 Descripción
Juego clásico de tres en línea con modo de un jugador contra IA, modo multijugador y sistema de puntuación.

## ✨ Características
- **Modo un jugador vs IA**
- **Modo multijugador local**
- **IA inteligente** (minimax algorithm)
- **Sistema de puntuación**
- **Animaciones de victoria**
- **Reinicio de partida**
- **Diseño clásico** y moderno

## 🚀 Cómo Funciona

### Lógica del Juego
```javascript
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0, ties: 0 };

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6] // Diagonales
];

function makeMove(cellIndex) {
  if (board[cellIndex] !== "" || !gameActive) return;
  
  board[cellIndex] = currentPlayer;
  updateCell(cellIndex);
  
  if (checkWinner()) {
    gameActive = false;
    updateScores();
    showWinner();
  } else if (board.every(cell => cell !== "")) {
    gameActive = false;
    scores.ties++;
    showTie();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateCurrentPlayer();
    
    if (gameMode === "single" && currentPlayer === "O") {
      setTimeout(makeAIMove, 500);
    }
  }
}
```

### Algoritmo Minimax para IA
```javascript
function minimax(board, depth, isMaximizing) {
  const winner = checkWinner();
  
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (board.every(cell => cell !== "")) return 0;
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Arrays para representar el tablero**: Estructura de datos
- **Algoritmo minimax**: IA inteligente
- **Event delegation**: Gestión eficiente de eventos
- **Game state management**: Control del juego
- **LocalStorage**: Puntuaciones persistentes
- **setTimeout()**: Delays de IA

### CSS
- **CSS Grid para el tablero**: Layout de 3x3
- **Animaciones de victoria**: Efectos visuales
- **Hover effects**: Interactividad visual
- **Responsive design**: Adaptación móvil
- **Transform para efectos**: Animaciones

### Algoritmos
- **Minimax algorithm**: Algoritmo de IA
- **Game tree traversal**: Exploración de posibilidades
- **Heuristic evaluation**: Evaluación de posiciones
- **Recursive functions**: Funciones recursivas

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura del tablero
- **CSS3**: Grid, animaciones, responsive
- **JavaScript ES6+**: Lógica del juego
- **LocalStorage**: Puntuaciones

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid escalable**: Se adapta al tamaño
- **Touch friendly**: Casillas de tamaño apropiado
- **Legibilidad**: Símbolos claros

## 🎮 Controles
- **Mouse**: Clic en casillas del tablero
- **Teclado**: 
  - `1-9`: Seleccionar casilla
  - `R`: Reiniciar partida
  - `M`: Cambiar modo de juego

## 🔧 Estructura del Código
```
dia-015/
├── index.html          # Estructura HTML + tablero
├── app.css            # Estilos + animaciones
├── app.js             # Lógica del juego + IA
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona el modo de juego
3. Haz clic en una casilla para jugar
4. La IA juega automáticamente en modo un jugador
5. Gana al hacer tres en línea

## ⭕ Modos de Juego
- **Un Jugador**: Contra IA inteligente
- **Dos Jugadores**: Multijugador local
- **IA vs IA**: Demostración automática

## 💡 Mejoras Futuras
- [ ] Diferentes niveles de IA
- [ ] Tableros más grandes (4x4, 5x5)
- [ ] Modo torneo
- [ ] Estadísticas detalladas
- **Sonidos de juego**
- **Temas de colores**

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~300 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Alta
- **Dependencias**: Ninguna
- **Algoritmos**: Minimax implementado

## ⭕ Casos de Uso
- **Entretenimiento**: Juego clásico
- **Educación**: Aprendizaje de algoritmos
- **Desarrollo**: Base para juegos más complejos
- **IA**: Demostración de algoritmos

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 15*
