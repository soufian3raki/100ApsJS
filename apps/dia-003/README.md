# 🧮 Día 3: Calculadora

## 📋 Descripción
Calculadora básica con operaciones aritméticas fundamentales: suma, resta, multiplicación y división.

## ✨ Características
- **Operaciones básicas**: +, -, ×, ÷
- **Pantalla de display** para números y operaciones
- **Botón de limpiar (C)** y borrar (⌫)
- **Botón de igual (=)** para calcular resultado
- **Manejo de errores** (división por cero)
- **Diseño tipo calculadora** real
- **Soporte para teclado** completo

## 🚀 Cómo Funciona

### Lógica de Cálculo
```javascript
let currentInput = "";
let previousInput = "";
let operation = null;

function updateDisplay() {
  display.value = currentInput || "0";
}

function inputNumber(num) {
  if (currentInput === "0") {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function performOperation() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  switch (operation) {
    case "+":
      return prev + current;
    case "-":
      return prev - current;
    case "×":
      return prev * current;
    case "÷":
      return current !== 0 ? prev / current : "Error";
  }
}
```

### Manejo de Errores
```javascript
function calculate() {
  if (operation && previousInput && currentInput) {
    const result = performOperation();
    if (result === "Error") {
      display.value = "Error";
      clear();
    } else {
      currentInput = result.toString();
      previousInput = "";
      operation = null;
      updateDisplay();
    }
  }
}

function clear() {
  currentInput = "";
  previousInput = "";
  operation = null;
  updateDisplay();
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Variables de estado**: currentInput, previousInput, operation
- **Switch statements**: Para operaciones matemáticas
- **parseFloat()**: Conversión de strings a números
- **Manejo de errores**: Condicionales para casos edge
- **Event delegation**: Para botones dinámicos
- **String manipulation**: Concatenación y conversión

### CSS
- **Grid layout**: Para disposición de botones
- **Hover effects**: Estados interactivos
- **Active states**: Feedback visual
- **Diseño tipo calculadora**: Estilo realista
- **Responsive design**: Adaptación móvil

### Lógica de Programación
- **State management**: Control de estado de la calculadora
- **Flujo de operaciones**: Secuencia lógica de cálculos
- **Validación de entrada**: Verificación de datos
- **Manejo de casos edge**: División por cero, etc.

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura de botones y display
- **CSS3**: Grid, estilos, animaciones
- **JavaScript ES6+**: Lógica de cálculo
- **Sin dependencias**: JavaScript puro

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Botones que se ajustan
- **Touch friendly**: Áreas de toque apropiadas
- **Legibilidad**: Números y símbolos claros

## 🎮 Controles
- **Mouse**: Clic en botones numéricos y operadores
- **Teclado**: 
  - `0-9`: Números
  - `+`, `-`, `*`, `/`: Operaciones
  - `Enter` o `=`: Calcular
  - `C`: Limpiar todo
  - `Backspace`: Borrar último dígito

## 🔧 Estructura del Código
```
dia-003/
├── index.html          # Estructura HTML + botones
├── app.css            # Estilos + grid layout
├── app.js             # Lógica de cálculo
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Usa los botones numéricos para ingresar números
3. Selecciona una operación (+, -, ×, ÷)
4. Haz clic en = para calcular el resultado
5. Usa C para limpiar todo o ⌫ para borrar un dígito

## 💡 Mejoras Futuras
- [ ] Operaciones avanzadas (√, %, π)
- [ ] Historial de cálculos
- [ ] Memoria (M+, M-, MR, MC)
- [ ] Modo científico
- [ ] Temas de colores
- [ ] Sonidos de teclas

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~120 líneas
- **Tiempo de desarrollo**: ~1.5 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **Operaciones**: 4 básicas

## 🧮 Casos de Uso
- **Cálculos rápidos**: Operaciones básicas
- **Aprendizaje**: Enseñanza de matemáticas
- **Referencia**: Herramienta de cálculo
- **Desarrollo**: Base para calculadoras avanzadas

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 3*
