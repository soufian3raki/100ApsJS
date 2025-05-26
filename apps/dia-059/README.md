# 🍽️ Día 59: App de Recetas con Buscador

## 📋 Descripción
Aplicación completa de recetas con sistema de búsqueda avanzado, filtros por categoría y dificultad, favoritos, historial reciente, vista detallada de recetas y formulario para agregar nuevas recetas. Incluye información nutricional y consejos de cocina.

## ✨ Características
- **🔍 Búsqueda Avanzada**: Por nombre, ingredientes, categoría y descripción
- **📂 Filtros Múltiples**: Categoría, dificultad y tiempo de preparación
- **❤️ Sistema de Favoritos**: Guardar recetas favoritas
- **📋 Historial Reciente**: Últimas recetas vistas
- **👁️ Vistas Múltiples**: Grid y lista
- **📄 Vista Detallada**: Información completa de cada receta
- **➕ Agregar Recetas**: Formulario para nuevas recetas
- **📱 Responsive**: Diseño adaptativo completo
- **💾 Persistencia**: Datos guardados en localStorage

## 🔧 Cómo Funciona

### 🔍 Sistema de Búsqueda
```javascript
searchRecipes() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  this.filteredRecipes = this.recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm) ||
    recipe.description.toLowerCase().includes(searchTerm) ||
    recipe.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm)
    ) ||
    recipe.category.toLowerCase().includes(searchTerm)
  );
}
```

### 📂 Filtros Múltiples
```javascript
filterRecipes() {
  const category = document.getElementById('categoryFilter').value;
  const difficulty = document.getElementById('difficultyFilter').value;
  const time = parseInt(document.getElementById('timeFilter').value);

  this.filteredRecipes = this.recipes.filter(recipe => {
    const categoryMatch = !category || recipe.category === category;
    const difficultyMatch = !difficulty || recipe.difficulty === difficulty;
    const timeMatch = !time || recipe.prepTime <= time;
    
    return categoryMatch && difficultyMatch && timeMatch;
  });
}
```

### ❤️ Sistema de Favoritos
```javascript
toggleFavorite(recipeId) {
  const index = this.favorites.indexOf(recipeId);
  if (index > -1) {
    this.favorites.splice(index, 1);
  } else {
    this.favorites.push(recipeId);
  }
  
  localStorage.setItem('recipeFavorites', JSON.stringify(this.favorites));
}
```

## 🎓 Conceptos Aprendidos

### 💻 JavaScript
- Array methods: filter(), map(), find(), some()
- localStorage: Persistencia de datos
- Event delegation: Manejo de eventos dinámicos
- FormData: Manejo de formularios
- Pagination: Sistema de paginación
- Search algorithms: Búsqueda y filtrado

### 🎨 CSS
- CSS Grid: Layout de recetas y formularios
- Flexbox: Alineación de elementos
- CSS Variables: Temas consistentes
- Responsive design: Media queries
- Modal design: Overlays y popups
- Hover effects: Interacciones visuales

### 🌐 HTML
- Form controls: Inputs, select, textarea
- Semantic HTML: Estructura semántica
- Accessibility: Labels y aria-labels
- Data attributes: Almacenamiento de datos

## 🛠️ Tecnologías Utilizadas
- HTML5: Formularios y semantic HTML
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Arrow functions, template literals
- localStorage: Persistencia de datos
- Sin dependencias: JavaScript puro

## 🍽️ Categorías de Recetas
- **🌅 Desayuno**: Pancakes, smoothies, tostadas
- **🍽️ Almuerzo**: Ensaladas, hamburguesas, sopas
- **🌙 Cena**: Pasta, platos principales
- **🍰 Postre**: Brownies, tartas, helados
- **🥤 Bebida**: Smoothies, batidos, jugos
- **🍿 Snack**: Aperitivos y bocadillos

## 🔍 Funciones de Búsqueda
- **Búsqueda por Texto**: Nombre, descripción, ingredientes
- **Filtro por Categoría**: Todas las categorías
- **Filtro por Dificultad**: Fácil, Medio, Difícil
- **Filtro por Tiempo**: Menos de 15, 30, 60, 120 minutos
- **Resultados en Tiempo Real**: Actualización instantánea

## 👁️ Vistas Disponibles
- **Grid**: Vista de tarjetas con imágenes
- **Lista**: Vista compacta en filas
- **Detalle**: Vista completa con toda la información
- **Favoritos**: Lista de recetas favoritas
- **Recientes**: Últimas recetas vistas

## 📄 Información de Recetas
- **Básica**: Nombre, descripción, categoría
- **Tiempo**: Preparación y porciones
- **Nutricional**: Calorías, proteínas, carbohidratos
- **Ingredientes**: Lista completa con cantidades
- **Instrucciones**: Pasos detallados
- **Consejos**: Tips de cocina

## 🎮 Controles Disponibles
- **Buscar**: Búsqueda de recetas
- **Filtrar**: Por categoría, dificultad, tiempo
- **Ver Detalle**: Información completa
- **Agregar a Favoritos**: Marcar como favorito
- **Agregar Receta**: Formulario de nueva receta
- **Cambiar Vista**: Grid o lista
- **Paginación**: Navegar entre páginas

## 🚀 Cómo Ejecutar
1. Abre index.html en tu navegador
2. Explora las recetas disponibles
3. Usa la búsqueda y filtros
4. Haz clic en una receta para ver detalles
5. Agrega recetas a favoritos
6. Crea nuevas recetas
7. Navega entre diferentes vistas
8. Revisa tu historial de recetas

## 📊 Sistema de Paginación
- **6 Recetas por Página**: Carga optimizada
- **Navegación**: Botones anterior/siguiente
- **Números de Página**: Acceso directo
- **Responsive**: Adaptación a móviles
- **Estado Activo**: Página actual destacada

## 💾 Gestión de Datos
- **Favoritos**: Recetas marcadas como favoritas
- **Recientes**: Últimas 10 recetas vistas
- **Persistencia**: Datos guardados localmente
- **Sincronización**: Estado actualizado en tiempo real
- **Limpieza**: Gestión automática de límites

## ⚡ Características Avanzadas
- **Búsqueda Inteligente**: Múltiples campos
- **Filtros Combinados**: Múltiples criterios
- **Vista Adaptativa**: Grid y lista
- **Formulario Dinámico**: Agregar campos
- **Validación**: Campos requeridos
- **Responsive**: Adaptación completa a móviles

## 📊 Estadísticas Técnicas
- Líneas de código: ~900 líneas
- Funcionalidades: 40 principales
- Tiempo de desarrollo: ~9 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Recetas: 6+ incluidas

## 💼 Casos de Uso
- **Cocina Personal**: Organización de recetas
- **Planificación de Comidas**: Menús semanales
- **Aprendizaje**: Nuevas técnicas culinarias
- **Compartir**: Recetas con familiares
- **Restaurantes**: Gestión de menús

## 🍽️ Recetas Incluidas
- **Pasta Carbonara**: Plato italiano clásico
- **Ensalada César**: Ensalada con aderezo especial
- **Pancakes de Avena**: Desayuno saludable
- **Brownie de Chocolate**: Postre rico y húmedo
- **Smoothie de Frutas**: Bebida refrescante
- **Hamburguesa Clásica**: Comida rápida

## ⚠️ Limitaciones
- Solo funciona localmente
- No incluye imágenes reales
- No tiene sistema de usuarios
- No incluye calificaciones
- No soporta comentarios

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 59*
