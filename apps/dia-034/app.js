// Administrador de Tareas con Categorías - Día 34
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.editingTask = null;
    
    this.initializeElements();
    this.setupEventListeners();
    this.renderTasks();
    this.updateStats();
  }

  initializeElements() {
    this.taskList = document.getElementById("taskList");
    this.addTaskBtn = document.getElementById("addTaskBtn");
    this.clearCompletedBtn = document.getElementById("clearCompletedBtn");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.priorityFilter = document.getElementById("priorityFilter");
    this.statusFilter = document.getElementById("statusFilter");
    this.taskModal = document.getElementById("taskModal");
    this.closeModal = document.getElementById("closeModal");
    this.taskForm = document.getElementById("taskForm");
    this.saveTask = document.getElementById("saveTask");
    this.deleteTask = document.getElementById("deleteTask");
    this.cancelTask = document.getElementById("cancelTask");
    this.modalTitle = document.getElementById("modalTitle");
  }

  setupEventListeners() {
    this.addTaskBtn.addEventListener("click", () => this.openTaskModal());
    this.clearCompletedBtn.addEventListener("click", () => this.clearCompletedTasks());
    this.categoryFilter.addEventListener("change", () => this.renderTasks());
    this.priorityFilter.addEventListener("change", () => this.renderTasks());
    this.statusFilter.addEventListener("change", () => this.renderTasks());
    this.closeModal.addEventListener("click", () => this.closeTaskModal());
    this.saveTask.addEventListener("click", () => this.saveTaskData());
    this.deleteTask.addEventListener("click", () => this.deleteTaskData());
    this.cancelTask.addEventListener("click", () => this.closeTaskModal());
  }

  renderTasks() {
    let filteredTasks = [...this.tasks];
    
    if (this.categoryFilter.value) {
      filteredTasks = filteredTasks.filter(task => task.category === this.categoryFilter.value);
    }
    
    if (this.priorityFilter.value) {
      filteredTasks = filteredTasks.filter(task => task.priority === this.priorityFilter.value);
    }
    
    if (this.statusFilter.value) {
      filteredTasks = filteredTasks.filter(task => task.status === this.statusFilter.value);
    }
    
    filteredTasks.sort((a, b) => {
      if (a.status !== b.status) {
        const statusOrder = { "pendiente": 0, "en-progreso": 1, "completada": 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      if (a.priority !== b.priority) {
        const priorityOrder = { "alta": 0, "media": 1, "baja": 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    
    if (filteredTasks.length === 0) {
      this.taskList.innerHTML = "<div class=\"empty-tasks\"><h3>No hay tareas</h3><p>Agrega tu primera tarea para comenzar</p></div>";
      return;
    }
    
    this.taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join("");
    this.updateStats();
  }

  createTaskHTML(task) {
    const statusClass = task.status.replace("-", "");
    const priorityClass = task.priority;
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completada";
    
    return "<div class=\"task-item " + statusClass + "\">" +
           "<div class=\"task-header-content\">" +
           "<h3 class=\"task-title\">" + task.title + "</h3>" +
           "<div class=\"task-actions\">" +
           "<button class=\"edit-btn\" onclick=\"taskManager.editTask(\
 + task.id + 
\)\">Editar</button>" +
           "<button class=\"status-btn\" onclick=\"taskManager.toggleStatus(\ + task.id + \)\">" + this.getStatusName(task.status) + "</button>" +
           "<button class=\"delete-btn\" onclick=\"taskManager.deleteTask(\ + task.id + \)\">Eliminar</button>" +
           "</div>" +
           "</div>" +
           (task.description ? "<div class=\"task-description\">" + task.description + "</div>" : "") +
           "<div class=\"task-meta\">" +
           "<span>📂 " + this.getCategoryName(task.category) + "</span>" +
           "<span class=\"task-priority " + priorityClass + "\">⚡ " + this.getPriorityName(task.priority) + "</span>" +
           (task.dueDate ? "<span class=\"task-due-date" + (isOverdue ? " overdue" : "") + "\">📅 " + this.formatDate(task.dueDate) + "</span>" : "") +
           "</div>" +
           "</div>";
  }

  openTaskModal(taskId = null) {
    this.editingTask = taskId;
    
    if (taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      this.modalTitle.textContent = "Editar Tarea";
      document.getElementById("taskTitle").value = task.title;
      document.getElementById("taskDescription").value = task.description || "";
      document.getElementById("taskCategory").value = task.category;
      document.getElementById("taskPriority").value = task.priority;
      document.getElementById("taskDueDate").value = task.dueDate || "";
      this.deleteTask.style.display = "inline-block";
    } else {
      this.modalTitle.textContent = "Nueva Tarea";
      this.taskForm.reset();
      document.getElementById("taskDueDate").value = new Date().toISOString().split("T")[0];
      this.deleteTask.style.display = "none";
    }
    
    this.taskModal.classList.add("show");
  }

  closeTaskModal() {
    this.taskModal.classList.remove("show");
    this.editingTask = null;
    this.taskForm.reset();
  }

  saveTaskData() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const category = document.getElementById("taskCategory").value;
    const priority = document.getElementById("taskPriority").value;
    const dueDate = document.getElementById("taskDueDate").value;
    
    if (!title) {
      alert("Por favor ingresa un título para la tarea");
      return;
    }
    
    const task = {
      id: this.editingTask || Date.now().toString(),
      title: title,
      description: description,
      category: category,
      priority: priority,
      dueDate: dueDate,
      status: this.editingTask ? this.tasks.find(t => t.id === this.editingTask).status : "pendiente",
      createdAt: this.editingTask ? this.tasks.find(t => t.id === this.editingTask).createdAt : new Date().toISOString()
    };
    
    if (this.editingTask) {
      const index = this.tasks.findIndex(t => t.id === this.editingTask);
      this.tasks[index] = task;
    } else {
      this.tasks.push(task);
    }
    
    this.saveTasks();
    this.closeTaskModal();
    this.renderTasks();
  }

  editTask(taskId) {
    this.openTaskModal(taskId);
  }

  deleteTask(taskId) {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.saveTasks();
      this.renderTasks();
    }
  }

  deleteTaskData() {
    if (this.editingTask) {
      this.deleteTask(this.editingTask);
      this.closeTaskModal();
    }
  }

  toggleStatus(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const statuses = ["pendiente", "en-progreso", "completada"];
      const currentIndex = statuses.indexOf(task.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      task.status = statuses[nextIndex];
      
      this.saveTasks();
      this.renderTasks();
    }
  }

  clearCompletedTasks() {
    if (confirm("¿Estás seguro de que quieres eliminar todas las tareas completadas?")) {
      this.tasks = this.tasks.filter(t => t.status !== "completada");
      this.saveTasks();
      this.renderTasks();
    }
  }

  updateStats() {
    const total = this.tasks.length;
    const pending = this.tasks.filter(t => t.status === "pendiente").length;
    const completed = this.tasks.filter(t => t.status === "completada").length;
    const progress = this.tasks.filter(t => t.status === "en-progreso").length;
    
    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("progressTasks").textContent = progress;
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
      "trabajo": "Trabajo",
      "personal": "Personal",
      "estudio": "Estudio",
      "salud": "Salud",
      "hogar": "Hogar"
    };
    return categories[category] || category;
  }

  getStatusName(status) {
    const statuses = {
      "pendiente": "Pendiente",
      "en-progreso": "En Progreso",
      "completada": "Completada"
    };
    return statuses[status] || status;
  }

  getPriorityName(priority) {
    const priorities = {
      "baja": "Baja",
      "media": "Media",
      "alta": "Alta"
    };
    return priorities[priority] || priority;
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}

let taskManager;

document.addEventListener("DOMContentLoaded", () => {
  taskManager = new TaskManager();
});
