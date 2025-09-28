# 📅 Día 41: App de Hábitos Diarios

## 📋 Descripción
Aplicación completa para el seguimiento de hábitos diarios con calendario, estadísticas, progreso visual y persistencia de datos.

## ✨ Características
- **Seguimiento de hábitos** con metas diarias personalizables
- **Calendario visual** con indicadores de progreso
- **Estadísticas detalladas** de rendimiento
- **Categorización** de hábitos por tipo
- **Sistema de rachas** para motivación
- **Exportación de datos** en formato JSON
- **Interfaz responsive** y moderna

## 🚀 Cómo Funciona

### Gestión de Hábitos
```javascript
saveHabitData() {
  const habit = {
    id: this.editingHabit || Date.now().toString(),
    name: name,
    description: description,
    category: category,
    frequency: frequency,
    target: target,
    color: color,
    progress: this.editingHabit ? this.habits.find(h => h.id === this.editingHabit).progress : {},
    createdAt: new Date().toISOString()
  };
  
  if (this.editingHabit) {
    const index = this.habits.findIndex(h => h.id === this.editingHabit);
    this.habits[index] = habit;
  } else {
    this.habits.push(habit);
  }
  
  this.saveHabits();
}
```

### Cálculo de Progreso
```javascript
calculateDayProgress(dateStr) {
  if (this.habits.length === 0) return 0;
  
  let totalProgress = 0;
  let totalPossible = 0;
  
  this.habits.forEach(habit => {
    const progress = habit.progress[dateStr] || 0;
    totalProgress += Math.min(progress, habit.target);
    totalPossible += habit.target;
  });
  
  return totalPossible > 0 ? Math.round((totalProgress / totalPossible) * 100) : 0;
}
```

### Sistema de Rachas
```javascript
calculateCurrentStreak() {
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const dayCompleted = this.habits.every(habit => {
      const progress = habit.progress[dateStr] || 0;
      return progress >= habit.target;
    });
    
    if (dayCompleted && this.habits.length > 0) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **LocalStorage**: Persistencia de hábitos
- **Date handling**: Manipulación de fechas
- **Array methods**: filter, map, reduce, every
- **Object manipulation**: Gestión de progreso
- **Event handling**: Controles interactivos
- **DOM manipulation**: Renderizado dinámico

### CSS
- **Grid layout**: Calendario y estadísticas
- **Flexbox**: Layout de hábitos
- **Progress bars**: Indicadores visuales
- **Responsive design**: Adaptación móvil
- **Color coding**: Categorías y estados

### Algoritmos
- **Cálculos de progreso**: Porcentajes y rachas
- **Filtrado de datos**: Por fecha y categoría
- **Agregación**: Estadísticas y resúmenes
- **Validación**: Verificación de completitud

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, progress bars
- **JavaScript ES6+**: Clases y lógica
- **LocalStorage**: Persistencia
- **Date API**: Manipulación de fechas

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en hábitos y botones
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Guardar hábito
  - `Escape`: Cerrar modales

## 🔧 Estructura del Código
```
dia-041/
├── index.html          # Estructura HTML + modales
├── app.css            # Estilos + calendar
├── app.js             # Lógica + clase HabitsApp
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Agrega hábitos con el botón "+ Nuevo Hábito"
3. Marca los hábitos como completados
4. Revisa el calendario y estadísticas
5. Exporta tus datos si es necesario

## 💡 Mejoras Futuras
- [ ] Notificaciones de recordatorio
- [ ] Metas semanales y mensuales
- [ ] Compartir progreso en redes
- [ ] Análisis de tendencias
- **IA**: Sugerencias de hábitos
- **Colaboración**: Hábitos compartidos

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~450 líneas
- **Tiempo de desarrollo**: ~5 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: LocalStorage, Date

## 📅 Casos de Uso
- **Personal**: Seguimiento de hábitos
- **Salud**: Hábitos de bienestar
- **Productividad**: Rutinas diarias
- **Educación**: Hábitos de estudio

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 41*
