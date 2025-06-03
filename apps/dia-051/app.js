class LoanSimulator {
  constructor() {
    this.scenarios = JSON.parse(localStorage.getItem('loanScenarios')) || [];
    this.currentChart = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderScenarios();
  }

  bindEvents() {
    document.getElementById('calculateLoan').addEventListener('click', () => {
      this.calculateLoan();
    });

    document.getElementById('showAmortization').addEventListener('click', () => {
      this.toggleAmortizationTable();
    });

    document.getElementById('exportResults').addEventListener('click', () => {
      this.exportToPDF();
    });

    document.getElementById('addScenario').addEventListener('click', () => {
      this.addScenario();
    });

    document.getElementById('clearScenarios').addEventListener('click', () => {
      this.clearScenarios();
    });

    document.getElementById('showPaymentChart').addEventListener('click', () => {
      this.showPaymentChart();
    });

    document.getElementById('showInterestChart').addEventListener('click', () => {
      this.showInterestChart();
    });
  }

  calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const paymentFrequency = document.getElementById('paymentFrequency').value;

    if (!loanAmount || !interestRate || !loanTerm) {
      alert('Por favor completa todos los campos');
      return;
    }

    const result = this.calculateLoanDetails(loanAmount, interestRate, loanTerm, paymentFrequency);
    this.displayResults(result);
    this.generateAmortizationTable(result);
  }

  calculateLoanDetails(principal, annualRate, years, frequency) {
    const periodsPerYear = this.getPeriodsPerYear(frequency);
    const totalPeriods = years * periodsPerYear;
    const periodicRate = annualRate / 100 / periodsPerYear;

    const monthlyPayment = principal * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / 
                          (Math.pow(1 + periodicRate, totalPeriods) - 1);

    const totalPayments = monthlyPayment * totalPeriods;
    const totalInterest = totalPayments - principal;

    return {
      principal,
      annualRate,
      years,
      frequency,
      monthlyPayment,
      totalPayments,
      totalInterest,
      totalPeriods,
      periodicRate
    };
  }

  getPeriodsPerYear(frequency) {
    switch (frequency) {
      case 'monthly': return 12;
      case 'biweekly': return 26;
      case 'weekly': return 52;
      default: return 12;
    }
  }

  displayResults(result) {
    document.getElementById('monthlyPayment').textContent = this.formatCurrency(result.monthlyPayment);
    document.getElementById('totalPayments').textContent = this.formatCurrency(result.totalPayments);
    document.getElementById('totalInterest').textContent = this.formatCurrency(result.totalInterest);
    document.getElementById('numberOfPayments').textContent = result.totalPeriods;

    document.getElementById('loanResults').style.display = 'block';
  }

  generateAmortizationTable(result) {
    const table = document.getElementById('amortizationTable');
    const { principal, periodicRate, monthlyPayment, totalPeriods } = result;

    let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Pago #</th>
            <th>Pago Mensual</th>
            <th>Principal</th>
            <th>Interés</th>
            <th>Balance Restante</th>
          </tr>
        </thead>
        <tbody>
    `;

    let balance = principal;
    for (let i = 1; i <= Math.min(totalPeriods, 12); i++) {
      const interestPayment = balance * periodicRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      tableHTML += `
        <tr>
          <td>${i}</td>
          <td>${this.formatCurrency(monthlyPayment)}</td>
          <td>${this.formatCurrency(principalPayment)}</td>
          <td>${this.formatCurrency(interestPayment)}</td>
          <td>${this.formatCurrency(Math.max(0, balance))}</td>
        </tr>
      `;
    }

    if (totalPeriods > 12) {
      tableHTML += `
        <tr>
          <td colspan="5" style="text-align: center; font-style: italic;">
            ... y ${totalPeriods - 12} pagos más
          </td>
        </tr>
      `;
    }

    tableHTML += '</tbody></table>';
    table.innerHTML = tableHTML;
  }

  toggleAmortizationTable() {
    const table = document.getElementById('amortizationTable');
    const button = document.getElementById('showAmortization');
    
    if (table.style.display === 'none') {
      table.style.display = 'block';
      button.textContent = 'Ocultar Tabla';
    } else {
      table.style.display = 'none';
      button.textContent = 'Ver Tabla Completa';
    }
  }

  addScenario() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const paymentFrequency = document.getElementById('paymentFrequency').value;

    if (!loanAmount || !interestRate || !loanTerm) {
      alert('Por favor completa todos los campos antes de agregar un escenario');
      return;
    }

    const result = this.calculateLoanDetails(loanAmount, interestRate, loanTerm, paymentFrequency);
    
    const scenario = {
      id: Date.now(),
      name: `Escenario ${this.scenarios.length + 1}`,
      loanAmount,
      interestRate,
      loanTerm,
      paymentFrequency,
      monthlyPayment: result.monthlyPayment,
      totalPayments: result.totalPayments,
      totalInterest: result.totalInterest,
      createdAt: new Date().toISOString()
    };

    this.scenarios.push(scenario);
    this.saveScenarios();
    this.renderScenarios();
  }

  editScenario(id) {
    const scenario = this.scenarios.find(s => s.id === id);
    if (!scenario) return;

    document.getElementById('loanAmount').value = scenario.loanAmount;
    document.getElementById('interestRate').value = scenario.interestRate;
    document.getElementById('loanTerm').value = scenario.loanTerm;
    document.getElementById('paymentFrequency').value = scenario.paymentFrequency;

    this.calculateLoan();
  }

  removeScenario(id) {
    if (confirm('¿Eliminar este escenario?')) {
      this.scenarios = this.scenarios.filter(s => s.id !== id);
      this.saveScenarios();
      this.renderScenarios();
    }
  }

  clearScenarios() {
    if (confirm('¿Eliminar todos los escenarios?')) {
      this.scenarios = [];
      this.saveScenarios();
      this.renderScenarios();
    }
  }

  renderScenarios() {
    const scenariosList = document.getElementById('scenariosList');
    
    if (this.scenarios.length === 0) {
      scenariosList.innerHTML = '<div class="no-scenarios">No hay escenarios guardados</div>';
      return;
    }

    scenariosList.innerHTML = this.scenarios.map(scenario => `
      <div class="scenario-card">
        <div class="scenario-header">
          <div class="scenario-title">${this.escapeHtml(scenario.name)}</div>
          <div class="scenario-actions">
            <button class="edit-scenario" onclick="loanSimulator.editScenario(${scenario.id})">Editar</button>
            <button class="remove-scenario" onclick="loanSimulator.removeScenario(${scenario.id})">Eliminar</button>
          </div>
        </div>
        <div class="scenario-details">
          <div class="scenario-detail">
            <div class="scenario-detail-label">Monto</div>
            <div class="scenario-detail-value">${this.formatCurrency(scenario.loanAmount)}</div>
          </div>
          <div class="scenario-detail">
            <div class="scenario-detail-label">Tasa</div>
            <div class="scenario-detail-value">${scenario.interestRate}%</div>
          </div>
          <div class="scenario-detail">
            <div class="scenario-detail-label">Plazo</div>
            <div class="scenario-detail-value">${scenario.loanTerm} años</div>
          </div>
          <div class="scenario-detail">
            <div class="scenario-detail-label">Pago Mensual</div>
            <div class="scenario-detail-value">${this.formatCurrency(scenario.monthlyPayment)}</div>
          </div>
          <div class="scenario-detail">
            <div class="scenario-detail-label">Total Pagos</div>
            <div class="scenario-detail-value">${this.formatCurrency(scenario.totalPayments)}</div>
          </div>
          <div class="scenario-detail">
            <div class="scenario-detail-label">Intereses</div>
            <div class="scenario-detail-value">${this.formatCurrency(scenario.totalInterest)}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  showPaymentChart() {
    if (this.scenarios.length === 0) {
      alert('Agrega al menos un escenario para ver el gráfico');
      return;
    }

    this.createChart('payment');
  }

  showInterestChart() {
    if (this.scenarios.length === 0) {
      alert('Agrega al menos un escenario para ver el gráfico');
      return;
    }

    this.createChart('interest');
  }

  createChart(type) {
    const ctx = document.getElementById('paymentChart').getContext('2d');
    
    if (this.currentChart) {
      this.currentChart.destroy();
    }

    const labels = this.scenarios.map(s => s.name);
    const data = this.scenarios.map(s => 
      type === 'payment' ? s.monthlyPayment : s.totalInterest
    );

    this.currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: type === 'payment' ? 'Pago Mensual' : 'Intereses Totales',
          data: data,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return '$' + context.parsed.y.toLocaleString();
              }
            }
          }
        }
      }
    });
  }

  exportToPDF() {
    // Simple PDF export using browser print functionality
    const printWindow = window.open('', '_blank');
    const content = document.querySelector('.loan-results').innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Resultados del Préstamo</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .result-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
            .result-value { font-size: 1.5em; font-weight: bold; color: #3b82f6; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #3b82f6; color: white; }
          </style>
        </head>
        <body>
          <h1>Resultados del Préstamo</h1>
          ${content}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  saveScenarios() {
    localStorage.setItem('loanScenarios', JSON.stringify(this.scenarios));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the loan simulator
const loanSimulator = new LoanSimulator();
