// Password Generator App
let savedPasswords = [];
let stats = {
  totalGenerated: 0,
  avgStrength: 0,
  strongestPassword: ''
};

// Elements
const generatedPasswordEl = document.getElementById('generatedPassword');
const copyBtn = document.getElementById('copyBtn');
const strengthFillEl = document.getElementById('strengthFill');
const strengthTextEl = document.getElementById('strengthText');
const passwordLengthEl = document.getElementById('passwordLength');
const lengthValueEl = document.getElementById('lengthValue');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const excludeSimilarEl = document.getElementById('excludeSimilar');
const generateBtn = document.getElementById('generateBtn');
const generateMultipleBtn = document.getElementById('generateMultipleBtn');
const savedListEl = document.getElementById('savedList');
const clearSavedBtn = document.getElementById('clearSavedBtn');
const totalGeneratedEl = document.getElementById('totalGenerated');
const avgStrengthEl = document.getElementById('avgStrength');
const strongestPasswordEl = document.getElementById('strongestPassword');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSavedPasswords();
  loadStats();
  updateStats();
  
  // Event listeners
  generateBtn.addEventListener('click', generatePassword);
  generateMultipleBtn.addEventListener('click', generateMultiplePasswords);
  copyBtn.addEventListener('click', copyPassword);
  clearSavedBtn.addEventListener('click', clearSavedPasswords);
  passwordLengthEl.addEventListener('input', updateLengthValue);
  
  // Load saved passwords
  updateSavedList();
});

function generatePassword() {
  const length = parseInt(passwordLengthEl.value);
  const useUppercase = uppercaseEl.checked;
  const useLowercase = lowercaseEl.checked;
  const useNumbers = numbersEl.checked;
  const useSymbols = symbolsEl.checked;
  const excludeSimilar = excludeSimilarEl.checked;
  
  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
    alert('Please select at least one character type');
    return;
  }
  
  let charset = '';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumbers) charset += '0123456789';
  if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (excludeSimilar) {
    charset = charset.replace(/[l1IO0]/g, '');
  }
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  generatedPasswordEl.textContent = password;
  
  // Check strength
  const strength = checkPasswordStrength(password);
  updateStrengthDisplay(strength);
  
  // Update stats
  stats.totalGenerated++;
  updateStats();
  saveStats();
}

function generateMultiplePasswords() {
  const count = 5;
  const passwords = [];
  
  for (let i = 0; i < count; i++) {
    const length = parseInt(passwordLengthEl.value);
    const useUppercase = uppercaseEl.checked;
    const useLowercase = lowercaseEl.checked;
    const useNumbers = numbersEl.checked;
    const useSymbols = symbolsEl.checked;
    const excludeSimilar = excludeSimilarEl.checked;
    
    let charset = '';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (excludeSimilar) {
      charset = charset.replace(/[l1IO0]/g, '');
    }
    
    let password = '';
    for (let j = 0; j < length; j++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    passwords.push(password);
  }
  
  // Display first password and save all
  generatedPasswordEl.textContent = passwords[0];
  const strength = checkPasswordStrength(passwords[0]);
  updateStrengthDisplay(strength);
  
  // Save all passwords
  passwords.forEach(password => {
    if (!savedPasswords.includes(password)) {
      savedPasswords.push(password);
    }
  });
  
  saveSavedPasswords();
  updateSavedList();
  
  // Update stats
  stats.totalGenerated += count;
  updateStats();
  saveStats();
}

function checkPasswordStrength(password) {
  let score = 0;
  
  // Length bonus
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character variety bonus
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Entropy bonus
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.7) score += 1;
  
  if (score <= 2) return 'weak';
  if (score <= 4) return 'fair';
  if (score <= 6) return 'good';
  return 'strong';
}

function updateStrengthDisplay(strength) {
  strengthFillEl.className = `strength-fill ${strength}`;
  
  const strengthLabels = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong'
  };
  
  strengthTextEl.textContent = `Strength: ${strengthLabels[strength]}`;
}

function copyPassword() {
  const password = generatedPasswordEl.textContent;
  if (password && password !== 'Click "Generate" to create a password') {
    navigator.clipboard.writeText(password).then(() => {
      copyBtn.textContent = '✓';
      setTimeout(() => {
        copyBtn.textContent = '📋';
      }, 1000);
    });
  }
}

function updateLengthValue() {
  lengthValueEl.textContent = passwordLengthEl.value;
}

function updateSavedList() {
  savedListEl.innerHTML = '';
  
  savedPasswords.forEach(password => {
    const item = document.createElement('div');
    item.className = 'saved-item';
    item.textContent = password;
    
    item.addEventListener('click', () => {
      generatedPasswordEl.textContent = password;
      const strength = checkPasswordStrength(password);
      updateStrengthDisplay(strength);
    });
    
    savedListEl.appendChild(item);
  });
}

function clearSavedPasswords() {
  savedPasswords = [];
  saveSavedPasswords();
  updateSavedList();
}

function updateStats() {
  totalGeneratedEl.textContent = stats.totalGenerated;
  
  if (stats.totalGenerated > 0) {
    avgStrengthEl.textContent = stats.avgStrength;
    strongestPasswordEl.textContent = stats.strongestPassword || '-';
  }
}

function saveSavedPasswords() {
  localStorage.setItem('password-saved', JSON.stringify(savedPasswords));
}

function loadSavedPasswords() {
  const saved = localStorage.getItem('password-saved');
  if (saved) {
    savedPasswords = JSON.parse(saved);
  }
}

function saveStats() {
  localStorage.setItem('password-stats', JSON.stringify(stats));
}

function loadStats() {
  const saved = localStorage.getItem('password-stats');
  if (saved) {
    stats = JSON.parse(saved);
  }
} 