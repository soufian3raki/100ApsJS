// Reloj Digital/Analógico
let isDigital = true;
let is24Hour = true;
let timezone = "local";

// Elementos del DOM
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const toggleFormatBtn = document.getElementById("toggle-format-btn");
const toggleTimezoneBtn = document.getElementById("toggle-timezone-btn");
const digitalClock = document.getElementById("digital-clock");
const analogClock = document.getElementById("analog-clock");
const timeDisplay = document.getElementById("time");
const dateDisplay = document.getElementById("date");
const analogTimeDisplay = document.getElementById("analog-time");
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");
const worldClocks = document.getElementById("world-clocks");

// Zonas horarias
const timezones = [
  { name: "Local", offset: 0 },
  { name: "UTC", offset: 0 },
  { name: "Nueva York", offset: -5 },
  { name: "Londres", offset: 0 },
  { name: "París", offset: 1 },
  { name: "Tokio", offset: 9 },
  { name: "Sídney", offset: 10 },
  { name: "Los Ángeles", offset: -8 }
];

let currentTimezoneIndex = 0;

// Función para obtener la hora actual
function getCurrentTime() {
  const now = new Date();
  const offset = timezones[currentTimezoneIndex].offset;
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (offset * 3600000));
  
  return {
    hours: localTime.getHours(),
    minutes: localTime.getMinutes(),
    seconds: localTime.getSeconds(),
    date: localTime
  };
}

// Función para formatear la hora
function formatTime(hours, minutes, seconds) {
  let displayHours = hours;
  
  if (!is24Hour && hours > 12) {
    displayHours = hours - 12;
  } else if (!is24Hour && hours === 0) {
    displayHours = 12;
  }
  
  const timeString = displayHours.toString().padStart(2, "0") + ":" +
                    minutes.toString().padStart(2, "0") + ":" +
                    seconds.toString().padStart(2, "0");
  
  if (!is24Hour) {
    return timeString + (hours >= 12 ? " PM" : " AM");
  }
  
  return timeString;
}

// Función para formatear la fecha
function formatDate(date) {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  
  return dayName + ", " + day + " de " + monthName + " " + year;
}

// Función para actualizar el reloj digital
function updateDigitalClock() {
  const time = getCurrentTime();
  timeDisplay.textContent = formatTime(time.hours, time.minutes, time.seconds);
  dateDisplay.textContent = formatDate(time.date);
}

// Función para actualizar el reloj analógico
function updateAnalogClock() {
  const time = getCurrentTime();
  
  // Calcular ángulos
  const secondAngle = (time.seconds * 6) - 90;
  const minuteAngle = (time.minutes * 6) + (time.seconds * 0.1) - 90;
  const hourAngle = ((time.hours % 12) * 30) + (time.minutes * 0.5) - 90;
  
  // Aplicar rotaciones
  secondHand.style.transform = "rotate(" + secondAngle + "deg)";
  minuteHand.style.transform = "rotate(" + minuteAngle + "deg)";
  hourHand.style.transform = "rotate(" + hourAngle + "deg)";
  
  // Actualizar tiempo digital en el reloj analógico
  analogTimeDisplay.textContent = formatTime(time.hours, time.minutes, time.seconds);
}

// Función para actualizar relojes mundiales
function updateWorldClocks() {
  worldClocks.innerHTML = timezones.map((tz, index) => {
    if (index === currentTimezoneIndex) return "";
    
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const tzTime = new Date(utc + (tz.offset * 3600000));
    
    const hours = tzTime.getHours();
    const minutes = tzTime.getMinutes();
    const seconds = tzTime.getSeconds();
    
    const timeString = hours.toString().padStart(2, "0") + ":" +
                      minutes.toString().padStart(2, "0") + ":" +
                      seconds.toString().padStart(2, "0");
    
    const dateString = tzTime.getDate() + "/" + (tzTime.getMonth() + 1) + "/" + tzTime.getFullYear();
    
    return "<div class=\"world-clock\">" +
           "<div class=\"world-clock-city\">" + tz.name + "</div>" +
           "<div class=\"world-clock-time\">" + timeString + "</div>" +
           "<div class=\"world-clock-date\">" + dateString + "</div>" +
           "</div>";
  }).join("");
}

// Función para alternar entre digital y analógico
function toggleMode() {
  isDigital = !isDigital;
  
  if (isDigital) {
    digitalClock.style.display = "block";
    analogClock.style.display = "none";
    toggleModeBtn.textContent = "Digital";
    toggleModeBtn.classList.add("active");
  } else {
    digitalClock.style.display = "none";
    analogClock.style.display = "block";
    toggleModeBtn.textContent = "Analógico";
    toggleModeBtn.classList.remove("active");
  }
}

// Función para alternar formato 12h/24h
function toggleFormat() {
  is24Hour = !is24Hour;
  
  if (is24Hour) {
    toggleFormatBtn.textContent = "24h";
    toggleFormatBtn.classList.add("active");
  } else {
    toggleFormatBtn.textContent = "12h";
    toggleFormatBtn.classList.remove("active");
  }
}

// Función para cambiar zona horaria
function toggleTimezone() {
  currentTimezoneIndex = (currentTimezoneIndex + 1) % timezones.length;
  toggleTimezoneBtn.textContent = timezones[currentTimezoneIndex].name;
}

// Función principal de actualización
function updateClock() {
  if (isDigital) {
    updateDigitalClock();
  } else {
    updateAnalogClock();
  }
  
  updateWorldClocks();
}

// Event Listeners
toggleModeBtn.addEventListener("click", toggleMode);
toggleFormatBtn.addEventListener("click", toggleFormat);
toggleTimezoneBtn.addEventListener("click", toggleTimezone);

// Soporte para teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "m" || e.key === "M") {
    toggleMode();
  } else if (e.key === "f" || e.key === "F") {
    toggleFormat();
  } else if (e.key === "t" || e.key === "T") {
    toggleTimezone();
  }
});

// Inicializar
updateClock();
setInterval(updateClock, 1000);

// Configurar botones iniciales
toggleModeBtn.classList.add("active");
toggleFormatBtn.classList.add("active");
toggleTimezoneBtn.textContent = timezones[currentTimezoneIndex].name;
