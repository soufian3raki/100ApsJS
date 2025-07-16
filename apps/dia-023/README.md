# 🎲 Día 23: Juego de Dados

## 📋 Descripción
Juego de dados con múltiples variantes, sistema de puntuación y animaciones realistas de lanzamiento.

## ✨ Características
- **Múltiples juegos** de dados
- **Animaciones** de lanzamiento
- **Sistema de puntuación** por juego
- **Historial de tiros** y estadísticas
- **Diseño realista** y responsive
- **Sonidos** de dados
- **Modo multijugador**

## 🚀 Cómo Funciona

### Lógica de Lanzamiento
```javascript
let dice = [1, 1, 1, 1, 1];
let gameMode = "yahtzee";
let score = 0;
let rollsLeft = 3;

function rollDice() {
  if (rollsLeft <= 0) return;
  
  // Animar dados
  animateDice();
  
  setTimeout(() => {
    // Generar nuevos valores
    dice = dice.map(() => Math.floor(Math.random() * 6) + 1);
    updateDiceDisplay();
    updateScore();
    rollsLeft--;
    updateRollsLeft();
  }, 1000);
}

function animateDice() {
  const diceElements = document.querySelectorAll(".dice");
  diceElements.forEach(die => {
    die.style.animation = "roll 1s ease-in-out";
  });
}
```

### Juegos de Dados
```javascript
const gameModes = {
  yahtzee: {
    name: "Yahtzee",
    rules: "5 dados, 3 tiros por turno",
    calculateScore: (dice) => {
      const counts = getDiceCounts(dice);
      const maxCount = Math.max(...counts);
      
      if (maxCount === 5) return 50; // Yahtzee
      if (maxCount === 4) return 30; // Four of a kind
      if (maxCount === 3 && counts.includes(2)) return 25; // Full house
      return 0;
    }
  },
  craps: {
    name: "Craps",
    rules: "2 dados, apuesta en el resultado",
    calculateScore: (dice) => {
      const sum = dice.reduce((a, b) => a + b, 0);
      if (sum === 7 || sum === 11) return 100; // Natural
      if (sum === 2 || sum === 3 || sum === 12) return 0; // Craps
      return sum; // Point
    }
  }
};
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Math.random()**: Generación de números aleatorios
- **Array methods**: map(), reduce(), filter()
- **setTimeout()**: Animaciones con delay
- **Object methods**: Gestión de modos de juego
- **Event handling**: Controles del juego
- **LocalStorage**: Persistencia de datos

### CSS
- **Animaciones**: Efectos de lanzamiento
- **Transform**: Rotación de dados
- **Flexbox**: Layout de dados
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual

### Lógica de Juegos
- **Probabilidad**: Cálculos de dados
- **Sistema de puntuación**: Reglas por juego
- **Validación**: Verificación de resultados
- **Estadísticas**: Análisis de datos

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura y canvas
- **CSS3**: Animaciones, flexbox, responsive
- **JavaScript ES6+**: Lógica del juego
- **Canvas API**: Renderizado de dados

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic para lanzar dados
- **Teclado**: 
  - `Espacio`: Lanzar dados
  - `R`: Reiniciar juego
  - `M`: Cambiar modo

## 🔧 Estructura del Código
```
dia-023/
├── index.html          # Estructura HTML + dados
├── app.css            # Estilos + animaciones
├── app.js             # Lógica del juego
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona un modo de juego
3. Haz clic en "Lanzar" para tirar los dados
4. Observa tu puntuación
5. Intenta conseguir la mejor puntuación

## 💡 Mejoras Futuras
- [ ] Más juegos de dados
- [ ] Modo multijugador
- [ ] Apuestas virtuales
- [ ] Estadísticas avanzadas
- **Sonidos**: Efectos de audio
- **Temas**: Personalización visual

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~200 líneas
- **Tiempo de desarrollo**: ~2.5 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **APIs**: Canvas

## 🎲 Casos de Uso
- **Entretenimiento**: Juegos de dados
- **Competencia**: Torneos virtuales
- **Educación**: Aprendizaje de probabilidad
- **Social**: Juegos en grupo

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 23*
