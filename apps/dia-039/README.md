# 😂 Día 39: Generador de Memes

## 📋 Descripción
Generador completo de memes con editor de texto, plantillas populares, personalización avanzada y galería de memes guardados.

## ✨ Características
- **Editor de texto** con controles de tamaño, color y fuente
- **Plantillas populares** de memes conocidos
- **Carga de imágenes** personalizadas
- **Overlay en tiempo real** del texto
- **Galería de memes** guardados
- **Descarga y compartir** de memes
- **Interfaz responsive** y moderna

## 🚀 Cómo Funciona

### Dibujo de Texto en Canvas
```javascript
drawText(text, x, y, size, color, font) {
  if (!text) return;
  
  this.ctx.font = size + "px " + font;
  this.ctx.fillStyle = color;
  this.ctx.strokeStyle = "#000";
  this.ctx.lineWidth = 3;
  this.ctx.textAlign = "center";
  this.ctx.textBaseline = "middle";
  
  this.ctx.strokeText(text, x, y);
  this.ctx.fillText(text, x, y);
}
```

### Actualización en Tiempo Real
```javascript
updateMeme() {
  this.drawMeme();
}

updateOverlays() {
  this.topTextOverlay.textContent = this.topTextInput.value;
  this.topTextOverlay.style.fontSize = this.topTextSize.value + "px";
  this.topTextOverlay.style.color = this.topTextColor.value;
  this.topTextOverlay.style.fontFamily = this.topTextFont.value;
  
  this.bottomTextOverlay.textContent = this.bottomTextInput.value;
  this.bottomTextOverlay.style.fontSize = this.bottomTextSize.value + "px";
  this.bottomTextOverlay.style.color = this.bottomTextColor.value;
  this.bottomTextOverlay.style.fontFamily = this.bottomTextFont.value;
}
```

### Gestión de Plantillas
```javascript
loadTemplate(templateName) {
  if (!templateName) return;
  
  const templates = {
    "distracted-boyfriend": "https://i.imgflip.com/1bij.jpg",
    "drake-pointing": "https://i.imgflip.com/30x1g.jpg",
    "woman-yelling-at-cat": "https://i.imgflip.com/345v97.jpg",
    "two-buttons": "https://i.imgflip.com/1g8my.jpg",
    "change-my-mind": "https://i.imgflip.com/24y43o.jpg",
    "this-is-fine": "https://i.imgflip.com/26am.jpg"
  };
  
  const imageUrl = templates[templateName];
  if (imageUrl) {
    this.loadImage(imageUrl);
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Canvas API**: Dibujo de texto e imágenes
- **FileReader API**: Carga de archivos
- **LocalStorage**: Persistencia de memes
- **Clipboard API**: Copia de imágenes
- **Web Share API**: Compartir archivos
- **Event handling**: Controles interactivos

### CSS
- **Grid layout**: Editor y galería
- **Flexbox**: Controles y botones
- **Responsive design**: Adaptación móvil
- **Overlay positioning**: Texto superpuesto
- **Gallery grid**: Muestra de memes

### Canvas
- **Dibujo de texto**: Con contorno y relleno
- **Manipulación de imágenes**: Redimensionado
- **Exportación**: A formato PNG
- **Overlay**: Texto superpuesto

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, overlay
- **JavaScript ES6+**: Clases y APIs
- **Canvas API**: Dibujo y exportación
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Texto claro

## 🎮 Controles
- **Mouse**: Clic en controles y galería
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Activar botones
  - `Escape`: Cerrar modales

## 🔧 Estructura del Código
```
dia-039/
├── index.html          # Estructura HTML + canvas
├── app.css            # Estilos + gallery
├── app.js             # Lógica + clase MemeGenerator
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Sube una imagen o selecciona una plantilla
3. Personaliza el texto superior e inferior
4. Ajusta tamaño, color y fuente
5. Descarga o comparte tu meme

## 💡 Mejoras Futuras
- [ ] Más plantillas de memes
- [ ] Efectos de texto (sombra, gradiente)
- [ ] Filtros de imagen
- [ ] Colaboración en tiempo real
- **IA**: Generación automática de memes
- **Redes sociales**: Integración directa

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: Canvas, FileReader, Clipboard

## 😂 Casos de Uso
- **Entretenimiento**: Creación de memes
- **Marketing**: Contenido viral
- **Educación**: Material didáctico
- **Redes sociales**: Contenido compartible

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 39*
