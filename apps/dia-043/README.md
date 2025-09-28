# 🧮 Día 43: Calculadora Científica

## 📋 Descripción
Calculadora científica completa con funciones trigonométricas, logarítmicas, potencias, memoria y historial de operaciones.

## ✨ Características
- **Funciones trigonométricas**: sin, cos, tan
- **Funciones logarítmicas**: log, ln
- **Potencias y raíces**: x², √, ∛, eˣ, 10ˣ
- **Funciones especiales**: π, x!, |x|, ±, Rand
- **Sistema de memoria**: MC, MR, M+, M-, MS
- **Historial de operaciones**: Guarda las últimas 50 operaciones
- **Soporte de teclado**: Controles completos por teclado
- **Formato inteligente**: Números en notación científica cuando es necesario

## 🚀 Cómo Funciona

### Evaluación de Expresiones
```javascript
calculate() {
    try {
        let expression = this.expression
            .replace(/Math\.sin/g, "Math.sin")
            .replace(/Math\.cos/g, "Math.cos")
            .replace(/Math\.tan/g, "Math.tan")
            .replace(/Math\.log10/g, "Math.log10")
            .replace(/Math\.log/g, "Math.log")
            .replace(/Math\.pow/g, "Math.pow")
            .replace(/Math\.sqrt/g, "Math.sqrt")
            .replace(/Math\.cbrt/g, "Math.cbrt")
            .replace(/Math\.exp/g, "Math.exp")
            .replace(/Math\.abs/g, "Math.abs")
            .replace(/Math\.PI/g, "Math.PI")
            .replace(/Math\.random/g, "Math.random")
            .replace(/this\.factorial/g, "this.factorial");

        const result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Resultado inválido");
        }

        this.addToHistory(this.expression, result);
        this.result = this.formatNumber(result);
        this.expression = this.result;
        this.isNewExpression = true;
        
    } catch (error) {
        this.result = "Error";
        this.expression = "0";
        this.isNewExpression = true;
    }
    
    this.updateDisplay();
}
```

### Función Factorial
```javascript
factorial(n) {
    n = Math.floor(Math.abs(n));
    if (n > 170) return Infinity; // Evitar overflow
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

### Formato Inteligente de Números
```javascript
formatNumber(num) {
    if (num === 0) return "0";
    
    const absNum = Math.abs(num);
    
    if (absNum >= 1e15 || absNum <= 1e-10) {
        return num.toExponential(10);
    }
    
    if (absNum >= 1000) {
        return num.toLocaleString();
    }
    
    if (absNum < 1 && absNum > 0) {
        return num.toFixed(10).replace(/\.?0+$/, "");
    }
    
    return num.toString();
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Math object**: Funciones matemáticas nativas
- **eval()**: Evaluación de expresiones matemáticas
- **Error handling**: try-catch para manejo de errores
- **LocalStorage**: Persistencia del historial
- **Event handling**: Teclado y mouse
- **String manipulation**: Reemplazo de funciones

### CSS
- **Grid layout**: Diseño de botones y secciones
- **Responsive design**: Adaptación móvil
- **Custom scrollbar**: Scrollbar personalizado
- **Gradients**: Botones con gradientes
- **Box shadows**: Efectos de profundidad

### Matemáticas
- **Funciones trigonométricas**: sin, cos, tan
- **Logaritmos**: log base 10 y natural
- **Potencias**: x², eˣ, 10ˣ
- **Raíces**: √, ∛
- **Factorial**: Cálculo iterativo
- **Notación científica**: Formato de números grandes

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, gradients
- **JavaScript ES6+**: Clases, arrow functions
- **LocalStorage**: Persistencia de datos
- **Math API**: Funciones matemáticas

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño de pantalla
- **Touch friendly**: Botones apropiados para touch
- **Legibilidad**: Texto claro en todos los tamaños

## ⌨️ Controles de Teclado
- **Números**: 0-9, punto decimal
- **Operadores**: +, -, *, /
- **Enter/=**: Calcular resultado
- **Escape/C**: Limpiar pantalla
- **Backspace**: Borrar último carácter
- **Paréntesis**: ( y )

## 🔧 Estructura del Código
```
dia-043/
├── index.html          # Estructura HTML + botones
├── app.css            # Estilos + responsive
├── app.js             # Lógica + clase ScientificCalculator
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Usa los botones o teclado para ingresar operaciones
3. Presiona = o Enter para calcular
4. Usa la memoria para almacenar valores
5. Revisa el historial de operaciones

## 💡 Mejoras Futuras
- [ ] Funciones estadísticas (media, desviación)
- [ ] Conversión de unidades
- [ ] Gráficos de funciones
- [ ] Modo programador (binario, hex)
- **IA**: Sugerencias de operaciones
- **Colaboración**: Compartir cálculos

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~350 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: Math, LocalStorage

## 🧮 Casos de Uso
- **Educación**: Cálculos matemáticos
- **Ingeniería**: Funciones científicas
- **Investigación**: Análisis de datos
- **Profesional**: Cálculos complejos

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 43*
