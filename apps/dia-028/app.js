// Conversor de Colores
let currentColor = "#FF5733";

// Elementos del DOM
const hexInput = document.getElementById("hex-input");
const rgbInput = document.getElementById("rgb-input");
const hslInput = document.getElementById("hsl-input");
const colorDisplay = document.getElementById("color-display");
const colorName = document.getElementById("color-name");
const paletteGrid = document.getElementById("palette-grid");

// Función para convertir HEX a RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Función para convertir RGB a HEX
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Función para convertir RGB a HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
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
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Función para actualizar el display del color
function updateColorDisplay(color) {
  currentColor = color;
  colorDisplay.style.backgroundColor = color;
  colorName.textContent = color;
  
  const rgb = hexToRgb(color);
  if (rgb) {
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    rgbInput.value = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    hslInput.value = "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
  }
}

// Función para generar paleta de colores
function generatePalette() {
  const baseRgb = hexToRgb(currentColor);
  if (!baseRgb) return;
  
  const colors = [];
  
  for (let i = 0; i < 12; i++) {
    let r = baseRgb.r;
    let g = baseRgb.g;
    let b = baseRgb.b;
    
    if (i === 1) {
      r = Math.min(255, r + 30);
      g = Math.min(255, g + 30);
      b = Math.min(255, b + 30);
    } else if (i === 2) {
      r = Math.max(0, r - 30);
      g = Math.max(0, g - 30);
      b = Math.max(0, b - 30);
    } else if (i > 2) {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
    }
    
    const hex = rgbToHex(r, g, b);
    colors.push(hex);
  }
  
  paletteGrid.innerHTML = "";
  colors.forEach(color => {
    const div = document.createElement("div");
    div.className = "palette-color";
    div.style.backgroundColor = color;
    div.setAttribute("data-color", color);
    div.onclick = function() { selectPaletteColor(color); };
    paletteGrid.appendChild(div);
  });
}

// Función para seleccionar color de la paleta
function selectPaletteColor(color) {
  updateColorDisplay(color);
  hexInput.value = color;
}

// Función para validar y procesar input HEX
function processHexInput() {
  let value = hexInput.value.trim();
  if (!value.startsWith("#")) {
    value = "#" + value;
  }
  
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    updateColorDisplay(value.toUpperCase());
    generatePalette();
  }
}

// Event Listeners
hexInput.addEventListener("input", processHexInput);

// Función para copiar al portapapeles
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = colorName.textContent;
    colorName.textContent = "¡Copiado!";
    setTimeout(() => {
      colorName.textContent = originalText;
    }, 1000);
  }).catch(() => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    
    const originalText = colorName.textContent;
    colorName.textContent = "¡Copiado!";
    setTimeout(() => {
      colorName.textContent = originalText;
    }, 1000);
  });
}

// Hacer clic en el display para copiar
colorDisplay.addEventListener("click", () => {
  copyToClipboard(currentColor);
});

// Inicializar
updateColorDisplay(currentColor);
generatePalette();
