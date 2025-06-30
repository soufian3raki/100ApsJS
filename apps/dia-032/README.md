# 📅 Día 32: App de Calendario

## 📋 Descripción
Calendario interactivo completo con gestión de eventos, vista mensual y persistencia de datos.

## ✨ Características
- **Vista mensual** con navegación entre meses
- **Gestión de eventos** con título, fecha, hora y descripción
- **Colores personalizables** para eventos
- **Persistencia** de datos en localStorage
- **Modal de edición** para agregar/editar eventos
- **Vista de eventos** por día seleccionado
- **Diseño responsive** y moderno

## 🚀 Cómo Funciona

### Renderizado del Calendario
```javascript
renderCalendar() {
  const year = this.currentDate.getFullYear();
  const month = this.currentDate.getMonth();
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  this.currentMonthEl.textContent = monthNames[month] + " " + year;
  
  // Generar días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    this.createDayElement(day, false);
  }
}
```

### Gestión de Eventos
```javascript
saveEvent() {
  const event = {
    id: this.editingEvent || Date.now().toString(),
    title: eventTitle,
    date: eventDate,
    time: eventTime,
    description: eventDescription,
    color: eventColor
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

### Detección de Eventos
```javascript
hasEvents(day) {
  const year = this.currentDate.getFullYear();
  const month = this.currentDate.getMonth();
  const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
  
  return this.events.some(event => event.date === dateStr);
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Date object**: Manipulación de fechas
- **LocalStorage**: Persistencia de eventos
- **DOM manipulation**: Creación dinámica de elementos
- **Event handling**: Controles interactivos
- **Array methods**: filter, find, some
- **String methods**: padStart, toString

### CSS
- **Grid layout**: Calendario de 7x6
- **Flexbox**: Layout de controles
- **Modal**: Ventana emergente
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual

### UX/UI
- **Calendario visual**: Vista mensual clara
- **Eventos destacados**: Indicadores visuales
- **Modal intuitivo**: Formulario de eventos
- **Navegación fluida**: Entre meses

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, modal
- **JavaScript ES6+**: Clases y lógica
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en días y botones
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Guardar evento
  - `Escape`: Cerrar modal

## 🔧 Estructura del Código
```
dia-032/
├── index.html          # Estructura HTML + modal
├── app.css            # Estilos + grid calendar
├── app.js             # Lógica + clase Calendar
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Navega entre meses con las flechas
3. Haz clic en un día para seleccionarlo
4. Agrega eventos con el botón "+ Evento"
5. Edita eventos haciendo clic en ellos

## 💡 Mejoras Futuras
- [ ] Vista semanal y diaria
- [ ] Notificaciones de eventos
- [ ] Sincronización con Google Calendar
- [ ] Categorías de eventos
- **Recurrencia**: Eventos repetitivos
- **Exportar**: Calendario a archivo

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: LocalStorage

## 📅 Casos de Uso
- **Personal**: Gestión de eventos
- **Trabajo**: Planificación de tareas
- **Educación**: Calendario académico
- **Empresas**: Gestión de citas

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 32*
