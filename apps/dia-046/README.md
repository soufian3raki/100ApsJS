# Día 46: Biblioteca Personal

## Descripción
Aplicación para gestionar tu biblioteca personal de libros. Permite agregar libros, marcar su estado de lectura (por leer, leyendo, leído), calificarlos y agregar notas personales.

## Características
- Gestión completa de libros: Agregar, editar, eliminar
- Estados de lectura: Por leer, Leyendo, Leído
- Sistema de calificación: 1-5 estrellas
- Notas personales: Comentarios sobre cada libro
- Filtros por estado: Ver libros por categoría
- Estadísticas: Contador de libros por estado
- Persistencia: Datos guardados en localStorage
- Diseño responsive: Adaptado a móviles y tablets

## Cómo Funciona

### Gestión de Libros
```javascript
addBook() {
  const book = {
    id: Date.now(),
    title,
    author,
    status,
    rating,
    notes,
    dateAdded: new Date().toISOString()
  };
  
  this.books.unshift(book);
  this.saveBooks();
}
```

### Sistema de Filtros
```javascript
getFilteredBooks() {
  if (this.currentFilter === 'all') {
    return this.books;
  }
  return this.books.filter(book => book.status === this.currentFilter);
}
```

### Calificación Visual
```javascript
renderRating(rating) {
  return Array.from({length: 5}, (_, i) => 
    `<span class="star ${i < rating ? '' : 'empty'}">★</span>`
  ).join('');
}
```

## Conceptos Aprendidos

### JavaScript
- Clases ES6: Organización del código
- Array methods: filter(), map(), find()
- localStorage: Persistencia de datos
- Date object: Timestamps y fechas
- Template literals: Generación de HTML dinámico
- Event delegation: Manejo de eventos dinámicos

### CSS
- CSS Grid: Layout de libros y estadísticas
- Flexbox: Alineación de elementos
- CSS Variables: Temas consistentes
- Pseudo-classes: :hover, :active
- Responsive design: Media queries
- Grid auto-fit: Layout adaptativo

### HTML
- Formularios: Inputs, select, textarea
- Data attributes: data-filter para filtros
- Semantic HTML: Estructura semántica
- Accessibility: aria-label, labels

## Tecnologías Utilizadas
- HTML5: Formularios y estructura semántica
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Clases, arrow functions, template literals
- localStorage: Persistencia de datos
- Sin dependencias: JavaScript puro

## Estados de Lectura
1. **Por leer**: Libros que planeas leer
2. **Leyendo**: Libros que estás leyendo actualmente
3. **Leído**: Libros que ya terminaste

## Controles
- **Agregar libro**: Completa el formulario y envía
- **Filtrar**: Usa los botones de filtro por estado
- **Editar**: Haz clic en "Editar" en cualquier libro
- **Eliminar**: Haz clic en "Eliminar" (con confirmación)
- **Calificar**: Usa el campo de calificación 1-5

## Cómo Ejecutar
1. Abre index.html en tu navegador
2. Completa el formulario para agregar un libro
3. Usa los filtros para ver libros por estado
4. Edita o elimina libros según necesites
5. Observa las estadísticas en tiempo real

## Estadísticas Técnicas
- Líneas de código: ~250 líneas
- Funcionalidades: 8 principales
- Tiempo de desarrollo: ~4 horas
- Complejidad: Intermedia
- Dependencias: Ninguna
- Almacenamiento: localStorage

## Casos de Uso
- **Estudiantes**: Seguimiento de libros académicos
- **Lectores**: Gestión de biblioteca personal
- **Escritores**: Referencias y notas de investigación
- **Clubes de lectura**: Compartir recomendaciones
- **Profesores**: Lista de lecturas recomendadas

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 46*
