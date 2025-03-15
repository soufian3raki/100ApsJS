// Botón volver atrás
const backBtn = document.getElementById('back');
backBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

// Sincronizar modo de color
const modeBtn = document.getElementById('toggle-mode');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  modeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}
modeBtn.addEventListener('click', toggleTheme);
setTheme(localStorage.getItem('theme') || 'light');

// Elementos del DOM
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapsList = document.getElementById('laps-list');
const clearLapsBtn = document.getElementById('clear-laps-btn');

// Variables del cronómetro
let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let isRunning = false;
let laps = [];

// Función para formatear tiempo
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    milliseconds: milliseconds.toString().padStart(2, '0')
  };
}

// Función para actualizar el display
function updateDisplay() {
  const time = formatTime(elapsedTime);
  hoursDisplay.textContent = time.hours;
  minutesDisplay.textContent = time.minutes;
  secondsDisplay.textContent = time.seconds;
  millisecondsDisplay.textContent = time.milliseconds;
}

// Función para iniciar el cronómetro
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    startBtn.classList.add('disabled');
    pauseBtn.classList.remove('disabled');
  }
}

// Función para pausar el cronómetro
function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    startBtn.classList.remove('disabled');
    pauseBtn.classList.add('disabled');
  }
}

// Función para reiniciar el cronómetro
function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  updateDisplay();
  clearLaps();
}

// Función para agregar vuelta
function addLap() {
  if (isRunning) {
    const lapTime = elapsedTime;
    const lapNumber = laps.length + 1;
    const formattedTime = formatTime(lapTime);
    
    const lap = {
      number: lapNumber,
      time: lapTime,
      formatted: formattedTime
    };
    
    laps.unshift(lap);
    renderLaps();
    
    // Efecto visual de vuelta agregada
    const timeDisplay = document.querySelector('.time-display');
    timeDisplay.style.transform = 'scale(1.05)';
    setTimeout(() => {
      timeDisplay.style.transform = 'scale(1)';
    }, 200);
  }
}

// Función para renderizar vueltas
function renderLaps() {
  lapsList.innerHTML = '';
  
  if (laps.length === 0) {
    lapsList.innerHTML = '<div class="no-laps">No hay vueltas registradas</div>';
    return;
  }
  
  laps.forEach((lap, index) => {
    const lapElement = document.createElement('div');
    lapElement.className = 'lap-item';
    
    const timeString = `${lap.formatted.hours}:${lap.formatted.minutes}:${lap.formatted.seconds}.${lap.formatted.milliseconds}`;
    
    lapElement.innerHTML = `
      <div class="lap-number">#${lap.number}</div>
      <div class="lap-time">${timeString}</div>
    `;
    
    // Efecto de entrada
    lapElement.style.opacity = '0';
    lapElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      lapElement.style.transition = 'all 0.3s ease';
      lapElement.style.opacity = '1';
      lapElement.style.transform = 'translateY(0)';
    }, index * 100);
    
    lapsList.appendChild(lapElement);
  });
}

// Función para limpiar vueltas
function clearLaps() {
  laps = [];
  renderLaps();
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
clearLapsBtn.addEventListener('click', clearLaps);

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case ' ':
      e.preventDefault();
      if (isRunning) {
        pauseStopwatch();
      } else {
        startStopwatch();
      }
      break;
    case 'r':
    case 'R':
      resetStopwatch();
      break;
    case 'l':
    case 'L':
      addLap();
      break;
    case 'c':
    case 'C':
      clearLaps();
      break;
  }
});

// Doble click en el display para agregar vuelta
const timeDisplay = document.querySelector('.time-display');
let clickCount = 0;
let clickTimer = null;

timeDisplay.addEventListener('click', () => {
  clickCount++;
  
  if (clickCount === 1) {
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 300);
  } else {
    clearTimeout(clickTimer);
    clickCount = 0;
    addLap();
  }
});

// Inicializar display
updateDisplay();
renderLaps(); 