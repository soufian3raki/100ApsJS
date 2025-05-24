// Elementos del DOM
const digitalTime = document.getElementById('digital-time');
const dateDisplay = document.getElementById('date-display');
const timezoneDisplay = document.getElementById('timezone-display');
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

// Controles
const timeFormatRadios = document.querySelectorAll('input[name="time-format"]');
const timezoneSelect = document.getElementById('timezone-select');
const clockSizeSlider = document.getElementById('clock-size');
const clockSizeValue = document.getElementById('clock-size-value');
const clockColorInput = document.getElementById('clock-color');
const showSecondsCheckbox = document.getElementById('show-seconds');
const smoothAnimationCheckbox = document.getElementById('smooth-animation');

// Información de fecha
const weekdayEl = document.getElementById('weekday');
const dayOfYearEl = document.getElementById('day-of-year');
const weekOfYearEl = document.getElementById('week-of-year');
const unixTimeEl = document.getElementById('unix-time');

// Cronómetro
const stopwatchTimeEl = document.getElementById('stopwatch-time');
const startStopwatchBtn = document.getElementById('start-stopwatch');
const resetStopwatchBtn = document.getElementById('reset-stopwatch');

// Estado
let currentTimezone = 'local';
let timeFormat = '12';
let stopwatchRunning = false;
let stopwatchInterval = null;
let stopwatchSeconds = 0;

// Configuración guardada
const savedSettings = JSON.parse(localStorage.getItem('clockSettings')) || {};

// Función para formatear tiempo
function formatTime(hours, minutes, seconds, format = '12') {
  let displayHours = hours;
  let period = '';
  
  if (format === '12') {
    period = hours >= 12 ? ' PM' : ' AM';
    displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;
  }
  
  return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${period}`;
}

// Función para formatear fecha
function formatDate(date) {
  const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${weekday}, ${day} de ${month} de ${year}`;
}

// Función para obtener día del año
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Función para obtener semana del año
function getWeekOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - start) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
}

// Función para actualizar reloj digital
function updateDigitalClock() {
  let date;
  
  if (currentTimezone === 'local') {
    date = new Date();
  } else if (currentTimezone === 'UTC') {
    date = new Date();
  } else {
    // Para otras zonas horarias, usar Intl.DateTimeFormat
    const now = new Date();
    const options = { timeZone: currentTimezone };
    const localTime = new Intl.DateTimeFormat('en-US', options).format(now);
    date = new Date(localTime);
  }
  
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Actualizar tiempo digital
  digitalTime.textContent = formatTime(hours, minutes, seconds, timeFormat);
  
  // Actualizar fecha
  dateDisplay.textContent = formatDate(date);
  
  // Actualizar zona horaria
  if (currentTimezone === 'local') {
    timezoneDisplay.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } else if (currentTimezone === 'UTC') {
    timezoneDisplay.textContent = 'UTC';
  } else {
    timezoneDisplay.textContent = currentTimezone.split('/').pop();
  }
  
  // Actualizar información de fecha
  weekdayEl.textContent = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][date.getDay()];
  dayOfYearEl.textContent = getDayOfYear(date);
  weekOfYearEl.textContent = getWeekOfYear(date);
  unixTimeEl.textContent = Math.floor(date.getTime() / 1000);
  
  // Actualizar reloj analógico
  updateAnalogClock(hours, minutes, seconds);
}

// Función para actualizar reloj analógico
function updateAnalogClock(hours, minutes, seconds) {
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;
  
  const transition = smoothAnimationCheckbox.checked ? 'transform 0.3s ease' : 'none';
  
  hourHand.style.transition = transition;
  minuteHand.style.transition = transition;
  secondHand.style.transition = transition;
  
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
  
  if (showSecondsCheckbox.checked) {
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    secondHand.style.display = 'block';
  } else {
    secondHand.style.display = 'none';
  }
}

