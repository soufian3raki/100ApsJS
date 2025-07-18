# 🎨 Día 28: Conversor de Colores

## 📋 Descripción
Herramienta de conversión de colores entre formatos HEX, RGB y HSL con preview visual en tiempo real, generación automática de paletas y funcionalidad de copia al portapapeles.

## ✨ Características
- **Conversión bidireccional**: HEX ↔ RGB ↔ HSL
- **Preview visual**: Display circular del color seleccionado
- **Paleta automática**: 12 variaciones del color base
- **Copia al portapapeles**: Un clic para copiar el código del color
- **Validación de entrada**: Formato correcto para cada tipo
- **Diseño responsive**: Adaptado para móviles y desktop

## 🚀 Cómo Funciona

### Algoritmos de Conversión
```javascript
// HEX a RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// RGB a HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    // Cálculo del matiz (hue)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
```

### Generación de Paleta
```javascript
function generatePalette() {
  const colors = [];
  for (let i = 0; i < 12; i++) {
    let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
    
    if (i === 1) { // Más claro
      r = Math.min(255, r + 30);
      g = Math.min(255, g + 30);
      b = Math.min(255, b + 30);
    } else if (i === 2) { // Más oscuro
      r = Math.max(0, r - 30);
      g = Math.max(0, g - 30);
      b = Math.max(0, b - 30);
    } else if (i > 2) { // Aleatorios
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
    }
    
    colors.push(rgbToHex(r, g, b));
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Regex (Expresiones Regulares)**: Validación de formatos HEX
- **Algoritmos matemáticos**: Conversión entre espacios de color
- **DOM manipulation**: createElement(), appendChild()
- **Clipboard API**: navigator.clipboard.writeText()
- **Event handling**: input, click events
- **Array methods**: map(), forEach()

### CSS
- **CSS Variables**: Tema consistente
- **Border-radius**: Círculos perfectos
- **Box-shadow**: Efectos de profundidad
- **Hover effects**: Transform y transiciones
- **Grid layout**: Paleta de colores organizada
- **Responsive design**: Adaptación móvil

### Matemáticas
- **Conversión de bases**: Hexadecimal a decimal
- **Espacios de color**: RGB, HSL, HEX
- **Algoritmos de color**: Cálculo de matiz, saturación, luminosidad
- **Manipulación de colores**: Aclarar, oscurecer, variaciones

### UX/UI
- **Feedback visual**: Preview inmediato del color
- **Interactividad**: Clic para copiar, selección de paleta
- **Validación en tiempo real**: Formato correcto al escribir
- **Accesibilidad**: Contraste y legibilidad

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Inputs semánticos, estructura
- **CSS3**: Variables, grid, animaciones, responsive
- **JavaScript ES6+**: Arrow functions, template literals
- **Clipboard API**: Copia al portapapeles
- **Sin dependencias**: JavaScript puro

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Paleta se ajusta al tamaño de pantalla
- **Touch friendly**: Áreas de toque apropiadas
- **Preview escalable**: Círculo de color se adapta

## 🎨 Formatos Soportados
- **HEX**: #FF5733 (6 dígitos hexadecimales)
- **RGB**: rgb(255, 87, 51) (valores 0-255)
- **HSL**: hsl(12, 100%, 60%) (matiz 0-360°, sat/lum 0-100%)

## 🎮 Controles
- **Mouse**: 
  - Clic en preview para copiar
  - Clic en colores de paleta para seleccionar
- **Teclado**: 
  - Escribir en inputs para conversión automática

## 🔧 Estructura del Código
```
dia-028/
├── index.html          # Estructura HTML + inputs
├── app.css            # Estilos + responsive design
├── app.js             # Algoritmos + conversiones
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Escribe un color HEX (ej: #FF5733)
3. Observa las conversiones automáticas a RGB y HSL
4. Explora la paleta de colores generada
5. Haz clic en el preview para copiar el color
6. Selecciona colores de la paleta

## 💡 Mejoras Futuras
- [ ] Más formatos: CMYK, HSV, LAB
- [ ] Paleta de colores más sofisticada (complementarios, triádicos)
- [ ] Historial de colores usados
- [ ] Exportar paleta como imagen
- [ ] Modo de contraste para accesibilidad
- [ ] Generación de gradientes
- [ ] Integración con APIs de color
- [ ] Temas de color personalizables

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~180 líneas
- **Algoritmos implementados**: 4 (HEX→RGB, RGB→HEX, RGB→HSL, HSL→RGB)
- **Tiempo de desarrollo**: ~2.5 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna

## 🎨 Casos de Uso
- **Desarrolladores**: Conversión rápida de colores
- **Diseñadores**: Exploración de paletas
- **Estudiantes**: Aprendizaje de espacios de color
- **Profesionales**: Herramienta de referencia rápida

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 28*
