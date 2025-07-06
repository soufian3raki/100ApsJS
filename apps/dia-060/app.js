class StudyScheduler {
  constructor() {
    this.subjects = JSON.parse(localStorage.getItem('studySubjects')) || [];
    this.tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];
    this.currentWeek = this.getCurrentWeek();
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderSubjects();
    this.renderSchedule();
    this.renderTasks();
    this.updateStats();
  }

  bindEvents() {
    document.getElementById('addSubject').addEventListener('click', () => {
      this.showSubjectModal();
    });

    document.getElementById('addTask').addEventListener('click', () => {
      this.showTaskModal();
    });

    document.getElementById('exportSchedule').addEventListener('click', () => {
      this.exportSchedule();
    });

    document.getElementById('prevWeek').addEventListener('click', () => {
      this.changeWeek(-1);
    });

    document.getElementById('nextWeek').addEventListener('click', () => {
      this.changeWeek(1);
    });

    document.getElementById('closeSubjectModal').addEventListener('click', () => {
      this.hideSubjectModal();
    });

    document.getElementById('closeTaskModal').addEventListener('click', () => {
      this.hideTaskModal();
    });

    document.getElementById('closeTaskDetailModal').addEventListener('click', () => {
      this.hideTaskDetailModal();
    });

    document.getElementById('subjectForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addSubject();
    });

    document.getElementById('taskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask();
    });

    document.getElementById('cancelSubject').addEventListener('click', () => {
      this.hideSubjectModal();
    });

    document.getElementById('cancelTask').addEventListener('click', () => {
      this.hideTaskModal();
    });

    document.getElementById('toggleTaskStatus').addEventListener('click', (e) => {
      const taskId = parseInt(e.target.dataset.taskId);
      if (taskId) {
        this.toggleTaskStatus(taskId);
      }
    });

    document.getElementById('editTask').addEventListener('click', (e) => {
      const taskId = parseInt(e.target.dataset.taskId);
      if (taskId) {
        this.editTask(taskId);
      }
    });

    document.getElementById('deleteTask').addEventListener('click', (e) => {
      const taskId = parseInt(e.target.dataset.taskId);
      if (taskId) {
        this.deleteTask(taskId);
      }
    });

    // Event delegation for dynamic content
    document.addEventListener('click', (e) => {
      if (e.target.closest('.subject-item')) {
        const subjectId = parseInt(e.target.closest('.subject-item').dataset.subjectId);
        this.selectSubject(subjectId);
      } else if (e.target.closest('.task-block')) {
        const taskId = parseInt(e.target.closest('.task-block').dataset.taskId);
        this.showTaskDetail(taskId);
      } else if (e.target.closest('.task-item')) {
        const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);
        this.showTaskDetail(taskId);
      } else if (e.target.classList.contains('toggle-task-status')) {
        e.stopPropagation();
        const taskId = parseInt(e.target.dataset.taskId);
        this.toggleTaskStatus(taskId);
      } else if (e.target.classList.contains('edit-task')) {
        e.stopPropagation();
        const taskId = parseInt(e.target.dataset.taskId);
        this.editTask(taskId);
      } else if (e.target.classList.contains('delete-task')) {
        e.stopPropagation();
        const taskId = parseInt(e.target.dataset.taskId);
        this.deleteTask(taskId);
      }
    });
  }

  getCurrentWeek() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }

  changeWeek(direction) {
    this.currentWeek += direction;
    this.renderSchedule();
    this.updateWeekDisplay();
  }

  updateWeekDisplay() {
    const startDate = this.getWeekStartDate();
    const endDate = this.getWeekEndDate();
    document.getElementById('currentWeek').textContent = 
      `Semana ${this.currentWeek} (${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
  }

  getWeekStartDate() {
    const year = new Date().getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const weekStart = new Date(startOfYear.getTime() + (this.currentWeek - 1) * 7 * 24 * 60 * 60 * 1000);
    return weekStart;
  }

  getWeekEndDate() {
    const startDate = this.getWeekStartDate();
    const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    return endDate;
  }

  renderSubjects() {
    const container = document.getElementById('subjectsList');
    
    if (this.subjects.length === 0) {
      container.innerHTML = '<div class="empty-state">No hay materias agregadas</div>';
      return;
    }

    container.innerHTML = this.subjects.map(subject => {
      const subjectTasks = this.tasks.filter(task => task.subjectId === subject.id);
      const completedTasks = subjectTasks.filter(task => task.completed).length;
      const totalHours = subjectTasks.reduce((sum, task) => sum + task.duration, 0) / 60;

      return `
        <div class="subject-item" data-subject-id="${subject.id}">
          <div class="subject-color" style="background-color: ${subject.color}"></div>
          <div class="subject-name">${this.escapeHtml(subject.name)}</div>
          <div class="subject-info">${this.escapeHtml(subject.description || 'Sin descripción')}</div>
          <div class="subject-stats">
            <span>${subjectTasks.length} tareas</span>
            <span>${totalHours.toFixed(1)}h</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${subjectTasks.length > 0 ? (completedTasks / subjectTasks.length) * 100 : 0}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderSchedule() {
    const container = document.getElementById('scheduleGrid');
    const startDate = this.getWeekStartDate();
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const timeSlots = this.generateTimeSlots();

    let html = '<div class="time-slot"></div>';
    
    // Day headers
    days.forEach(day => {
      html += `<div class="day-header">${day}</div>`;
    });

    // Time slots and cells
    timeSlots.forEach(timeSlot => {
      html += `<div class="time-slot">${timeSlot}</div>`;
      
      for (let i = 0; i < 7; i++) {
        const cellDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        const dayTasks = this.getTasksForDate(cellDate, timeSlot);
        
        html += `<div class="schedule-cell ${dayTasks.length > 0 ? 'has-task' : ''}">`;
        
        dayTasks.forEach(task => {
          const subject = this.subjects.find(s => s.id === task.subjectId);
          const priorityClass = task.priority || 'medium';
          const completedClass = task.completed ? 'completed' : '';
          
          html += `
            <div class="task-block ${priorityClass}-priority ${completedClass}" data-task-id="${task.id}">
              ${this.escapeHtml(task.title)}
            </div>
          `;
        });
        
        html += '</div>';
      }
    });

    container.innerHTML = html;
    this.updateWeekDisplay();
  }

  generateTimeSlots() {
    const slots = [];
    for (let hour = 6; hour < 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }

  getTasksForDate(date, timeSlot) {
    const [hour] = timeSlot.split(':').map(Number);
    const taskDate = new Date(date);
    taskDate.setHours(hour, 0, 0, 0);
    
    return this.tasks.filter(task => {
      const taskDateTime = new Date(task.date + 'T' + task.time);
      const taskHour = taskDateTime.getHours();
      return taskDateTime.toDateString() === taskDate.toDateString() && taskHour === hour;
    });
  }

  renderTasks() {
    const container = document.getElementById('tasksList');
    const sortedTasks = this.tasks.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
    
    if (sortedTasks.length === 0) {
      container.innerHTML = '<div class="empty-state">No hay tareas programadas</div>';
      return;
    }

    container.innerHTML = sortedTasks.map(task => {
      const subject = this.subjects.find(s => s.id === task.subjectId);
      const priorityClass = task.priority || 'medium';
      const completedClass = task.completed ? 'completed' : '';
      
      return `
        <div class="task-item ${completedClass}" data-task-id="${task.id}">
          <div class="task-header">
            <div>
              <div class="task-title">${this.escapeHtml(task.title)}</div>
              <div class="task-meta">
                <span>📚 ${this.escapeHtml(subject?.name || 'Sin materia')}</span>
                <span>📅 ${new Date(task.date).toLocaleDateString()}</span>
                <span>⏰ ${task.time}</span>
                <span>⏱️ ${task.duration} min</span>
              </div>
            </div>
            <div class="task-priority ${priorityClass}">${priorityClass}</div>
          </div>
          <div class="task-description">${this.escapeHtml(task.description || 'Sin descripción')}</div>
          <div class="task-actions">
            <button class="task-action-btn toggle-task-status" data-task-id="${task.id}">
              ${task.completed ? '↩️' : '✅'}
            </button>
            <button class="task-action-btn edit-task" data-task-id="${task.id}">✏️</button>
            <button class="task-action-btn delete-task" data-task-id="${task.id}">🗑️</button>
          </div>
        </div>
      `;
    }).join('');
  }

  updateStats() {
    const totalSubjects = this.subjects.length;
    const totalHours = this.tasks.reduce((sum, task) => sum + task.duration, 0) / 60;
    const completedTasks = this.tasks.filter(task => task.completed).length;
    const totalTasks = this.tasks.length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    document.getElementById('totalSubjects').textContent = totalSubjects;
    document.getElementById('totalHours').textContent = totalHours.toFixed(1);
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('progressPercentage').textContent = progressPercentage + '%';
  }

  showSubjectModal() {
    document.getElementById('subjectModal').style.display = 'flex';
  }

  hideSubjectModal() {
    document.getElementById('subjectModal').style.display = 'none';
    document.getElementById('subjectForm').reset();
  }

  showTaskModal() {
    this.populateSubjectSelect();
    document.getElementById('taskModal').style.display = 'flex';
  }

  hideTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('taskForm').reset();
  }

  showTaskDetailModal() {
    document.getElementById('taskDetailModal').style.display = 'flex';
  }

  hideTaskDetailModal() {
    document.getElementById('taskDetailModal').style.display = 'none';
  }

  populateSubjectSelect() {
    const select = document.getElementById('taskSubject');
    select.innerHTML = '<option value="">Seleccionar materia</option>';
    
    this.subjects.forEach(subject => {
      const option = document.createElement('option');
      option.value = subject.id;
      option.textContent = subject.name;
      select.appendChild(option);
    });
  }

  addSubject() {
    const subject = {
      id: Date.now(),
      name: document.getElementById('subjectName').value,
      color: document.getElementById('subjectColor').value,
      description: document.getElementById('subjectDescription').value,
      credits: parseInt(document.getElementById('subjectCredits').value) || 0,
      professor: document.getElementById('subjectProfessor').value
    };

    this.subjects.push(subject);
    localStorage.setItem('studySubjects', JSON.stringify(this.subjects));
    this.renderSubjects();
    this.updateStats();
    this.hideSubjectModal();
  }

  addTask() {
    const task = {
      id: Date.now(),
      title: document.getElementById('taskTitle').value,
      subjectId: parseInt(document.getElementById('taskSubject').value),
      date: document.getElementById('taskDate').value,
      time: document.getElementById('taskTime').value,
      duration: parseInt(document.getElementById('taskDuration').value) || 60,
      priority: document.getElementById('taskPriority').value,
      description: document.getElementById('taskDescription').value,
      completed: false
    };

    this.tasks.push(task);
    localStorage.setItem('studyTasks', JSON.stringify(this.tasks));
    this.renderSchedule();
    this.renderTasks();
    this.updateStats();
    this.hideTaskModal();
    
    // Reset form
    document.getElementById('taskForm').reset();
  }

  selectSubject(subjectId) {
    document.querySelectorAll('.subject-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const subjectItem = document.querySelector(`[data-subject-id="${subjectId}"]`);
    if (subjectItem) {
      subjectItem.classList.add('active');
    }
  }

  showTaskDetail(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    const subject = this.subjects.find(s => s.id === task.subjectId);
    
    document.getElementById('taskDetailTitle').textContent = task.title;
    document.getElementById('taskDetailSubject').textContent = subject?.name || 'Sin materia';
    document.getElementById('taskDetailDate').textContent = new Date(task.date).toLocaleDateString();
    document.getElementById('taskDetailTime').textContent = task.time;
    document.getElementById('taskDetailDuration').textContent = task.duration + ' minutos';
    document.getElementById('taskDetailPriority').textContent = task.priority || 'Media';
    document.getElementById('taskDetailStatus').textContent = task.completed ? 'Completada' : 'Pendiente';
    document.getElementById('taskDetailDescription').textContent = task.description || 'Sin descripción';

    const toggleBtn = document.getElementById('toggleTaskStatus');
    toggleBtn.textContent = task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada';
    toggleBtn.dataset.taskId = taskId;

    // Update other buttons
    document.getElementById('editTask').dataset.taskId = taskId;
    document.getElementById('deleteTask').dataset.taskId = taskId;

    this.showTaskDetailModal();
  }

  toggleTaskStatus(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      localStorage.setItem('studyTasks', JSON.stringify(this.tasks));
      this.renderSchedule();
      this.renderTasks();
      this.updateStats();
      
      // Update the task detail modal if it's open
      if (document.getElementById('taskDetailModal').style.display === 'flex') {
        this.showTaskDetail(taskId);
      }
    }
  }

  editTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    // Populate form with task data
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskSubject').value = task.subjectId;
    document.getElementById('taskDate').value = task.date;
    document.getElementById('taskTime').value = task.time;
    document.getElementById('taskDuration').value = task.duration;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskDescription').value = task.description;

    this.populateSubjectSelect();
    this.showTaskModal();

    // Update form submit to edit instead of add
    const form = document.getElementById('taskForm');
    form.onsubmit = (e) => {
      e.preventDefault();
      this.updateTask(taskId);
    };
    
    // Hide task detail modal
    this.hideTaskDetailModal();
  }

  updateTask(taskId) {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      title: document.getElementById('taskTitle').value,
      subjectId: parseInt(document.getElementById('taskSubject').value),
      date: document.getElementById('taskDate').value,
      time: document.getElementById('taskTime').value,
      duration: parseInt(document.getElementById('taskDuration').value) || 60,
      priority: document.getElementById('taskPriority').value,
      description: document.getElementById('taskDescription').value
    };

    localStorage.setItem('studyTasks', JSON.stringify(this.tasks));
    this.renderSchedule();
    this.renderTasks();
    this.updateStats();
    this.hideTaskModal();

    // Reset form submit to add
    const form = document.getElementById('taskForm');
    form.onsubmit = (e) => {
      e.preventDefault();
      this.addTask();
    };
    
    // Reset form
    form.reset();
  }

  deleteTask(taskId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      localStorage.setItem('studyTasks', JSON.stringify(this.tasks));
      this.renderSchedule();
      this.renderTasks();
      this.updateStats();
      this.hideTaskDetailModal();
    }
  }

  exportSchedule() {
    const data = {
      subjects: this.subjects,
      tasks: this.tasks,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cronograma-estudio-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the study scheduler
const studyScheduler = new StudyScheduler();
