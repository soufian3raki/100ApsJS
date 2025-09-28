# 💰 Día 51: Simulador de Préstamos

## 📋 Descripción
Calculadora completa de préstamos con tabla de amortización, comparación de escenarios y visualización de datos. Permite calcular pagos mensuales, intereses totales y comparar diferentes opciones de préstamo.

## ✨ Características
- **🧮 Calculadora de Préstamos**: Cálculo de pagos mensuales, totales e intereses
- **📊 Tabla de Amortización**: Desglose detallado de pagos por período
- **⚖️ Comparación de Escenarios**: Múltiples opciones de préstamo
- **📈 Visualización de Datos**: Gráficos de barras para comparar opciones
- **📄 Exportación**: Generación de PDF con resultados
- **💾 Persistencia**: Escenarios guardados en localStorage
- **📱 Responsive**: Diseño adaptativo completo

## 🔧 Cómo Funciona

### 🧮 Cálculo de Préstamos
```javascript
calculateLoanDetails(principal, annualRate, years, frequency) {
  const periodsPerYear = this.getPeriodsPerYear(frequency);
  const totalPeriods = years * periodsPerYear;
  const periodicRate = annualRate / 100 / periodsPerYear;

  const monthlyPayment = principal * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / 
                        (Math.pow(1 + periodicRate, totalPeriods) - 1);

  return {
    monthlyPayment,
    totalPayments: monthlyPayment * totalPeriods,
    totalInterest: (monthlyPayment * totalPeriods) - principal,
    totalPeriods
  };
}
```

### 📊 Tabla de Amortización
```javascript
generateAmortizationTable(result) {
  let balance = principal;
  for (let i = 1; i <= totalPeriods; i++) {
    const interestPayment = balance * periodicRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    // ... agregar fila a la tabla
  }
}
```

### 📈 Visualización con Chart.js
```javascript
createChart(type) {
  this.currentChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: this.scenarios.map(s => s.name),
      datasets: [{
        label: 'Pago Mensual',
        data: this.scenarios.map(s => s.monthlyPayment),
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      }]
    }
  });
}
```

## 🎓 Conceptos Aprendidos

### 💻 JavaScript
- Math.pow(): Cálculos exponenciales
- Math.max(): Valores máximos
- Array methods: map(), filter(), find()
- localStorage: Persistencia de datos
- Chart.js: Visualización de datos
- Intl.NumberFormat: Formateo de monedas

### 🎨 CSS
- CSS Grid: Layout de formularios y resultados
- Flexbox: Alineación de elementos
- CSS Variables: Temas consistentes
- Responsive design: Media queries
- Hover effects: Interacciones visuales

### 🌐 HTML
- Form controls: Inputs, select
- Canvas element: Gráficos
- Table element: Tabla de amortización
- Semantic HTML: Estructura semántica

## 🛠️ Tecnologías Utilizadas
- HTML5: Formularios y Canvas
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Arrow functions, template literals
- Chart.js: Gráficos interactivos
- localStorage: Persistencia de datos
- Intl API: Formateo de números

## 🏦 Tipos de Préstamos Soportados
- **Mensual**: 12 pagos por año
- **Quincenal**: 26 pagos por año
- **Semanal**: 52 pagos por año

## 🎮 Controles Disponibles
- **Calcular**: Calcular préstamo con parámetros dados
- **Ver Tabla**: Mostrar/ocultar tabla de amortización
- **Exportar PDF**: Generar PDF con resultados
- **Agregar Escenario**: Guardar configuración actual
- **Comparar**: Ver gráficos de comparación
- **Editar/Eliminar**: Gestionar escenarios guardados

## 🚀 Cómo Ejecutar
1. Abre index.html en tu navegador
2. Completa el monto, tasa de interés y plazo
3. Selecciona la frecuencia de pago
4. Haz clic en "Calcular Préstamo"
5. Revisa los resultados y tabla de amortización
6. Agrega escenarios para comparar opciones
7. Usa los gráficos para visualizar diferencias

## 📐 Fórmulas Utilizadas
- **Pago Mensual**: PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
- **Interés Periódico**: I = Balance × Tasa Periódica
- **Principal**: P = Pago - Interés
- **Balance**: B = Balance Anterior - Principal

## 📊 Estadísticas Técnicas
- Líneas de código: ~400 líneas
- Funcionalidades: 12 principales
- Tiempo de desarrollo: ~6 horas
- Complejidad: Intermedia-Alta
- Dependencias: Chart.js
- Almacenamiento: localStorage

## 💼 Casos de Uso
- **Compradores de Casa**: Cálculo de hipotecas
- **Empresarios**: Préstamos comerciales
- **Estudiantes**: Préstamos educativos
- **Inversionistas**: Análisis de financiamiento
- **Asesores Financieros**: Herramienta de consulta

## ⚡ Características Avanzadas
- **Validación de Entrada**: Campos requeridos
- **Formateo de Moneda**: Números con formato local
- **Gráficos Interactivos**: Comparación visual
- **Exportación PDF**: Documentos imprimibles
- **Responsive**: Adaptación móvil completa

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 51*
