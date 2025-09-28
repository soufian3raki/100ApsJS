class RecipeApp {
  constructor() {
    this.recipes = [];
    this.filteredRecipes = [];
    this.favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    this.recent = JSON.parse(localStorage.getItem('recipeRecent')) || [];
    this.currentPage = 1;
    this.recipesPerPage = 6;
    this.currentView = 'grid';
    this.init();
  }

  init() {
    this.loadRecipes();
    this.bindEvents();
    this.renderRecipes();
    this.renderFavorites();
    this.renderRecent();
  }

  loadRecipes() {
    this.recipes = [
      {
        id: 1,
        name: 'Pasta Carbonara',
        description: 'Deliciosa pasta italiana con huevo, queso parmesano y panceta',
        category: 'cena',
        difficulty: 'medio',
        prepTime: 25,
        servings: 4,
        calories: 450,
        image: '🍝',
        ingredients: [
          { name: 'Pasta', amount: '400g' },
          { name: 'Huevos', amount: '4 unidades' },
          { name: 'Queso Parmesano', amount: '100g' },
          { name: 'Panceta', amount: '200g' },
          { name: 'Ajo', amount: '2 dientes' },
          { name: 'Pimienta negra', amount: 'al gusto' }
        ],
        instructions: [
          'Cocinar la pasta en agua hirviendo con sal',
          'Freír la panceta hasta que esté crujiente',
          'Batir los huevos con el queso parmesano',
          'Escurrir la pasta y mezclar con la panceta',
          'Agregar la mezcla de huevos y queso',
          'Servir inmediatamente con pimienta negra'
        ],
        nutrition: {
          calories: 450,
          protein: 20,
          carbs: 45,
          fat: 18,
          fiber: 2
        },
        tips: [
          'Usar agua muy salada para cocinar la pasta',
          'No cocinar demasiado los huevos para evitar que se cuajen',
          'Servir inmediatamente para mejor textura'
        ]
      },
      {
        id: 2,
        name: 'Ensalada César',
        description: 'Ensalada clásica con lechuga, crutones, queso parmesano y aderezo especial',
        category: 'almuerzo',
        difficulty: 'facil',
        prepTime: 15,
        servings: 2,
        calories: 320,
        image: '🥗',
        ingredients: [
          { name: 'Lechuga romana', amount: '1 cabeza' },
          { name: 'Crutones', amount: '1 taza' },
          { name: 'Queso Parmesano', amount: '50g' },
          { name: 'Aceite de oliva', amount: '3 cucharadas' },
          { name: 'Limón', amount: '1 unidad' },
          { name: 'Anchoas', amount: '4 filetes' }
        ],
        instructions: [
          'Lavar y cortar la lechuga en trozos',
          'Preparar el aderezo mezclando aceite, limón y anchoas',
          'Agregar el aderezo a la lechuga',
          'Espolvorear con queso parmesano',
          'Agregar los crutones',
          'Servir inmediatamente'
        ],
        nutrition: {
          calories: 320,
          protein: 12,
          carbs: 15,
          fat: 25,
          fiber: 3
        },
        tips: [
          'Usar lechuga fresca y crujiente',
          'No agregar el aderezo hasta el momento de servir',
          'Los crutones caseros son mejores'
        ]
      },
      {
        id: 3,
        name: 'Pancakes de Avena',
        description: 'Pancakes saludables con avena, plátano y canela',
        category: 'desayuno',
        difficulty: 'facil',
        prepTime: 20,
        servings: 3,
        calories: 280,
        image: '🥞',
        ingredients: [
          { name: 'Avena', amount: '1 taza' },
          { name: 'Plátano', amount: '2 unidades' },
          { name: 'Huevos', amount: '2 unidades' },
          { name: 'Leche', amount: '1/2 taza' },
          { name: 'Canela', amount: '1 cucharadita' },
          { name: 'Miel', amount: '2 cucharadas' }
        ],
        instructions: [
          'Triturar la avena hasta hacer harina',
          'Machacar los plátanos hasta hacer puré',
          'Mezclar todos los ingredientes',
          'Calentar una sartén antiadherente',
          'Cocinar los pancakes por 2-3 minutos por lado',
          'Servir con miel y frutas'
        ],
        nutrition: {
          calories: 280,
          protein: 12,
          carbs: 35,
          fat: 8,
          fiber: 6
        },
        tips: [
          'Usar plátanos muy maduros para más dulzor',
          'No voltear los pancakes hasta que veas burbujas',
          'Mantener el fuego medio para cocción uniforme'
        ]
      },
      {
        id: 4,
        name: 'Brownie de Chocolate',
        description: 'Brownie rico y húmedo con chocolate negro y nueces',
        category: 'postre',
        difficulty: 'medio',
        prepTime: 45,
        servings: 8,
        calories: 380,
        image: '🍫',
        ingredients: [
          { name: 'Chocolate negro', amount: '200g' },
          { name: 'Mantequilla', amount: '150g' },
          { name: 'Azúcar', amount: '200g' },
          { name: 'Huevos', amount: '3 unidades' },
          { name: 'Harina', amount: '100g' },
          { name: 'Nueces', amount: '100g' }
        ],
        instructions: [
          'Precalentar el horno a 180°C',
          'Derretir el chocolate con la mantequilla',
          'Batir los huevos con el azúcar',
          'Mezclar el chocolate derretido con los huevos',
          'Agregar la harina y las nueces',
          'Hornear por 25-30 minutos'
        ],
        nutrition: {
          calories: 380,
          protein: 6,
          carbs: 45,
          fat: 22,
          fiber: 3
        },
        tips: [
          'No hornear demasiado para mantener la humedad',
          'Dejar enfriar antes de cortar',
          'Las nueces se pueden sustituir por otros frutos secos'
        ]
      },
      {
        id: 5,
        name: 'Smoothie de Frutas',
        description: 'Bebida refrescante con frutas mixtas y yogur',
        category: 'bebida',
        difficulty: 'facil',
        prepTime: 10,
        servings: 2,
        calories: 150,
        image: '🥤',
        ingredients: [
          { name: 'Plátano', amount: '1 unidad' },
          { name: 'Fresas', amount: '1 taza' },
          { name: 'Yogur natural', amount: '1 taza' },
          { name: 'Leche', amount: '1/2 taza' },
          { name: 'Miel', amount: '1 cucharada' },
          { name: 'Hielo', amount: '1 taza' }
        ],
        instructions: [
          'Lavar y cortar las frutas',
          'Agregar todos los ingredientes a la licuadora',
          'Licuar hasta obtener una mezcla homogénea',
          'Agregar más hielo si se desea más espeso',
          'Servir inmediatamente en vasos altos',
          'Decorar con frutas frescas'
        ],
        nutrition: {
          calories: 150,
          protein: 6,
          carbs: 30,
          fat: 2,
          fiber: 4
        },
        tips: [
          'Usar frutas congeladas para textura más cremosa',
          'Agregar espinacas para más nutrientes',
          'Servir inmediatamente para mejor sabor'
        ]
      },
      {
        id: 6,
        name: 'Hamburguesa Clásica',
        description: 'Hamburguesa jugosa con carne, lechuga, tomate y queso',
        category: 'almuerzo',
        difficulty: 'medio',
        prepTime: 30,
        servings: 4,
        calories: 520,
        image: '🍔',
        ingredients: [
          { name: 'Carne molida', amount: '500g' },
          { name: 'Pan de hamburguesa', amount: '4 unidades' },
          { name: 'Lechuga', amount: '4 hojas' },
          { name: 'Tomate', amount: '2 unidades' },
          { name: 'Queso cheddar', amount: '4 rebanadas' },
          { name: 'Cebolla', amount: '1 unidad' }
        ],
        instructions: [
          'Formar 4 hamburguesas con la carne',
          'Cocinar las hamburguesas en la parrilla',
          'Tostar ligeramente los panes',
          'Armar las hamburguesas con todos los ingredientes',
          'Servir con papas fritas',
          'Disfrutar inmediatamente'
        ],
        nutrition: {
          calories: 520,
          protein: 35,
          carbs: 30,
          fat: 28,
          fiber: 2
        },
        tips: [
          'No presionar las hamburguesas al cocinar',
          'Usar carne con buen contenido de grasa',
          'Calentar los panes para mejor textura'
        ]
      }
    ];

    this.filteredRecipes = [...this.recipes];
  }

  bindEvents() {
    document.getElementById('searchBtn').addEventListener('click', () => {
      this.searchRecipes();
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.searchRecipes();
      }
    });

    document.getElementById('categoryFilter').addEventListener('change', () => {
      this.filterRecipes();
    });

    document.getElementById('difficultyFilter').addEventListener('change', () => {
      this.filterRecipes();
    });

    document.getElementById('timeFilter').addEventListener('change', () => {
      this.filterRecipes();
    });

    document.getElementById('clearFilters').addEventListener('click', () => {
      this.clearFilters();
    });

    document.getElementById('gridView').addEventListener('click', () => {
      this.setView('grid');
    });

    document.getElementById('listView').addEventListener('click', () => {
      this.setView('list');
    });

    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('closeAddModal').addEventListener('click', () => {
      this.closeAddModal();
    });

    document.getElementById('addRecipeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addRecipe();
    });

    document.getElementById('addIngredient').addEventListener('click', () => {
      this.addIngredientField();
    });

    document.getElementById('addInstruction').addEventListener('click', () => {
      this.addInstructionField();
    });

    // Event delegation for dynamic content
    document.addEventListener('click', (e) => {
      if (e.target.closest('.recipe-card')) {
        const recipeId = parseInt(e.target.closest('.recipe-card').dataset.recipeId);
        this.showRecipe(recipeId);
      } else if (e.target.classList.contains('toggle-favorite')) {
        const recipeId = parseInt(e.target.dataset.recipeId);
        this.toggleFavorite(recipeId);
      } else if (e.target.classList.contains('pagination-btn')) {
        const page = parseInt(e.target.dataset.page);
        this.goToPage(page);
      } else if (e.target.classList.contains('favorite-item') || e.target.classList.contains('recent-item')) {
        const recipeId = parseInt(e.target.dataset.recipeId);
        this.showRecipe(recipeId);
      }
    });
  }

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
    this.currentPage = 1;
    this.renderRecipes();
  }

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

    this.currentPage = 1;
    this.renderRecipes();
  }

  clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('difficultyFilter').value = '';
    document.getElementById('timeFilter').value = '';
    this.filteredRecipes = [...this.recipes];
    this.currentPage = 1;
    this.renderRecipes();
  }

  setView(view) {
    this.currentView = view;
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(view + 'View').classList.add('active');
    this.renderRecipes();
  }

  renderRecipes() {
    const container = document.getElementById('recipesContainer');
    const startIndex = (this.currentPage - 1) * this.recipesPerPage;
    const endIndex = startIndex + this.recipesPerPage;
    const pageRecipes = this.filteredRecipes.slice(startIndex, endIndex);

    if (pageRecipes.length === 0) {
      container.innerHTML = '<div class="empty-state">No se encontraron recetas</div>';
      this.renderPagination();
      return;
    }

    const viewClass = this.currentView === 'grid' ? 'recipes-grid' : 'recipes-list';
    container.innerHTML = `
      <div class="${viewClass}">
        ${pageRecipes.map(recipe => this.renderRecipeCard(recipe)).join('')}
      </div>
    `;

    this.renderPagination();
  }

  renderRecipeCard(recipe) {
    const isFavorited = this.favorites.includes(recipe.id);
    const difficultyText = {
      'facil': 'Fácil',
      'medio': 'Medio',
      'dificil': 'Difícil'
    };

    return `
      <div class="recipe-card ${this.currentView === 'list' ? 'list-view' : ''}" data-recipe-id="${recipe.id}">
        <div class="recipe-image">
          <div class="recipe-badges">
            <span class="badge">${recipe.category}</span>
            <span class="badge">${difficultyText[recipe.difficulty]}</span>
          </div>
          ${recipe.image}
        </div>
        <div class="recipe-content">
          <h3 class="recipe-title">${this.escapeHtml(recipe.name)}</h3>
          <p class="recipe-description">${this.escapeHtml(recipe.description)}</p>
          <div class="recipe-meta">
            <div class="meta-item">⏱️ ${recipe.prepTime} min</div>
            <div class="meta-item">👥 ${recipe.servings} porciones</div>
            <div class="meta-item">🔥 ${recipe.calories} cal</div>
          </div>
          <div class="recipe-actions">
            <button class="toggle-favorite ${isFavorited ? 'favorited' : ''}" data-recipe-id="${recipe.id}">
              ${isFavorited ? '❤️' : '🤍'} ${isFavorited ? 'Favorito' : 'Favorito'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredRecipes.length / this.recipesPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
      <button class="pagination-btn" data-page="${this.currentPage - 1}" 
              ${this.currentPage === 1 ? 'disabled' : ''}>
        ← Anterior
      </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
        paginationHTML += `
          <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                  data-page="${i}">
            ${i}
          </button>
        `;
      } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
        paginationHTML += '<span>...</span>';
      }
    }

    // Next button
    paginationHTML += `
      <button class="pagination-btn" data-page="${this.currentPage + 1}" 
              ${this.currentPage === totalPages ? 'disabled' : ''}>
        Siguiente →
      </button>
    `;

    pagination.innerHTML = paginationHTML;
  }

  goToPage(page) {
    const totalPages = Math.ceil(this.filteredRecipes.length / this.recipesPerPage);
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.renderRecipes();
    }
  }

  showRecipe(recipeId) {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Add to recent
    this.addToRecent(recipeId);

    // Show modal
    document.getElementById('modalRecipeTitle').textContent = recipe.name;
    document.getElementById('modalRecipeImage').src = '';
    document.getElementById('modalRecipeImage').alt = recipe.name;
    document.getElementById('modalRecipeCategory').textContent = recipe.category;
    document.getElementById('modalRecipeDifficulty').textContent = {
      'facil': 'Fácil',
      'medio': 'Medio',
      'dificil': 'Difícil'
    }[recipe.difficulty];
    document.getElementById('modalRecipeTime').textContent = `${recipe.prepTime} min`;

    document.getElementById('modalPrepTime').textContent = `${recipe.prepTime} minutos`;
    document.getElementById('modalServings').textContent = recipe.servings;
    document.getElementById('modalCalories').textContent = recipe.calories;
    document.getElementById('modalDifficulty').textContent = {
      'facil': 'Fácil',
      'medio': 'Medio',
      'dificil': 'Difícil'
    }[recipe.difficulty];

    // Ingredients
    document.getElementById('modalIngredients').innerHTML = recipe.ingredients
      .map(ingredient => `<li>${this.escapeHtml(ingredient.amount)} ${this.escapeHtml(ingredient.name)}</li>`)
      .join('');

    // Instructions
    document.getElementById('modalInstructions').innerHTML = recipe.instructions
      .map(instruction => `<li>${this.escapeHtml(instruction)}</li>`)
      .join('');

    // Nutrition
    document.getElementById('modalNutrition').innerHTML = `
      <div class="nutrition-item">
        <span class="nutrition-value">${recipe.nutrition.calories}</span>
        <span class="nutrition-label">Calorías</span>
      </div>
      <div class="nutrition-item">
        <span class="nutrition-value">${recipe.nutrition.protein}g</span>
        <span class="nutrition-label">Proteína</span>
      </div>
      <div class="nutrition-item">
        <span class="nutrition-value">${recipe.nutrition.carbs}g</span>
        <span class="nutrition-label">Carbohidratos</span>
      </div>
      <div class="nutrition-item">
        <span class="nutrition-value">${recipe.nutrition.fat}g</span>
        <span class="nutrition-label">Grasa</span>
      </div>
      <div class="nutrition-item">
        <span class="nutrition-value">${recipe.nutrition.fiber}g</span>
        <span class="nutrition-label">Fibra</span>
      </div>
    `;

    // Tips
    document.getElementById('modalTips').innerHTML = recipe.tips
      .map(tip => `<li>${this.escapeHtml(tip)}</li>`)
      .join('');

    // Update favorite button
    const isFavorited = this.favorites.includes(recipeId);
    const favoriteBtn = document.getElementById('toggleFavorite');
    favoriteBtn.textContent = isFavorited ? '❤️ Quitar de Favoritos' : '🤍 Agregar a Favoritos';
    favoriteBtn.dataset.recipeId = recipeId;

    document.getElementById('recipeModal').style.display = 'flex';
  }

  closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
  }

  toggleFavorite(recipeId) {
    const index = this.favorites.indexOf(recipeId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(recipeId);
    }
    
    localStorage.setItem('recipeFavorites', JSON.stringify(this.favorites));
    this.renderFavorites();
    this.renderRecipes();
  }

  addToRecent(recipeId) {
    const index = this.recent.indexOf(recipeId);
    if (index > -1) {
      this.recent.splice(index, 1);
    }
    this.recent.unshift(recipeId);
    this.recent = this.recent.slice(0, 10); // Keep only last 10
    
    localStorage.setItem('recipeRecent', JSON.stringify(this.recent));
    this.renderRecent();
  }

  renderFavorites() {
    const container = document.getElementById('favoritesList');
    const favoriteRecipes = this.recipes.filter(recipe => this.favorites.includes(recipe.id));
    
    if (favoriteRecipes.length === 0) {
      container.innerHTML = '<div class="empty-state">No hay favoritos</div>';
      return;
    }

    container.innerHTML = favoriteRecipes.map(recipe => `
      <div class="favorite-item" data-recipe-id="${recipe.id}">
        <h4>${this.escapeHtml(recipe.name)}</h4>
        <p>${recipe.prepTime} min • ${recipe.servings} porciones</p>
      </div>
    `).join('');
  }

  renderRecent() {
    const container = document.getElementById('recentList');
    const recentRecipes = this.recipes.filter(recipe => this.recent.includes(recipe.id));
    
    if (recentRecipes.length === 0) {
      container.innerHTML = '<div class="empty-state">No hay recientes</div>';
      return;
    }

    container.innerHTML = recentRecipes.map(recipe => `
      <div class="recent-item" data-recipe-id="${recipe.id}">
        <h4>${this.escapeHtml(recipe.name)}</h4>
        <p>${recipe.prepTime} min • ${recipe.servings} porciones</p>
      </div>
    `).join('');
  }

  addIngredientField() {
    const container = document.querySelector('.ingredients-input');
    const newField = document.createElement('div');
    newField.className = 'ingredient-item';
    newField.innerHTML = `
      <input type="text" placeholder="Ingrediente" class="ingredient-name">
      <input type="text" placeholder="Cantidad" class="ingredient-amount">
      <button type="button" class="remove-ingredient">×</button>
    `;
    container.appendChild(newField);
  }

  addInstructionField() {
    const container = document.querySelector('.instructions-input');
    const newField = document.createElement('div');
    newField.className = 'instruction-item';
    newField.innerHTML = `
      <textarea placeholder="Paso" class="instruction-text" rows="2"></textarea>
      <button type="button" class="remove-instruction">×</button>
    `;
    container.appendChild(newField);
  }

  addRecipe() {
    const form = document.getElementById('addRecipeForm');
    const formData = new FormData(form);
    
    const ingredients = Array.from(document.querySelectorAll('.ingredient-item')).map(item => ({
      name: item.querySelector('.ingredient-name').value,
      amount: item.querySelector('.ingredient-amount').value
    })).filter(ingredient => ingredient.name && ingredient.amount);

    const instructions = Array.from(document.querySelectorAll('.instruction-item')).map(item => 
      item.querySelector('.instruction-text').value
    ).filter(instruction => instruction.trim());

    const newRecipe = {
      id: Date.now(),
      name: document.getElementById('recipeName').value,
      description: document.getElementById('recipeDescription').value,
      category: document.getElementById('recipeCategory').value,
      difficulty: document.getElementById('recipeDifficulty').value,
      prepTime: parseInt(document.getElementById('recipePrepTime').value),
      servings: parseInt(document.getElementById('recipeServings').value),
      calories: parseInt(document.getElementById('recipeCalories').value) || 0,
      image: '🍽️',
      ingredients,
      instructions,
      nutrition: {
        calories: parseInt(document.getElementById('recipeCalories').value) || 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0
      },
      tips: document.getElementById('recipeTips').value.split('\n').filter(tip => tip.trim())
    };

    this.recipes.unshift(newRecipe);
    this.filteredRecipes = [...this.recipes];
    this.currentPage = 1;
    this.renderRecipes();
    this.closeAddModal();
    form.reset();
  }

  closeAddModal() {
    document.getElementById('addRecipeModal').style.display = 'none';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the recipe app
const recipeApp = new RecipeApp();
