# ⏱️ Día 5: Cronómetro

## 📋 Descripción
Cronómetro con funciones de inicio, pausa, reinicio y medición de tiempo en formato MM:SS:MS.

## ✨ Características
- **Botones de inicio, pausa y reinicio**
- **Display en formato MM:SS:MS**
- **Funcionalidad de pausa** y reanudación
- **Botón de reinicio** para volver a cero
- **Diseño tipo cronómetro** profesional
- **Animaciones suaves** en botones
- **Soporte para teclado**

## 🚀 Cómo Funciona

### Control del Tiempo
```javascript
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = "00:00:00";
}
```

### Formateo del Tiempo
```javascript
function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  
  display.textContent = 
    minutes.toString().padStart(2, "0") + ":" +
    seconds.toString().padStart(2, "0") + ":" +
    milliseconds.toString().padStart(2, "0");
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Date.now()**: Medición de tiempo en milisegundos
- **setInterval()**: Actualización continua del display
- **clearInterval()**: Detener el temporizador
- **Math.floor()**: Redondear números hacia abajo
- **padStart()**: Formateo de strings con ceros
- **Control de estado**: Variables booleanas

### CSS
- **Diseño tipo cronómetro**: Estilo profesional
- **Animaciones de botones**: Hover y active states
- **Responsive design**: Adaptación móvil
- **Typography**: Fuentes monospace para números

### Lógica de Programación
- **State management**: Control del estado del cronómetro
- **Control de flujo**: Lógica de inicio/pausa/reinicio
- **Formateo de datos**: Conversión de tiempo
- **Precisión temporal**: Actualización cada 10ms

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura de botones y display
- **CSS3**: Estilos y animaciones
- **JavaScript ES6+**: Lógica del cronómetro
- **Sin dependencias**: JavaScript puro

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Cronómetro escalable**: Se adapta al tamaño de pantalla
- **Touch friendly**: Botones de tamaño apropiado
- **Legibilidad**: Números claros y grandes

## 🎮 Controles
- **Mouse**: Clic en botones de control
- **Teclado**: 
  - `Espacio`: Iniciar/Pausar
  - `R`: Reiniciar
  - `Enter`: Iniciar

## 🔧 Estructura del Código
```
dia-005/
├── index.html          # Estructura HTML + display
├── app.css            # Estilos + animaciones
├── app.js             # Lógica del cronómetro
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Haz clic en "Iniciar" para comenzar el cronómetro
3. Usa "Pausar" para detener temporalmente
4. Haz clic en "Reiniciar" para volver a cero
5. El tiempo se actualiza cada 10ms

## 💡 Mejoras Futuras
- [ ] Laps de tiempo
- [ ] Historial de tiempos
- [ ] Sonidos de alerta
- [ ] Modo pantalla completa
- [ ] Exportar tiempos
- [ ] Temas de colores

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~70 líneas
- **Tiempo de desarrollo**: ~1 hora
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Precisión**: 10 milisegundos

## ⏱️ Casos de Uso
- **Deportes**: Medición de tiempos
- **Cocina**: Tiempos de cocción
- **Ejercicio**: Cronómetro de entrenamiento
- **Productividad**: Medición de tareas

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 5*
