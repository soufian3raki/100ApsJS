// Juego de Dados Aleatorios
let diceCount = 2;
let totalRolls = 0;
let totalSum = 0;
let rollHistory = [];

// Elementos del DOM
const diceContainer = document.getElementById("dice-container");
const diceCountSelect = document.getElementById("dice-count");
const rollBtn = document.getElementById("roll-btn");
const clearBtn = document.getElementById("clear-btn");
const totalEl = document.getElementById("total");
const rollsEl = document.getElementById("rolls");
const averageEl = document.getElementById("average");
const historyList = document.getElementById("history-list");

// Función para generar un número aleatorio del 1 al 6
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

// Función para crear el HTML de un dado
function createDieHTML(value, isRolling = false) {
  const dieClass = isRolling ? "die rolling" : "die";
  return `<div class="${dieClass}">${value}</div>`;
}

// Función para lanzar los dados
function rollDice() {
  const diceValues = [];
  
  // Generar valores para cada dado
  for (let i = 0; i < diceCount; i++) {
    diceValues.push(rollDie());
  }
  
  // Mostrar animación de lanzamiento
  diceContainer.innerHTML = "";
  for (let i = 0; i < diceCount; i++) {
    diceContainer.innerHTML += createDieHTML("?", true);
  }
  
  // Después de la animación, mostrar los valores reales
  setTimeout(() => {
    diceContainer.innerHTML = "";
    for (let i = 0; i < diceCount; i++) {
      diceContainer.innerHTML += createDieHTML(diceValues[i]);
    }
    
    // Actualizar estadísticas
    const sum = diceValues.reduce((a, b) => a + b, 0);
    totalRolls++;
    totalSum += sum;
    
    // Guardar en historial
    rollHistory.unshift({
      dice: diceValues,
      sum: sum,
      timestamp: new Date()
    });
    
    // Mantener solo los últimos 20 lanzamientos
    if (rollHistory.length > 20) {
      rollHistory = rollHistory.slice(0, 20);
    }
    
    updateStats();
    updateHistory();
  }, 600);
}

// Función para actualizar las estadísticas
function updateStats() {
  totalEl.textContent = totalSum;
  rollsEl.textContent = totalRolls;
  averageEl.textContent = totalRolls > 0 ? (totalSum / totalRolls).toFixed(1) : "0";
}

// Función para actualizar el historial
function updateHistory() {
  if (rollHistory.length === 0) {
    historyList.innerHTML = "<p class=\"no-history\">Aún no hay lanzamientos</p>";
    return;
  }
  
  historyList.innerHTML = rollHistory.map(roll => {
    const diceHTML = roll.dice.map(die => `<span class="die-small">${die}</span>`).join("");
    const time = roll.timestamp.toLocaleTimeString();
    return `
      <div class="history-item">
        <div class="history-dice">
          ${diceHTML}
          <span class="history-total">= ${roll.sum}</span>
        </div>
        <div class="history-time">${time}</div>
      </div>
    `;
  }).join("");
}

// Función para limpiar todo
function clearAll() {
  diceContainer.innerHTML = "";
  totalRolls = 0;
  totalSum = 0;
  rollHistory = [];
  updateStats();
  updateHistory();
}

// Función para actualizar el número de dados
function updateDiceCount() {
  diceCount = parseInt(diceCountSelect.value);
  diceContainer.innerHTML = "";
}

// Event Listeners
rollBtn.addEventListener("click", rollDice);
clearBtn.addEventListener("click", clearAll);
diceCountSelect.addEventListener("change", updateDiceCount);

// Soporte para teclado
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    rollDice();
  } else if (e.key === "c" || e.key === "C") {
    clearAll();
  }
});

// Inicializar
updateStats();
updateHistory();
