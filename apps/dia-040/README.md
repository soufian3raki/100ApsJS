# 🐍 Día 40: Juego de Snake

## 📋 Descripción
Juego clásico de Snake con controles de teclado, múltiples dificultades, temas visuales y sistema de puntuación.

## ✨ Características
- **Juego clásico** de Snake con controles intuitivos
- **Múltiples dificultades** (Fácil, Medio, Difícil)
- **Diferentes tamaños** de tablero (20x20, 25x25, 30x30)
- **Temas visuales** (Clásico, Neón, Retro)
- **Sistema de puntuación** con récord personal
- **Controles de teclado** y botones
- **Interfaz responsive** y moderna

## 🚀 Cómo Funciona

### Lógica del Juego
```javascript
update() {
  if (this.isPaused) return;
  
  this.direction = this.nextDirection;
  
  const head = { ...this.snake[0] };
  
  switch (this.direction) {
    case "up": head.y--; break;
    case "down": head.y++; break;
    case "left": head.x--; break;
    case "right": head.x++; break;
  }
  
  if (this.checkCollision(head)) {
    this.gameOver();
    return;
  }
  
  this.snake.unshift(head);
  
  if (head.x === this.food.x && head.y === this.food.y) {
    this.score += 10;
    this.food = this.generateFood();
  } else {
    this.snake.pop();
  }
  
  this.draw();
}
```

### Detección de Colisiones
```javascript
checkCollision(head) {
  if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
    return true;
  }
  
  return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
}
```

### Generación de Comida
```javascript
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
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Canvas API**: Dibujo de gráficos
- **Game loop**: Bucle principal del juego
- **Event handling**: Controles de teclado
- **LocalStorage**: Persistencia de récords
- **Timers**: setInterval para el juego
- **Array methods**: Manipulación de la serpiente

### CSS
- **Grid layout**: Controles y configuración
- **Flexbox**: Layout de elementos
- **Responsive design**: Adaptación móvil
- **Animations**: Efectos visuales
- **Themes**: Diferentes estilos

### Algoritmos
- **Collision detection**: Detección de colisiones
- **Random generation**: Generación de comida
- **Game state**: Gestión del estado
- **Input handling**: Procesamiento de entrada

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, themes
- **JavaScript ES6+**: Clases y lógica
- **Canvas API**: Gráficos del juego
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Teclado**: 
  - `↑↓←→`: Movimiento de la serpiente
  - `SPACE`: Pausar/Continuar
  - `R`: Reiniciar juego
- **Mouse**: Clic en botones

## 🔧 Estructura del Código
```
dia-040/
├── index.html          # Estructura HTML + canvas
├── app.css            # Estilos + themes
├── app.js             # Lógica + clase SnakeGame
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Configura la dificultad y tamaño
3. Presiona "Iniciar" para comenzar
4. Usa las flechas para mover la serpiente
5. Evita chocar con las paredes y tu cuerpo

## 💡 Mejoras Futuras
- [ ] Modo multijugador
- [ ] Obstáculos en el tablero
- [ ] Power-ups especiales
- [ ] Sonidos y música
- **IA**: Serpiente controlada por IA
- **Colaboración**: Juego en equipo

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: Canvas, LocalStorage

## 🐍 Casos de Uso
- **Entretenimiento**: Juego clásico
- **Educación**: Aprendizaje de programación
- **Competencia**: Récords personales
- **Relajación**: Juego casual

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 40*
