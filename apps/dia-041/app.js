// App de Hábitos Diarios - Día 41
class HabitsApp {
  constructor() {
    this.habits = JSON.parse(localStorage.getItem("habits")) || [];
    this.editingHabit = null;
    this.currentDate = new Date();
    
    this.initializeElements();
    this.setupEventListeners();
    this.renderHabits();
    this.updateSummary();
    this.renderCalendar();
  }

  initializeElements() {
    this.habitsList = document.getElementById("habitsList");
    this.addHabitBtn = document.getElementById("addHabitBtn");
    this.statsBtn = document.getElementById("statsBtn");
    this.exportBtn = document.getElementById("exportBtn");
    this.habitModal = document.getElementById("habitModal");
    this.closeModal = document.getElementById("closeModal");
    this.habitForm = document.getElementById("habitForm");
    this.saveHabit = document.getElementById("saveHabit");
    this.deleteHabit = document.getElementById("deleteHabit");
    this.cancelHabit = document.getElementById("cancelHabit");
    this.modalTitle = document.getElementById("modalTitle");
    this.statsModal = document.getElementById("statsModal");
    this.closeStatsModal = document.getElementById("closeStatsModal");
    this.statsGrid = document.getElementById("statsGrid");
    this.calendarGrid = document.getElementById("calendarGrid");
    this.currentMonthEl = document.getElementById("currentMonth");
    this.prevMonthBtn = document.getElementById("prevMonth");
    this.nextMonthBtn = document.getElementById("nextMonth");
  }

  setupEventListeners() {
    this.addHabitBtn.addEventListener("click", () => this.openHabitModal());
    this.statsBtn.addEventListener("click", () => this.openStatsModal());
    this.exportBtn.addEventListener("click", () => this.exportHabits());
    this.closeModal.addEventListener("click", () => this.closeHabitModal());
    this.saveHabit.addEventListener("click", () => this.saveHabitData());
    this.deleteHabit.addEventListener("click", () => this.deleteHabitData());
    this.cancelHabit.addEventListener("click", () => this.closeHabitModal());
    this.closeStatsModal.addEventListener("click", () => this.closeStatsModal());
    this.prevMonthBtn.addEventListener("click", () => this.previousMonth());
    this.nextMonthBtn.addEventListener("click", () => this.nextMonth());
  }

  renderHabits() {
    if (this.habits.length === 0) {
      this.habitsList.innerHTML = "<div class=\"empty-habits\"><h3>No hay hábitos</h3><p>Agrega tu primer hábito para comenzar</p></div>";
      return;
    }
    
    this.habitsList.innerHTML = this.habits.map(habit => this.createHabitHTML(habit)).join("");
  }

