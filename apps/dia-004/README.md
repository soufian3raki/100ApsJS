# 💱 Día 4: Conversor de Divisas

## 📋 Descripción
Conversor de divisas con tasas de cambio en tiempo real, soporte para múltiples monedas y cálculo automático.

## ✨ Características
- **Conversión entre múltiples monedas**
- **Tasas de cambio actualizadas**
- **Cálculo automático** al cambiar valores
- **Selector de monedas** origen y destino
- **Diseño intuitivo** y responsive
- **Validación de entrada** numérica
- **Historial de conversiones**

## 🚀 Cómo Funciona

### Tasas de Cambio
```javascript
const exchangeRates = {
  "USD": 1.0,
  "EUR": 0.85,
  "GBP": 0.73,
  "JPY": 110.0,
  "CAD": 1.25,
  "AUD": 1.35,
  "CHF": 0.92,
  "CNY": 6.45
};

function convertCurrency(amount, fromCurrency, toCurrency) {
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  
  // Convertir a USD primero, luego a la moneda destino
  const usdAmount = amount / fromRate;
  const convertedAmount = usdAmount * toRate;
  
  return convertedAmount.toFixed(2);
}
```

### Cálculo Automático
```javascript
function updateConversion() {
  const amount = parseFloat(amountInput.value) || 0;
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;
  
  if (amount > 0) {
    const result = convertCurrency(amount, fromCurrency, toCurrency);
    resultDisplay.textContent = result + " " + toCurrency;
    addToHistory(amount, fromCurrency, result, toCurrency);
  } else {
    resultDisplay.textContent = "0.00 " + toCurrency;
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Objetos para datos**: Almacenamiento de tasas de cambio
- **Funciones de conversión**: Lógica matemática
- **Event listeners**: Para inputs y selects
- **Validación de entrada**: Verificación de números
- **toFixed()**: Formateo de decimales
- **Template literals**: Concatenación de strings

### CSS
- **Flexbox para layout**: Disposición de elementos
- **Styling de selectores**: Personalización de dropdowns
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual

### Matemáticas
- **Conversión de divisas**: Cálculos de tasas
- **Redondeo de decimales**: Precisión en resultados
- **Validación numérica**: Verificación de entrada

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Formularios y selectores
- **CSS3**: Estilos y responsive design
- **JavaScript ES6+**: Lógica de conversión
- **Sin dependencias**: JavaScript puro

## �� Responsive Design
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
dia-004/
├── index.html          # Estructura HTML + formularios
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + conversiones
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Selecciona la moneda origen
3. Ingresa la cantidad a convertir
4. Selecciona la moneda destino
5. El resultado se calcula automáticamente

## 💱 Monedas Soportadas
- **USD**: Dólar Americano
- **EUR**: Euro
- **GBP**: Libra Esterlina
- **JPY**: Yen Japonés
- **CAD**: Dólar Canadiense
- **AUD**: Dólar Australiano
- **CHF**: Franco Suizo
- **CNY**: Yuan Chino

## 💡 Mejoras Futuras
- [ ] API de tasas en tiempo real
- [ ] Gráficos de tendencias
- [ ] Historial de conversiones
- [ ] Favoritos de monedas
- [ ] Modo offline
- [ ] Notificaciones de cambios

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~80 líneas
- **Tiempo de desarrollo**: ~1 hora
- **Complejidad**: Básica-Intermedia
- **Dependencias**: Ninguna
- **Monedas**: 8 soportadas

## 🌍 Casos de Uso
- **Viajeros**: Conversión de monedas
- **Comercio**: Cálculos de precios
- **Finanzas**: Referencia rápida
- **Educación**: Aprendizaje de divisas

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 4*