// Función para actualizar tamaño del reloj
function updateClockSize() {
  const size = clockSizeSlider.value;
  const clockFace = document.querySelector('.clock-face');
  
  clockFace.style.width = size + 'px';
  clockFace.style.height = size + 'px';
  
  // Ajustar posición de las manecillas
  const hands = document.querySelectorAll('.hand');
  hands.forEach(hand => {
    hand.style.width = size * 0.02 + 'px';
  });
  
  hourHand.style.height = size * 0.25 + 'px';
  minuteHand.style.height = size * 0.35 + 'px';
  secondHand.style.height = size * 0.4 + 'px';
  
  clockSizeValue.textContent = size + 'px';
}

// Función para actualizar color del reloj
function updateClockColor() {
  const color = clockColorInput.value;
  const hands = document.querySelectorAll('.hand');
  const markers = document.querySelectorAll('.marker');
  
  hands.forEach(hand => {
    hand.style.backgroundColor = color;
  });
  
  markers.forEach(marker => {
    marker.style.backgroundColor = color;
  });
  
  document.documentElement.style.setProperty('--clock-color', color);
}

// Función para formatear tiempo del cronómetro
function formatStopwatchTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Función para iniciar/pausar cronómetro
function toggleStopwatch() {
  if (stopwatchRunning) {
    // Pausar
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    startStopwatchBtn.textContent = '▶️ Iniciar';
  } else {
    // Iniciar
    stopwatchInterval = setInterval(() => {
      stopwatchSeconds++;
      stopwatchTimeEl.textContent = formatStopwatchTime(stopwatchSeconds);
    }, 1000);
    stopwatchRunning = true;
    startStopwatchBtn.textContent = '⏸️ Pausar';
  }
}

// Función para reiniciar cronómetro
function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchSeconds = 0;
  stopwatchTimeEl.textContent = formatStopwatchTime(0);
  startStopwatchBtn.textContent = '▶️ Iniciar';
}

// Función para guardar configuración
function saveSettings() {
  const settings = {
    timeFormat,
    timezone: currentTimezone,
    clockSize: clockSizeSlider.value,
    clockColor: clockColorInput.value,
    showSeconds: showSecondsCheckbox.checked,
    smoothAnimation: smoothAnimationCheckbox.checked
  };
  
  localStorage.setItem('clockSettings', JSON.stringify(settings));
}

// Función para cargar configuración
function loadSettings() {
  if (savedSettings.timeFormat) {
    timeFormat = savedSettings.timeFormat;
    document.querySelector(`input[value="${timeFormat}"]`).checked = true;
  }
  
  if (savedSettings.timezone) {
    currentTimezone = savedSettings.timezone;
    timezoneSelect.value = currentTimezone;
  }
  
  if (savedSettings.clockSize) {
    clockSizeSlider.value = savedSettings.clockSize;
    updateClockSize();
  }
  
  if (savedSettings.clockColor) {
    clockColorInput.value = savedSettings.clockColor;
    updateClockColor();
  }
  
  if (savedSettings.showSeconds !== undefined) {
    showSecondsCheckbox.checked = savedSettings.showSeconds;
  }
  
  if (savedSettings.smoothAnimation !== undefined) {
    smoothAnimationCheckbox.checked = savedSettings.smoothAnimation;
  }
}

// Event listeners
timeFormatRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    timeFormat = e.target.value;
    saveSettings();
  });
});

timezoneSelect.addEventListener('change', (e) => {
  currentTimezone = e.target.value;
  saveSettings();
});

clockSizeSlider.addEventListener('input', () => {
  updateClockSize();
  saveSettings();
});

clockColorInput.addEventListener('change', () => {
  updateClockColor();
  saveSettings();
});

showSecondsCheckbox.addEventListener('change', () => {
  saveSettings();
});

smoothAnimationCheckbox.addEventListener('change', () => {
  saveSettings();
});

startStopwatchBtn.addEventListener('click', toggleStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case ' ':
      e.preventDefault();
      toggleStopwatch();
      break;
    case 'r':
    case 'R':
      resetStopwatch();
      break;
  }
});

// Inicializar
loadSettings();
updateClockSize();
updateClockColor();

// Actualizar reloj cada segundo
setInterval(updateDigitalClock, 1000);
updateDigitalClock(); // Actualización inicial 