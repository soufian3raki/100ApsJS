// Elementos del DOM
const digitalClock = document.getElementById('digital-clock');
const analogClock = document.getElementById('analog-clock');
const timeDisplay = digitalClock.querySelector('.time');
const dateDisplay = digitalClock.querySelector('.date');
const modeToggle = document.getElementById('mode-toggle');
const formatToggle = document.getElementById('format-toggle');

// Variables de estado
let is24HourFormat = true;
let isDigitalMode = true;

// Días de la semana en español
const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Función para actualizar el reloj
function updateClock() {
    const now = new Date();
    
    // Actualizar reloj digital
    if (isDigitalMode) {
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Formato 12/24 horas
        let timeString;
        if (is24HourFormat) {
            timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
        } else {
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            timeString = `${hours}:${minutes}:${seconds} ${period}`;
        }
        
        timeDisplay.textContent = timeString;
    } else {
        // Actualizar reloj analógico
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondDegrees = (seconds / 60) * 360 + 90;
        const minuteDegrees = ((minutes + seconds/60) / 60) * 360 + 90;
        const hourDegrees = ((hours + minutes/60) / 12) * 360 + 90;

        document.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
        document.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
        document.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
    }
    
    // Actualizar fecha
    const weekday = weekdays[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    dateDisplay.textContent = `${weekday}, ${day} de ${month}`;
}

// Event Listeners
modeToggle.addEventListener('click', () => {
    isDigitalMode = !isDigitalMode;
    digitalClock.style.display = isDigitalMode ? 'block' : 'none';
    analogClock.style.display = isDigitalMode ? 'none' : 'block';
    modeToggle.textContent = isDigitalMode ? 'Modo Analógico' : 'Modo Digital';
});

formatToggle.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    formatToggle.textContent = is24HourFormat ? '24h' : '12h';
    updateClock();
});

// Iniciar el reloj
setInterval(updateClock, 1000);
updateClock();