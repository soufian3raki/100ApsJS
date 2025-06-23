# 💰 Día 35: App de Gastos con Gráficos

## 📋 Descripción
Aplicación completa de control de gastos con gráficos interactivos, categorización, filtros avanzados y análisis financiero.

## ✨ Características
- **Gestión completa de gastos** con descripción, monto, categoría y fecha
- **Gráficos interactivos** de gastos por categoría y mes
- **Categorización** por tipo (Alimentación, Transporte, Entretenimiento, etc.)
- **Filtros avanzados** por categoría, mes y año
- **Resumen financiero** con totales y promedios
- **Exportación de datos** a formato CSV
- **Interfaz responsive** y moderna

## 🚀 Cómo Funciona

### Gestión de Gastos
```javascript
saveExpenseData() {
  const expense = {
    id: this.editingExpense || Date.now().toString(),
    description: description,
    amount: amount,
    category: category,
    date: date,
    createdAt: new Date().toISOString()
  };
  
  if (this.editingExpense) {
    const index = this.expenses.findIndex(e => e.id === this.editingExpense);
    this.expenses[index] = expense;
  } else {
    this.expenses.push(expense);
  }
  
  this.saveExpenses();
}
```

### Análisis Financiero
```javascript
updateSummary() {
  const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthly = this.expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  }).reduce((sum, expense) => sum + expense.amount, 0);
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dailyAverage = monthly / daysInMonth;
}
```

### Gráficos con Canvas
```javascript
drawCategoryChart() {
  const ctx = this.categoryChart.getContext("2d");
  const categoryTotals = {};
  
  this.expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });
  
  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);
  const colors = ["#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444", "#10b981", "#6b7280", "#f97316"];
  
  // Dibujar gráfico de pastel
  let currentAngle = 0;
  const total = amounts.reduce((sum, amount) => sum + amount, 0);
  
  categories.forEach((category, index) => {
    const sliceAngle = (amounts[index] / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
    currentAngle += sliceAngle;
  });
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Canvas API**: Gráficos interactivos
- **Array methods**: reduce, filter, map
- **Date handling**: Manipulación de fechas
- **LocalStorage**: Persistencia de datos
- **Event handling**: Controles interactivos
- **DOM manipulation**: Renderizado dinámico

### CSS
- **Grid layout**: Resumen y gráficos
- **Flexbox**: Layout de gastos
- **Modal**: Ventana emergente
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual
- **Color coding**: Categorías

### Matemáticas
- **Cálculos financieros**: Totales y promedios
- **Gráficos**: Coordenadas y ángulos
- **Estadísticas**: Análisis de datos
- **Porcentajes**: Distribución de gastos

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, modal
- **JavaScript ES6+**: Clases y lógica
- **Canvas API**: Gráficos
- **LocalStorage**: Persistencia

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en gastos y botones
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Guardar gasto
  - `Escape`: Cerrar modal

## 🔧 Estructura del Código
```
dia-035/
├── index.html          # Estructura HTML + modal
├── app.css            # Estilos + charts
├── app.js             # Lógica + clase ExpenseManager
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Agrega gastos con el botón "+ Nuevo Gasto"
3. Usa los filtros para analizar gastos específicos
4. Observa los gráficos de categorías y meses
5. Exporta los datos a CSV si es necesario

## 💡 Mejoras Futuras
- [ ] Gráficos más avanzados con Chart.js
- [ ] Presupuestos y alertas
- [ ] Sincronización con bancos
- [ ] Análisis de tendencias
- **Recurrencia**: Gastos automáticos
- **Colaboración**: Gastos compartidos

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~450 líneas
- **Tiempo de desarrollo**: ~5 horas
- **Complejidad**: Alta
- **Dependencias**: Ninguna
- **APIs**: Canvas, LocalStorage

## 💰 Casos de Uso
- **Personal**: Control de gastos
- **Empresas**: Gestión financiera
- **Proyectos**: Seguimiento de costos
- **Educación**: Análisis financiero

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 35*
