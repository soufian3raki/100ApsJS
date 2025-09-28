# 🃏 Día 42: Juego de Blackjack

## 📋 Descripción
Juego completo de Blackjack con baraja virtual, sistema de apuestas, estadísticas y persistencia de datos.

## ✨ Características
- **Juego completo** de Blackjack con reglas estándar
- **Sistema de apuestas** con dinero virtual
- **Baraja virtual** con 52 cartas
- **Estadísticas detalladas** de partidas
- **Sistema de rachas** para motivación
- **Persistencia de datos** en localStorage
- **Interfaz responsive** y moderna

## 🚀 Cómo Funciona

### Creación de Baraja
```javascript
createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck = [];
  
  for (let suit of suits) {
    for (let value of values) {
      deck.push({
        suit: suit,
        value: value,
        color: suit === "♥" || suit === "♦" ? "red" : "black"
      });
    }
  }
  
  return this.shuffleDeck(deck);
}
```

### Cálculo de Valor de Mano
```javascript
getHandValue(hand) {
  let value = 0;
  let aces = 0;
  
  for (let card of hand) {
    if (card.value === "A") {
      aces++;
      value += 11;
    } else if (["J", "Q", "K"].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }
  
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  
  return value;
}
```

### Lógica del Dealer
```javascript
dealerPlay() {
  this.revealDealerCard();
  
  const dealerValue = this.getHandValue(this.dealerHand);
  
  if (dealerValue < 17) {
    setTimeout(() => {
      this.dealCard(this.dealerHand, this.dealerCardsEl);
      this.updateDisplay();
      this.dealerPlay();
    }, 1000);
  } else {
    this.finishGame();
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Array methods**: shuffle, pop, push
- **Object manipulation**: Gestión de cartas
- **LocalStorage**: Persistencia de datos
- **setTimeout**: Delays en el juego
- **Event handling**: Controles interactivos
- **DOM manipulation**: Renderizado de cartas

### CSS
- **Grid layout**: Controles y estadísticas
- **Flexbox**: Layout de cartas
- **Responsive design**: Adaptación móvil
- **Animations**: Efectos de cartas
- **Color coding**: Palos de cartas

### Algoritmos
- **Shuffle algorithm**: Mezcla de baraja
- **Game logic**: Reglas de Blackjack
- **State management**: Estados del juego
- **Value calculation**: Cálculo de manos

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, animations
- **JavaScript ES6+**: Clases y lógica
- **LocalStorage**: Persistencia
- **setTimeout**: Delays del juego

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en botones y apuestas
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Activar botones
  - `Escape`: Cerrar modales

## 🔧 Estructura del Código
```
dia-042/
├── index.html          # Estructura HTML + cartas
├── app.css            # Estilos + animations
├── app.js             # Lógica + clase BlackjackGame
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Haz tu apuesta seleccionando una cantidad
3. Presiona "Nueva Partida" para comenzar
4. Usa "Pedir Carta" o "Plantarse" según tu estrategia
5. Observa las estadísticas de tus partidas

## 💡 Mejoras Futuras
- [ ] Modo multijugador
- [ ] Diferentes variantes de Blackjack
- [ ] Sonidos y música
- [ ] Animaciones más avanzadas
- **IA**: Diferentes niveles de dificultad
- **Colaboración**: Torneos en línea

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: LocalStorage

## 🃏 Casos de Uso
- **Entretenimiento**: Juego de cartas
- **Educación**: Aprendizaje de probabilidades
- **Competencia**: Récords personales
- **Relajación**: Juego casual

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 42*
