# 🍳 Día 27: App de Recetas

## 📋 Descripción
Aplicación de recetas de cocina con sistema de búsqueda avanzado, filtros por categoría y dificultad, y vista detallada con ingredientes e instrucciones paso a paso.

## ✨ Características
- **8 recetas predefinidas** con ingredientes e instrucciones completas
- **Búsqueda en tiempo real** por título, descripción e ingredientes
- **Filtros múltiples**: categoría, dificultad, tiempo de preparación
- **Modal detallado** con vista completa de cada receta
- **Diseño responsive** con grid adaptativo
- **Navegación con teclado** (ESC para cerrar modal)

## 🚀 Cómo Funciona

### Sistema de Búsqueda
```javascript
function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const difficulty = difficultyFilter.value;
  const maxTime = timeFilter.value;
  
  filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) ||
                         recipe.description.toLowerCase().includes(searchTerm) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
  });
}
```

### Estructura de Datos
```javascript
const recipes = [
  {
    id: 1,
    title: "Pancakes de Avena",
    description: "Deliciosos pancakes saludables...",
    category: "desayuno",
    difficulty: "fácil",
    time: 15,
    ingredients: ["1 taza de avena", "1 plátano", ...],
    instructions: ["Mezcla la avena...", "Añade los huevos...", ...],
    icon: "🥞"
  }
];
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Array methods**: filter(), map(), some(), includes()
- **String manipulation**: toLowerCase(), trim()
- **DOM events**: input, change, click
- **Modal management**: show/hide, event delegation
- **Data filtering**: Búsqueda y filtrado complejo
- **Template literals**: Generación dinámica de HTML

### CSS
- **CSS Grid**: Layout responsive para cards
- **CSS Flexbox**: Alineación y distribución
- **Modal styling**: Overlay, backdrop-filter, z-index
- **Hover effects**: Transform, box-shadow
- **Responsive design**: Media queries, grid-template-columns

### UX/UI
- **Search UX**: Búsqueda en tiempo real
- **Filter UX**: Múltiples filtros combinables
- **Card design**: Información jerárquica y clara
- **Modal UX**: Información detallada sin perder contexto
- **Loading states**: "No results" cuando no hay coincidencias

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica, modales
- **CSS3**: Grid, flexbox, animaciones, variables
- **JavaScript ES6+**: Arrow functions, destructuring, template literals
- **Sin dependencias**: JavaScript puro

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: 1 columna en móvil, múltiples en desktop
- **Modal responsive**: Adaptación del tamaño según pantalla
- **Touch friendly**: Botones y áreas de toque apropiadas

## 🔍 Sistema de Filtros
1. **Búsqueda por texto**: Título, descripción, ingredientes
2. **Filtro por categoría**: Desayuno, almuerzo, cena, postre, bebida
3. **Filtro por dificultad**: Fácil, medio, difícil
4. **Filtro por tiempo**: Menos de 15, 30, 60 minutos

## 🎮 Controles
- **Mouse**: Clic en cards, botones de filtro
- **Teclado**: 
  - `ESC`: Cerrar modal
  - `Tab`: Navegación entre elementos

## 🔧 Estructura del Código
```
dia-027/
├── index.html          # Estructura HTML + modal
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + filtros + modal
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Usa la barra de búsqueda para encontrar recetas
3. Aplica filtros por categoría, dificultad o tiempo
4. Haz clic en una receta para ver detalles completos
5. Usa ESC o clic fuera del modal para cerrar

## 💡 Mejoras Futuras
- [ ] Más recetas (base de datos externa)
- [ ] Sistema de favoritos
- [ ] Calificación de recetas
- [ ] Búsqueda por ingredientes disponibles
- [ ] Modo de impresión
- [ ] Compartir recetas
- [ ] Lista de compras automática
- [ ] Conversor de unidades

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~200 líneas
- **Recetas incluidas**: 8
- **Tiempo de desarrollo**: ~3 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna

## 🍽️ Recetas Incluidas
1. **Pancakes de Avena** (Desayuno, Fácil, 15 min)
2. **Ensalada César** (Almuerzo, Fácil, 20 min)
3. **Pasta Carbonara** (Cena, Medio, 25 min)
4. **Tiramisú** (Postre, Difícil, 60 min)
5. **Smoothie de Frutas** (Bebida, Fácil, 5 min)
6. **Hamburguesa Gourmet** (Almuerzo, Medio, 30 min)
7. **Sopa de Tomate** (Cena, Fácil, 25 min)
8. **Brownies de Chocolate** (Postre, Medio, 45 min)

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 27*
