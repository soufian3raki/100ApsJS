# 📊 Día 52: Lector de Archivos CSV con Gráficos

## 📋 Descripción
Aplicación completa para leer, procesar y visualizar archivos CSV con múltiples opciones de configuración, generación de gráficos interactivos y análisis estadístico de datos.

## ✨ Características
- **📁 Carga de Archivos**: Soporte para drag & drop y selección de archivos
- **⚙️ Configuración Flexible**: Múltiples delimitadores y codificaciones
- **👁️ Vista Previa**: Tabla interactiva con scroll y paginación
- **📈 Gráficos Interactivos**: 4 tipos de gráficos con Chart.js
- **📊 Análisis Estadístico**: Estadísticas automáticas por columna
- **💾 Exportación**: Descarga de datos en JSON e imágenes
- **📱 Responsive**: Diseño adaptativo completo

## 🔧 Cómo Funciona

### 📄 Procesamiento de CSV
```javascript
parseCSVLine(line, delimiter) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}
```

### 📈 Generación de Gráficos
```javascript
generateChart() {
  const chartData = this.prepareChartData(xAxis, yAxis, groupBy, chartType);
  
  this.currentChart = new Chart(ctx, {
    type: chartType,
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: `${xAxis} vs ${yAxis}` }
      }
    }
  });
}
```

### 📊 Análisis Estadístico
```javascript
calculateStatistics() {
  const numericValues = column.filter(val => !isNaN(parseFloat(val)));
  const mean = sum / numericValues.length;
  const median = sorted.length % 2 === 0 
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
}
```

## 🎓 Conceptos Aprendidos

### 💻 JavaScript
- File API: Lectura de archivos locales
- FileReader: Procesamiento asíncrono de archivos
- Chart.js: Visualización de datos
- Drag & Drop API: Interfaz de arrastrar y soltar
- Blob API: Generación de archivos para descarga
- Array methods: map(), filter(), reduce(), sort()

### 🎨 CSS
- CSS Grid: Layout de controles y estadísticas
- Flexbox: Alineación de elementos
- Drag & Drop: Estilos para área de carga
- Responsive design: Media queries
- Sticky positioning: Encabezados fijos en tabla

### 🌐 HTML
- File input: Carga de archivos
- Canvas element: Gráficos
- Table element: Visualización de datos
- Drag & Drop: Eventos de arrastrar y soltar

## 🛠️ Tecnologías Utilizadas
- HTML5: File API, Canvas, Drag & Drop
- CSS3: Grid, Flexbox, responsive design
- JavaScript ES6+: Async/await, arrow functions
- Chart.js: Gráficos interactivos
- File API: Procesamiento de archivos

## 📊 Tipos de Gráficos Soportados
- **Línea**: Tendencias temporales
- **Barras**: Comparación de categorías
- **Circular**: Distribución porcentual
- **Dispersión**: Correlación entre variables

## 🔧 Delimitadores Soportados
- **Coma (,)** : Estándar CSV
- **Punto y coma (;)** : Excel europeo
- **Tabulación** : TSV
- **Pipe (|)** : Formato alternativo

## 🌐 Codificaciones Soportadas
- **UTF-8**: Estándar internacional
- **Latin-1**: Windows occidental
- **Windows-1252**: Windows específico

## 🎮 Controles Disponibles
- **Cargar Archivo**: Drag & drop o selección
- **Configurar**: Delimitador, encabezados, codificación
- **Procesar**: Parsear y mostrar datos
- **Visualizar**: Generar gráficos interactivos
- **Exportar**: Descargar JSON o imágenes
- **Estadísticas**: Análisis automático de datos

## 🚀 Cómo Ejecutar
1. Abre index.html en tu navegador
2. Arrastra un archivo CSV o haz clic para seleccionar
3. Configura el delimitador y otras opciones
4. Haz clic en "Procesar CSV"
5. Revisa la vista previa de los datos
6. Genera gráficos seleccionando ejes X e Y
7. Explora las estadísticas automáticas
8. Exporta los datos o gráficos según necesites

## 📊 Estadísticas Calculadas
- **Promedio**: Media aritmética
- **Mediana**: Valor central
- **Mínimo/Máximo**: Rango de valores
- **Valores Únicos**: Conteo de categorías
- **Total de Filas/Columnas**: Metadatos del dataset

## ⚡ Características Avanzadas
- **Parsing Robusto**: Manejo de comillas y delimitadores
- **Vista Previa Inteligente**: Paginación automática
- **Gráficos Responsivos**: Adaptación a pantallas
- **Exportación Múltiple**: JSON e imágenes
- **Análisis Automático**: Estadísticas por columna

## 📊 Estadísticas Técnicas
- Líneas de código: ~500 líneas
- Funcionalidades: 15 principales
- Tiempo de desarrollo: ~7 horas
- Complejidad: Intermedia-Alta
- Dependencias: Chart.js
- Formatos: CSV, JSON, PNG

## 💼 Casos de Uso
- **Análisis de Datos**: Exploración de datasets
- **Reportes Empresariales**: Visualización de KPIs
- **Investigación**: Análisis estadístico
- **Educación**: Enseñanza de datos
- **Desarrollo**: Testing de datos

## ⚠️ Limitaciones
- Solo archivos locales (no URLs)
- Tamaño limitado por memoria del navegador
- No incluye filtros avanzados
- No soporta bases de datos

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 52*
