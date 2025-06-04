// Elementos del DOM
const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('image-input');
const uploadBtn = document.getElementById('upload-btn');
const randomMemeBtn = document.getElementById('random-meme-btn');
const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const fontSizeSlider = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const fontColorInput = document.getElementById('font-color');
const strokeColorInput = document.getElementById('stroke-color');
const strokeWidthSlider = document.getElementById('stroke-width');
const strokeWidthValue = document.getElementById('stroke-width-value');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const resetBtn = document.getElementById('reset-btn');
const galleryGrid = document.getElementById('gallery-grid');

// Estado de la aplicación
let currentImage = null;
let memeHistory = [];

// URLs de imágenes de ejemplo (placeholders)
const sampleImages = [
  'https://via.placeholder.com/600x400/333/fff?text=Meme+Template+1',
  'https://via.placeholder.com/600x400/666/fff?text=Meme+Template+2',
  'https://via.placeholder.com/600x400/999/fff?text=Meme+Template+3',
  'https://via.placeholder.com/600x400/ccc/000?text=Meme+Template+4'
];

// Función para cargar imagen
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Función para dibujar meme
function drawMeme() {
  if (!currentImage) return;
  
  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar imagen
  ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  
  // Configurar estilo de texto
  const fontSize = parseInt(fontSizeSlider.value);
  const fontColor = fontColorInput.value;
  const strokeColor = strokeColorInput.value;
  const strokeWidth = parseInt(strokeWidthSlider.value);
  
  ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.lineWidth = strokeWidth;
  
  // Obtener textos
  const topText = topTextInput.value.toUpperCase();
  const bottomText = bottomTextInput.value.toUpperCase();
  
  // Dibujar texto superior
  if (topText) {
    // Borde
    ctx.strokeStyle = strokeColor;
    ctx.strokeText(topText, canvas.width / 2, fontSize + 20);
    
    // Texto
    ctx.fillStyle = fontColor;
    ctx.fillText(topText, canvas.width / 2, fontSize + 20);
  }
  
  // Dibujar texto inferior
  if (bottomText) {
    // Borde
    ctx.strokeStyle = strokeColor;
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    
    // Texto
    ctx.fillStyle = fontColor;
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  }
}

// Función para cargar imagen desde archivo
function loadImageFromFile(file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      currentImage = await loadImage(e.target.result);
      drawMeme();
    } catch (error) {
      showNotification('Error al cargar la imagen', 'error');
    }
  };
  reader.readAsDataURL(file);
}

// Función para cargar imagen aleatoria
async function loadRandomImage() {
  try {
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    currentImage = await loadImage(sampleImages[randomIndex]);
    drawMeme();
    showNotification('Imagen aleatoria cargada');
  } catch (error) {
    showNotification('Error al cargar imagen aleatoria', 'error');
  }
}

// Función para descargar meme
function downloadMeme() {
  if (!currentImage) {
    showNotification('Primero carga una imagen', 'error');
    return;
  }
  
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL();
  link.click();
  
  // Agregar a historial
  addToHistory();
  showNotification('Meme descargado');
}

// Función para compartir meme
function shareMeme() {
  if (!currentImage) {
    showNotification('Primero carga una imagen', 'error');
    return;
  }
  
  if (navigator.share) {
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'meme.png', { type: 'image/png' });
      try {
        await navigator.share({
          title: 'Mi Meme',
          text: 'Mira el meme que creé',
          files: [file]
        });
      } catch (error) {
        showNotification('Error al compartir', 'error');
      }
    });
  } else {
    // Fallback: copiar al portapapeles
    canvas.toBlob((blob) => {
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item]).then(() => {
        showNotification('Meme copiado al portapapeles');
      }).catch(() => {
        showNotification('No se pudo copiar al portapapeles', 'error');
      });
    });
  }
}

// Función para reiniciar
function resetMeme() {
  topTextInput.value = '';
  bottomTextInput.value = '';
  fontSizeSlider.value = 40;
  fontSizeValue.textContent = '40px';
  fontColorInput.value = '#ffffff';
  strokeColorInput.value = '#000000';
  strokeWidthSlider.value = 3;
  strokeWidthValue.textContent = '3px';
  
  if (currentImage) {
    drawMeme();
  }
  
  showNotification('Meme reiniciado');
}

// Función para agregar a historial
function addToHistory() {
  const memeData = {
    id: Date.now(),
    image: canvas.toDataURL(),
    topText: topTextInput.value,
    bottomText: bottomTextInput.value,
    timestamp: new Date().toISOString()
  };
  
  memeHistory.unshift(memeData);
  if (memeHistory.length > 10) {
    memeHistory.pop();
  }
  
  localStorage.setItem('memeHistory', JSON.stringify(memeHistory));
  renderGallery();
}

// Función para renderizar galería
function renderGallery() {
  galleryGrid.innerHTML = '';
  
  if (memeHistory.length === 0) {
    galleryGrid.innerHTML = '<div class="empty-gallery">No hay memes en la galería</div>';
    return;
  }
  
  memeHistory.forEach(meme => {
    const memeItem = document.createElement('div');
    memeItem.className = 'gallery-item';
    
    memeItem.innerHTML = `
      <img src="${meme.image}" alt="Meme" class="gallery-image">
      <div class="gallery-overlay">
        <button class="gallery-download" title="Descargar">💾</button>
        <button class="gallery-delete" title="Eliminar">🗑️</button>
      </div>
    `;
    
    const downloadBtn = memeItem.querySelector('.gallery-download');
    const deleteBtn = memeItem.querySelector('.gallery-delete');
    
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `meme-${meme.id}.png`;
      link.href = meme.image;
      link.click();
    });
    
    deleteBtn.addEventListener('click', () => {
      memeHistory = memeHistory.filter(m => m.id !== meme.id);
      localStorage.setItem('memeHistory', JSON.stringify(memeHistory));
      renderGallery();
      showNotification('Meme eliminado');
    });
    
    galleryGrid.appendChild(memeItem);
  });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Event listeners
uploadBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    loadImageFromFile(file);
  }
});

randomMemeBtn.addEventListener('click', loadRandomImage);

topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);

fontSizeSlider.addEventListener('input', (e) => {
  fontSizeValue.textContent = e.target.value + 'px';
  drawMeme();
});

fontColorInput.addEventListener('change', drawMeme);
strokeColorInput.addEventListener('change', drawMeme);

strokeWidthSlider.addEventListener('input', (e) => {
  strokeWidthValue.textContent = e.target.value + 'px';
  drawMeme();
});

downloadBtn.addEventListener('click', downloadMeme);
shareBtn.addEventListener('click', shareMeme);
resetBtn.addEventListener('click', resetMeme);

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 's':
        e.preventDefault();
        downloadMeme();
        break;
      case 'r':
        e.preventDefault();
        resetMeme();
        break;
    }
  }
});

// Cargar historial guardado
const savedHistory = localStorage.getItem('memeHistory');
if (savedHistory) {
  memeHistory = JSON.parse(savedHistory);
  renderGallery();
}

// Inicializar con imagen aleatoria
loadRandomImage(); 