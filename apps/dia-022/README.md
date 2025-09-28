# 🎯 Día 22: Juego de Dardos

## 📋 Descripción
Juego de dardos virtual con tablero interactivo, sistema de puntuación y diferentes modos de juego.

## ✨ Características
- **Tablero de dardos** interactivo
- **Sistema de puntuación** realista
- **Diferentes modos** de juego
- **Animaciones** de lanzamiento
- **Historial de partidas**
- **Diseño retro** y moderno
- **Responsive design**

## �� Cómo Funciona

### Lógica del Juego
```javascript
let score = 0;
let currentPlayer = 1;
let gameMode = "301";
let targetScore = 301;
let gameHistory = [];

function throwDart(x, y) {
  const dart = calculateDartPosition(x, y);
  const points = calculatePoints(dart);
  
  if (isValidThrow(points)) {
    score += points;
    updateScore();
    addDartToHistory(dart, points);
    
    if (score >= targetScore) {
      endGame();
    }
  } else {
    showInvalidThrow();
  }
}

function calculatePoints(dart) {
  const distance = Math.sqrt(dart.x * dart.x + dart.y * dart.y);
  const angle = Math.atan2(dart.y, dart.x);
  
  if (distance < 20) return 50; // Bullseye
  if (distance < 40) return 25; // Outer bull
  if (distance > 200) return 0; // Miss
  
  const sector = Math.floor((angle + Math.PI) / (Math.PI / 10));
  const multiplier = getMultiplier(distance);
  
  return sector * multiplier;
}
```

### Modos de Juego
```javascript
const gameModes = {
  "301": {
    name: "301",
    target: 301,
    rules: "Llegar exactamente a 301"
  },
  "501": {
    name: "501", 
    target: 501,
    rules: "Llegar exactamente a 501"
  },
  "cricket": {
    name: "Cricket",
    target: "cricket",
    rules: "Cerrar todos los números del 15 al 20"
  }
};

function changeGameMode(mode) {
  gameMode = mode;
  resetGame();
  updateGameModeDisplay();
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Canvas API**: Dibujo del tablero
- **Math operations**: Cálculos de puntuación
- **Event handling**: Lanzamiento de dardos
- **Array methods**: Gestión de historial
- **LocalStorage**: Persistencia de datos
- **Game state management**: Control del juego

### CSS
- **Canvas styling**: Estilos del tablero
- **Animaciones**: Efectos de lanzamiento
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual
- **Custom properties**: Variables CSS

### Lógica de Juegos
- **Física básica**: Cálculos de distancia
- **Sistema de puntuación**: Reglas del juego
- **Validación**: Verificación de tiros
- **Modos de juego**: Diferentes variantes

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Canvas, estructura
- **CSS3**: Estilos, animaciones, responsive
- **JavaScript ES6+**: Lógica del juego
- **Canvas API**: Renderizado

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Canvas escalable**: Se adapta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Puntuación clara

## 🎮 Controles
- **Mouse**: Clic para lanzar dardos
- **Teclado**: 
  - `R`: Reiniciar juego
  - `M`: Cambiar modo
  - `H`: Mostrar ayuda

## 🔧 Estructura del Código
```
dia-022/
├── index.html          # Estructura HTML + canvas
├── app.css            # Estilos + responsive design
├── app.js             # Lógica del juego
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona un modo de juego
3. Haz clic en el tablero para lanzar dardos
4. Observa tu puntuación en tiempo real
5. Intenta alcanzar el objetivo

## 💡 Mejoras Futuras
- [ ] Modo multijugador
- [ ] Diferentes tableros
- [ ] Estadísticas detalladas
- [ ] Sonidos de juego
- **Torneos**: Competencias
- **Temas**: Personalización visual

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~250 líneas
- **Tiempo de desarrollo**: ~3 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **APIs**: Canvas

## 🎯 Casos de Uso
- **Entretenimiento**: Juego de dardos
- **Competencia**: Torneos virtuales
- **Práctica**: Entrenamiento de precisión
- **Social**: Juegos en grupo

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 22*
