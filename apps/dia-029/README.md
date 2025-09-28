# 🎲 Día 29: Sorteo Aleatorio

## 📋 Descripción
Aplicación de sorteo aleatorio con múltiples opciones de entrada, historial de sorteos y animaciones de selección.

## ✨ Características
- **Múltiples opciones** de entrada
- **Sorteo aleatorio** con animación
- **Historial de sorteos** guardado
- **Diferentes modos** de sorteo
- **Animaciones** de selección
- **Diseño moderno** y responsive
- **Exportar resultados**

## 🚀 Cómo Funciona

### Lógica del Sorteo
```javascript
let participants = [];
let history = JSON.parse(localStorage.getItem("sorteoHistory")) || [];
let isDrawing = false;

function addParticipant() {
  const input = document.getElementById("participantInput");
  const name = input.value.trim();
  
  if (name && !participants.includes(name)) {
    participants.push(name);
    updateParticipantsList();
    input.value = "";
  }
}

function startDraw() {
  if (participants.length < 2) {
    showMessage("Necesitas al menos 2 participantes");
    return;
  }
  
  isDrawing = true;
  animateDraw();
  
  setTimeout(() => {
    const winner = selectWinner();
    showWinner(winner);
    addToHistory(winner);
    isDrawing = false;
  }, 3000);
}
```

### Animación de Sorteo
```javascript
function animateDraw() {
  const drawButton = document.getElementById("drawButton");
  const resultDisplay = document.getElementById("result");
  
  drawButton.disabled = true;
  drawButton.textContent = "Sorteando...";
  
  let count = 0;
  const animationInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * participants.length);
    resultDisplay.textContent = participants[randomIndex];
    count++;
    
    if (count >= 20) {
      clearInterval(animationInterval);
    }
  }, 150);
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Math.random()**: Generación de números aleatorios
- **Array methods**: push(), includes(), filter()
- **setTimeout()**: Delays para animaciones
- **setInterval()**: Animaciones continuas
- **LocalStorage**: Persistencia de historial
- **Event handling**: Controles de sorteo

### CSS
- **Animaciones**: Efectos de sorteo
- **Flexbox**: Layout de participantes
- **Grid**: Organización de historial
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual

### UX/UI
- **Feedback visual**: Animaciones de sorteo
- **Historial de datos**: Persistencia
- **Validación**: Verificación de entrada
- **Interfaz intuitiva**: Fácil de usar

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura y formularios
- **CSS3**: Flexbox, grid, animaciones
- **JavaScript ES6+**: Lógica del sorteo
- **LocalStorage**: Persistencia de historial

## �� Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en botones y controles
- **Teclado**: 
  - `Enter`: Agregar participante
  - `Espacio`: Iniciar sorteo
  - `R`: Reiniciar lista

## 🔧 Estructura del Código
```
dia-029/
├── index.html          # Estructura HTML + controles
├── app.css            # Estilos + animaciones
├── app.js             # Lógica + sorteo
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Agrega participantes a la lista
3. Haz clic en "Iniciar Sorteo"
4. Observa la animación de selección
5. Ve el historial de sorteos anteriores

## 💡 Mejoras Futuras
- [ ] Sorteo de múltiples ganadores
- [ ] Pesos diferentes para participantes
- [ ] Modo de equipos
- [ ] Exportar resultados
- **Sonidos**: Efectos de sorteo
- **Temas**: Personalización visual

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~200 líneas
- **Tiempo de desarrollo**: ~2.5 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Persistencia**: LocalStorage

## 🎲 Casos de Uso
- **Eventos**: Sorteos de premios
- **Educación**: Selección aleatoria
- **Trabajo**: Asignación de tareas
- **Entretenimiento**: Juegos de azar

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 29*
