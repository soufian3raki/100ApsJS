// Quote Generator App
const quotes = {
  motivation: [
    { text: "El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje para continuar.", author: "Winston Churchill" },
    { text: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.", author: "John Lennon" },
    { text: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt" },
    { text: "No hay ascensor al éxito, tienes que tomar las escaleras.", author: "Zig Ziglar" },
    { text: "La motivación es lo que te hace empezar. El hábito es lo que te hace continuar.", author: "Jim Ryun" }
  ],
  success: [
    { text: "El éxito es ir de fracaso en fracaso sin perder el entusiasmo.", author: "Winston Churchill" },
    { text: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.", author: "Albert Schweitzer" },
    { text: "Los obstáculos son esas cosas espantosas que ves cuando apartas los ojos de tu meta.", author: "Henry Ford" },
    { text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier" },
    { text: "No mires el reloj; haz lo que hace. Sigue adelante.", author: "Sam Levenson" }
  ],
  life: [
    { text: "La vida es una aventura atrevida o no es nada.", author: "Helen Keller" },
    { text: "La vida es lo que sucede mientras estás ocupado haciendo otros planes.", author: "Allen Saunders" },
    { text: "La vida es realmente simple, pero insistimos en hacerla complicada.", author: "Confucio" },
    { text: "La vida es 10% lo que te sucede y 90% cómo reaccionas a ello.", author: "Charles R. Swindoll" },
    { text: "La vida es como andar en bicicleta. Para mantener el equilibrio, debes seguir moviéndote.", author: "Albert Einstein" }
  ],
  wisdom: [
    { text: "La sabiduría comienza en el asombro.", author: "Sócrates" },
    { text: "El conocimiento habla, pero la sabiduría escucha.", author: "Jimi Hendrix" },
    { text: "La sabiduría es la hija de la experiencia.", author: "Leonardo da Vinci" },
    { text: "La verdadera sabiduría viene a cada uno de nosotros cuando nos damos cuenta de lo poco que entendemos sobre la vida.", author: "Sócrates" },
    { text: "La sabiduría no es producto de la escolaridad, sino del intento de adquirirla durante toda la vida.", author: "Albert Einstein" }
  ],
  love: [
    { text: "El amor no mira con los ojos, sino con el corazón.", author: "William Shakespeare" },
    { text: "El amor es paciente, el amor es bondadoso.", author: "San Pablo" },
    { text: "El amor es la poesía de los sentidos.", author: "Honoré de Balzac" },
    { text: "El amor es la fuerza más poderosa del universo.", author: "Martin Luther King Jr." },
    { text: "El amor es la respuesta a todo.", author: "Anónimo" }
  ]
};

let currentQuote = null;
let currentCategory = 'motivation';
let isAutoGenerating = false;
let autoInterval = null;
let stats = {
  generated: 0,
  favorites: 0,
  favoriteCategory: '-'
};
let favorites = [];

// Elements
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCategory = document.getElementById('quoteCategory');
const categoryButtons = document.getElementById('categoryButtons');
const generateBtn = document.getElementById('generateBtn');
const autoGenerateBtn = document.getElementById('autoGenerateBtn');
const likeBtn = document.getElementById('likeBtn');
const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const generatedCount = document.getElementById('generatedCount');
const favoritesCount = document.getElementById('favoritesCount');
const favoriteCategory = document.getElementById('favoriteCategory');
const favoritesList = document.getElementById('favoritesList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadFavorites();
  setupCategoryButtons();
  generateQuote();
  
  // Event listeners
  generateBtn.addEventListener('click', generateQuote);
  autoGenerateBtn.addEventListener('click', toggleAutoGenerate);
  likeBtn.addEventListener('click', likeQuote);
  shareBtn.addEventListener('click', shareQuote);
  copyBtn.addEventListener('click', copyQuote);
  saveBtn.addEventListener('click', saveQuote);
});

function setupCategoryButtons() {
  categoryButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-btn')) {
      // Remove active class from all buttons
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      e.target.classList.add('active');
      
      // Update category
      currentCategory = e.target.dataset.category;
      generateQuote();
    }
  });
}

