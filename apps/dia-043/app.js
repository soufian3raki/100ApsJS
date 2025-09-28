// Calculadora Científica - Día 43
class ScientificCalculator {
    constructor() {
        this.expression = "0";
        this.result = "0";
        this.memory = 0;
        this.history = JSON.parse(localStorage.getItem("calcHistory")) || [];
        this.isNewExpression = true;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
        this.loadHistory();
    }

    initializeElements() {
        this.expressionEl = document.getElementById("expression");
        this.resultEl = document.getElementById("result");
        this.memoryDisplayEl = document.getElementById("memoryDisplay");
        this.historyEl = document.getElementById("history");
    }

    setupEventListeners() {
        // Botones de números
        document.querySelectorAll(".btn.number").forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.inputNumber(e.target.dataset.number);
            });
        });

        // Botones de operadores
        document.querySelectorAll(".btn.operator").forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.inputOperator(e.target.dataset.action);
            });
        });

        // Botones de funciones
        document.querySelectorAll(".btn.function").forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.inputFunction(e.target.dataset.action);
            });
        });

        // Botones de memoria
        document.querySelectorAll(".btn.memory").forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.memoryOperation(e.target.dataset.action);
            });
        });

        // Botón de historial
        document.querySelector(".btn.history").addEventListener("click", () => {
            this.clearHistory();
        });

        // Teclado
        document.addEventListener("keydown", (e) => {
            this.handleKeyboard(e);
        });
    }

    inputNumber(number) {
        if (this.isNewExpression) {
            this.expression = number === "." ? "0." : number;
            this.isNewExpression = false;
        } else {
            if (number === "." && this.expression.includes(".")) return;
            this.expression += number;
        }
        this.updateDisplay();
    }

    inputOperator(operator) {
        if (this.isNewExpression) {
            if (operator === "clear") {
                this.clear();
                return;
            }
            if (operator === "backspace") {
                this.backspace();
                return;
            }
            if (operator === "equals") {
                this.calculate();
                return;
            }
        }

        if (operator === "clear") {
            this.clear();
        } else if (operator === "backspace") {
            this.backspace();
        } else if (operator === "equals") {
            this.calculate();
        } else if (operator === "parentheses") {
            this.inputParentheses();
        } else {
            this.expression += this.getOperatorSymbol(operator);
            this.isNewExpression = false;
        }
        this.updateDisplay();
    }

    inputFunction(func) {
        if (this.isNewExpression) {
            this.expression = this.getFunctionExpression(func, "0");
        } else {
            this.expression = this.getFunctionExpression(func, this.expression);
        }
        this.isNewExpression = false;
        this.updateDisplay();
    }

    getFunctionExpression(func, value) {
        switch (func) {
            case "sin": return `Math.sin(${value})`;
            case "cos": return `Math.cos(${value})`;
            case "tan": return `Math.tan(${value})`;
            case "log": return `Math.log10(${value})`;
            case "ln": return `Math.log(${value})`;
            case "pow": return `Math.pow(${value}, 2)`;
            case "sqrt": return `Math.sqrt(${value})`;
            case "cbrt": return `Math.cbrt(${value})`;
            case "factorial": return `this.factorial(${value})`;
            case "pi": return "Math.PI";
            case "exp": return `Math.exp(${value})`;
            case "pow10": return `Math.pow(10, ${value})`;
            case "abs": return `Math.abs(${value})`;
            case "negate": return `-(${value})`;
            case "random": return "Math.random()";
            default: return value;
        }
    }

    getOperatorSymbol(operator) {
        const symbols = {
            "add": " + ",
            "subtract": " - ",
            "multiply": " * ",
            "divide": " / "
        };
        return symbols[operator] || operator;
    }

    inputParentheses() {
        if (this.isNewExpression) {
            this.expression = "(";
        } else {
            this.expression += "(";
        }
        this.isNewExpression = false;
    }

    calculate() {
        try {
            // Reemplazar funciones especiales
            let expression = this.expression
                .replace(/Math\.sin/g, "Math.sin")
                .replace(/Math\.cos/g, "Math.cos")
                .replace(/Math\.tan/g, "Math.tan")
                .replace(/Math\.log10/g, "Math.log10")
                .replace(/Math\.log/g, "Math.log")
                .replace(/Math\.pow/g, "Math.pow")
                .replace(/Math\.sqrt/g, "Math.sqrt")
                .replace(/Math\.cbrt/g, "Math.cbrt")
                .replace(/Math\.exp/g, "Math.exp")
                .replace(/Math\.abs/g, "Math.abs")
                .replace(/Math\.PI/g, "Math.PI")
                .replace(/Math\.random/g, "Math.random")
                .replace(/this\.factorial/g, "this.factorial");

            // Evaluar expresión
            const result = eval(expression);
            
            if (isNaN(result) || !isFinite(result)) {
                throw new Error("Resultado inválido");
            }

            this.addToHistory(this.expression, result);
            this.result = this.formatNumber(result);
            this.expression = this.result;
            this.isNewExpression = true;
            
        } catch (error) {
            this.result = "Error";
            this.expression = "0";
            this.isNewExpression = true;
        }
        
        this.updateDisplay();
    }

    factorial(n) {
        n = Math.floor(Math.abs(n));
        if (n > 170) return Infinity; // Evitar overflow
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    formatNumber(num) {
        if (num === 0) return "0";
        
        const absNum = Math.abs(num);
        
        if (absNum >= 1e15 || absNum <= 1e-10) {
            return num.toExponential(10);
        }
        
        if (absNum >= 1000) {
            return num.toLocaleString();
        }
        
        if (absNum < 1 && absNum > 0) {
            return num.toFixed(10).replace(/\.?0+$/, "");
        }
        
        return num.toString();
    }

    clear() {
        this.expression = "0";
        this.result = "0";
        this.isNewExpression = true;
        this.updateDisplay();
    }

    backspace() {
        if (this.expression.length > 1) {
            this.expression = this.expression.slice(0, -1);
        } else {
            this.expression = "0";
            this.isNewExpression = true;
        }
        this.updateDisplay();
    }

    memoryOperation(operation) {
        switch (operation) {
            case "memory-clear":
                this.memory = 0;
                break;
            case "memory-recall":
                this.expression = this.memory.toString();
                this.isNewExpression = false;
                break;
            case "memory-add":
                this.memory += parseFloat(this.result) || 0;
                break;
            case "memory-subtract":
                this.memory -= parseFloat(this.result) || 0;
                break;
            case "memory-store":
                this.memory = parseFloat(this.result) || 0;
                break;
        }
        this.updateMemoryDisplay();
    }

    updateMemoryDisplay() {
        this.memoryDisplayEl.textContent = this.formatNumber(this.memory);
    }

    addToHistory(expression, result) {
        const historyItem = {
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.history.unshift(historyItem);
        
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        localStorage.setItem("calcHistory", JSON.stringify(this.history));
        this.loadHistory();
    }

    loadHistory() {
        this.historyEl.innerHTML = "";
        
        this.history.forEach(item => {
            const historyItem = document.createElement("div");
            historyItem.className = "history-item";
            historyItem.innerHTML = `
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${this.formatNumber(item.result)}</div>
            `;
            
            historyItem.addEventListener("click", () => {
                this.expression = item.expression;
                this.isNewExpression = false;
                this.updateDisplay();
            });
            
            this.historyEl.appendChild(historyItem);
        });
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem("calcHistory");
        this.loadHistory();
    }

    handleKeyboard(e) {
        e.preventDefault();
        
        const key = e.key;
        
        // Números y punto decimal
        if (/[0-9.]/.test(key)) {
            this.inputNumber(key);
        }
        
        // Operadores
        if (["+", "-", "*", "/"].includes(key)) {
            const operators = {
                "+": "add",
                "-": "subtract",
                "*": "multiply",
                "/": "divide"
            };
            this.inputOperator(operators[key]);
        }
        
        // Teclas especiales
        if (key === "Enter" || key === "=") {
            this.inputOperator("equals");
        }
        
        if (key === "Escape" || key === "c" || key === "C") {
            this.inputOperator("clear");
        }
        
        if (key === "Backspace") {
            this.inputOperator("backspace");
        }
        
        if (key === "(" || key === ")") {
            this.inputOperator("parentheses");
        }
    }

    updateDisplay() {
        this.expressionEl.textContent = this.expression;
        this.resultEl.textContent = this.result;
        this.updateMemoryDisplay();
    }
}

// Inicializar calculadora
document.addEventListener("DOMContentLoaded", () => {
    new ScientificCalculator();
});
