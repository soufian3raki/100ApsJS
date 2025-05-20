# 🎪 Día 25: Simulador de Feria

## 📋 Descripción
Simulador de feria con juegos interactivos, sistema de tickets, premios y experiencia de feria completa.

## ✨ Características
- **Múltiples juegos** de feria
- **Sistema de tickets** y monedas
- **Tienda de premios** virtual
- **Animaciones** de juegos
- **Sistema de puntuación** global
- **Diseño colorido** y divertido
- **Responsive design**

## 🚀 Cómo Funciona

### Sistema de Tickets
```javascript
let tickets = 0;
let coins = 100;
let prizes = [];
let games = [
  { name: "Tiro al Blanco", cost: 5, reward: 10 },
  { name: "Pesca de Patos", cost: 3, reward: 8 },
  { name: "Ruleta", cost: 10, reward: 20 },
  { name: "Lanzamiento de Aros", cost: 4, reward: 12 }
];

function playGame(gameIndex) {
  const game = games[gameIndex];
  
  if (coins < game.cost) {
    showMessage("No tienes suficientes monedas");
    return;
  }
  
  coins -= game.cost;
  updateCoins();
  
  // Simular juego
  const success = Math.random() < 0.6; // 60% de éxito
  
  if (success) {
    const ticketsWon = Math.floor(Math.random() * game.reward) + 1;
    tickets += ticketsWon;
    showMessage(`¡Ganaste ${ticketsWon} tickets!`);
  } else {
    showMessage("Mejor suerte la próxima vez");
  }
  
  updateTickets();
}
```

### Tienda de Premios
```javascript
const prizeShop = [
  { name: "Peluche Pequeño", cost: 20, type: "toy" },
  { name: "Peluche Grande", cost: 50, type: "toy" },
  { name: "Gorra", cost: 30, type: "clothing" },
  { name: "Camiseta", cost: 40, type: "clothing" },
  { name: "Llavero", cost: 15, type: "accessory" },
  { name: "Taza", cost: 25, type: "accessory" }
];

function buyPrize(prizeIndex) {
  const prize = prizeShop[prizeIndex];
  
  if (tickets < prize.cost) {
    showMessage("No tienes suficientes tickets");
    return;
  }
  
  tickets -= prize.cost;
  prizes.push(prize);
  updateTickets();
  updatePrizes();
  showMessage(`¡Compraste ${prize.name}!`);
}
```

## �� Conceptos Aprendidos

### JavaScript
- **Game state management**: Control del estado
- **Math.random()**: Simulación de juegos
- **Array methods**: Gestión de premios
- **Event handling**: Controles de juegos
- **LocalStorage**: Persistencia de datos
- **Object manipulation**: Gestión de inventario

### CSS
- **Grid para juegos**: Layout de feria
- **Animaciones**: Efectos de juegos
- **Flexbox**: Disposición de elementos
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual

### Lógica de Juegos
- **Sistema de economía**: Monedas y tickets
- **Probabilidad**: Simulación de juegos
- **Inventario**: Gestión de premios
- **Progresión**: Sistema de recompensas

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura y canvas
- **CSS3**: Grid, flexbox, animaciones
- **JavaScript ES6+**: Lógica del simulador
- **Canvas API**: Renderizado de juegos

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en juegos y tienda
- **Teclado**: 
  - `1-4`: Seleccionar juego
  - `S`: Abrir tienda
  - `R`: Reiniciar feria

## 🔧 Estructura del Código
```
dia-025/
├── index.html          # Estructura HTML + feria
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + simulador
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona un juego de feria
3. Gasta monedas para jugar
4. Gana tickets con tus victorias
5. Compra premios en la tienda

## �� Mejoras Futuras
- [ ] Más juegos de feria
- [ ] Modo multijugador
- [ ] Sistema de logros
- [ ] Animaciones avanzadas
- **Sonidos**: Efectos de feria
- **Temas**: Personalización visual

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~300 líneas
- **Tiempo de desarrollo**: ~3.5 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **APIs**: Canvas

## 🎪 Casos de Uso
- **Entretenimiento**: Simulador de feria
- **Educación**: Aprendizaje de economía
- **Desarrollo**: Base para juegos
- **Social**: Juegos en grupo

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 25*
