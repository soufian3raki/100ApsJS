# 🧠 Día 11: Juego de Memoria

## 📋 Descripción
Juego de memoria con cartas que se voltean, sistema de puntuación, diferentes niveles de dificultad y animaciones suaves.

## ✨ Características
- **Cartas que se voltean** al hacer clic
- **Sistema de puntuación** y movimientos
- **Diferentes niveles de dificultad**
- **Animaciones de volteo** de cartas
- **Cronómetro de juego**
- **Mejor puntuación guardada**
- **Diseño atractivo** y responsive

## 🚀 Cómo Funciona

### Lógica del Juego
```javascript
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let startTime = null;
let gameTimer = null;

function createCards() {
  const symbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
  const gameCards = [];
  
  // Duplicar símbolos para crear pares
  symbols.forEach(symbol => {
    gameCards.push({ id: Math.random(), symbol, flipped: false, matched: false });
    gameCards.push({ id: Math.random(), symbol, flipped: false, matched: false });
  });
  
  // Mezclar cartas
  return gameCards.sort(() => Math.random() - 0.5);
}

function flipCard(cardId) {
  const card = cards.find(c => c.id === cardId);
  
  if (flippedCards.length < 2 && !card.flipped && !card.matched) {
    card.flipped = true;
    flippedCards.push(card);
    moves++;
    updateMoves();
    
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}
```

### Verificación de Pares
```javascript
function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.symbol === card2.symbol) {
    // Par encontrado
    card1.matched = true;
    card2.matched = true;
    matchedPairs++;
    
    if (matchedPairs === cards.length / 2) {
      endGame();
    }
  } else {
    // No es par, voltear cartas
    card1.flipped = false;
    card2.flipped = false;
  }
  
  flippedCards = [];
  renderCards();
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Array methods**: find(), forEach(), sort()
- **Math.random()**: Mezcla aleatoria
- **setTimeout()**: Delays para animaciones
- **Game state management**: Control del juego
- **Event delegation**: Gestión eficiente
- **LocalStorage**: Mejores puntuaciones

### CSS
- **CSS Grid**: Layout de cartas
- **Transform**: Animaciones de volteo
- **Transiciones suaves**: Efectos visuales
- **Hover effects**: Interactividad
- **Responsive design**: Adaptación móvil

### UX/UI
- **Game design principles**: Diseño de juegos
- **Feedback visual inmediato**: Respuesta a acciones
- **Progresión de dificultad**: Escalabilidad
- **Sistema de puntuación**: Motivación

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura de cartas
- **CSS3**: Grid, transform, animaciones
- **JavaScript ES6+**: Lógica del juego
- **LocalStorage**: Mejores puntuaciones

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Cartas que se ajustan
- **Touch friendly**: Áreas de toque apropiadas
- **Legibilidad**: Símbolos claros

## 🎮 Controles
- **Mouse**: Clic en cartas
- **Teclado**: 
  - `Espacio`: Reiniciar juego
  - `1-3`: Cambiar dificultad
  - `H`: Mostrar ayuda

## 🔧 Estructura del Código
```
dia-011/
├── index.html          # Estructura HTML + cartas
├── app.css            # Estilos + animaciones
├── app.js             # Lógica del juego
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona el nivel de dificultad
3. Haz clic en las cartas para voltearlas
4. Encuentra todos los pares
5. Intenta mejorar tu puntuación

## 💡 Mejoras Futuras
- [ ] Más niveles de dificultad
- [ ] Diferentes temas de cartas
- [ ] Modo multijugador
- [ ] Estadísticas detalladas
- [ ] Sonidos de juego
- [ ] Modo de práctica

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~200 líneas
- **Tiempo de desarrollo**: ~3 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Niveles**: 3 dificultades

## 🧠 Casos de Uso
- **Entretenimiento**: Juego de memoria
- **Educación**: Desarrollo cognitivo
- **Terapia**: Ejercicios de memoria
- **Fitness mental**: Entrenamiento cerebral

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 11*
