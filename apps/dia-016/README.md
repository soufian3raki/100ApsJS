# 🎵 Día 16: Reproductor de Música

## 📋 Descripción
Reproductor de música completo con controles de reproducción, lista de canciones, barra de progreso y visualizador de audio.

## ✨ Características
- **Controles de reproducción** (play, pause, stop, next, previous)
- **Lista de canciones** con selección
- **Barra de progreso** interactiva
- **Visualizador de audio** en tiempo real
- **Control de volumen** con slider
- **Modo aleatorio** y repetición
- **Diseño moderno** y responsive

## 🚀 Cómo Funciona

### Control de Reproducción
```javascript
let currentSong = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let audio = new Audio();

const playlist = [
  {
    title: "Canción 1",
    artist: "Artista 1",
    src: "song1.mp3",
    duration: "3:45"
  },
  {
    title: "Canción 2",
    artist: "Artista 2",
    src: "song2.mp3",
    duration: "4:12"
  }
];

function playPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = "▶️";
  } else {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = "⏸️";
  }
}

function nextSong() {
  if (isRandom) {
    currentSong = Math.floor(Math.random() * playlist.length);
  } else {
    currentSong = (currentSong + 1) % playlist.length;
  }
  loadSong(currentSong);
  if (isPlaying) {
    audio.play();
  }
}
```

### Visualizador de Audio
```javascript
function initAudioVisualizer() {
  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);
  
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * canvas.height;
      
      ctx.fillStyle = `hsl(${i * 2}, 100%, 50%)`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      
      x += barWidth + 1;
    }
  }
  
  draw();
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Audio API**: Reproducción de audio
- **Web Audio API**: Visualizador de audio
- **Canvas API**: Gráficos en tiempo real
- **Event handling**: Controles de reproducción
- **Array methods**: Gestión de playlist
- **Math.random()**: Modo aleatorio

### CSS
- **Flexbox para layout**: Disposición de controles
- **Grid para playlist**: Organización de canciones
- **Animaciones**: Efectos visuales
- **Responsive design**: Adaptación móvil
- **Custom sliders**: Barras de progreso

### APIs
- **HTML5 Audio API**: Reproducción
- **Web Audio API**: Análisis de audio
- **Canvas API**: Visualización
- **RequestAnimationFrame**: Animaciones suaves

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Audio, canvas, controles
- **CSS3**: Flexbox, grid, animaciones
- **JavaScript ES6+**: Lógica del reproductor
- **Web Audio API**: Visualizador

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en controles y canciones
- **Teclado**: 
  - `Espacio`: Play/Pause
  - `←`/`→`: Anterior/Siguiente
  - `↑`/`↓`: Subir/Bajar volumen

## 🔧 Estructura del Código
```
dia-016/
├── index.html          # Estructura HTML + controles
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + reproductor
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Haz clic en una canción de la lista
3. Usa los controles para reproducir
4. Ajusta el volumen con el slider
5. Activa el modo aleatorio si deseas

## 💡 Mejoras Futuras
- [ ] Subida de archivos de audio
- [ ] Playlist personalizadas
- [ ] Modo karaoke
- [ ] Ecualizador
- [ ] Sincronización en la nube
- [ ] Modo offline

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~300 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Alta
- **Dependencias**: Ninguna
- **APIs**: Audio, Web Audio, Canvas

## 🎵 Casos de Uso
- **Entretenimiento**: Reproductor personal
- **Presentaciones**: Música de fondo
- **Desarrollo**: Base para apps de música
- **Educación**: Aprendizaje de APIs de audio

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 16*
