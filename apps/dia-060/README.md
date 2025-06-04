# 📚 Día 60: Cronograma de Estudio

## 📋 Descripción
Sistema completo de planificación de estudios con gestión de materias, programación de tareas, cronograma semanal visual, seguimiento de progreso y estadísticas de estudio. Permite organizar el tiempo de estudio de manera eficiente y visual.

## ✨ Características
- **📚 Gestión de Materias**: Crear y organizar materias con colores y descripciones
- **📅 Cronograma Semanal**: Vista visual del horario de estudio
- **✅ Sistema de Tareas**: Programar tareas con fechas, horas y prioridades
- **📊 Estadísticas**: Seguimiento de progreso y horas de estudio
- **🎯 Prioridades**: Clasificación de tareas por importancia
- **📤 Exportación**: Guardar cronograma en formato JSON
- **📱 Responsive**: Diseño adaptativo completo
- **💾 Persistencia**: Datos guardados en localStorage

## 🔧 Cómo Funciona

### 📚 Gestión de Materias
```javascript
addSubject() {
  const subject = {
    id: Date.now(),
    name: document.getElementById('subjectName').value,
    color: document.getElementById('subjectColor').value,
    description: document.getElementById('subjectDescription').value,
    credits: parseInt(document.getElementById('subjectCredits').value) || 0,
    professor: document.getElementById('subjectProfessor').value
  };

  this.subjects.push(subject);
  localStorage.setItem('studySubjects', JSON.stringify(this.subjects));
}
```

### 📅 Cronograma Semanal
```javascript
renderSchedule() {
  const timeSlots = this.generateTimeSlots();
  const startDate = this.getWeekStartDate();
  
  timeSlots.forEach(timeSlot => {
    for (let i = 0; i < 7; i++) {
      const cellDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dayTasks = this.getTasksForDate(cellDate, timeSlot);
      // Render tasks in schedule cells
    }
  });
}
```

### ✅ Sistema de Tareas
```javascript
addTask() {
  const task = {
    id: Date.now(),
    title: document.getElementById('taskTitle').value,
    subjectId: parseInt(document.getElementById('taskSubject').value),
    date: document.getElementById('taskDate').value,
    time: document.getElementById('taskTime').value,
    duration: parseInt(document.getElementById('taskDuration').value) || 60,
    priority: document.getElementById('taskPriority').value,
    description: document.getElementById('taskDescription').value,
    completed: false
  };

  this.tasks.push(task);
  localStorage.setItem('studyTasks', JSON.stringify(this.tasks));
}
```

## 🎓 Conceptos Aprendidos

### 💻 JavaScript
- Date object: Manipulación de fechas y horas
- localStorage: Persistencia de datos
- Array methods: filter(), find(), map(), reduce()
- Event delegation: Manejo de eventos dinámicos
- Form handling: Validación y envío de formularios
- Grid algorithms: Generación de cronogramas

### 🎨 CSS
- CSS Grid: Layout de cronograma y materias
- Flexbox: Alineación de elementos
- CSS Variables: Temas consistentes
- Responsive design: Media queries
- Modal design: Overlays y popups
- Progress bars: Indicadores de progreso

### 🌐 HTML
- Form controls: Inputs, select, textarea, date, time
- Semantic HTML: Estructura semántica
- Accessibility: Labels y aria-labels
- Data attributes: Almacenamiento de datos

## 🛠️ Tecnologías Utilizadas
- HTML5: Formularios y semantic HTML
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Arrow functions, template literals
- localStorage: Persistencia de datos
- Sin dependencias: JavaScript puro

## 📚 Gestión de Materias
- **Nombre**: Identificación de la materia
- **Color**: Identificación visual
- **Descripción**: Detalles adicionales
- **Créditos**: Valor académico
- **Profesor**: Información del instructor
- **Estadísticas**: Tareas y horas por materia

## 📅 Cronograma Semanal
- **Vista de Semana**: 7 días completos
- **Horarios**: De 6:00 AM a 10:00 PM
- **Navegación**: Semanas anterior/siguiente
- **Tareas Visuales**: Bloques de color por prioridad
- **Interactivo**: Click para ver detalles

## ✅ Sistema de Tareas
- **Título**: Nombre descriptivo
- **Materia**: Asociación con materia
- **Fecha y Hora**: Programación específica
- **Duración**: Tiempo estimado en minutos
- **Prioridad**: Baja, Media, Alta
- **Descripción**: Detalles adicionales
- **Estado**: Completada/Pendiente

## 🎯 Niveles de Prioridad
- **🔴 Alta**: Tareas urgentes e importantes
- **🟡 Media**: Tareas importantes pero no urgentes
- **⚫ Baja**: Tareas opcionales o de refuerzo

## 📊 Estadísticas de Estudio
- **Total de Materias**: Número de materias registradas
- **Horas Totales**: Tiempo total programado
- **Tareas Completadas**: Progreso de finalización
- **Porcentaje de Progreso**: Progreso general
- **Progreso por Materia**: Estadísticas individuales

## 🎮 Controles Disponibles
- **Nueva Materia**: Agregar materia de estudio
- **Nueva Tarea**: Programar tarea específica
- **Exportar**: Guardar cronograma completo
- **Navegar Semanas**: Cambiar semana de vista
- **Marcar Completada**: Actualizar estado de tarea
- **Editar Tarea**: Modificar tarea existente
- **Eliminar Tarea**: Remover tarea del cronograma

## 🚀 Cómo Ejecutar
1. Abre index.html en tu navegador
2. Agrega tus materias de estudio
3. Programa tareas con fechas y horarios
4. Navega por el cronograma semanal
5. Marca tareas como completadas
6. Revisa estadísticas de progreso
7. Exporta tu cronograma
8. Organiza tu tiempo de estudio

## 📈 Seguimiento de Progreso
- **Progreso General**: Porcentaje de tareas completadas
- **Progreso por Materia**: Estadísticas individuales
- **Horas Estudiadas**: Tiempo total dedicado
- **Tendencias**: Patrones de estudio
- **Metas**: Objetivos de estudio

## 💾 Gestión de Datos
- **Persistencia Local**: Datos guardados en localStorage
- **Exportación JSON**: Backup completo del cronograma
- **Sincronización**: Estado actualizado en tiempo real
- **Respaldo**: Posibilidad de restaurar datos

## ⚡ Características Avanzadas
- **Cronograma Visual**: Vista de semana completa
- **Colores por Materia**: Identificación visual rápida
- **Prioridades Visuales**: Códigos de color por importancia
- **Navegación Temporal**: Cambio entre semanas
- **Responsive**: Adaptación completa a móviles

## 📊 Estadísticas Técnicas
- Líneas de código: ~800 líneas
- Funcionalidades: 35 principales
- Tiempo de desarrollo: ~8 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Materias: Ilimitadas

## 💼 Casos de Uso
- **Estudiantes**: Planificación de estudios
- **Profesionales**: Organización de capacitaciones
- **Educadores**: Gestión de clases
- **Autodidactas**: Aprendizaje autónomo
- **Preparación de Exámenes**: Cronograma de repaso

## 📚 Funcionalidades de Materias
- **Creación**: Nombre, color, descripción
- **Personalización**: Créditos y profesor
- **Estadísticas**: Tareas y horas por materia
- **Progreso**: Seguimiento individual
- **Visualización**: Colores distintivos

## ⚠️ Limitaciones
- Solo funciona localmente
- No incluye notificaciones
- No tiene sistema de recordatorios
- No incluye colaboración
- No soporta archivos adjuntos

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 60*
