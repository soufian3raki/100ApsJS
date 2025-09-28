// Unit Converter App
const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000
  },
  temperature: {
    celsius: 'celsius',
    fahrenheit: 'fahrenheit',
    kelvin: 'kelvin'
  },
  area: {
    'square meter': 1,
    'square kilometer': 1000000,
    'square centimeter': 0.0001,
    'square mile': 2589988.11,
    'square yard': 0.836127,
    'square foot': 0.092903,
    'square inch': 0.00064516,
    acre: 4046.86
  },
  volume: {
    'cubic meter': 1,
    liter: 0.001,
    milliliter: 0.000001,
    gallon: 0.00378541,
    quart: 0.000946353,
    pint: 0.000473176,
    cup: 0.000236588
  },
  speed: {
    'meter per second': 1,
    'kilometer per hour': 0.277778,
    'mile per hour': 0.44704,
    'foot per second': 0.3048,
    knot: 0.514444
  },
  time: {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000,
    year: 31536000
  },
  digital: {
    byte: 1,
    kilobyte: 1024,
    megabyte: 1048576,
    gigabyte: 1073741824,
    terabyte: 1099511627776
  }
};

let currentCategory = 'length';
let history = [];
let favorites = [];

// Elements
const categoryButtons = document.getElementById('categoryButtons');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const swapBtn = document.getElementById('swapBtn');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const infoContent = document.getElementById('infoContent');
const favoritesList = document.getElementById('favoritesList');
const addFavoriteBtn = document.getElementById('addFavoriteBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  loadFavorites();
  setupCategoryButtons();
  populateUnits();
  updateInfo();
  
  // Event listeners
  fromValue.addEventListener('input', convert);
  fromUnit.addEventListener('change', convert);
  toUnit.addEventListener('change', convert);
  swapBtn.addEventListener('click', swapUnits);
  clearHistoryBtn.addEventListener('click', clearHistory);
  addFavoriteBtn.addEventListener('click', addToFavorites);
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
      populateUnits();
      updateInfo();
      convert();
    }
  });
}

function populateUnits() {
  const categoryUnits = units[currentCategory];
  const unitNames = Object.keys(categoryUnits);
  
  // Clear existing options
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  
  // Add options
  unitNames.forEach(unit => {
    const fromOption = document.createElement('option');
    fromOption.value = unit;
    fromOption.textContent = unit;
    fromUnit.appendChild(fromOption);
    
    const toOption = document.createElement('option');
    toOption.value = unit;
    toOption.textContent = unit;
    toUnit.appendChild(toOption);
  });
  
  // Set default selections
  if (unitNames.length > 1) {
    toUnit.selectedIndex = 1;
  }
}

function convert() {
  const fromUnitValue = fromUnit.value;
  const toUnitValue = toUnit.value;
  const inputValue = parseFloat(fromValue.value);
  
  if (isNaN(inputValue)) {
    toValue.value = '';
    return;
  }
  
  let result;
  
  if (currentCategory === 'temperature') {
    result = convertTemperature(inputValue, fromUnitValue, toUnitValue);
  } else {
    const categoryUnits = units[currentCategory];
    const fromFactor = categoryUnits[fromUnitValue];
    const toFactor = categoryUnits[toUnitValue];
    
    // Convert to base unit, then to target unit
    const baseValue = inputValue * fromFactor;
    result = baseValue / toFactor;
  }
  
  toValue.value = result.toFixed(6);
  
  // Add to history
  addToHistory(inputValue, fromUnitValue, result, toUnitValue);
}

function convertTemperature(value, from, to) {
  let celsius;
  
  // Convert to Celsius first
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5/9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
  }
  
  // Convert from Celsius to target unit
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return celsius * 9/5 + 32;
    case 'kelvin':
      return celsius + 273.15;
  }
}

function swapUnits() {
  const tempUnit = fromUnit.value;
  const tempValue = fromValue.value;
  
  fromUnit.value = toUnit.value;
  toUnit.value = tempUnit;
  
  fromValue.value = toValue.value;
  toValue.value = tempValue;
  
  convert();
}

function addToHistory(fromValue, fromUnit, toValue, toUnit) {
  const conversion = {
    fromValue,
    fromUnit,
    toValue,
    toUnit,
    category: currentCategory,
    timestamp: new Date().toLocaleString()
  };
  
  history.unshift(conversion);
  if (history.length > 10) {
    history.pop();
  }
  
  saveHistory();
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  historyList.innerHTML = '';
  
  history.forEach(conversion => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = `${conversion.fromValue} ${conversion.fromUnit} = ${conversion.toValue.toFixed(4)} ${conversion.toUnit}`;
    historyList.appendChild(item);
  });
}

function clearHistory() {
  history = [];
  saveHistory();
  updateHistoryDisplay();
}

function saveHistory() {
  localStorage.setItem('converter-history', JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem('converter-history');
  if (saved) {
    history = JSON.parse(saved);
    updateHistoryDisplay();
  }
}

function addToFavorites() {
  const fromValue = parseFloat(fromValue.value);
  const toValue = parseFloat(toValue.value);
  
  if (isNaN(fromValue) || isNaN(toValue)) {
    alert('Por favor ingresa valores válidos para agregar a favoritos');
    return;
  }
  
  const favorite = {
    fromValue,
    fromUnit: fromUnit.value,
    toValue,
    toUnit: toUnit.value,
    category: currentCategory,
    name: `Conversión ${favorites.length + 1}`
  };
  
  favorites.push(favorite);
  saveFavorites();
  updateFavoritesDisplay();
}

function updateFavoritesDisplay() {
  favoritesList.innerHTML = '';
  
  favorites.forEach((favorite, index) => {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    item.textContent = `${favorite.fromValue} ${favorite.fromUnit} = ${favorite.toValue.toFixed(4)} ${favorite.toUnit}`;
    
    item.addEventListener('click', () => {
      fromValue.value = favorite.fromValue;
      fromUnit.value = favorite.fromUnit;
      toUnit.value = favorite.toUnit;
      convert();
    });
    
    favoritesList.appendChild(item);
  });
}

function saveFavorites() {
  localStorage.setItem('converter-favorites', JSON.stringify(favorites));
}

function loadFavorites() {
  const saved = localStorage.getItem('converter-favorites');
  if (saved) {
    favorites = JSON.parse(saved);
    updateFavoritesDisplay();
  }
}

function updateInfo() {
  const info = {
    length: 'Conversión de unidades de longitud. Incluye metros, kilómetros, millas, pies, etc.',
    weight: 'Conversión de unidades de peso. Incluye kilogramos, gramos, libras, onzas, etc.',
    temperature: 'Conversión de temperaturas entre Celsius, Fahrenheit y Kelvin.',
    area: 'Conversión de unidades de área. Incluye metros cuadrados, kilómetros cuadrados, etc.',
    volume: 'Conversión de unidades de volumen. Incluye metros cúbicos, litros, galones, etc.',
    speed: 'Conversión de unidades de velocidad. Incluye m/s, km/h, mph, etc.',
    time: 'Conversión de unidades de tiempo. Incluye segundos, minutos, horas, días, etc.',
    digital: 'Conversión de unidades digitales. Incluye bytes, kilobytes, megabytes, etc.'
  };
  
  infoContent.textContent = info[currentCategory];
} 