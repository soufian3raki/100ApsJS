# 📝 Día 8: App de Notas

## 📋 Descripción
Editor de notas con funcionalidades de creación, edición, búsqueda y organización. Persistencia local y interfaz intuitiva.

## ✨ Características
- **Crear nuevas notas** con un clic
- **Editar notas existentes** en tiempo real
- **Eliminar notas** individuales
- **Búsqueda en tiempo real** por título y contenido
- **Persistencia en localStorage**
- **Contador de palabras y caracteres**
- **Diseño tipo bloc de notas**
- **Responsive design**

## 🚀 Cómo Funciona

### Gestión de Notas
```javascript
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNoteId = null;

function createNote() {
  const note = {
    id: Date.now(),
    title: "Nueva Nota",
    content: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  notes.unshift(note);
  currentNoteId = note.id;
  saveNotes();
  renderNotes();
  openNote(note.id);
}

function saveNote() {
  if (currentNoteId) {
    const note = notes.find(n => n.id === currentNoteId);
    if (note) {
      note.title = titleInput.value || "Sin título";
      note.content = contentTextarea.value;
      note.updatedAt = new Date().toISOString();
      saveNotes();
      renderNotes();
    }
  }
}
```

### Búsqueda de Notas
```javascript
function searchNotes() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm) ||
    note.content.toLowerCase().includes(searchTerm)
  );
  
  renderNotes(filteredNotes);
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Array methods**: find(), filter(), map()
- **String methods**: substring(), toLowerCase()
- **Date object**: Timestamps y formateo
- **Debouncing**: Optimización de búsqueda
- **Event delegation**: Gestión eficiente
- **Template literals**: HTML dinámico

### CSS
- **Flexbox para layout**: Disposición de elementos
- **Grid para notas**: Organización de items
- **Hover effects**: Interactividad visual
- **Responsive design**: Adaptación móvil
- **Typography styling**: Legibilidad

### UX/UI
- **Gestión de estado compleja**: Múltiples estados
- **Búsqueda en tiempo real**: Feedback inmediato
- **Interfaz tipo editor**: Experiencia familiar
- **Persistencia de datos**: Continuidad

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Formularios, textarea, inputs
- **CSS3**: Flexbox, grid, responsive
- **JavaScript ES6+**: Lógica de gestión
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Texto claro y espaciado

## 🎮 Controles
- **Mouse**: Clic en notas y botones
- **Teclado**: 
  - `Ctrl + S`: Guardar nota
  - `Ctrl + N`: Nueva nota
  - `Escape`: Cancelar edición

## 🔧 Estructura del Código
```
dia-008/
├── index.html          # Estructura HTML + editor
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + gestión de notas
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Haz clic en "Nueva Nota" para crear una
3. Escribe título y contenido
4. Usa la búsqueda para encontrar notas
5. Haz clic en una nota para editarla

## 💡 Mejoras Futuras
- [ ] Categorías de notas
- [ ] Etiquetas y tags
- [ ] Modo de vista previa
- [ ] Exportar notas
- [ ] Sincronización en la nube
- [ ] Colaboración en tiempo real

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~180 líneas
- **Tiempo de desarrollo**: ~2.5 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Persistencia**: LocalStorage

## 📝 Casos de Uso
- **Notas personales**: Ideas y recordatorios
- **Estudios**: Apuntes y resúmenes
- **Trabajo**: Documentación y notas
- **Proyectos**: Planificación y seguimiento

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 8*
