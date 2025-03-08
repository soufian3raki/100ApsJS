// Elementos del DOM
const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const generateMultipleBtn = document.getElementById('generate-multiple-btn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const strengthFill = document.getElementById('strength-fill');
const strengthText = document.getElementById('strength-text');
const historyList = document.getElementById('history-list');

// Caracteres disponibles
const characters = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Historial de contraseñas
let passwordHistory = [];

// Función para generar contraseña
function generatePassword() {
  let chars = '';
  let password = '';
  
  // Construir conjunto de caracteres basado en opciones
  if (uppercaseCheckbox.checked) chars += characters.uppercase;
  if (lowercaseCheckbox.checked) chars += characters.lowercase;
  if (numbersCheckbox.checked) chars += characters.numbers;
  if (symbolsCheckbox.checked) chars += characters.symbols;
  
  // Verificar que al menos una opción esté seleccionada
  if (chars === '') {
    showNotification('Selecciona al menos una opción', 'error');
    return '';
  }
  
  const length = parseInt(lengthSlider.value);
  
  // Generar contraseña
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  
  return password;
}

// Función para evaluar la fuerza de la contraseña
function evaluateStrength(password) {
  let score = 0;
  
  // Longitud
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Complejidad
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Variedad de caracteres
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.7) score += 1;
  
  return Math.min(score, 5);
}

// Función para actualizar indicador de fuerza
function updateStrengthIndicator(password) {
  const strength = evaluateStrength(password);
  const strengthPercent = (strength / 5) * 100;
  
  strengthFill.style.width = strengthPercent + '%';
  
  let strengthLabel = '';
  let strengthColor = '';
  
  if (strength <= 1) {
    strengthLabel = 'Muy Débil';
    strengthColor = '#ef4444';
  } else if (strength <= 2) {
    strengthLabel = 'Débil';
    strengthColor = '#f97316';
  } else if (strength <= 3) {
    strengthLabel = 'Media';
    strengthColor = '#eab308';
  } else if (strength <= 4) {
    strengthLabel = 'Fuerte';
    strengthColor = '#22c55e';
  } else {
    strengthLabel = 'Muy Fuerte';
    strengthColor = '#10b981';
  }
  
  strengthFill.style.backgroundColor = strengthColor;
  strengthText.textContent = `Fuerza: ${strengthLabel}`;
  strengthText.style.color = strengthColor;
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Contraseña copiada al portapapeles');
    }).catch(() => {
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

// Fallback para copiar al portapapeles
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showNotification('Contraseña copiada al portapapeles');
  } catch (err) {
    showNotification('Error al copiar la contraseña', 'error');
  }
  document.body.removeChild(textArea);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
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
  }, 2000);
}

// Función para agregar al historial
function addToHistory(password) {
  if (password && !passwordHistory.includes(password)) {
    passwordHistory.unshift(password);
    if (passwordHistory.length > 10) {
      passwordHistory.pop();
    }
    renderHistory();
  }
}

// Función para renderizar historial
function renderHistory() {
  historyList.innerHTML = '';
  
  if (passwordHistory.length === 0) {
    historyList.innerHTML = '<div class="no-history">No hay contraseñas en el historial</div>';
    return;
  }
  
  passwordHistory.forEach((password, index) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const strength = evaluateStrength(password);
    const strengthColor = strength <= 2 ? '#ef4444' : strength <= 3 ? '#eab308' : '#22c55e';
    
    historyItem.innerHTML = `
      <div class="history-password">${password}</div>
      <div class="history-info">
        <span class="history-length">${password.length} chars</span>
        <span class="history-strength" style="color: ${strengthColor}">●</span>
      </div>
      <button class="history-copy" title="Copiar">📋</button>
    `;
    
    const copyBtn = historyItem.querySelector('.history-copy');
    copyBtn.addEventListener('click', () => {
      copyToClipboard(password);
    });
    
    historyList.appendChild(historyItem);
  });
}

// Función para generar múltiples contraseñas
function generateMultiplePasswords() {
  const passwords = [];
  for (let i = 0; i < 5; i++) {
    const password = generatePassword();
    if (password) {
      passwords.push(password);
      addToHistory(password);
    }
  }
  
  if (passwords.length > 0) {
    passwordOutput.value = passwords[0];
    updateStrengthIndicator(passwords[0]);
    showNotification(`Generadas ${passwords.length} contraseñas`);
  }
}

// Event listeners
generateBtn.addEventListener('click', () => {
  const password = generatePassword();
  if (password) {
    passwordOutput.value = password;
    updateStrengthIndicator(password);
    addToHistory(password);
    showNotification('Contraseña generada');
  }
});

generateMultipleBtn.addEventListener('click', generateMultiplePasswords);

copyBtn.addEventListener('click', () => {
  const password = passwordOutput.value;
  if (password) {
    copyToClipboard(password);
  } else {
    showNotification('Genera una contraseña primero', 'error');
  }
});

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
  const password = passwordOutput.value;
  if (password) {
    updateStrengthIndicator(password);
  }
});

// Actualizar fuerza cuando cambien las opciones
[uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const password = passwordOutput.value;
    if (password) {
      updateStrengthIndicator(password);
    }
  });
});

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    generatePassword();
  } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const password = passwordOutput.value;
    if (password) {
      copyToClipboard(password);
    }
  }
});

// Inicializar
renderHistory(); 