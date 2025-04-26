# 📊 Día 58: Generador de Código de Barras

## 📋 Descripción
Generador completo de códigos de barras con múltiples formatos (Code 128, Code 39, EAN-13, EAN-8, UPC-A, Codabar, ITF-14, MSI), personalización visual, exportación en diferentes formatos y historial de códigos generados.

## ✨ Características
- **📊 Múltiples Formatos**: 8 tipos de códigos de barras soportados
- **🎨 Personalización Visual**: Colores, dimensiones y texto personalizable
- **📤 Exportación**: SVG, PNG y tabla HTML
- **📋 Historial**: Gestión de códigos generados anteriormente
- **🔍 Validación**: Verificación de formato según tipo de código
- **📱 Responsive**: Diseño adaptativo completo
- **💾 Persistencia**: Historial guardado en localStorage
- **🖨️ Impresión**: Función de impresión optimizada

## 🔧 Cómo Funciona

### 📊 Generación de Códigos
```javascript
generateBarcodeData(type, text) {
  const patterns = {
    'code128': this.generateCode128Pattern(text),
    'code39': this.generateCode39Pattern(text),
    'ean13': this.generateEAN13Pattern(text),
    // ... más tipos
  };
  
  return patterns[type] || null;
}
```

### 🎨 Renderizado Visual
```javascript
renderSVG(container, barcodeData, options) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const barWidth = width / barcodeData.length;
  
  for (let i = 0; i < barcodeData.length; i++) {
    if (barcodeData[i] === '1') {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', height);
      svg.appendChild(rect);
    }
  }
}
```

### 🔍 Validación de Entrada
```javascript
validateInput(type, text) {
  const validators = {
    'code128': (text) => text.length <= 80,
    'code39': (text) => /^[A-Z0-9\s\-\.\$\/\+\%]+$/.test(text),
    'ean13': (text) => /^\d{13}$/.test(text),
    // ... más validadores
  };
  
  return validators[type] ? validators[type](text) : false;
}
```

## 🎓 Conceptos Aprendidos

### 💻 JavaScript
- SVG API: Creación de gráficos vectoriales
- Canvas API: Renderizado de gráficos raster
- Regular Expressions: Validación de formatos
- Blob API: Generación de archivos
- Clipboard API: Copia al portapapeles
- localStorage: Persistencia de datos

### 🎨 CSS
- CSS Grid: Layout de ejemplos y historial
- Flexbox: Alineación de elementos
- CSS Variables: Temas consistentes
- Responsive design: Media queries
- Print styles: Estilos para impresión

### 🌐 HTML
- SVG elements: Gráficos vectoriales
- Canvas element: Gráficos raster
- Form controls: Inputs, select, range
- Semantic HTML: Estructura semántica

## 🛠️ Tecnologías Utilizadas
- HTML5: SVG, Canvas, form controls
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Arrow functions, template literals
- SVG API: Gráficos vectoriales
- Canvas API: Gráficos raster
- localStorage: Persistencia de datos

## 📊 Tipos de Códigos Soportados
- **Code 128**: Alfanumérico, hasta 80 caracteres
- **Code 39**: Alfanumérico, hasta 43 caracteres
- **EAN-13**: 13 dígitos numéricos
- **EAN-8**: 8 dígitos numéricos
- **UPC-A**: 12 dígitos numéricos
- **Codabar**: Alfanumérico, hasta 20 caracteres
- **ITF-14**: 14 dígitos numéricos
- **MSI Plessey**: Numérico, hasta 20 caracteres

## 🎨 Opciones de Personalización
- **Dimensiones**: Ancho y alto personalizables
- **Colores**: Código de barras y fondo
- **Texto**: Mostrar/ocultar y tamaño
- **Formato**: SVG, Canvas o tabla HTML
- **Validación**: Verificación automática de formato

## 📤 Formatos de Exportación
- **SVG**: Gráfico vectorial escalable
- **PNG**: Imagen raster de alta calidad
- **HTML**: Tabla con barras y espacios
- **Historial**: Exportación JSON completa

## 🔍 Validaciones por Tipo
- **Code 128**: Máximo 80 caracteres
- **Code 39**: Solo A-Z, 0-9 y símbolos específicos
- **EAN-13**: Exactamente 13 dígitos
- **EAN-8**: Exactamente 8 dígitos
- **UPC-A**: Exactamente 12 dígitos
- **Codabar**: Formato específico con delimitadores
- **ITF-14**: Exactamente 14 dígitos
- **MSI**: Solo dígitos numéricos

## 🎮 Controles Disponibles
- **Generar**: Crear código de barras
- **Descargar SVG**: Exportar como vectorial
- **Descargar PNG**: Exportar como imagen
- **Copiar**: Copiar al portapapeles
- **Imprimir**: Imprimir código
- **Ejemplos**: Cargar ejemplos predefinidos
- **Historial**: Ver códigos anteriores

## 🚀 Cómo Ejecutar
1. Abre index.html en tu navegador
2. Selecciona el tipo de código de barras
3. Ingresa el texto/datos
4. Ajusta dimensiones y colores
5. Selecciona formato de salida
6. Haz clic en "Generar Código de Barras"
7. Descarga o copia el resultado
8. Revisa el historial de códigos

## 📋 Ejemplos Incluidos
- **Code 128**: "HELLO WORLD"
- **Code 39**: "123456789"
- **EAN-13**: "1234567890123"
- **EAN-8**: "12345678"
- **UPC-A**: "123456789012"
- **Codabar**: "A123456789A"

## 💾 Gestión de Historial
- **Almacenamiento**: Últimos 50 códigos
- **Persistencia**: Datos guardados localmente
- **Carga Rápida**: Click para reutilizar
- **Exportación**: Descarga en formato JSON
- **Limpieza**: Eliminar historial completo

## ⚡ Características Avanzadas
- **Patrones Reales**: Simulación de códigos de barras
- **Validación Estricta**: Verificación de formato
- **Múltiples Formatos**: SVG, Canvas, HTML
- **Responsive**: Adaptación completa a móviles
- **Accesibilidad**: Labels y aria-labels

## 📊 Estadísticas Técnicas
- Líneas de código: ~800 líneas
- Funcionalidades: 35 principales
- Tiempo de desarrollo: ~8 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Formatos: 8 tipos soportados

## 💼 Casos de Uso
- **Retail**: Códigos de productos
- **Inventario**: Identificación de items
- **Logística**: Tracking de paquetes
- **Bibliotecas**: Códigos de libros
- **Eventos**: Tickets y accesos

## 🔧 Implementación Técnica
- **Patrones**: Simulación de códigos reales
- **Renderizado**: SVG, Canvas y HTML
- **Validación**: Expresiones regulares
- **Exportación**: Blob API y descargas
- **Persistencia**: localStorage

## ⚠️ Limitaciones
- Solo simulación de códigos de barras
- No incluye checksums reales
- No soporta códigos 2D (QR, DataMatrix)
- No incluye escáner de códigos
- No tiene librerías externas

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 58*
