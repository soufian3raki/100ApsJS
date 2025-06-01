// App de Gastos con Gráficos - Día 35
class ExpenseManager {
  constructor() {
    this.expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    this.editingExpense = null;
    
    this.initializeElements();
    this.setupEventListeners();
    this.renderExpenses();
    this.updateSummary();
    this.drawCharts();
  }

  initializeElements() {
    this.expensesList = document.getElementById("expensesList");
    this.addExpenseBtn = document.getElementById("addExpenseBtn");
    this.exportBtn = document.getElementById("exportBtn");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.monthFilter = document.getElementById("monthFilter");
    this.yearFilter = document.getElementById("yearFilter");
    this.expenseModal = document.getElementById("expenseModal");
    this.closeModal = document.getElementById("closeModal");
    this.expenseForm = document.getElementById("expenseForm");
    this.saveExpense = document.getElementById("saveExpense");
    this.deleteExpense = document.getElementById("deleteExpense");
    this.cancelExpense = document.getElementById("cancelExpense");
    this.modalTitle = document.getElementById("modalTitle");
    
    this.categoryChart = document.getElementById("categoryChart");
    this.monthlyChart = document.getElementById("monthlyChart");
  }

  setupEventListeners() {
    this.addExpenseBtn.addEventListener("click", () => this.openExpenseModal());
    this.exportBtn.addEventListener("click", () => this.exportExpenses());
    this.categoryFilter.addEventListener("change", () => this.renderExpenses());
    this.monthFilter.addEventListener("change", () => this.renderExpenses());
    this.yearFilter.addEventListener("change", () => this.renderExpenses());
    this.closeModal.addEventListener("click", () => this.closeExpenseModal());
    this.saveExpense.addEventListener("click", () => this.saveExpenseData());
    this.deleteExpense.addEventListener("click", () => this.deleteExpenseData());
    this.cancelExpense.addEventListener("click", () => this.closeExpenseModal());
  }

  renderExpenses() {
    let filteredExpenses = [...this.expenses];
    
    if (this.categoryFilter.value) {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === this.categoryFilter.value);
    }
    