  createHabitHTML(habit) {
    const today = new Date().toISOString().split("T")[0];
    const todayProgress = habit.progress[today] || 0;
    const isCompleted = todayProgress >= habit.target;
    const progressPercent = Math.min((todayProgress / habit.target) * 100, 100);
    
    return "<div class=\"habit-item" + (isCompleted ? " completed" : "") + "\">" +
           "<div class=\"habit-header\">" +
           "<div>" +
           "<h3 class=\"habit-title\">" + habit.name + "</h3>" +
           "<div class=\"habit-category\">" + this.getCategoryName(habit.category) + "</div>" +
           "</div>" +
           "<button class=\"habit-edit-btn\" onclick=\"habitsApp.editHabit(\
 + habit.id + 
\)\">Editar</button>" +
           "</div>" +
           (habit.description ? "<div class=\"habit-description\">" + habit.description + "</div>" : "") +
           "<div class=\"habit-progress\">" +
           "<div class=\"habit-progress-bar\">" +
           "<div class=\"habit-progress-fill\" style=\"width: " + progressPercent + "%; background: " + habit.color + "\"></div>" +
           "</div>" +
           "<div class=\"habit-progress-text\">" + todayProgress + "/" + habit.target + "</div>" +
           "</div>" +
           "<div class=\"habit-actions\">" +
           "<button class=\"habit-check-btn " + (isCompleted ? "complete" : "incomplete") + "\" onclick=\"habitsApp.toggleHabit(\ + habit.id + \)\">" +
           (isCompleted ? "✅ Completado" : "⏳ Pendiente") +
           "</button>" +
           "</div>" +
           "</div>";
  }

  openHabitModal(habitId = null) {
    this.editingHabit = habitId;
    
    if (habitId) {
      const habit = this.habits.find(h => h.id === habitId);
      this.modalTitle.textContent = "Editar Hábito";
      document.getElementById("habitName").value = habit.name;
      document.getElementById("habitDescription").value = habit.description || "";
      document.getElementById("habitCategory").value = habit.category;
      document.getElementById("habitFrequency").value = habit.frequency;
      document.getElementById("habitTarget").value = habit.target;
      document.getElementById("habitColor").value = habit.color;
      this.deleteHabit.style.display = "inline-block";
    } else {
      this.modalTitle.textContent = "Nuevo Hábito";
      this.habitForm.reset();
      document.getElementById("habitColor").value = "#3b82f6";
      this.deleteHabit.style.display = "none";
    }
    
    this.habitModal.classList.add("show");
  }

  closeHabitModal() {
    this.habitModal.classList.remove("show");
    this.editingHabit = null;
    this.habitForm.reset();
  }

  saveHabitData() {
    const name = document.getElementById("habitName").value;
    const description = document.getElementById("habitDescription").value;
    const category = document.getElementById("habitCategory").value;
    const frequency = document.getElementById("habitFrequency").value;
    const target = parseInt(document.getElementById("habitTarget").value);
    const color = document.getElementById("habitColor").value;
    
    if (!name) {
      alert("Por favor ingresa un nombre para el hábito");
      return;
    }
    
    const habit = {
      id: this.editingHabit || Date.now().toString(),
      name: name,
      description: description,
      category: category,
      frequency: frequency,
      target: target,
      color: color,
      progress: this.editingHabit ? this.habits.find(h => h.id === this.editingHabit).progress : {},
      createdAt: this.editingHabit ? this.habits.find(h => h.id === this.editingHabit).createdAt : new Date().toISOString()
    };
    
    if (this.editingHabit) {
      const index = this.habits.findIndex(h => h.id === this.editingHabit);
      this.habits[index] = habit;
    } else {
      this.habits.push(habit);
    }
    
    this.saveHabits();
    this.closeHabitModal();
    this.renderHabits();
    this.updateSummary();
    this.renderCalendar();
  }

  editHabit(habitId) {
    this.openHabitModal(habitId);
  }

  deleteHabit(habitId) {
    if (confirm("¿Estás seguro de que quieres eliminar este hábito?")) {
      this.habits = this.habits.filter(h => h.id !== habitId);
      this.saveHabits();
      this.renderHabits();
      this.updateSummary();
      this.renderCalendar();
    }
  }

  deleteHabitData() {
    if (this.editingHabit) {
      this.deleteHabit(this.editingHabit);
      this.closeHabitModal();
    }
  }

  toggleHabit(habitId) {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const today = new Date().toISOString().split("T")[0];
    const todayProgress = habit.progress[today] || 0;
    
    if (todayProgress >= habit.target) {
      habit.progress[today] = Math.max(0, todayProgress - 1);
    } else {
      habit.progress[today] = Math.min(habit.target, todayProgress + 1);
    }
    
    this.saveHabits();
    this.renderHabits();
    this.updateSummary();
    this.renderCalendar();
  }

  updateSummary() {
    const today = new Date().toISOString().split("T")[0];
    const todayCompleted = this.habits.filter(habit => {
      const progress = habit.progress[today] || 0;
      return progress >= habit.target;
    }).length;
    
    const totalHabits = this.habits.length;
    const todayProgress = totalHabits > 0 ? Math.round((todayCompleted / totalHabits) * 100) : 0;
    
    document.getElementById("todayProgress").textContent = todayCompleted + "/" + totalHabits;
    document.getElementById("todayProgressBar").style.width = todayProgress + "%";
    
    // Calcular progreso semanal
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekProgress = this.calculateWeekProgress(weekStart);
    
    document.getElementById("weekProgress").textContent = weekProgress + "%";
    document.getElementById("weekProgressBar").style.width = weekProgress + "%";
    
    // Calcular racha actual
    const streak = this.calculateCurrentStreak();
    document.getElementById("currentStreak").textContent = streak + " días";
    
    if (streak > 0) {
      document.getElementById("streakInfo").textContent = "¡Sigue así!";
    } else {
      document.getElementById("streakInfo").textContent = "Comienza hoy";
    }
  }

  calculateWeekProgress(weekStart) {
    let totalProgress = 0;
    let totalPossible = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      
      this.habits.forEach(habit => {
        const progress = habit.progress[dateStr] || 0;
        totalProgress += Math.min(progress, habit.target);
        totalPossible += habit.target;
      });
    }
    
    return totalPossible > 0 ? Math.round((totalProgress / totalPossible) * 100) : 0;
  }

  calculateCurrentStreak() {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      const dayCompleted = this.habits.every(habit => {
        const progress = habit.progress[dateStr] || 0;
        return progress >= habit.target;
      });
      
      if (dayCompleted && this.habits.length > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    this.currentMonthEl.textContent = monthNames[month] + " " + year;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    this.calendarGrid.innerHTML = "";
    
    // Días de la semana
    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    weekDays.forEach(day => {
      const dayEl = document.createElement("div");
      dayEl.className = "calendar-day";
      dayEl.textContent = day;
      dayEl.style.fontWeight = "bold";
      dayEl.style.color = "var(--text-secondary)";
      this.calendarGrid.appendChild(dayEl);
    });
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement("div");
      dayEl.className = "calendar-day";
      dayEl.textContent = day;
      
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split("T")[0];
      const today = new Date().toISOString().split("T")[0];
      
      if (dateStr === today) {
        dayEl.classList.add("today");
      }
      
      const dayProgress = this.calculateDayProgress(dateStr);
      if (dayProgress === 100) {
        dayEl.classList.add("completed");
      } else if (dayProgress > 0) {
        dayEl.classList.add("partial");
      }
      
      this.calendarGrid.appendChild(dayEl);
    }
  }

  calculateDayProgress(dateStr) {
    if (this.habits.length === 0) return 0;
    
    let totalProgress = 0;
    let totalPossible = 0;
    
    this.habits.forEach(habit => {
      const progress = habit.progress[dateStr] || 0;
      totalProgress += Math.min(progress, habit.target);
      totalPossible += habit.target;
    });
    
    return totalPossible > 0 ? Math.round((totalProgress / totalPossible) * 100) : 0;
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  openStatsModal() {
    this.statsModal.classList.add("show");
    this.renderStats();
  }

  closeStatsModal() {
    this.statsModal.classList.remove("show");
  }

  renderStats() {
    const stats = this.calculateStats();
    
    this.statsGrid.innerHTML = `
      <div class="stat-card">
        <h4>Total de Hábitos</h4>
        <div class="stat-value">${stats.totalHabits}</div>
      </div>
      <div class="stat-card">
        <h4>Completados Hoy</h4>
        <div class="stat-value">${stats.todayCompleted}</div>
      </div>
      <div class="stat-card">
        <h4>Racha Actual</h4>
        <div class="stat-value">${stats.currentStreak}</div>
      </div>
      <div class="stat-card">
        <h4>Progreso Semanal</h4>
        <div class="stat-value">${stats.weekProgress}%</div>
      </div>
    `;
  }

  calculateStats() {
    const today = new Date().toISOString().split("T")[0];
    const todayCompleted = this.habits.filter(habit => {
      const progress = habit.progress[today] || 0;
      return progress >= habit.target;
    }).length;
    
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekProgress = this.calculateWeekProgress(weekStart);
    
    return {
      totalHabits: this.habits.length,
      todayCompleted: todayCompleted,
      currentStreak: this.calculateCurrentStreak(),
      weekProgress: weekProgress
    };
  }

  exportHabits() {
    const data = {
      habits: this.habits,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "habits-" + new Date().toISOString().split("T")[0] + ".json";
    a.click();
    URL.revokeObjectURL(url);
  }

  getCategoryName(category) {
    const categories = {
      "salud": "Salud",
      "productividad": "Productividad",
      "aprendizaje": "Aprendizaje",
      "ejercicio": "Ejercicio",
      "meditacion": "Meditación",
      "lectura": "Lectura",
      "otro": "Otro"
    };
    return categories[category] || category;
  }

  saveHabits() {
    localStorage.setItem("habits", JSON.stringify(this.habits));
  }
}

let habitsApp;

document.addEventListener("DOMContentLoaded", () => {
  habitsApp = new HabitsApp();
});
