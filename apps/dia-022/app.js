// Pomodoro Timer App
let timer = null;
let timeLeft = 25 * 60; // 25 minutes in seconds
let totalTime = 25 * 60;
let isRunning = false;
let currentMode = 'work'; // work, break, longBreak
let pomodoroCount = 0;
let stats = {
  completedPomodoros: 0,
  totalWorkTime: 0,
  totalBreakTime: 0
};
let history = [];

// Elements
const timeLeftEl = document.getElementById('timeLeft');
const timerLabelEl = document.getElementById('timerLabel');
const timerProgressEl = document.getElementById('timerProgress');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workTimeEl = document.getElementById('workTime');
const breakTimeEl = document.getElementById('breakTime');
const longBreakTimeEl = document.getElementById('longBreakTime');
const completedPomodorosEl = document.getElementById('completedPomodoros');
const totalWorkTimeEl = document.getElementById('totalWorkTime');
const totalBreakTimeEl = document.getElementById('totalBreakTime');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadHistory();
  updateDisplay();
  updateStats();
  
  // Event listeners
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);
  clearHistoryBtn.addEventListener('click', clearHistory);
  
  // Settings change listeners
  workTimeEl.addEventListener('change', updateSettings);
  breakTimeEl.addEventListener('change', updateSettings);
  longBreakTimeEl.addEventListener('change', updateSettings);
});

function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      isRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      
      // Play notification sound
      playNotification();
      
      // Switch to next mode
      switchMode();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  
  clearInterval(timer);
  timer = null;
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  
  // Reset to work mode
  currentMode = 'work';
  timeLeft = parseInt(workTimeEl.value) * 60;
  totalTime = timeLeft;
  
  updateDisplay();
}

function switchMode() {
  if (currentMode === 'work') {
    pomodoroCount++;
    stats.completedPomodoros++;
    stats.totalWorkTime += parseInt(workTimeEl.value);
    
    // Add to history
    addToHistory('Trabajo', parseInt(workTimeEl.value));
    
    if (pomodoroCount % 4 === 0) {
      // Long break
      currentMode = 'longBreak';
      timeLeft = parseInt(longBreakTimeEl.value) * 60;
      timerLabelEl.textContent = 'Descanso Largo';
      stats.totalBreakTime += parseInt(longBreakTimeEl.value);
    } else {
      // Short break
      currentMode = 'break';
      timeLeft = parseInt(breakTimeEl.value) * 60;
      timerLabelEl.textContent = 'Descanso';
      stats.totalBreakTime += parseInt(breakTimeEl.value);
    }
  } else {
    // Back to work
    currentMode = 'work';
    timeLeft = parseInt(workTimeEl.value) * 60;
    timerLabelEl.textContent = 'Trabajo';
  }
  
  totalTime = timeLeft;
  saveStats();
  updateStats();
  updateDisplay();
  
  // Auto-start next session
  setTimeout(() => {
    if (!isRunning) {
      startTimer();
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeLeftEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Update progress circle
  const progress = ((totalTime - timeLeft) / totalTime) * 360;
  timerProgressEl.style.background = `conic-gradient(var(--accent) ${progress}deg, transparent ${progress}deg)`;
}

function updateSettings() {
  if (!isRunning) {
    if (currentMode === 'work') {
      timeLeft = parseInt(workTimeEl.value) * 60;
      totalTime = timeLeft;
    } else if (currentMode === 'break') {
      timeLeft = parseInt(breakTimeEl.value) * 60;
      totalTime = timeLeft;
    } else if (currentMode === 'longBreak') {
      timeLeft = parseInt(longBreakTimeEl.value) * 60;
      totalTime = timeLeft;
    }
    updateDisplay();
  }
}

function playNotification() {
  // Create audio context for notification sound
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

function addToHistory(type, duration) {
  const historyItem = {
    type,
    duration,
    timestamp: new Date().toLocaleString()
  };
  
  history.unshift(historyItem);
  if (history.length > 20) {
    history.pop();
  }
  
  saveHistory();
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = '';
  
  history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <div class="session-type">${item.type}</div>
      <div class="session-duration">${item.duration} min • ${item.timestamp}</div>
    `;
    historyList.appendChild(historyItem);
  });
}

function clearHistory() {
  history = [];
  saveHistory();
  updateHistory();
}

function updateStats() {
  completedPomodorosEl.textContent = stats.completedPomodoros;
  totalWorkTimeEl.textContent = stats.totalWorkTime;
  totalBreakTimeEl.textContent = stats.totalBreakTime;
}

function saveStats() {
  localStorage.setItem('pomodoro-stats', JSON.stringify(stats));
}

function loadStats() {
  const saved = localStorage.getItem('pomodoro-stats');
  if (saved) {
    stats = JSON.parse(saved);
  }
}

function saveHistory() {
  localStorage.setItem('pomodoro-history', JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem('pomodoro-history');
  if (saved) {
    history = JSON.parse(saved);
  }
} 