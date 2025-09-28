// Color Palette Generator App
let currentPalette = [];
let savedPalettes = [];
let stats = {
  totalGenerated: 0,
  savedCount: 0,
  favoriteScheme: '-'
};

// Elements
const colorSchemeEl = document.getElementById('colorScheme');
const schemeTypeEl = document.getElementById('schemeType');
const baseColorEl = document.getElementById('baseColor');
const colorCountEl = document.getElementById('colorCount');
const countValueEl = document.getElementById('countValue');
const generateBtn = document.getElementById('generateBtn');
const lockBtn = document.getElementById('lockBtn');
const saveBtn = document.getElementById('saveBtn');
const exportBtn = document.getElementById('exportBtn');
const savedListEl = document.getElementById('savedList');
const clearSavedBtn = document.getElementById('clearSavedBtn');
const totalGeneratedEl = document.getElementById('totalGenerated');
const savedCountEl = document.getElementById('savedCount');
const favoriteSchemeEl = document.getElementById('favoriteScheme');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSavedPalettes();
  loadStats();
  updateStats();
  
  // Event listeners
  generateBtn.addEventListener('click', generatePalette);
  lockBtn.addEventListener('click', toggleLock);
  saveBtn.addEventListener('click', savePalette);
  exportBtn.addEventListener('click', exportPalette);
  clearSavedBtn.addEventListener('click', clearSavedPalettes);
  colorCountEl.addEventListener('input', updateCountValue);
  baseColorEl.addEventListener('change', generatePalette);
  schemeTypeEl.addEventListener('change', generatePalette);
  
  // Generate initial palette
  generatePalette();
});

function generatePalette() {
  const baseColor = baseColorEl.value;
  const schemeType = schemeTypeEl.value;
  const colorCount = parseInt(colorCountEl.value);
  
  currentPalette = generateColorScheme(baseColor, schemeType, colorCount);
  updatePaletteDisplay();
  
  stats.totalGenerated++;
  updateStats();
  saveStats();
}

function generateColorScheme(baseColor, schemeType, count) {
  const hsl = hexToHsl(baseColor);
  const colors = [];
  
  switch (schemeType) {
    case 'monochromatic':
      colors.push(...generateMonochromatic(hsl, count));
      break;
    case 'analogous':
      colors.push(...generateAnalogous(hsl, count));
      break;
    case 'complementary':
      colors.push(...generateComplementary(hsl, count));
      break;
    case 'triadic':
      colors.push(...generateTriadic(hsl, count));
      break;
    case 'tetradic':
      colors.push(...generateTetradic(hsl, count));
      break;
    case 'random':
      colors.push(...generateRandom(count));
      break;
  }
  
  return colors.slice(0, count);
}

function generateMonochromatic(hsl, count) {
  const colors = [];
  const [h, s, l] = hsl;
  
  for (let i = 0; i < count; i++) {
    const newL = Math.max(10, Math.min(90, l + (i - count/2) * 15));
    colors.push(hslToHex(h, s, newL));
  }
  
  return colors;
}

function generateAnalogous(hsl, count) {
  const colors = [];
  const [h, s, l] = hsl;
  
  for (let i = 0; i < count; i++) {
    const newH = (h + (i - count/2) * 30) % 360;
    colors.push(hslToHex(newH, s, l));
  }
  
  return colors;
}

function generateComplementary(hsl, count) {
  const colors = [];
  const [h, s, l] = hsl;
  
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      const newH = (h + i * 30) % 360;
      colors.push(hslToHex(newH, s, l));
    } else {
      const newH = (h + 180 + i * 30) % 360;
      colors.push(hslToHex(newH, s, l));
    }
  }
  
  return colors;
}

function generateTriadic(hsl, count) {
  const colors = [];
  const [h, s, l] = hsl;
  
  for (let i = 0; i < count; i++) {
    const newH = (h + i * 120) % 360;
    colors.push(hslToHex(newH, s, l));
  }
  
  return colors;
}

function generateTetradic(hsl, count) {
  const colors = [];
  const [h, s, l] = hsl;
  
  for (let i = 0; i < count; i++) {
    const newH = (h + i * 90) % 360;
    colors.push(hslToHex(newH, s, l));
  }
  
  return colors;
}

