// Lógica de la calculadora
class Calculator {
  constructor() {
    this.previousOperand = '';
    this.currentOperand = '0';
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  delete() {
    if (this.currentOperand === '0') return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') this.currentOperand = '0';
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.shouldResetScreen) {
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number;
    } else {
      this.currentOperand = this.currentOperand.toString() + number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '0') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '−':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        if (current === 0) {
          alert('No se puede dividir por cero');
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.shouldResetScreen = true;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('es-ES', {
        maximumFractionDigits: 0
      });
    }
    
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    document.getElementById('current-operand').textContent = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      document.getElementById('previous-operand').textContent = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      document.getElementById('previous-operand').textContent = '';
    }
  }
}

// Inicializar calculadora
const calculator = new Calculator();

// Event listeners para botones
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    // Efecto de click
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 100);

    if (button.classList.contains('number')) {
      calculator.appendNumber(button.dataset.number);
      calculator.updateDisplay();
    } else if (button.classList.contains('operator')) {
      if (button.dataset.action === 'delete') {
        calculator.delete();
      } else {
        calculator.chooseOperation(button.textContent);
      }
      calculator.updateDisplay();
    } else if (button.classList.contains('equals')) {
      calculator.compute();
      calculator.updateDisplay();
    } else if (button.classList.contains('clear')) {
      calculator.clear();
      calculator.updateDisplay();
    }
  });
});

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9' || e.key === '.') {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  } else if (e.key === '+' || e.key === '-') {
    calculator.chooseOperation(e.key === '+' ? '+' : '−');
    calculator.updateDisplay();
  } else if (e.key === '*') {
    calculator.chooseOperation('×');
    calculator.updateDisplay();
  } else if (e.key === '/') {
    e.preventDefault();
    calculator.chooseOperation('÷');
    calculator.updateDisplay();
  } else if (e.key === 'Enter' || e.key === '=') {
    calculator.compute();
    calculator.updateDisplay();
  } else if (e.key === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  } else if (e.key === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  }
}); 