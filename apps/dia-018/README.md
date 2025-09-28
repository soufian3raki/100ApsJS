# 🎨 Día 18: Editor de Imágenes

## 📋 Descripción
Editor de imágenes básico con herramientas de dibujo, filtros, ajustes de color y funcionalidades de edición.

## ✨ Características
- **Herramientas de dibujo** (pincel, lápiz, borrador)
- **Filtros de imagen** (blur, sharpen, sepia, etc.)
- **Ajustes de color** (brillo, contraste, saturación)
- **Capas de edición** con opacidad
- **Guardar y cargar** imágenes
- **Deshacer/Rehacer** acciones
- **Diseño profesional** y responsive

## 🚀 Cómo Funciona

### Herramientas de Dibujo
```javascript
let isDrawing = false;
let currentTool = "brush";
let currentColor = "#000000";
let brushSize = 5;

function startDrawing(e) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}
```

### Aplicación de Filtros
```javascript
function applyFilter(filterType) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    switch (filterType) {
      case "grayscale":
        const gray = r * 0.299 + g * 0.587 + b * 0.114;
        data[i] = data[i + 1] = data[i + 2] = gray;
        break;
      case "sepia":
        data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        break;
      case "invert":
        data[i] = 255 - r;
        data[i + 1] = 255 - g;
        data[i + 2] = 255 - b;
        break;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Canvas API**: Manipulación de imágenes
- **ImageData**: Procesamiento de píxeles
- **Event handling**: Dibujo con mouse
- **Array methods**: Procesamiento de datos
- **Math operations**: Cálculos de filtros
- **File API**: Carga y descarga

### CSS
- **Flexbox para layout**: Disposición de herramientas
- **Grid para paleta**: Organización de colores
- **Hover effects**: Interactividad visual
- **Responsive design**: Adaptación móvil
- **Custom sliders**: Controles personalizados

### Procesamiento de Imágenes
- **Manipulación de píxeles**: Algoritmos de filtros
- **Conversión de colores**: Espacios de color
- **Operaciones matemáticas**: Aplicación de filtros
- **Optimización**: Rendimiento de canvas

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Canvas, file inputs
- **CSS3**: Flexbox, grid, responsive
- **JavaScript ES6+**: Canvas API
- **File API**: Carga de archivos

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Canvas escalable**: Se adapta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Herramientas claras

## 🎮 Controles
- **Mouse**: Dibujo y selección de herramientas
- **Teclado**: 
  - `Ctrl + Z`: Deshacer
  - `Ctrl + Y`: Rehacer
  - `Ctrl + S`: Guardar imagen

## 🔧 Estructura del Código
```
dia-018/
├── index.html          # Estructura HTML + canvas
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + editor
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona una herramienta de dibujo
3. Elige un color y tamaño de pincel
4. Dibuja en el canvas
5. Aplica filtros y ajustes

## 💡 Mejoras Futuras
- [ ] Más herramientas de dibujo
- [ ] Capas múltiples
- [ ] Efectos de texto
- [ ] Modo de selección
- [ ] Historial de acciones
- [ ] Integración con APIs

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~5 horas
- **Complejidad**: Alta
- **Dependencias**: Ninguna
- **APIs**: Canvas, File

## 🎨 Casos de Uso
- **Arte digital**: Creación de imágenes
- **Diseño**: Herramientas básicas
- **Educación**: Aprendizaje de edición
- **Prototipado**: Diseño rápido

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 18*
