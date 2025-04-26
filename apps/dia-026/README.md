# 🎲 Día 26: Juego de Dados Aleatorios

## �� Descripción
Simulador de dados interactivo que permite lanzar entre 1-5 dados simultáneamente, con estadísticas en tiempo real, historial de lanzamientos y animaciones visuales.

## ✨ Características
- **Lanzamiento de 1-5 dados** con selector dinámico
- **Animaciones de lanzamiento** con efecto de rotación
- **Estadísticas en tiempo real**: total, número de lanzamientos, promedio
- **Historial de lanzamientos** (últimos 20)
- **Soporte para teclado**: Espacio para lanzar, C para limpiar
- **Diseño responsive** para móviles y desktop

## 🚀 Cómo Funciona

### Interfaz Principal
1. **Selector de dados**: Elige entre 1-5 dados
2. **Botón "Lanzar Dados"**: Inicia la animación y genera resultados
3. **Display de dados**: Muestra los valores obtenidos con animación
4. **Estadísticas**: Panel con total, lanzamientos y promedio
5. **Historial**: Lista de lanzamientos anteriores con timestamp

### Lógica del Juego
```javascript
// Generación de valores aleatorios
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

// Animación de lanzamiento
setTimeout(() => {
  // Mostrar valores reales después de la animación
  diceContainer.innerHTML = diceValues.map(value => 
    createDieHTML(value)
  ).join("");
}, 600);
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Math.random()**: Generación de números aleatorios
- **setTimeout()**: Control de timing para animaciones
- **Array methods**: map(), reduce(), slice()
- **DOM manipulation**: innerHTML, createElement()
- **Event handling**: addEventListener(), keyboard events
- **Local state management**: Variables globales para estadísticas

### CSS
- **CSS Animations**: @keyframes para efecto de lanzamiento
- **Flexbox**: Layout responsive para dados
- **CSS Variables**: Tema consistente con el proyecto
- **Transform**: rotate() y scale() para animaciones
- **Box-shadow**: Efectos de profundidad

### UX/UI
- **Feedback visual**: Animaciones que indican acción
- **Estados de carga**: Indicador "?" durante lanzamiento
- **Persistencia de datos**: Historial mantenido en memoria
- **Accesibilidad**: Soporte para teclado

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Animaciones, flexbox, variables CSS
- **JavaScript ES6+**: Arrow functions, template literals, destructuring
- **Sin dependencias externas**: JavaScript puro

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación para tablets y desktop
- **Touch friendly**: Botones y áreas de toque apropiadas

## 🎮 Controles
- **Mouse**: Clic en botones y selectores
- **Teclado**: 
  - `Espacio` o `Enter`: Lanzar dados
  - `C`: Limpiar estadísticas e historial

## 🔧 Estructura del Código
```
dia-026/
├── index.html          # Estructura HTML
├── app.css            # Estilos específicos
├── app.js             # Lógica del juego
└── README.md          # Este archivo
```

## �� Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona el número de dados
3. Haz clic en "Lanzar Dados" o presiona Espacio
4. Observa las estadísticas y el historial

## 💡 Mejoras Futuras
- [ ] Sonidos de lanzamiento
- [ ] Diferentes tipos de dados (d4, d8, d10, d12, d20)
- [ ] Modo multijugador
- [ ] Guardado de estadísticas en localStorage
- [ ] Exportar historial a CSV
- [ ] Temas de colores personalizables

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~150 líneas
- **Tiempo de desarrollo**: ~2 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 26*