function generateRandom(count) {
  const colors = [];
  
  for (let i = 0; i < count; i++) {
    const h = Math.random() * 360;
    const s = 30 + Math.random() * 40;
    const l = 40 + Math.random() * 30;
    colors.push(hslToHex(h, s, l));
  }
  
  return colors;
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;
  
  if (h < 1/6) {
    [r, g, b] = [c, x, 0];
  } else if (h < 2/6) {
    [r, g, b] = [x, c, 0];
  } else if (h < 3/6) {
    [r, g, b] = [0, c, x];
  } else if (h < 4/6) {
    [r, g, b] = [0, x, c];
  } else if (h < 5/6) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  
  const toHex = (n) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function updatePaletteDisplay() {
  const colorItems = colorSchemeEl.querySelectorAll('.color-item');
  
  colorItems.forEach((item, index) => {
    if (index < currentPalette.length) {
      const color = currentPalette[index];
      const preview = item.querySelector('.color-preview');
      const hexSpan = item.querySelector('.color-hex');
      const rgbSpan = item.querySelector('.color-rgb');
      
      preview.style.backgroundColor = color;
      hexSpan.textContent = color;
      rgbSpan.textContent = hexToRgb(color);
      
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function toggleLock() {
  lockBtn.classList.toggle('locked');
  if (lockBtn.classList.contains('locked')) {
    lockBtn.textContent = '🔓 Unlock Colors';
  } else {
    lockBtn.textContent = '🔒 Lock Colors';
  }
}

function savePalette() {
  const palette = {
    colors: [...currentPalette],
    scheme: schemeTypeEl.value,
    name: `Palette ${savedPalettes.length + 1}`,
    timestamp: new Date().toLocaleString()
  };
  
  savedPalettes.push(palette);
  saveSavedPalettes();
  updateSavedList();
  
  stats.savedCount++;
  updateStats();
  saveStats();
}

function exportPalette() {
  const paletteData = {
    colors: currentPalette,
    scheme: schemeTypeEl.value,
    hex: currentPalette.join(', '),
    rgb: currentPalette.map(hexToRgb).join(', ')
  };
  
  const dataStr = JSON.stringify(paletteData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `palette-${Date.now()}.json`;
  link.click();
}

function updateCountValue() {
  countValueEl.textContent = colorCountEl.value;
}

function updateSavedList() {
  savedListEl.innerHTML = '';
  
  savedPalettes.forEach((palette, index) => {
    const item = document.createElement('div');
    item.className = 'saved-palette';
    item.innerHTML = `
      <div class="palette-colors">
        ${palette.colors.map(color => 
          `<div class="palette-color" style="background-color: ${color}"></div>`
        ).join('')}
      </div>
      <div class="palette-name">${palette.name}</div>
      <div class="palette-scheme">${palette.scheme} • ${palette.timestamp}</div>
    `;
    
    item.addEventListener('click', () => {
      currentPalette = [...palette.colors];
      schemeTypeEl.value = palette.scheme;
      colorCountEl.value = palette.colors.length;
      countValueEl.textContent = palette.colors.length;
      updatePaletteDisplay();
    });
    
    savedListEl.appendChild(item);
  });
}

function clearSavedPalettes() {
  savedPalettes = [];
  saveSavedPalettes();
  updateSavedList();
  
  stats.savedCount = 0;
  updateStats();
  saveStats();
}

function updateStats() {
  totalGeneratedEl.textContent = stats.totalGenerated;
  savedCountEl.textContent = stats.savedCount;
  favoriteSchemeEl.textContent = stats.favoriteScheme;
}

function saveSavedPalettes() {
  localStorage.setItem('palette-saved', JSON.stringify(savedPalettes));
}

function loadSavedPalettes() {
  const saved = localStorage.getItem('palette-saved');
  if (saved) {
    savedPalettes = JSON.parse(saved);
  }
}

function saveStats() {
  localStorage.setItem('palette-stats', JSON.stringify(stats));
}

function loadStats() {
  const saved = localStorage.getItem('palette-stats');
  if (saved) {
    stats = JSON.parse(saved);
  }
} 