    if (this.monthFilter.value) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() + 1 === parseInt(this.monthFilter.value);
      });
    }
    
    if (this.yearFilter.value) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === parseInt(this.yearFilter.value);
      });
    }
    
    filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filteredExpenses.length === 0) {
      this.expensesList.innerHTML = "<div class=\"empty-expenses\"><h3>No hay gastos</h3><p>Agrega tu primer gasto para comenzar</p></div>";
      return;
    }
    
    this.expensesList.innerHTML = filteredExpenses.map(expense => this.createExpenseHTML(expense)).join("");
  }

  createExpenseHTML(expense) {
    return "<div class=\"expense-item " + expense.category + "\">" +
           "<div class=\"expense-content\">" +
           "<div class=\"expense-description\">" + expense.description + "</div>" +
           "<div class=\"expense-meta\">" +
           "<span>�� " + this.getCategoryName(expense.category) + "</span>" +
           "<span>📅 " + this.formatDate(expense.date) + "</span>" +
           "</div>" +
           "</div>" +
           "<div class=\"expense-amount\">$" + expense.amount.toFixed(2) + "</div>" +
           "<div class=\"expense-actions\">" +
           "<button class=\"edit-btn\" onclick=\"expenseManager.editExpense(\
 + expense.id + 
\)\">Editar</button>" +
           "<button class=\"delete-btn\" onclick=\"expenseManager.deleteExpense(\ + expense.id + \)\">Eliminar</button>" +
           "</div>" +
           "</div>";
  }

  openExpenseModal(expenseId = null) {
    this.editingExpense = expenseId;
    
    if (expenseId) {
      const expense = this.expenses.find(e => e.id === expenseId);
      this.modalTitle.textContent = "Editar Gasto";
      document.getElementById("expenseDescription").value = expense.description;
      document.getElementById("expenseAmount").value = expense.amount;
      document.getElementById("expenseCategory").value = expense.category;
      document.getElementById("expenseDate").value = expense.date;
      this.deleteExpense.style.display = "inline-block";
    } else {
      this.modalTitle.textContent = "Nuevo Gasto";
      this.expenseForm.reset();
      document.getElementById("expenseDate").value = new Date().toISOString().split("T")[0];
      this.deleteExpense.style.display = "none";
    }
    
    this.expenseModal.classList.add("show");
  }

  closeExpenseModal() {
    this.expenseModal.classList.remove("show");
    this.editingExpense = null;
    this.expenseForm.reset();
  }

  saveExpenseData() {
    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const date = document.getElementById("expenseDate").value;
    
    if (!description || !amount || !date) {
      alert("Por favor completa todos los campos");
      return;
    }
    
    const expense = {
      id: this.editingExpense || Date.now().toString(),
      description: description,
      amount: amount,
      category: category,
      date: date,
      createdAt: this.editingExpense ? this.expenses.find(e => e.id === this.editingExpense).createdAt : new Date().toISOString()
    };
    
    if (this.editingExpense) {
      const index = this.expenses.findIndex(e => e.id === this.editingExpense);
      this.expenses[index] = expense;
    } else {
      this.expenses.push(expense);
    }
    
    this.saveExpenses();
    this.closeExpenseModal();
    this.renderExpenses();
    this.updateSummary();
    this.drawCharts();
  }

  editExpense(expenseId) {
    this.openExpenseModal(expenseId);
  }

  deleteExpense(expenseId) {
    if (confirm("¿Estás seguro de que quieres eliminar este gasto?")) {
      this.expenses = this.expenses.filter(e => e.id !== expenseId);
      this.saveExpenses();
      this.renderExpenses();
      this.updateSummary();
      this.drawCharts();
    }
  }

  deleteExpenseData() {
    if (this.editingExpense) {
      this.deleteExpense(this.editingExpense);
      this.closeExpenseModal();
    }
  }

  updateSummary() {
    const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthly = this.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    }).reduce((sum, expense) => sum + expense.amount, 0);
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dailyAverage = monthly / daysInMonth;
    
    const categoryTotals = {};
    this.expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, "N/A");
    
    document.getElementById("totalExpenses").textContent = "$" + total.toFixed(2);
    document.getElementById("monthlyExpenses").textContent = "$" + monthly.toFixed(2);
    document.getElementById("dailyAverage").textContent = "$" + dailyAverage.toFixed(2);
    document.getElementById("topCategory").textContent = this.getCategoryName(topCategory);
  }

  drawCharts() {
    this.drawCategoryChart();
    this.drawMonthlyChart();
  }

  drawCategoryChart() {
    const ctx = this.categoryChart.getContext("2d");
    const categoryTotals = {};
    
    this.expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = ["#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444", "#10b981", "#6b7280", "#f97316"];
    
    ctx.clearRect(0, 0, this.categoryChart.width, this.categoryChart.height);
    
    if (categories.length === 0) return;
    
    const centerX = this.categoryChart.width / 2;
    const centerY = this.categoryChart.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    let currentAngle = 0;
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    
    categories.forEach((category, index) => {
      const sliceAngle = (amounts[index] / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      currentAngle += sliceAngle;
    });
  }

  drawMonthlyChart() {
    const ctx = this.monthlyChart.getContext("2d");
    const monthlyTotals = {};
    
    this.expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + expense.amount;
    });
    
    const months = Object.keys(monthlyTotals).sort();
    const amounts = months.map(month => monthlyTotals[month]);
    
    ctx.clearRect(0, 0, this.monthlyChart.width, this.monthlyChart.height);
    
    if (months.length === 0) return;
    
    const maxAmount = Math.max(...amounts);
    const barWidth = this.monthlyChart.width / months.length - 10;
    const barHeight = this.monthlyChart.height - 40;
    
    months.forEach((month, index) => {
      const barHeightRatio = amounts[index] / maxAmount;
      const barHeightPx = barHeightRatio * barHeight;
      const x = index * (barWidth + 10) + 5;
      const y = this.monthlyChart.height - barHeightPx - 20;
      
      ctx.fillStyle = var(--accent-color);
      ctx.fillRect(x, y, barWidth, barHeightPx);
      
      ctx.fillStyle = var(--text-primary);
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(month, x + barWidth / 2, this.monthlyChart.height - 5);
    });
  }

  exportExpenses() {
    const csvContent = "Descripción,Categoría,Monto,Fecha\n" +
      this.expenses.map(expense => 
        `"${expense.description}","${this.getCategoryName(expense.category)}","${expense.amount}","${expense.date}"`
      ).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gastos.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  getCategoryName(category) {
    const categories = {
      "alimentacion": "Alimentación",
      "transporte": "Transporte",
      "entretenimiento": "Entretenimiento",
      "salud": "Salud",
      "educacion": "Educación",
      "hogar": "Hogar",
      "otros": "Otros"
    };
    return categories[category] || category;
  }

  saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }
}

let expenseManager;

document.addEventListener("DOMContentLoaded", () => {
  expenseManager = new ExpenseManager();
});
