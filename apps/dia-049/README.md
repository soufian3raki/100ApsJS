# Día 49: App de Notas con Etiquetas y Búsqueda

## Descripción
Aplicación avanzada de notas con sistema de etiquetas, búsqueda inteligente, filtros, favoritos y colores personalizados. Permite organizar y gestionar notas de manera eficiente con múltiples opciones de categorización.

## Características
- **Gestión Completa**: Crear, editar, eliminar notas
- **Sistema de Etiquetas**: Categorización con tags personalizados
- **Búsqueda Inteligente**: Buscar en título, contenido y etiquetas
- **Filtros Avanzados**: Por etiquetas y ordenamiento
- **Notas Favoritas**: Marcar notas importantes
- **Colores Personalizados**: 6 colores para categorización visual
- **Estadísticas**: Contador de notas por categoría
- **Persistencia**: Datos guardados en localStorage
- **Responsive**: Diseño adaptativo completo

## Cómo Funciona

### Sistema de Búsqueda
```javascript
getFilteredNotes() {
  let filtered = [...this.notes];
  
  // Search filter
  if (this.searchTerm) {
    filtered = filtered.filter(note => 
      note.title.toLowerCase().includes(this.searchTerm) ||
      note.content.toLowerCase().includes(this.searchTerm) ||
      note.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
    );
  }
  
  return filtered;
}
```

### Gestión de Etiquetas
```javascript
updateTagFilter() {
  const allTags = [...new Set(this.notes.flatMap(note => note.tags))].sort();
  // Update dropdown with unique tags
}
```

### Sistema de Favoritos
```javascript
toggleFavorite(id) {
  const note = this.notes.find(n => n.id === id);
  if (note) {
    note.favorite = !note.favorite;
    note.updatedAt = new Date().toISOString();
  }
}
```

## Conceptos Aprendidos

### JavaScript
- Array methods: filter(), map(), find(), flatMap()
- Set object: Eliminación de duplicados
- String methods: toLowerCase(), includes(), localeCompare()
- Date object: Formateo de fechas relativas
- localStorage: Persistencia de datos
- Event delegation: Manejo de eventos dinámicos

### CSS
- CSS Grid: Layout de notas
- Flexbox: Alineación de elementos
- CSS Variables: Temas consistentes
- Pseudo-classes: :hover, :focus
- Custom properties: Colores dinámicos
- Responsive design: Media queries

### HTML
- Modal dialogs: Ventanas emergentes
- Form controls: Inputs, textarea, select
- Semantic HTML: Estructura semántica
- Accessibility: Labels y aria-labels

## Tecnologías Utilizadas
- HTML5: Formularios y estructura semántica
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Arrow functions, template literals, destructuring
- localStorage: Persistencia de datos
- Sin dependencias: JavaScript puro

## Funcionalidades Principales
1. **Crear Notas**: Título, contenido, etiquetas, color
2. **Editar Notas**: Modificar cualquier aspecto
3. **Eliminar Notas**: Con confirmación
4. **Buscar**: En título, contenido y etiquetas
5. **Filtrar**: Por etiquetas específicas
6. **Ordenar**: Por fecha o título
7. **Favoritos**: Marcar notas importantes
8. **Colores**: 6 opciones de categorización

## Controles
- **Búsqueda**: Escribe en el campo de búsqueda
- **Filtros**: Usa los dropdowns de etiquetas y ordenamiento
- **Nueva Nota**: Botón "+ Nueva Nota"
- **Editar**: Clic en cualquier nota o botón de editar
- **Favoritos**: Botón de estrella en cada nota
- **Eliminar**: Botón de papelera con confirmación

## Cómo Ejecutar
1. Abre index.html en tu navegador
2. Haz clic en "+ Nueva Nota" para crear tu primera nota
3. Completa el título, contenido y etiquetas
4. Usa la búsqueda para encontrar notas específicas
5. Filtra por etiquetas para organizar mejor
6. Marca notas importantes como favoritas

## Colores Disponibles
- **Por defecto**: Azul estándar
- **Rojo**: Notas urgentes o importantes
- **Azul**: Notas de trabajo o profesionales
- **Verde**: Notas personales o completadas
- **Amarillo**: Notas de recordatorio
- **Morado**: Notas creativas o ideas

## Estadísticas Técnicas
- Líneas de código: ~400 líneas
- Funcionalidades: 12 principales
- Tiempo de desarrollo: ~5 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Almacenamiento: localStorage

## Casos de Uso
- **Estudiantes**: Notas de clase y estudio
- **Profesionales**: Ideas y recordatorios
- **Escritores**: Ideas y borradores
- **Desarrolladores**: Notas técnicas
- **Personal**: Listas y recordatorios

## Características Avanzadas
- **Búsqueda en Tiempo Real**: Filtrado instantáneo
- **Fechas Relativas**: "Hoy", "Ayer", "Hace X días"
- **Validación**: Campos requeridos
- **Confirmaciones**: Eliminación segura
- **Responsive**: Adaptación completa a móviles

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 49*
