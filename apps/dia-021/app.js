// Scientific Calculator App
let currentExpression = '0';
let currentResult = '0';
let history = [];

// Elements
const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  updateDisplay();
  
  // Event listeners
  document.addEventListener('click', handleButtonClick);
  clearHistoryBtn.addEventListener('click', clearHistory);
});

function handleButtonClick(e) {
  if (!e.target.classList.contains('btn')) return;
  
  const action = e.target.dataset.action;
  const value = e.target.dataset.value;
  
  if (action) {
    handleAction(action);
  } else if (value) {
    handleNumber(value);
  }
}

function handleNumber(num) {
  if (currentExpression === '0' && num !== '.') {
    currentExpression = num;
  } else {
    currentExpression += num;
  }
  updateDisplay();
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      clear();
      break;
    case 'clearEntry':
      clearEntry();
      break;
    case 'backspace':
      backspace();
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      handleOperator(action);
      break;
    case 'equals':
      calculate();
      break;
    case 'sin':
    case 'cos':
    case 'tan':
      handleTrigonometric(action);
      break;
    case 'log':
    case 'ln':
      handleLogarithm(action);
      break;
    case 'sqrt':
      handleSquareRoot();
      break;
    case 'power':
      handlePower();
      break;
    case 'factorial':
      handleFactorial();
      break;
    case 'pi':
      handlePi();
      break;
  }
}

function clear() {
  currentExpression = '0';
  currentResult = '0';
  updateDisplay();
}

function clearEntry() {
  currentExpression = '0';
  updateDisplay();
}

function backspace() {
  if (currentExpression.length === 1) {
    currentExpression = '0';
  } else {
    currentExpression = currentExpression.slice(0, -1);
  }
  updateDisplay();
}

function handleOperator(operator) {
  const operators = {
    'add': '+',
    'subtract': '−',
    'multiply': '×',
    'divide': '÷'
  };
  
  const symbol = operators[operator];
  currentExpression += ` ${symbol} `;
  updateDisplay();
}

function handleTrigonometric(func) {
  const num = parseFloat(currentExpression);
  if (isNaN(num)) return;
  
  let result;
  switch (func) {
    case 'sin':
      result = Math.sin(num);
      break;
    case 'cos':
      result = Math.cos(num);
      break;
    case 'tan':
      result = Math.tan(num);
      break;
  }
  
  currentExpression = result.toString();
  currentResult = result.toString();
  updateDisplay();
  addToHistory(`${func}(${num})`, result);
}

function handleLogarithm(func) {
  const num = parseFloat(currentExpression);
  if (isNaN(num) || num <= 0) return;
  
  let result;
  switch (func) {
    case 'log':
      result = Math.log10(num);
      break;
    case 'ln':
      result = Math.log(num);
      break;
  }
  
  currentExpression = result.toString();
  currentResult = result.toString();
  updateDisplay();
  addToHistory(`${func}(${num})`, result);
}

function handleSquareRoot() {
  const num = parseFloat(currentExpression);
  if (isNaN(num) || num < 0) return;
  
  const result = Math.sqrt(num);
  currentExpression = result.toString();
  currentResult = result.toString();
  updateDisplay();
  addToHistory(`√(${num})`, result);
}

function handlePower() {
  currentExpression += ' ^ ';
  updateDisplay();
}

function handleFactorial() {
  const num = parseInt(currentExpression);
  if (isNaN(num) || num < 0) return;
  
  const result = factorial(num);
  currentExpression = result.toString();
  currentResult = result.toString();
  updateDisplay();
  addToHistory(`${num}!`, result);
}

function handlePi() {
  const pi = Math.PI;
  currentExpression = pi.toString();
  updateDisplay();
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function calculate() {
  try {
    // Replace symbols with JavaScript operators
    let expression = currentExpression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/\^/g, '**');
    
    const result = eval(expression);
    
    if (isFinite(result)) {
      currentResult = result.toString();
      addToHistory(currentExpression, result);
      currentExpression = result.toString();
      updateDisplay();
    } else {
      currentResult = 'Error';
      updateDisplay();
    }
  } catch (error) {
    currentResult = 'Error';
    updateDisplay();
  }
}

function addToHistory(expression, result) {
  const historyItem = {
    expression,
    result,
    timestamp: new Date().toLocaleString()
  };
  
  history.unshift(historyItem);
  if (history.length > 10) {
    history.pop();
  }
  
  saveHistory();
  updateHistory();
}

function updateDisplay() {
  expressionEl.textContent = currentExpression;
  resultEl.textContent = currentResult;
}

function updateHistory() {
  historyList.innerHTML = '';
  
  history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <div class="expression">${item.expression}</div>
      <div class="result">= ${item.result}</div>
    `;
    
    historyItem.addEventListener('click', () => {
      currentExpression = item.result.toString();
      updateDisplay();
    });
    
    historyList.appendChild(historyItem);
  });
}

function clearHistory() {
  history = [];
  saveHistory();
  updateHistory();
}

function saveHistory() {
  localStorage.setItem('calculator-history', JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem('calculator-history');
  if (saved) {
    history = JSON.parse(saved);
    updateHistory();
  }
} 