function generateQuote() {
  let categoryQuotes;
  
  if (currentCategory === 'random') {
    // Get quotes from all categories
    categoryQuotes = Object.values(quotes).flat();
  } else {
    categoryQuotes = quotes[currentCategory] || quotes.motivation;
  }
  
  // Get random quote
  const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
  currentQuote = categoryQuotes[randomIndex];
  
  // Update display
  quoteText.textContent = `"${currentQuote.text}"`;
  quoteAuthor.textContent = `- ${currentQuote.author}`;
  quoteCategory.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
  
  // Update stats
  stats.generated++;
  updateStats();
  saveStats();
}

function toggleAutoGenerate() {
  if (isAutoGenerating) {
    stopAutoGenerate();
  } else {
    startAutoGenerate();
  }
}

function startAutoGenerate() {
  isAutoGenerating = true;
  autoGenerateBtn.textContent = 'Detener Auto';
  autoGenerateBtn.classList.add('active');
  
  autoInterval = setInterval(() => {
    generateQuote();
  }, 3000);
}

function stopAutoGenerate() {
  isAutoGenerating = false;
  autoGenerateBtn.textContent = 'Auto-Generar';
  autoGenerateBtn.classList.remove('active');
  
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
}

function likeQuote() {
  if (currentQuote) {
    likeBtn.style.color = '#e74c3c';
    setTimeout(() => {
      likeBtn.style.color = '';
    }, 1000);
  }
}

function shareQuote() {
  if (currentQuote && navigator.share) {
    navigator.share({
      title: 'Frase Motivadora',
      text: `"${currentQuote.text}" - ${currentQuote.author}`,
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    copyQuote();
  }
}

function copyQuote() {
  if (currentQuote) {
    const textToCopy = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyBtn.textContent = '✓';
      setTimeout(() => {
        copyBtn.textContent = '📋';
      }, 1000);
    });
  }
}

function saveQuote() {
  if (currentQuote) {
    const favorite = {
      ...currentQuote,
      category: currentCategory,
      timestamp: new Date().toLocaleString()
    };
    
    favorites.push(favorite);
    saveFavorites();
    updateFavoritesDisplay();
    updateStats();
    
    saveBtn.textContent = '✓';
    setTimeout(() => {
      saveBtn.textContent = '💾';
    }, 1000);
  }
}

function updateStats() {
  generatedCount.textContent = stats.generated;
  favoritesCount.textContent = favorites.length;
  
  // Find favorite category
  const categoryCounts = {};
  favorites.forEach(fav => {
    categoryCounts[fav.category] = (categoryCounts[fav.category] || 0) + 1;
  });
  
  const favoriteCat = Object.keys(categoryCounts).reduce((a, b) => 
    categoryCounts[a] > categoryCounts[b] ? a : b, 'motivation');
  
  favoriteCategory.textContent = favoriteCat.charAt(0).toUpperCase() + favoriteCat.slice(1);
}

function updateFavoritesDisplay() {
  favoritesList.innerHTML = '';
  
  favorites.forEach(favorite => {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    item.innerHTML = `
      <div class="quote-text">"${favorite.text}"</div>
      <div class="quote-author">- ${favorite.author}</div>
      <div class="quote-category">${favorite.category}</div>
    `;
    
    item.addEventListener('click', () => {
      currentQuote = favorite;
      quoteText.textContent = `"${favorite.text}"`;
      quoteAuthor.textContent = `- ${favorite.author}`;
      quoteCategory.textContent = favorite.category.charAt(0).toUpperCase() + favorite.category.slice(1);
    });
    
    favoritesList.appendChild(item);
  });
}

function saveStats() {
  localStorage.setItem('quote-stats', JSON.stringify(stats));
}

function loadStats() {
  const saved = localStorage.getItem('quote-stats');
  if (saved) {
    stats = JSON.parse(saved);
    updateStats();
  }
}

function saveFavorites() {
  localStorage.setItem('quote-favorites', JSON.stringify(favorites));
}

function loadFavorites() {
  const saved = localStorage.getItem('quote-favorites');
  if (saved) {
    favorites = JSON.parse(saved);
    updateFavoritesDisplay();
  }
} 