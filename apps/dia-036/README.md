# 📝 Día 36: Editor de Markdown en Vivo

## 📋 Descripción
Editor de Markdown completo con vista previa en tiempo real, toolbar de formato, estadísticas de texto y gestión de documentos.

## ✨ Características
- **Vista previa en tiempo real** del Markdown renderizado
- **Toolbar de formato** con botones para negrita, cursiva, títulos, etc.
- **Estadísticas de texto** (palabras, caracteres, líneas, tiempo de lectura)
- **Gestión de documentos** con guardado y carga
- **Exportación a HTML** del contenido renderizado
- **Carga de archivos** desde el sistema
- **Interfaz responsive** con paneles divididos

## 🚀 Cómo Funciona

### Parser de Markdown
```javascript
parseMarkdown(markdown) {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  
  // Code
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");
  html = html.replace(/```([\\s\\S]*?)```/g, "<pre><code>$1</code></pre>");
  
  // Links
  html = html.replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, "<a href=\"$2\">$1</a>");
  
  return html;
}
```

### Toolbar de Formato
```javascript
executeCommand(command) {
  const textarea = this.markdownInput;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  
  let newText = "";
  
  switch (command) {
    case "bold":
      newText = "**" + (selectedText || "texto en negrita") + "**";
      break;
    case "italic":
      newText = "*" + (selectedText || "texto en cursiva") + "*";
      break;
    case "heading1":
      newText = "# " + (selectedText || "Título 1");
      break;
    // ... más comandos
  }
  
  textarea.value = before + newText + after;
  this.updatePreview();
}
```

### Estadísticas de Texto
```javascript
updateStats() {
  const text = this.markdownInput.value;
  const words = text.trim().split(/\\s+/).filter(word => word.length > 0).length;
  const chars = text.length;
  const lines = text.split("\\n").length;
  const readTime = Math.ceil(words / 200);
  
  this.wordCount.textContent = words;
  this.charCount.textContent = chars;
  this.lineCount.textContent = lines;
  this.readTime.textContent = readTime + " min";
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Regex**: Patrones de Markdown
- **String methods**: replace, split, trim
- **DOM manipulation**: Vista previa dinámica
- **LocalStorage**: Persistencia de documentos
- **FileReader API**: Carga de archivos
- **Clipboard API**: Copia al portapapeles

### CSS
- **Grid layout**: Paneles divididos
- **Flexbox**: Toolbar y controles
- **Responsive design**: Adaptación móvil
- **Typography**: Estilos de Markdown
- **Modal**: Ventana de carga

### Markdown
- **Sintaxis**: Headers, bold, italic, code
- **Enlaces**: Formato [texto](url)
- **Imágenes**: Formato ![alt](url)
- **Listas**: Bullets y numeradas
- **Tablas**: Formato de columnas
- **Citas**: Blockquotes

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, typography
- **JavaScript ES6+**: Clases y lógica
- **LocalStorage**: Persistencia
- **FileReader API**: Carga de archivos
- **Clipboard API**: Copia de texto

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Tipografía clara

## 🎮 Controles
- **Mouse**: Clic en toolbar y botones
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Ctrl+S`: Guardar documento
  - `Ctrl+N`: Nuevo documento

## 🔧 Estructura del Código
```
dia-036/
├── index.html          # Estructura HTML + modal
├── app.css            # Estilos + markdown
├── app.js             # Lógica + clase MarkdownEditor
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Escribe Markdown en el panel izquierdo
3. Observa la vista previa en tiempo real
4. Usa la toolbar para formatear texto
5. Guarda y carga documentos

## 💡 Mejoras Futuras
- [ ] Sintaxis highlighting
- [ ] Modo oscuro para el editor
- [ ] Plantillas de documentos
- [ ] Colaboración en tiempo real
- **Plugins**: Extensiones personalizadas
- **Temas**: Estilos de vista previa

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: FileReader, Clipboard

## 📝 Casos de Uso
- **Blogging**: Escritura de artículos
- **Documentación**: Creación de docs
- **Notas**: Apuntes personales
- **Educación**: Material didáctico

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 36*
