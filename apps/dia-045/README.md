# ⚖️ Día 45: Calculadora de IMC

## 📋 Descripción
Calculadora completa de Índice de Masa Corporal (IMC) con recomendaciones personalizadas, información adicional sobre peso ideal, calorías diarias y consejos de salud.

## ✨ Características
- **Cálculo preciso de IMC** con validación de datos
- **Categorización automática** (Bajo peso, Normal, Sobrepeso, Obesidad)
- **Gráfico visual** del rango de IMC
- **Recomendaciones personalizadas** según el resultado
- **Información adicional**: Peso ideal, calorías diarias, hidratación
- **Diseño responsive** adaptado a todos los dispositivos
- **Información educativa** sobre IMC y salud
- **Consejos de salud** para mantener un peso saludable

## 🚀 Cómo Funciona

### Cálculo de IMC
```javascript
calculateBMI() {
    const height = parseFloat(this.heightInput.value);
    const weight = parseFloat(this.weightInput.value);
    const age = parseInt(this.ageInput.value);
    const gender = this.genderSelect.value;
    const activity = this.activitySelect.value;

    // Validar datos
    if (!height || !weight || !age || !gender || !activity) {
        this.resultsSection.style.display = "none";
        return;
    }

    // Calcular IMC
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Mostrar resultados
    this.displayResults(bmi, weight, height, age, gender, activity);
}
```

### Categorización de IMC
```javascript
getBMICategory(bmi) {
    if (bmi < 18.5) {
        return { name: "Bajo peso", class: "underweight" };
    } else if (bmi >= 18.5 && bmi < 25) {
        return { name: "Peso normal", class: "normal" };
    } else if (bmi >= 25 && bmi < 30) {
        return { name: "Sobrepeso", class: "overweight" };
    } else {
        return { name: "Obesidad", class: "obese" };
    }
}
```

### Cálculo de Calorías Diarias
```javascript
calculateAdditionalInfo(weight, height, age, gender, activity) {
    // Calorías diarias (fórmula de Mifflin-St Jeor)
    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const activityMultipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very-active": 1.9
    };
    
    const tdee = bmr * activityMultipliers[activity];
    // ... más cálculos
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Mathematical calculations**: Cálculos de IMC y calorías
- **Form validation**: Validación de formularios
- **DOM manipulation**: Actualización dinámica de contenido
- **Event handling**: Gestión de eventos de formularios
- **Conditional logic**: Lógica condicional para categorías
- **Array methods**: map, filter para recomendaciones

### CSS
- **Grid layout**: Diseño de formularios y tarjetas
- **Flexbox**: Alineación de elementos
- **Responsive design**: Adaptación móvil
- **CSS animations**: Transiciones suaves
- **Color coding**: Código de colores para categorías
- **Box shadows**: Efectos de profundidad

### Matemáticas
- **Fórmula del IMC**: peso / (altura²)
- **Fórmula de Mifflin-St Jeor**: Cálculo de calorías
- **Método de Devine**: Cálculo de peso ideal
- **Porcentajes**: Cálculo de rangos y posiciones

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica y formularios
- **CSS3**: Grid, flexbox, responsive design
- **JavaScript ES6+**: Clases, arrow functions, template literals
- **Sin dependencias**: JavaScript puro

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño de pantalla
- **Touch friendly**: Formularios apropiados para touch
- **Legibilidad**: Texto claro en todos los tamaños

## ⌨️ Controles
- **Mouse**: Clic en formularios y botones
- **Teclado**: 
  - `Tab`: Navegación entre campos
  - `Enter`: Calcular IMC
  - `Escape`: Limpiar formulario

## 🔧 Estructura del Código
```
dia-045/
├── index.html          # Estructura HTML + formularios
├── app.css            # Estilos + responsive
├── app.js             # Lógica + clase BMICalculator
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Completa tu altura, peso, edad, género y nivel de actividad
3. El IMC se calcula automáticamente
4. Revisa las recomendaciones personalizadas
5. Consulta la información adicional sobre peso ideal y calorías

## 💡 Mejoras Futuras
- [ ] Historial de mediciones
- [ ] Gráficos de progreso
- [ ] Integración con APIs de salud
- [ ] Modo oscuro
- **IA**: Recomendaciones más personalizadas
- **Colaboración**: Compartir resultados con profesionales

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~400 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia
- **Dependencias**: Ninguna
- **APIs**: DOM, Math

## ⚖️ Casos de Uso
- **Salud personal**: Monitoreo del peso
- **Fitness**: Seguimiento de progreso
- **Educación**: Aprendizaje sobre salud
- **Profesional**: Herramienta para profesionales de la salud

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 45*
