// Sorteo Aleatorio
let names = [];
let history = [];

// Elementos del DOM
const namesInput = document.getElementById("names-input");
const addSampleBtn = document.getElementById("add-sample");
const clearAllBtn = document.getElementById("clear-all");
const pickRandomBtn = document.getElementById("pick-random");
const resultDisplay = document.getElementById("result-display");
const historyList = document.getElementById("history-list");

// Nombres de ejemplo
const sampleNames = [
  "Ana García",
  "Carlos López",
  "María Rodríguez",
  "José Martínez",
  "Laura Sánchez",
  "David Fernández",
  "Carmen González",
  "Antonio Pérez",
  "Isabel Ruiz",
  "Miguel Díaz"
];

// Función para actualizar la lista de nombres
function updateNamesList() {
  const inputText = namesInput.value.trim();
  names = inputText.split("\n")
    .map(name => name.trim())
    .filter(name => name.length > 0);
}

// Función para agregar nombres de ejemplo
function addSampleNames() {
  namesInput.value = sampleNames.join("\n");
  updateNamesList();
}

// Función para limpiar todo
function clearAll() {
  namesInput.value = "";
  names = [];
  history = [];
  updateHistory();
  resultDisplay.innerHTML = "<div class=\"result-text\">Haz clic en \"Sortear\" para comenzar</div>";
}

// Función para sortear un nombre aleatorio
function pickRandom() {
  updateNamesList();
  
  if (names.length === 0) {
    resultDisplay.innerHTML = "<div class=\"result-text\">Agrega nombres para sortear</div>";
    return;
  }
  
  if (names.length === 1) {
    resultDisplay.innerHTML = "<div class=\"result-winner\">" + names[0] + "</div>";
    addToHistory(names[0]);
    return;
  }
  
  // Animación de sorteo
  resultDisplay.classList.add("picking");
  resultDisplay.innerHTML = "<div class=\"result-text\">Sorteando...</div>";
  
  let count = 0;
  const maxCount = 20;
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    resultDisplay.innerHTML = "<div class=\"result-text\">" + names[randomIndex] + "</div>";
    count++;
    
    if (count >= maxCount) {
      clearInterval(interval);
      const finalIndex = Math.floor(Math.random() * names.length);
      const winner = names[finalIndex];
      
      resultDisplay.classList.remove("picking");
      resultDisplay.innerHTML = "<div class=\"result-winner\">" + winner + "</div>";
      
      addToHistory(winner);
    }
  }, 100);
}

// Función para agregar resultado al historial
function addToHistory(winner) {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  
  history.unshift({
    winner: winner,
    time: timeString,
    timestamp: now
  });
  
  // Mantener solo los últimos 20 sorteos
  if (history.length > 20) {
    history = history.slice(0, 20);
  }
  
  updateHistory();
}

// Función para actualizar el historial
function updateHistory() {
  if (history.length === 0) {
    historyList.innerHTML = "<p class=\"no-history\">Aún no hay sorteos</p>";
    return;
  }
  
  historyList.innerHTML = history.map(item => {
    return "<div class=\"history-item\">" +
           "<span class=\"history-winner\">" + item.winner + "</span>" +
           "<span class=\"history-time\">" + item.time + "</span>" +
           "</div>";
  }).join("");
}

// Event Listeners
addSampleBtn.addEventListener("click", addSampleNames);
clearAllBtn.addEventListener("click", clearAll);
pickRandomBtn.addEventListener("click", pickRandom);

// Soporte para teclado
document.addEventListener("keydown", (e) => {
  if (e.key === " " && e.target !== namesInput) {
    e.preventDefault();
    pickRandom();
  } else if (e.key === "c" && e.ctrlKey) {
    e.preventDefault();
    clearAll();
  }
});

// Inicializar
updateNamesList();
updateHistory();
