# 🎯 Día 56: Juego de Preguntas con Niveles

## 📋 Descripción
Sistema completo de quiz con múltiples niveles de dificultad, categorías temáticas, temporizador, ranking de jugadores y análisis detallado de resultados. Permite crear experiencias de aprendizaje interactivas y competitivas.

## ✨ Características
- **🎮 Múltiples Niveles**: Fácil, Intermedio y Difícil
- **📚 Categorías Temáticas**: General, Ciencia, Historia, Deportes, Geografía, Entretenimiento
- **⏱️ Temporizador Configurable**: 30, 45, 60 o 90 segundos por pregunta
- **🏆 Sistema de Ranking**: Leaderboard con filtros y persistencia
- **📊 Análisis Detallado**: Resumen completo de respuestas y estadísticas
- **⏸️ Funciones de Control**: Pausar, saltar preguntas, salir
- **📱 Responsive**: Diseño adaptativo completo
- **💾 Persistencia**: Datos guardados en localStorage

## 🔧 Cómo Funciona

### 🎯 Inicialización del Quiz
```javascript
startQuiz() {
  const playerName = document.getElementById('playerName').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  const category = document.getElementById('category').value;
  const questionCount = parseInt(document.getElementById('questionCount').value);
  
  // Filter questions based on difficulty and category
  let filteredQuestions = this.questions.filter(q => 
    q.difficulty === difficulty && 
    (category === 'general' || q.category === category)
  );
  
  this.questions = this.shuffleArray(filteredQuestions).slice(0, questionCount);
}
```

### ⏱️ Sistema de Temporizador
```javascript
startTimer() {
  this.timeLeft = this.timeLimit;
  this.updateTimerDisplay();
  
  this.timer = setInterval(() => {
    this.timeLeft--;
    this.updateTimerDisplay();
    
    if (this.timeLeft <= 0) {
      this.timeUp();
    }
  }, 1000);
}
```

### 🏆 Sistema de Ranking
```javascript
saveToLeaderboard(totalTime, accuracy) {
  const result = {
    id: Date.now(),
    playerName,
    score: this.score,
    totalQuestions: this.questions.length,
    accuracy,
    totalTime,
    difficulty,
    category,
    date: new Date().toISOString()
  };
  
  this.leaderboard.push(result);
  this.leaderboard.sort((a, b) => b.score - a.score || a.totalTime - b.totalTime);
}
```

## 🎓 Conceptos Aprendidos

### 💻 JavaScript
- Clases ES6: Organización del código
- setInterval/clearInterval: Temporizadores
- Array methods: filter(), sort(), slice(), map()
- localStorage: Persistencia de datos
- Event handling: Múltiples tipos de eventos
- Math.random(): Generación de números aleatorios

### 🎨 CSS
- CSS Grid: Layout de opciones y resultados
- Flexbox: Alineación de elementos
- CSS Animations: Efectos de temporizador
- Pseudo-classes: :hover, :disabled
- Responsive design: Media queries
- CSS Variables: Temas consistentes

### 🌐 HTML
- Form controls: Inputs, select, buttons
- Semantic HTML: Estructura semántica
- Accessibility: Labels y aria-labels
- Data attributes: Almacenamiento de datos

## 🛠️ Tecnologías Utilizadas
- HTML5: Formularios y semantic HTML
- CSS3: Grid, Flexbox, animations
- JavaScript ES6+: Clases, arrow functions
- localStorage: Persistencia de datos
- Sin dependencias: JavaScript puro

## 🎮 Niveles de Dificultad
- **🟢 Fácil**: Preguntas básicas y generales
- **🟡 Intermedio**: Preguntas con mayor complejidad
- **🔴 Difícil**: Preguntas especializadas y avanzadas

## 📚 Categorías Disponibles
- **🌍 General**: Conocimiento general
- **🔬 Ciencia**: Física, química, biología
- **📜 Historia**: Eventos históricos y personajes
- **⚽ Deportes**: Reglas y datos deportivos
- **🗺️ Geografía**: Países, capitales, ríos
- **🎬 Entretenimiento**: Cine, música, cultura

## ⏱️ Configuraciones de Tiempo
- **30 segundos**: Quiz rápido
- **45 segundos**: Tiempo estándar
- **60 segundos**: Tiempo cómodo
- **90 segundos**: Tiempo extenso

## 🎮 Controles Disponibles
- **Iniciar Quiz**: Comenzar nueva partida
- **Saltar Pregunta**: Omitir pregunta actual
- **Pausar**: Pausar/reanudar temporizador
- **Salir**: Terminar quiz prematuramente
- **Jugar de Nuevo**: Reiniciar con nueva configuración
- **Ver Ranking**: Consultar leaderboard
- **Compartir**: Compartir resultados

## 🚀 Cómo Ejecutar
1. Abre index.html en tu navegador
2. Ingresa tu nombre de jugador
3. Selecciona dificultad y categoría
4. Elige número de preguntas y tiempo límite
5. Haz clic en "Iniciar Quiz"
6. Responde las preguntas dentro del tiempo
7. Revisa tus resultados y ranking
8. Comparte tus logros

## 📊 Sistema de Puntuación
- **Puntos por Respuesta Correcta**: +1 punto
- **Respuesta Incorrecta**: 0 puntos
- **Pregunta Saltada**: 0 puntos
- **Tiempo Agotado**: 0 puntos
- **Precisión**: Porcentaje de aciertos
- **Tiempo Total**: Duración completa del quiz

## 🏆 Características del Ranking
- **Ordenamiento**: Por puntuación y tiempo
- **Filtros**: Por categoría y dificultad
- **Top 50**: Máximo de resultados guardados
- **Metadatos**: Fecha, configuración, estadísticas
- **Persistencia**: Datos guardados localmente

## ⚡ Características Avanzadas
- **Mezcla Aleatoria**: Preguntas en orden aleatorio
- **Feedback Visual**: Colores para respuestas correctas/incorrectas
- **Temporizador Visual**: Círculo con colores de advertencia
- **Análisis Detallado**: Resumen de cada respuesta
- **Responsive**: Adaptación completa a móviles

## 📊 Estadísticas Técnicas
- Líneas de código: ~600 líneas
- Funcionalidades: 25 principales
- Tiempo de desarrollo: ~7 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Preguntas: 20+ incluidas

## 💼 Casos de Uso
- **Educación**: Evaluación de conocimientos
- **Entretenimiento**: Juegos de trivia
- **Capacitación**: Tests de formación
- **Competencias**: Torneos de conocimiento
- **Desarrollo Personal**: Autoevaluación

## 🎯 Preguntas Incluidas
- **General**: Capitales, fechas, datos básicos
- **Ciencia**: Química, física, biología
- **Historia**: Eventos históricos, personajes
- **Deportes**: Reglas, equipos, estadísticas
- **Geografía**: Países, ríos, montañas
- **Entretenimiento**: Cine, música, cultura

## ⚠️ Limitaciones
- Solo funciona localmente
- No incluye editor de preguntas
- No soporta imágenes en preguntas
- No incluye modo multijugador
- No tiene sistema de logros

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 56*
