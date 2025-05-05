// Elementos del DOM
const timerTime = document.getElementById('timer-time');
const timerPhase = document.getElementById('timer-phase');
const timerProgress = document.getElementById('timer-progress');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const skipBtn = document.getElementById('skip-btn');
const toggleSettingsBtn = document.getElementById('toggle-settings');
const settingsContent = document.getElementById('settings-content');

// Configuración
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const longBreakTimeInput = document.getElementById('long-break-time');
const pomodorosBeforeLongBreakInput = document.getElementById('pomodoros-before-long-break');
const autoStartBreaksCheckbox = document.getElementById('auto-start-breaks');
const autoStartPomodorosCheckbox = document.getElementById('auto-start-pomodoros');

// Estadísticas
const completedPomodorosEl = document.getElementById('completed-pomodoros');
const totalWorkTimeEl = document.getElementById('total-work-time');
const currentStreakEl = document.getElementById('current-streak');

// Estado del timer
let timer = null;
let isRunning = false;
let currentPhase = 'work'; // 'work', 'break', 'longBreak'
let timeLeft = 25 * 60; // 25 minutos en segundos
let totalTime = 25 * 60;
let completedPomodoros = 0;
let currentStreak = 0;

// Cargar configuración guardada
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {};
  
  workTimeInput.value = settings.workTime || 25;
  breakTimeInput.value = settings.breakTime || 5;
  longBreakTimeInput.value = settings.longBreakTime || 15;
  pomodorosBeforeLongBreakInput.value = settings.pomodorosBeforeLongBreak || 4;
  autoStartBreaksCheckbox.checked = settings.autoStartBreaks !== false;
  autoStartPomodorosCheckbox.checked = settings.autoStartPomodoros !== false;
  
  // Cargar estadísticas
  const stats = JSON.parse(localStorage.getItem('pomodoroStats')) || {};
  completedPomodoros = stats.completedPomodoros || 0;
  currentStreak = stats.currentStreak || 0;
  
  updateStats();
  resetTimer();
}

// Guardar configuración
function saveSettings() {
  const settings = {
    workTime: parseInt(workTimeInput.value),
    breakTime: parseInt(breakTimeInput.value),
    longBreakTime: parseInt(longBreakTimeInput.value),
    pomodorosBeforeLongBreak: parseInt(pomodorosBeforeLongBreakInput.value),
    autoStartBreaks: autoStartBreaksCheckbox.checked,
    autoStartPomodoros: autoStartPomodorosCheckbox.checked
  };
  
  localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
}

// Guardar estadísticas
function saveStats() {
  const stats = {
    completedPomodoros,
    currentStreak,
    totalWorkTime: completedPomodoros * parseInt(workTimeInput.value)
  };
  
  localStorage.setItem('pomodoroStats', JSON.stringify(stats));
}

// Función para formatear tiempo
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Función para actualizar display
function updateDisplay() {
  timerTime.textContent = formatTime(timeLeft);
  
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  timerProgress.style.strokeDashoffset = 440 - (440 * progress) / 100;
  
  // Cambiar color según la fase
  const colors = {
    work: '#ef4444',
    break: '#22c55e',
    longBreak: '#3b82f6'
  };
  
  timerProgress.style.stroke = colors[currentPhase];
}

// Función para actualizar fase
function updatePhase() {
  const phases = {
    work: 'Trabajo',
    break: 'Descanso',
    longBreak: 'Descanso Largo'
  };
  
  timerPhase.textContent = phases[currentPhase];
  
  // Cambiar color del círculo
  const colors = {
    work: '#ef4444',
    break: '#22c55e',
    longBreak: '#3b82f6'
  };
  
  document.documentElement.style.setProperty('--timer-color', colors[currentPhase]);
}

// Función para obtener tiempo de la fase actual
function getPhaseTime() {
  switch (currentPhase) {
    case 'work':
      return parseInt(workTimeInput.value) * 60;
    case 'break':
      return parseInt(breakTimeInput.value) * 60;
    case 'longBreak':
      return parseInt(longBreakTimeInput.value) * 60;
    default:
      return 25 * 60;
  }
}

