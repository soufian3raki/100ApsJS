# 🍅 Día 9: Reloj Pomodoro

## 📋 Descripción
Temporizador Pomodoro con sesiones de trabajo y descanso configurables, notificaciones y seguimiento de sesiones completadas.

## ✨ Características
- **Temporizador de 25 minutos** (configurable)
- **Descansos cortos (5 min)** y largos (15 min)
- **Notificaciones sonoras**
- **Contador de sesiones completadas**
- **Botones de pausa, reinicio y skip**
- **Diseño minimalista** y enfocado
- **Modo pantalla completa** opcional

## 🚀 Cómo Funciona

### Control del Temporizador
```javascript
let timeLeft = 25 * 60; // 25 minutos en segundos
let isRunning = false;
let isBreak = false;
let sessionsCompleted = 0;
let timerInterval = null;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    completeSession();
  }
}
```

### Gestión de Sesiones
```javascript
function completeSession() {
  isRunning = false;
  clearInterval(timerInterval);
  
  if (!isBreak) {
    sessionsCompleted++;
    isBreak = true;
    timeLeft = sessionsCompleted % 4 === 0 ? 15 * 60 : 5 * 60;
    showNotification("¡Sesión completada! Tiempo de descanso.");
  } else {
    isBreak = false;
    timeLeft = 25 * 60;
    showNotification("¡Descanso terminado! Volver al trabajo.");
  }
  
  updateDisplay();
  updateSessionsCounter();
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **setInterval() y clearInterval()**: Control de tiempo
- **Control de estado complejo**: Múltiples variables
- **Notificaciones del navegador**: Web Notifications API
- **Audio API**: Sonidos de alerta
- **Modulo operator (%)**: Ciclos de descanso
- **LocalStorage**: Persistencia de sesiones

### CSS
- **Animaciones de círculo**: Progreso visual
- **Gradientes**: Efectos de color
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad
- **Transiciones suaves**: Animaciones

### UX/UI
- **Técnica Pomodoro**: Metodología de productividad
- **Feedback visual y sonoro**: Notificaciones
- **Interfaz minimalista**: Enfoque en la tarea
- **Gestión de estados**: Control de flujo

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Canvas para círculo de progreso
- **CSS3**: Animaciones, gradientes
- **JavaScript ES6+**: Lógica del temporizador
- **Web Notifications API**: Notificaciones
- **Audio API**: Sonidos

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Círculo escalable**: Se adapta al tamaño
- **Touch friendly**: Botones apropiados
- **Legibilidad**: Números claros

## 🎮 Controles
- **Mouse**: Clic en botones de control
- **Teclado**: 
  - `Espacio`: Iniciar/Pausar
  - `R`: Reiniciar
  - `S`: Skip sesión

## 🔧 Estructura del Código
```
dia-009/
├── index.html          # Estructura HTML + canvas
├── app.css            # Estilos + animaciones
├── app.js             # Lógica del temporizador
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Haz clic en "Iniciar" para comenzar una sesión
3. Trabaja por 25 minutos
4. Toma un descanso de 5 minutos
5. Repite el ciclo

## 💡 Mejoras Futuras
- [ ] Configuración de tiempos personalizados
- [ ] Estadísticas de productividad
- [ ] Modo de pantalla completa
- [ ] Sonidos personalizables
- [ ] Integración con calendarios
- [ ] Modo de trabajo en equipo

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~200 líneas
- **Tiempo de desarrollo**: ~3 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: Notifications, Audio

## 🍅 Casos de Uso
- **Productividad**: Técnica Pomodoro
- **Estudios**: Sesiones de estudio
- **Trabajo**: Gestión del tiempo
- **Ejercicio**: Intervalos de entrenamiento

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 9*
