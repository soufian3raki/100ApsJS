// Lógica del contador
let value = 0;
const valueEl = document.getElementById('value');

// Función para actualizar el display
function updateDisplay() {
  valueEl.textContent = value;
  // Cambiar color basado en el valor
  if (value > 0) {
    valueEl.style.color = '#10b981'; // Verde para positivos
  } else if (value < 0) {
    valueEl.style.color = '#ef4444'; // Rojo para negativos
  } else {
    valueEl.style.color = 'var(--text)'; // Color normal para cero
  }
}

// Event listeners para los botones
document.getElementById('increment').addEventListener('click', () => {
  value++;
  updateDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
  value--;
  updateDisplay();
});

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === '+') {
    value++;
    updateDisplay();
  } else if (e.key === 'ArrowDown' || e.key === '-') {
    value--;
    updateDisplay();
  } else if (e.key === 'r' || e.key === 'R') {
    value = 0;
    updateDisplay();
  }
});

// Inicializar display
updateDisplay(); 