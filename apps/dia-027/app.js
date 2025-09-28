// App de Recetas
const recipes = [
  {
    id: 1,
    title: "Pancakes de Avena",
    description: "Deliciosos pancakes saludables con avena y plátano",
    category: "desayuno",
    difficulty: "fácil",
    time: 15,
    ingredients: ["1 taza de avena", "1 plátano", "2 huevos", "1/2 taza de leche", "1 cda de miel"],
    instructions: [
      "Mezcla la avena con el plátano machacado",
      "Añade los huevos y la leche",
      "Agrega la miel y mezcla bien",
      "Cocina en sartén antiadherente por 2-3 min por lado"
    ],
    icon: "��"
  },
  {
    id: 2,
    title: "Ensalada César",
    description: "Ensalada clásica con lechuga, pollo y aderezo césar",
    category: "almuerzo",
    difficulty: "fácil",
    time: 20,
    ingredients: ["Lechuga romana", "Pechuga de pollo", "Parmesano", "Crutones", "Aderezo césar"],
    instructions: [
      "Corta la lechuga en trozos",
      "Cocina el pollo y córtalo en tiras",
      "Prepara el aderezo césar",
      "Mezcla todos los ingredientes y sirve"
    ],
    icon: "🥗"
  },
  {
    id: 3,
    title: "Pasta Carbonara",
    description: "Pasta italiana clásica con huevo, queso y panceta",
    category: "cena",
    difficulty: "medio",
    time: 25,
    ingredients: ["400g pasta", "200g panceta", "4 huevos", "100g parmesano", "Ajo", "Pimienta negra"],
    instructions: [
      "Cocina la pasta según las instrucciones",
      "Fríe la panceta hasta que esté crujiente",
      "Bate los huevos con el parmesano",
      "Mezcla la pasta caliente con la panceta",
      "Añade la mezcla de huevo removiendo constantemente"
    ],
    icon: "🍝"
  },
  {
    id: 4,
    title: "Tiramisú",
    description: "Postre italiano clásico con café y mascarpone",
    category: "postre",
    difficulty: "difícil",
    time: 60,
    ingredients: ["500g mascarpone", "6 huevos", "200g azúcar", "300ml café", "Bizcochos de soletilla", "Cacao en polvo"],
    instructions: [
      "Separa las yemas de las claras",
      "Bate las yemas con el azúcar hasta que estén cremosas",
      "Añade el mascarpone a las yemas",
      "Monta las claras a punto de nieve",
      "Incorpora las claras a la mezcla de mascarpone",
      "Moja los bizcochos en café",
      "Alterna capas de bizcochos y crema",
      "Refrigera por 4 horas y espolvorea cacao"
    ],
    icon: "🍰"
  },
  {
    id: 5,
    title: "Smoothie de Frutas",
    description: "Bebida refrescante con frutas frescas y yogurt",
    category: "bebida",
    difficulty: "fácil",
    time: 5,
    ingredients: ["1 plátano", "1/2 taza de fresas", "1/2 taza de yogurt griego", "1/2 taza de leche", "1 cda de miel"],
    instructions: [
      "Lava y corta las fresas",
      "Pela y corta el plátano",
      "Añade todos los ingredientes a la licuadora",
      "Licua hasta obtener una mezcla suave",
      "Sirve inmediatamente"
    ],
    icon: "🥤"
  },
  {
    id: 6,
    title: "Hamburguesa Gourmet",
    description: "Hamburguesa casera con ingredientes premium",
    category: "almuerzo",
    difficulty: "medio",
    time: 30,
    ingredients: ["500g carne molida", "4 panes de hamburguesa", "Lechuga", "Tomate", "Cebolla", "Queso cheddar", "Salsa especial"],
    instructions: [
      "Forma 4 hamburguesas con la carne molida",
      "Sazona con sal y pimienta",
      "Cocina las hamburguesas en sartén o parrilla",
      "Tuesta los panes ligeramente",
      "Monta la hamburguesa con todos los ingredientes",
      "Sirve con papas fritas"
    ],
    icon: "🍔"
  },
  {
    id: 7,
    title: "Sopa de Tomate",
    description: "Sopa cremosa de tomate con albahaca fresca",
    category: "cena",
    difficulty: "fácil",
    time: 25,
    ingredients: ["1kg tomates", "1 cebolla", "2 dientes de ajo", "Caldo de pollo", "Albahaca fresca", "Crema de leche"],
    instructions: [
      "Pica la cebolla y el ajo",
      "Sofríe en una olla hasta que estén dorados",
      "Añade los tomates cortados",
      "Agrega el caldo y cocina 20 minutos",
      "Licua la sopa hasta que esté suave",
      "Añade albahaca y crema al servir"
    ],
    icon: "🍅"
  },
  {
    id: 8,
    title: "Brownies de Chocolate",
    description: "Brownies húmedos y chocolatosos con nueces",
    category: "postre",
    difficulty: "medio",
    time: 45,
    ingredients: ["200g chocolate negro", "150g mantequilla", "3 huevos", "200g azúcar", "100g harina", "Nueces picadas"],
    instructions: [
      "Derrite el chocolate con la mantequilla",
      "Bate los huevos con el azúcar",
      "Añade el chocolate derretido",
      "Incorpora la harina y las nueces",
      "Hornea a 180°C por 25-30 minutos",
      "Deja enfriar antes de cortar"
    ],
    icon: "🍫"
  }
];

