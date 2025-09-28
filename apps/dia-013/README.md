# 📏 Día 13: Conversor de Unidades

## 📋 Descripción
Conversor universal de unidades con múltiples categorías: longitud, peso, temperatura, volumen y área.

## ✨ Características
- **5 categorías de conversión**
- **Múltiples unidades por categoría**
- **Cálculo automático** en tiempo real
- **Historial de conversiones**
- **Diseño intuitivo** y responsive
- **Validación de entrada**

## 🚀 Cómo Funciona

### Sistema de Conversión
```javascript
const conversionFactors = {
  length: {
    "mm": 1,
    "cm": 10,
    "m": 1000,
    "km": 1000000,
    "in": 25.4,
    "ft": 304.8,
    "yd": 914.4,
    "mi": 1609344
  },
  weight: {
    "mg": 1,
    "g": 1000,
    "kg": 1000000,
    "oz": 28349.5,
    "lb": 453592,
    "ton": 1000000000
  }
};

function convert(value, fromUnit, toUnit, category) {
  if (category === "temperature") {
    return convertTemperature(value, fromUnit, toUnit);
  }
  
  const fromFactor = conversionFactors[category][fromUnit];
  const toFactor = conversionFactors[category][toUnit];
  
  return (value * fromFactor) / toFactor;
}
```

### Historial de Conversiones
```javascript
let conversionHistory = JSON.parse(localStorage.getItem("conversionHistory")) || [];

function addToHistory(fromValue, fromUnit, toValue, toUnit, category) {
  const conversion = {
    id: Date.now(),
    from: `${fromValue} ${fromUnit}`,
    to: `${toValue} ${toUnit}`,
    category: category,
    timestamp: new Date().toISOString()
  };
  
  conversionHistory.unshift(conversion);
  
  // Mantener solo los últimos 20
  if (conversionHistory.length > 20) {
    conversionHistory = conversionHistory.slice(0, 20);
  }
  
  localStorage.setItem("conversionHistory", JSON.stringify(conversionHistory));
  renderHistory();
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Objetos complejos**: Almacenamiento de datos
- **Funciones de conversión**: Lógica matemática
- **LocalStorage**: Persistencia de datos
- **Array methods**: unshift(), slice()
- **Event handling**: Gestión de eventos
- **Validación de entrada**: Verificación de datos

### CSS
- **Flexbox para layout**: Disposición de elementos
- **Grid para historial**: Organización de datos
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual
- **Custom select styling**: Personalización

### Matemáticas
- **Conversión de unidades**: Cálculos matemáticos
- **Factores de conversión**: Constantes de conversión
- **Redondeo de decimales**: Precisión en resultados
- **Validación numérica**: Verificación de entrada

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Formularios, selectores
- **CSS3**: Flexbox, grid, responsive
- **JavaScript ES6+**: Lógica de conversión
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Números y texto claros

## 🎮 Controles
- **Mouse**: Clic en selectores y input
- **Teclado**: 
  - `Tab`: Navegación entre campos
  - `Enter`: Actualizar conversión
  - `Números`: Ingreso de cantidad

## 🔧 Estructura del Código
```
dia-013/
├── index.html          # Estructura HTML + formularios
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + conversiones
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona la categoría de conversión
3. Elige las unidades origen y destino
4. Ingresa el valor a convertir
5. El resultado se calcula automáticamente

## 📏 Categorías Soportadas
- **Longitud**: mm, cm, m, km, in, ft, yd, mi
- **Peso**: mg, g, kg, oz, lb, ton
- **Temperatura**: °C, °F, K
- **Volumen**: ml, l, gal, qt, pt, cup
- **Área**: mm², cm², m², km², in², ft², yd², ac

## 💡 Mejoras Futuras
- [ ] Más categorías de unidades
- [ ] Conversión de monedas
- [ ] Gráficos de conversión
- [ ] Favoritos de conversiones
- [ ] Modo offline
- [ ] Exportar historial

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~250 líneas
- **Tiempo de desarrollo**: ~3 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Categorías**: 5 soportadas

## 📏 Casos de Uso
- **Cocina**: Conversión de ingredientes
- **Construcción**: Medidas y materiales
- **Ciencia**: Cálculos de laboratorio
- **Educación**: Aprendizaje de unidades

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 13*
