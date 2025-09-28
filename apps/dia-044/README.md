# 📄 Día 44: Generador de CV en PDF

## 📋 Descripción
Generador completo de CV profesional con vista previa en tiempo real y exportación a PDF. Incluye formularios dinámicos para experiencia, educación, proyectos e idiomas.

## ✨ Características
- **Formulario completo** con información personal y profesional
- **Secciones dinámicas** para experiencia, educación, proyectos e idiomas
- **Vista previa en tiempo real** del CV generado
- **Exportación a PDF** usando jsPDF
- **Plantilla de ejemplo** para facilitar el uso
- **Diseño responsive** adaptado a todos los dispositivos
- **Validación de formularios** y manejo de errores
- **Interfaz intuitiva** con botones de agregar/eliminar

## �� Cómo Funciona

### Generación de CV HTML
```javascript
generateCVHTML(data) {
    let html = `
        <div class="cv-header">
            <div class="cv-name">${data.personal.fullName || "Tu Nombre"}</div>
            <div class="cv-contact">${data.personal.email || "tu@email.com"}</div>
            <div class="cv-contact">${data.personal.phone || "+1 234 567 8900"}</div>
            <div class="cv-contact">${data.personal.location || "Ciudad, País"}</div>
            ${data.personal.linkedin ? `<div class="cv-contact">LinkedIn: ${data.personal.linkedin}</div>` : ""}
            ${data.personal.github ? `<div class="cv-contact">GitHub: ${data.personal.github}</div>` : ""}
        </div>
    `;
    
    // Generar secciones dinámicamente
    if (data.personal.summary) {
        html += this.generateSummarySection(data.personal.summary);
    }
    
    if (data.experience.length > 0) {
        html += this.generateExperienceSection(data.experience);
    }
    
    // ... más secciones
    return html;
}
```

### Exportación a PDF
```javascript
async downloadPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        
        // Configurar fuente
        pdf.setFont("helvetica");
        
        // Generar contenido del PDF
        const data = this.getFormData();
        this.generatePDFContent(pdf, data);
        
        // Descargar
        pdf.save(`${data.personal.fullName || "CV"}_${new Date().toISOString().split("T")[0]}.pdf`);
        
    } catch (error) {
        console.error("Error generando PDF:", error);
        alert("Error al generar el PDF. Asegúrate de que las librerías estén cargadas correctamente.");
    }
}
```

### Gestión de Secciones Dinámicas
```javascript
addExperience() {
    const container = this.experienceContainer;
    const experienceItem = document.createElement("div");
    experienceItem.className = "experience-item";
    experienceItem.innerHTML = `
        <div class="form-group">
            <label>Puesto</label>
            <input type="text" class="job-title" placeholder="Desarrollador Frontend">
        </div>
        <div class="form-group">
            <label>Empresa</label>
            <input type="text" class="company" placeholder="Nombre de la empresa">
        </div>
        // ... más campos
        <button class="btn btn-danger remove-experience">Eliminar</button>
    `;
    
    container.appendChild(experienceItem);
    
    // Event listener para eliminar
    experienceItem.querySelector(".remove-experience").addEventListener("click", () => {
        experienceItem.remove();
    });
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **DOM manipulation**: Creación dinámica de elementos
- **Event handling**: Gestión de eventos de formularios
- **Template literals**: Generación de HTML dinámico
- **Array methods**: map, filter, forEach
- **Object manipulation**: Gestión de datos complejos
- **Async/await**: Manejo de operaciones asíncronas

### CSS
- **Grid layout**: Diseño de formularios complejos
- **Flexbox**: Alineación de elementos
- **Responsive design**: Adaptación móvil
- **CSS variables**: Consistencia de colores
- **Animations**: Transiciones suaves
- **Custom scrollbar**: Scrollbar personalizado

### Librerías Externas
- **jsPDF**: Generación de documentos PDF
- **html2canvas**: Captura de elementos HTML
- **CDN integration**: Carga de librerías externas

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica y formularios
- **CSS3**: Grid, flexbox, responsive design
- **JavaScript ES6+**: Clases, async/await, template literals
- **jsPDF**: Generación de PDFs
- **html2canvas**: Captura de pantalla

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño de pantalla
- **Touch friendly**: Botones apropiados para touch
- **Legibilidad**: Texto claro en todos los tamaños

## ⌨️ Controles
- **Mouse**: Clic en botones y formularios
- **Teclado**: 
  - `Tab`: Navegación entre campos
  - `Enter`: Enviar formularios
  - `Escape`: Cancelar operaciones

## 🔧 Estructura del Código
```
dia-044/
├── index.html          # Estructura HTML + formularios
├── app.css            # Estilos + responsive
├── app.js             # Lógica + clase CVGenerator
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Completa la información personal
3. Agrega experiencia, educación, proyectos e idiomas
4. Usa "Vista Previa" para ver el CV
5. Presiona "Descargar PDF" para exportar

## 💡 Mejoras Futuras
- [ ] Múltiples plantillas de diseño
- [ ] Subida de foto de perfil
- [ ] Validación avanzada de formularios
- [ ] Guardado automático en localStorage
- **IA**: Sugerencias de contenido
- **Colaboración**: Compartir CVs

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~500 líneas
- **Tiempo de desarrollo**: ~5 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: jsPDF, html2canvas
- **APIs**: DOM, File API

## 📄 Casos de Uso
- **Búsqueda de empleo**: CVs profesionales
- **Freelancers**: Portafolio personal
- **Estudiantes**: CVs académicos
- **Profesionales**: Actualización de CVs

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 44*
