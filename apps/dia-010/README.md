# 😂 Día 10: Generador de Memes

## 📋 Descripción
Generador de memes interactivo con plantillas predefinidas, edición de texto personalizable y descarga de imágenes.

## ✨ Características
- **Plantillas de memes populares**
- **Editor de texto superior e inferior**
- **Cambio de tamaño y posición de texto**
- **Paleta de colores para el texto**
- **Descarga de memes generados**
- **Preview en tiempo real**
- **Diseño divertido y moderno**

## 🚀 Cómo Funciona

### Plantillas de Memes
```javascript
const memeTemplates = [
  {
    id: 1,
    name: "Drake Pointing",
    image: "drake-meme.jpg",
    textPositions: {
      top: { x: 50, y: 20, width: 40, height: 30 },
      bottom: { x: 50, y: 70, width: 40, height: 30 }
    }
  },
  {
    id: 2,
    name: "Distracted Boyfriend",
    image: "distracted-boyfriend.jpg",
    textPositions: {
      top: { x: 50, y: 15, width: 45, height: 25 },
      bottom: { x: 50, y: 80, width: 45, height: 25 }
    }
  }
];
```

### Generación de Canvas
```javascript
function generateMeme() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Dibujar imagen de fondo
    ctx.drawImage(img, 0, 0);
    
    // Dibujar texto superior
    drawText(ctx, topText.value, topTextPosition, "white", "black");
    
    // Dibujar texto inferior
    drawText(ctx, bottomText.value, bottomTextPosition, "white", "black");
    
    // Mostrar preview
    preview.src = canvas.toDataURL();
  };
  
  img.src = selectedTemplate.image;
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Canvas API**: Manipulación de imágenes
- **Image object**: Carga de imágenes
- **Context 2D**: Dibujar en canvas
- **toDataURL()**: Exportar imágenes
- **File API**: Descarga de archivos
- **Event handling**: Gestión de eventos

### CSS
- **Flexbox para layout**: Disposición de elementos
- **Grid para plantillas**: Organización de opciones
- **Hover effects**: Interactividad visual
- **Responsive design**: Adaptación móvil
- **Custom scrollbars**: Personalización

### Canvas API
- **drawImage()**: Dibujar imágenes
- **fillText() y strokeText()**: Dibujar texto
- **Configuración de fuentes**: Estilos de texto
- **Manipulación de coordenadas**: Posicionamiento

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Canvas, file inputs
- **CSS3**: Flexbox, grid, responsive
- **JavaScript ES6+**: Canvas API
- **File API**: Descarga de archivos

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Canvas escalable**: Se adapta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Texto claro

## 🎮 Controles
- **Mouse**: Clic en plantillas y botones
- **Teclado**: 
  - `Ctrl + S`: Descargar meme
  - `Ctrl + G`: Generar nuevo
  - `Tab`: Navegación entre campos

## 🔧 Estructura del Código
```
dia-010/
├── index.html          # Estructura HTML + canvas
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + canvas API
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona una plantilla de meme
3. Escribe el texto superior e inferior
4. Ajusta colores y posición si es necesario
5. Descarga tu meme generado

## 💡 Mejoras Futuras
- [ ] Más plantillas de memes
- [ ] Editor de imágenes básico
- [ ] Efectos de texto
- [ ] Compartir en redes sociales
- [ ] Galería de memes creados
- [ ] Modo colaborativo

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~250 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Alta
- **Dependencias**: Ninguna
- **APIs**: Canvas, File

## 😂 Casos de Uso
- **Entretenimiento**: Creación de memes
- **Redes sociales**: Contenido viral
- **Marketing**: Campañas creativas
- **Educación**: Aprendizaje visual

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 10*
