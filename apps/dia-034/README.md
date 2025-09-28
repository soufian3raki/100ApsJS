# ✅ Día 34: Administrador de Tareas con Categorías

## 📋 Descripción
Gestor completo de tareas con categorización, prioridades, estados de progreso y filtros avanzados.

## ✨ Características
- **Gestión completa de tareas** con título, descripción y fecha límite
- **Categorización** por tipo (Trabajo, Personal, Estudio, Salud, Hogar)
- **Prioridades** (Alta, Media, Baja) con indicadores visuales
- **Estados de progreso** (Pendiente, En Progreso, Completada)
- **Filtros avanzados** por categoría, prioridad y estado
- **Estadísticas en tiempo real** del progreso
- **Detección de vencimiento** de tareas
- **Interfaz responsive** y moderna

## 🚀 Cómo Funciona

### Gestión de Tareas
```javascript
saveTaskData() {
  const task = {
    id: this.editingTask || Date.now().toString(),
    title: title,
    description: description,
    category: category,
    priority: priority,
    dueDate: dueDate,
    status: this.editingTask ? this.tasks.find(t => t.id === this.editingTask).status : "pendiente",
    createdAt: new Date().toISOString()
  };
  
  if (this.editingTask) {
    const index = this.tasks.findIndex(t => t.id === this.editingTask);
    this.tasks[index] = task;
  } else {
    this.tasks.push(task);
  }
  
  this.saveTasks();
}
```

### Filtros Dinámicos
```javascript
renderTasks() {
  let filteredTasks = [...this.tasks];
  
  if (this.categoryFilter.value) {
    filteredTasks = filteredTasks.filter(task => task.category === this.categoryFilter.value);
  }
  
  if (this.priorityFilter.value) {
    filteredTasks = filteredTasks.filter(task => task.priority === this.priorityFilter.value);
  }
  
  if (this.statusFilter.value) {
    filteredTasks = filteredTasks.filter(task => task.status === this.statusFilter.value);
  }
  
  filteredTasks.sort((a, b) => {
    if (a.status !== b.status) {
      const statusOrder = { "pendiente": 0, "en-progreso": 1, "completada": 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    if (a.priority !== b.priority) {
      const priorityOrder = { "alta": 0, "media": 1, "baja": 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
}
```

### Cambio de Estado
```javascript
toggleStatus(taskId) {
  const task = this.tasks.find(t => t.id === taskId);
  if (task) {
    const statuses = ["pendiente", "en-progreso", "completada"];
    const currentIndex = statuses.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    task.status = statuses[nextIndex];
    
    this.saveTasks();
    this.renderTasks();
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Array methods**: filter, find, map, sort
- **LocalStorage**: Persistencia de tareas
- **Event handling**: Controles interactivos
- **DOM manipulation**: Renderizado dinámico
- **Date handling**: Formateo y comparación de fechas
- **Object manipulation**: Gestión de datos

### CSS
- **Grid layout**: Estadísticas
- **Flexbox**: Layout de tareas
- **Modal**: Ventana emergente
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual
- **Color coding**: Prioridades y estados

### UX/UI
- **Filtros intuitivos**: Búsqueda fácil
- **Estados visuales**: Colores por estado
- **Prioridades**: Indicadores claros
- **Estadísticas**: Progreso visible

## ��️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, modal
- **JavaScript ES6+**: Clases y lógica
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en tareas y botones
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Guardar tarea
  - `Escape`: Cerrar modal

## 🔧 Estructura del Código
```
dia-034/
├── index.html          # Estructura HTML + modal
├── app.css            # Estilos + task layout
├── app.js             # Lógica + clase TaskManager
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Agrega tareas con el botón "+ Nueva Tarea"
3. Usa los filtros para encontrar tareas específicas
4. Cambia el estado de las tareas haciendo clic
5. Revisa las estadísticas de progreso

## 💡 Mejoras Futuras
- [ ] Notificaciones de vencimiento
- [ ] Subtareas y dependencias
- [ ] Etiquetas personalizadas
- [ ] Exportar tareas a archivo
- **Colaboración**: Tareas compartidas
- **Recurrencia**: Tareas repetitivas

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: LocalStorage

## ✅ Casos de Uso
- **Gestión personal**: Organización diaria
- **Equipos de trabajo**: Colaboración
- **Proyectos**: Seguimiento de tareas
- **Educación**: Planificación académica

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 34*
