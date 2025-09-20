# ✅ Día 7: Lista de Tareas

## 📋 Descripción
Aplicación de gestión de tareas con funcionalidades completas: agregar, editar, eliminar, marcar como completadas y filtrar tareas.

## ✨ Características
- **Agregar nuevas tareas** con un clic
- **Editar tareas existentes** en línea
- **Marcar tareas como completadas**
- **Eliminar tareas individuales**
- **Filtros**: Todas, Pendientes, Completadas
- **Contador de tareas pendientes**
- **Persistencia en localStorage**
- **Diseño responsive y moderno**

## 🚀 Cómo Funciona

### Gestión de Tareas
```javascript
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.unshift(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}
```

### Filtrado de Tareas
```javascript
function filterTasks(filter) {
  currentFilter = filter;
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderTasks();
}

function getFilteredTasks() {
  switch (currentFilter) {
    case "active":
      return tasks.filter(task => !task.completed);
    case "completed":
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Array methods**: find(), filter(), map(), forEach()
- **JSON.parse() y JSON.stringify()**: Persistencia
- **Date.now()**: IDs únicos
- **Event delegation**: Gestión eficiente de eventos
- **Template literals**: Generación de HTML
- **LocalStorage**: Persistencia de datos

### CSS
- **Flexbox para layout**: Disposición de elementos
- **Grid para tareas**: Organización de items
- **Hover effects**: Interactividad visual
- **Responsive design**: Adaptación móvil
- **Animaciones de transición**: Suavidad visual

### UX/UI
- **Gestión de estado**: Control de la aplicación
- **Feedback visual inmediato**: Respuesta a acciones
- **Interfaz intuitiva**: Fácil de usar
- **Persistencia de datos**: Experiencia continua

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Formularios, listas, botones
- **CSS3**: Flexbox, grid, animaciones
- **JavaScript ES6+**: Lógica de gestión
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Botones de tamaño apropiado
- **Legibilidad**: Texto claro y espaciado

## 🎮 Controles
- **Mouse**: Clic en botones y tareas
- **Teclado**: 
  - `Enter`: Agregar tarea
  - `Escape`: Cancelar edición
  - `Tab`: Navegación entre elementos

## 🔧 Estructura del Código
```
dia-007/
├── index.html          # Estructura HTML + formularios
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + gestión de tareas
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Escribe una tarea en el input
3. Presiona Enter o haz clic en "Agregar"
4. Marca tareas como completadas
5. Usa los filtros para organizar tareas

## 💡 Mejoras Futuras
- [ ] Categorías de tareas
- [ ] Fechas de vencimiento
- [ ] Prioridades
- [ ] Búsqueda de tareas
- [ ] Exportar/importar
- [ ] Modo oscuro

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~150 líneas
- **Tiempo de desarrollo**: ~2 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Persistencia**: LocalStorage

## ✅ Casos de Uso
- **Productividad personal**: Gestión de tareas
- **Proyectos**: Seguimiento de actividades
- **Estudios**: Organización académica
- **Trabajo**: Lista de pendientes

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 7*
