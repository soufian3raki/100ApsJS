# Día 47: Portafolio Editable tipo CMS

## Descripción
Sistema de gestión de contenido (CMS) para crear y editar tu portafolio personal. Permite gestionar información personal, habilidades, proyectos y experiencia laboral con vista previa en tiempo real.

## Características
- **Modo Edición**: Formularios para editar toda la información
- **Vista Previa**: Visualización del portafolio final
- **Gestión de Habilidades**: Agregar/eliminar habilidades dinámicamente
- **Gestión de Proyectos**: Proyectos con enlaces y descripciones
- **Experiencia Laboral**: Historial profesional editable
- **Persistencia**: Datos guardados en localStorage
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Exportación**: Fácil copia de datos para otros formatos

## Cómo Funciona

### Sistema de Modos
```javascript
setEditMode(edit) {
  this.isEditMode = edit;
  const editor = document.getElementById('portfolioEditor');
  const preview = document.getElementById('portfolioPreview');
  
  if (edit) {
    editor.style.display = 'block';
    preview.style.display = 'none';
  } else {
    editor.style.display = 'none';
    preview.style.display = 'block';
    this.updatePreview();
  }
}
```

### Gestión de Habilidades
```javascript
addSkill() {
  const skill = skillInput.value.trim();
  if (skill && !this.portfolio.skills.includes(skill)) {
    this.portfolio.skills.push(skill);
    this.renderSkills();
  }
}
```

### Actualización de Vista Previa
```javascript
updatePreview() {
  document.getElementById('previewName').textContent = this.portfolio.name;
  document.getElementById('previewTitle').textContent = this.portfolio.title;
  // ... actualizar todos los elementos
}
```

## Conceptos Aprendidos

### JavaScript
- Clases ES6: Organización del código
- localStorage: Persistencia de datos
- DOM manipulation: Creación dinámica de elementos
- Event handling: Múltiples tipos de eventos
- Template literals: Generación de HTML
- Array methods: filter(), map(), includes()

### CSS
- CSS Grid: Layout de proyectos y experiencia
- Flexbox: Alineación de elementos
- Display toggle: Mostrar/ocultar secciones
- Responsive design: Adaptación móvil
- Pseudo-classes: :hover, :active
- CSS Variables: Temas consistentes

### HTML
- Formularios: Inputs, textarea, select
- Semantic HTML: Estructura semántica
- Data attributes: Para identificación
- Accessibility: Labels y aria-labels

## Tecnologías Utilizadas
- HTML5: Formularios y estructura semántica
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Clases, arrow functions, template literals
- localStorage: Persistencia de datos
- Sin dependencias: JavaScript puro

## Secciones del Portafolio
1. **Información Personal**: Nombre, título, descripción, contacto
2. **Habilidades**: Lista de habilidades técnicas
3. **Proyectos**: Proyectos con enlaces y descripciones
4. **Experiencia**: Historial laboral con fechas

## Controles
- **Modo Edición**: Editar información del portafolio
- **Vista Previa**: Ver cómo se verá el portafolio
- **Guardar**: Persistir cambios en localStorage
- **Agregar/Remover**: Elementos dinámicos
- **Enlaces**: Proyectos con URLs externas

## Cómo Ejecutar
1. Abre index.html en tu navegador
2. Completa la información personal
3. Agrega habilidades, proyectos y experiencia
4. Cambia a "Vista Previa" para ver el resultado
5. Guarda los cambios cuando estés satisfecho

## Casos de Uso
- **Desarrolladores**: Portafolio profesional
- **Diseñadores**: Muestra de trabajos
- **Freelancers**: Presentación de servicios
- **Estudiantes**: Portafolio académico
- **Profesionales**: CV interactivo

## Estadísticas Técnicas
- Líneas de código: ~300 líneas
- Funcionalidades: 12 principales
- Tiempo de desarrollo: ~5 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Almacenamiento: localStorage

## Características Avanzadas
- **Validación**: Campos requeridos
- **Confirmación**: Eliminación con confirmación
- **Feedback Visual**: Estados de guardado
- **Responsive**: Adaptación completa
- **Accesibilidad**: Labels y navegación por teclado

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 47*