// Función para cambiar a la siguiente fase
function nextPhase() {
  if (currentPhase === 'work') {
    completedPomodoros++;
    currentStreak++;
    
    // Verificar si es momento para descanso largo
    if (completedPomodoros % parseInt(pomodorosBeforeLongBreakInput.value) === 0) {
      currentPhase = 'longBreak';
    } else {
      currentPhase = 'break';
    }
    
    saveStats();
    updateStats();
    
    // Notificación de pomodoro completado
    showNotification('¡Pomodoro completado! 🎉');
    
    // Auto-iniciar descanso si está habilitado
    if (autoStartBreaksCheckbox.checked) {
      setTimeout(() => {
        startTimer();
      }, 1000);
    }
  } else {
    currentPhase = 'work';
    
    // Auto-iniciar pomodoro si está habilitado
    if (autoStartPomodorosCheckbox.checked) {
      setTimeout(() => {
        startTimer();
      }, 1000);
    }
  }
  
  resetTimer();
  updatePhase();
}

// Función para iniciar timer
function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  startBtn.classList.add('disabled');
  pauseBtn.classList.remove('disabled');
  
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      
      // Notificación de tiempo completado
      if (currentPhase === 'work') {
        showNotification('¡Tiempo de trabajo completado! 🎯');
      } else {
        showNotification('¡Descanso completado! ⏰');
      }
      
      nextPhase();
      updateControls();
    }
  }, 1000);
}

// Función para pausar timer
function pauseTimer() {
  if (!isRunning) return;
  
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  startBtn.classList.remove('disabled');
  pauseBtn.classList.add('disabled');
}

// Función para reiniciar timer
function resetTimer() {
  pauseTimer();
  timeLeft = getPhaseTime();
  totalTime = timeLeft;
  updateDisplay();
  updateControls();
}

// Función para saltar fase
function skipPhase() {
  pauseTimer();
  nextPhase();
  updateControls();
}

// Función para actualizar controles
function updateControls() {
  startBtn.disabled = isRunning;
  pauseBtn.disabled = !isRunning;
  startBtn.classList.toggle('disabled', isRunning);
  pauseBtn.classList.toggle('disabled', !isRunning);
}

// Función para actualizar estadísticas
function updateStats() {
  completedPomodorosEl.textContent = completedPomodoros;
  totalWorkTimeEl.textContent = completedPomodoros * parseInt(workTimeInput.value);
  currentStreakEl.textContent = currentStreak;
}

// Función para mostrar notificaciones
function showNotification(message) {
  // Verificar si el navegador soporta notificaciones
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Pomodoro Timer', { body: message });
  }
  
  // También mostrar notificación en pantalla
  const notification = document.createElement('div');
  notification.className = 'notification';
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
  }, 3000);
}

// Función para solicitar permisos de notificación
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
skipBtn.addEventListener('click', skipPhase);

toggleSettingsBtn.addEventListener('click', () => {
  const isOpen = settingsContent.style.display !== 'none';
  settingsContent.style.display = isOpen ? 'none' : 'block';
  toggleSettingsBtn.textContent = isOpen ? '▼' : '▲';
});

// Event listeners para configuración
[workTimeInput, breakTimeInput, longBreakTimeInput, pomodorosBeforeLongBreakInput].forEach(input => {
  input.addEventListener('change', () => {
    saveSettings();
    if (!isRunning) {
      resetTimer();
    }
  });
});

[autoStartBreaksCheckbox, autoStartPomodorosCheckbox].forEach(checkbox => {
  checkbox.addEventListener('change', saveSettings);
});

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case ' ':
      e.preventDefault();
      if (isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
      break;
    case 'r':
    case 'R':
      resetTimer();
      break;
    case 's':
    case 'S':
      skipPhase();
      break;
  }
});

// Inicializar
loadSettings();
requestNotificationPermission(); 