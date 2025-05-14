# 📋 Día 33: Cronograma Interactivo con Eventos

## 📋 Descripción
Gestor de eventos interactivo con filtros avanzados, categorización, estados de progreso y estadísticas en tiempo real.

## ✨ Características
- **Gestión completa de eventos** con título, descripción, fecha y hora
- **Categorización** por tipo (Trabajo, Personal, Estudio, Salud, Ocio)
- **Estados de progreso** (Pendiente, En Progreso, Completado, Cancelado)
- **Prioridades** (Baja, Media, Alta)
- **Filtros avanzados** por categoría, estado y fecha
- **Estadísticas en tiempo real** del progreso
- **Interfaz responsive** y moderna

## 🚀 Cómo Funciona

### Gestión de Eventos
```javascript
saveEventData() {
  const event = {
    id: this.editingEvent || Date.now().toString(),
    title: title,
    description: description,
    date: date,
    time: time,
    category: category,
    status: status,
    priority: priority,
    createdAt: new Date().toISOString()
  };
  
  if (this.editingEvent) {
    const index = this.events.findIndex(e => e.id === this.editingEvent);
    this.events[index] = event;
  } else {
    this.events.push(event);
  }
  
  this.saveEvents();
}
```

### Filtros Dinámicos
```javascript
renderTimeline() {
  let filteredEvents = [...this.events];
  
  if (this.categoryFilter.value) {
    filteredEvents = filteredEvents.filter(event => event.category === this.categoryFilter.value);
  }
  
  if (this.statusFilter.value) {
    filteredEvents = filteredEvents.filter(event => event.status === this.statusFilter.value);
  }
  
  if (this.dateFilter.value) {
    filteredEvents = filteredEvents.filter(event => event.date === this.dateFilter.value);
  }
  
  filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
}
```

### Cambio de Estado
```javascript
toggleStatus(eventId) {
  const event = this.events.find(e => e.id === eventId);
  if (event) {
    const statuses = ["pendiente", "en-progreso", "completado", "cancelado"];
    const currentIndex = statuses.indexOf(event.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    event.status = statuses[nextIndex];
    
    this.saveEvents();
    this.renderTimeline();
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Array methods**: filter, find, map, sort
- **LocalStorage**: Persistencia de eventos
- **Event handling**: Controles interactivos
- **DOM manipulation**: Renderizado dinámico
- **Date handling**: Formateo de fechas
- **Object manipulation**: Gestión de datos

### CSS
- **Grid layout**: Estadísticas
- **Flexbox**: Layout de eventos
- **Modal**: Ventana emergente
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual

### UX/UI
- **Filtros intuitivos**: Búsqueda fácil
- **Estados visuales**: Colores por estado
- **Estadísticas**: Progreso visible
- **Acciones rápidas**: Cambio de estado

## 🛠️ Tecnologías Utilizadas
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
- **Mouse**: Clic en eventos y botones
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Guardar evento
  - `Escape`: Cerrar modal

## 🔧 Estructura del Código
```
dia-033/
├── index.html          # Estructura HTML + modal
├── app.css            # Estilos + timeline
├── app.js             # Lógica + clase TimelineManager
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Agrega eventos con el botón "+ Nuevo Evento"
3. Usa los filtros para encontrar eventos específicos
4. Cambia el estado de los eventos haciendo clic
5. Revisa las estadísticas de progreso

## 💡 Mejoras Futuras
- [ ] Vista de calendario
- [ ] Notificaciones de eventos
- [ ] Exportar eventos a archivo
- [ ] Sincronización con calendarios
- **Colaboración**: Eventos compartidos
- **Recurrencia**: Eventos repetitivos

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~350 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: LocalStorage

## 📋 Casos de Uso
- **Gestión de proyectos**: Seguimiento de tareas
- **Planificación personal**: Organización diaria
- **Equipos de trabajo**: Colaboración
- **Educación**: Cronogramas académicos

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 33*
