class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.currentSort = 'date';
        this.editingTaskId = null;
        
        this.elements = {
            taskInput: document.getElementById('taskInput'),
            prioritySelect: document.getElementById('prioritySelect'),
            dueDateInput: document.getElementById('dueDateInput'),
            addTaskBtn: document.getElementById('addTaskBtn'),
            tasksList: document.getElementById('tasksList'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            sortSelect: document.getElementById('sortSelect'),
            totalTasks: document.getElementById('totalTasks'),
            completedTasks: document.getElementById('completedTasks'),
            pendingTasks: document.getElementById('pendingTasks'),
            taskModal: document.getElementById('taskModal'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            cancelEditBtn: document.getElementById('cancelEditBtn'),
            saveEditBtn: document.getElementById('saveEditBtn'),
            editTaskInput: document.getElementById('editTaskInput'),
            editPrioritySelect: document.getElementById('editPrioritySelect'),
            editDueDateInput: document.getElementById('editDueDateInput'),
            editCategorySelect: document.getElementById('editCategorySelect'),
            editNotesInput: document.getElementById('editNotesInput'),
            progressChart: document.getElementById('progressChart')
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
        this.updateCategoryCounts();
        this.initChart();
    }
    
    bindEvents() {
        // Add task
        this.elements.addTaskBtn.addEventListener('click', () => {
            this.addTask();
        });
        
        this.elements.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
        
        // Filters
        this.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Sort
        this.elements.sortSelect.addEventListener('change', (e) => {
            this.setSort(e.target.value);
        });
        
        // Modal
        this.elements.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.elements.cancelEditBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.elements.saveEditBtn.addEventListener('click', () => {
            this.saveEdit();
        });
        
        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterByCategory(category);
            });
        });
    }
    
    addTask() {
        const title = this.elements.taskInput.value.trim();
        const priority = this.elements.prioritySelect.value;
        const dueDate = this.elements.dueDateInput.value;
        
        if (!title) return;
        
        const task = {
            id: Date.now(),
            title: title,
            priority: priority,
            dueDate: dueDate,
            category: 'work',
            notes: '',
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.updateCategoryCounts();
        
        // Clear inputs
        this.elements.taskInput.value = '';
        this.elements.dueDateInput.value = '';
        this.elements.prioritySelect.value = 'medium';
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCategoryCounts();
        }
    }
    
    deleteTask(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCategoryCounts();
        }
    }
    
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.editingTaskId = id;
            this.elements.editTaskInput.value = task.title;
            this.elements.editPrioritySelect.value = task.priority;
            this.elements.editDueDateInput.value = task.dueDate || '';
            this.elements.editCategorySelect.value = task.category || 'work';
            this.elements.editNotesInput.value = task.notes || '';
            this.openModal();
        }
    }
    
    saveEdit() {
        if (!this.editingTaskId) return;
        
        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) {
            task.title = this.elements.editTaskInput.value.trim();
            task.priority = this.elements.editPrioritySelect.value;
            task.dueDate = this.elements.editDueDateInput.value;
            task.category = this.elements.editCategorySelect.value;
            task.notes = this.elements.editNotesInput.value.trim();
            
            this.saveTasks();
            this.renderTasks();
            this.updateCategoryCounts();
            this.closeModal();
        }
    }
    
    openModal() {
        this.elements.taskModal.classList.add('show');
    }
    
    closeModal() {
        this.elements.taskModal.classList.remove('show');
        this.editingTaskId = null;
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.elements.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderTasks();
    }
    
    setSort(sort) {
        this.currentSort = sort;
        this.renderTasks();
    }
    
    filterByCategory(category) {
        this.currentFilter = 'all';
        this.elements.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === 'all');
        });
        this.renderTasks();
    }
    
    renderTasks() {
        let filteredTasks = [...this.tasks];
        
        // Apply filter
        switch (this.currentFilter) {
            case 'pending':
                filteredTasks = filteredTasks.filter(t => !t.completed);
                break;
            case 'completed':
                filteredTasks = filteredTasks.filter(t => t.completed);
                break;
        }
        
        // Apply sort
        filteredTasks.sort((a, b) => {
            switch (this.currentSort) {
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'date':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });
        
        this.elements.tasksList.innerHTML = '';
        
        if (filteredTasks.length === 0) {
            this.elements.tasksList.innerHTML = `
                <div class="task-item" style="text-align: center; color: #7f8c8d;">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 15px;"></i>
                    <p>No hay tareas para mostrar</p>
                </div>
            `;
            return;
        }
        
        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.elements.tasksList.appendChild(taskElement);
        });
    }
    
    createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority`;
        
        const priorityColors = {
            high: '#e74c3c',
            medium: '#f39c12',
            low: '#27ae60'
        };
        
        const priorityLabels = {
            high: 'Alta',
            medium: 'Media',
            low: 'Baja'
        };
        
        const categoryIcons = {
            work: 'fas fa-briefcase',
            personal: 'fas fa-user',
            shopping: 'fas fa-shopping-cart',
            health: 'fas fa-heartbeat'
        };
        
        const categoryLabels = {
            work: 'Trabajo',
            personal: 'Personal',
            shopping: 'Compras',
            health: 'Salud'
        };
        
        taskElement.innerHTML = `
            <div class="task-header">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                        <span style="color: ${priorityColors[task.priority]}">
                            <i class="fas fa-flag"></i> ${priorityLabels[task.priority]}
                        </span>
                        <span>
                            <i class="${categoryIcons[task.category]}"></i> ${categoryLabels[task.category]}
                        </span>
                        ${task.dueDate ? `
                            <span>
                                <i class="fas fa-calendar"></i> ${this.formatDate(task.dueDate)}
                            </span>
                        ` : ''}
                    </div>
                    ${task.notes ? `<p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 10px;">${task.notes}</p>` : ''}
                </div>
                <div class="task-actions">
                    <button class="action-btn" onclick="taskManager.toggleTask(${task.id})" title="${task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}">
                        <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="action-btn" onclick="taskManager.editTask(${task.id})" title="Editar tarea">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="taskManager.deleteTask(${task.id})" title="Eliminar tarea">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        return taskElement;
    }
    
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        this.elements.totalTasks.textContent = total;
        this.elements.completedTasks.textContent = completed;
        this.elements.pendingTasks.textContent = pending;
    }
    
    updateCategoryCounts() {
        const categories = ['work', 'personal', 'shopping', 'health'];
        
        categories.forEach(category => {
            const count = this.tasks.filter(t => t.category === category).length;
            const element = document.getElementById(`${category}Count`);
            if (element) {
                element.textContent = count;
            }
        });
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    initChart() {
        const ctx = this.elements.progressChart.getContext('2d');
        
        // Create sample data for the chart
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const completedData = [5, 8, 6, 9, 7, 4, 6];
        const totalData = [8, 10, 8, 12, 9, 6, 8];
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Tareas Completadas',
                        data: completedData,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Total de Tareas',
                        data: totalData,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Initialize the app when DOM is loaded
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

// Add some sample tasks on first load
if (!localStorage.getItem('tasks')) {
    const sampleTasks = [
        {
            id: 1,
            title: "Completar proyecto web",
            priority: "high",
            dueDate: "2024-01-15",
            category: "work",
            notes: "Finalizar el diseño responsive y optimizar el rendimiento",
            completed: false,
            createdAt: "2024-01-10T10:00:00.000Z"
        },
        {
            id: 2,
            title: "Hacer ejercicio",
            priority: "medium",
            dueDate: "2024-01-12",
            category: "health",
            notes: "30 minutos de cardio y estiramientos",
            completed: true,
            createdAt: "2024-01-09T08:00:00.000Z"
        },
        {
            id: 3,
            title: "Comprar víveres",
            priority: "low",
            dueDate: "2024-01-14",
            category: "shopping",
            notes: "Leche, pan, frutas y verduras",
            completed: false,
            createdAt: "2024-01-11T16:00:00.000Z"
        }
    ];
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
} 