# 🎮 Día 20: Juego de Snake

## 📋 Descripción
Juego clásico de Snake con controles de teclado, sistema de puntuación, diferentes velocidades y diseño moderno.

## ✨ Características
- **Controles de teclado** (flechas direccionales)
- **Sistema de puntuación** y mejor puntuación
- **Diferentes velocidades** de juego
- **Colisiones** con paredes y cuerpo
- **Crecimiento** de la serpiente al comer
- **Diseño retro** y moderno
- **Responsive design**

## 🚀 Cómo Funciona

### Lógica del Juego
```javascript
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameRunning = false;
let gameSpeed = 150;

function gameLoop() {
  if (!gameRunning) return;
  
  moveSnake();
  checkCollisions();
  checkFood();
  draw();
  
  setTimeout(gameLoop, gameSpeed);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  
  if (head.x !== food.x || head.y !== food.y) {
    snake.pop();
  }
}
```

### Detección de Colisiones
```javascript
function checkCollisions() {
  const head = snake[0];
  
  // Colisión con paredes
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    gameOver();
    return;
  }
  
  // Colisión con el cuerpo
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }
}

function checkFood() {
  const head = snake[0];
  
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    updateScore();
    generateFood();
    
    // Aumentar velocidad
    if (gameSpeed > 50) {
      gameSpeed -= 5;
    }
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Game loops**: Ciclos de juego
- **setTimeout()**: Control de velocidad
- **Array methods**: unshift(), pop()
- **Event handling**: Controles de teclado
- **Math.random()**: Generación de comida
- **LocalStorage**: Mejores puntuaciones

### CSS
- **Grid para el tablero**: Layout del juego
- **Animaciones**: Efectos visuales
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad
- **Custom properties**: Variables CSS

### Lógica de Juegos
- **Game state management**: Control del estado
- **Collision detection**: Detección de colisiones
- **Score system**: Sistema de puntuación
- **Difficulty scaling**: Escalado de dificultad

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Canvas, estructura
- **CSS3**: Grid, animaciones, responsive
- **JavaScript ES6+**: Lógica del juego
- **Canvas API**: Renderizado

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid escalable**: Se adapta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Teclado**: 
  - `↑`: Mover arriba
  - `↓`: Mover abajo
  - `←`: Mover izquierda
  - `→`: Mover derecha
  - `Espacio`: Pausar/Reanudar
  - `R`: Reiniciar juego

## 🔧 Estructura del Código
```
dia-020/
├── index.html          # Estructura HTML + canvas
├── app.css            # Estilos + responsive design
├── app.js             # Lógica del juego
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Usa las flechas para mover la serpiente
3. Come la comida para crecer y ganar puntos
4. Evita chocar con las paredes o tu cuerpo
5. Intenta conseguir la mejor puntuación

## 💡 Mejoras Futuras
- [ ] Diferentes niveles de dificultad
- [ ] Obstáculos en el tablero
- [ ] Power-ups especiales
- [ ] Modo multijugador
- [ ] Sonidos de juego
- [ ] Temas de colores

## �� Estadísticas Técnicas
- **Líneas de código**: ~200 líneas
- **Tiempo de desarrollo**: ~3 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **APIs**: Canvas

## 🎮 Casos de Uso
- **Entretenimiento**: Juego clásico
- **Educación**: Aprendizaje de programación
- **Desarrollo**: Base para juegos más complejos
- **Competencia**: Torneos de puntuación

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 20*