let filteredRecipes = [...recipes];

// Elementos del DOM
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const categoryFilter = document.getElementById("category-filter");
const difficultyFilter = document.getElementById("difficulty-filter");
const timeFilter = document.getElementById("time-filter");
const recipesGrid = document.getElementById("recipes-grid");
const noResults = document.getElementById("no-results");
const modal = document.getElementById("recipe-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close");

// Función para renderizar las recetas
function renderRecipes() {
  if (filteredRecipes.length === 0) {
    recipesGrid.style.display = "none";
    noResults.style.display = "block";
    return;
  }
  
  recipesGrid.style.display = "grid";
  noResults.style.display = "none";
  
  recipesGrid.innerHTML = filteredRecipes.map(recipe => `
    <div class="recipe-card" onclick="openRecipe(${recipe.id})">
      <div class="recipe-image">${recipe.icon}</div>
      <div class="recipe-content">
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-meta">
          <div class="recipe-time">⏱️ ${recipe.time} min</div>
          <div class="recipe-difficulty">⭐ ${recipe.difficulty}</div>
        </div>
        <div class="recipe-category">${recipe.category}</div>
        <div class="recipe-ingredients">
          <strong>Ingredientes:</strong> ${recipe.ingredients.slice(0, 3).join(", ")}${recipe.ingredients.length > 3 ? "..." : ""}
        </div>
      </div>
    </div>
  `).join("");
}

// Función para filtrar recetas
function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const difficulty = difficultyFilter.value;
  const maxTime = timeFilter.value;
  
  filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) ||
                         recipe.description.toLowerCase().includes(searchTerm) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
    
    const matchesCategory = !category || recipe.category === category;
    const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
    const matchesTime = !maxTime || recipe.time <= parseInt(maxTime);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
  });
  
  renderRecipes();
}

// Función para abrir modal con detalles de la receta
function openRecipe(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  
  modalBody.innerHTML = `
    <div class="modal-recipe-image">${recipe.icon}</div>
    <h2 class="modal-recipe-title">${recipe.title}</h2>
    <div class="modal-recipe-meta">
      <div class="modal-meta-item">
        <span>⏱️</span>
        <span>${recipe.time} minutos</span>
      </div>
      <div class="modal-meta-item">
        <span>⭐</span>
        <span>${recipe.difficulty}</span>
      </div>
      <div class="modal-meta-item">
        <span>📂</span>
        <span>${recipe.category}</span>
      </div>
    </div>
    
    <div class="modal-recipe-section">
      <h3>Ingredientes</h3>
      <ul>
        ${recipe.ingredients.map(ingredient => "<li>" + ingredient + "</li>").join("")}
      </ul>
    </div>
    
    <div class="modal-recipe-section">
      <h3>Instrucciones</h3>
      <ol>
        ${recipe.instructions.map(instruction => "<li>" + instruction + "</li>").join("")}
      </ol>
    </div>
  `;
  
  modal.style.display = "block";
}

// Función para cerrar modal
function closeRecipeModal() {
  modal.style.display = "none";
}

// Event Listeners
searchInput.addEventListener("input", filterRecipes);
searchBtn.addEventListener("click", filterRecipes);
categoryFilter.addEventListener("change", filterRecipes);
difficultyFilter.addEventListener("change", filterRecipes);
timeFilter.addEventListener("change", filterRecipes);
closeModal.addEventListener("click", closeRecipeModal);

// Cerrar modal al hacer clic fuera de él
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeRecipeModal();
  }
});

// Soporte para teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeRecipeModal();
  }
});

// Inicializar
renderRecipes();
