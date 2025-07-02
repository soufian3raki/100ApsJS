class ProjectManagementSystem {
    constructor() {
        this.projects = [];
        this.tasks = [];
        this.team = [];
        this.currentTab = 'projects';
        this.editingProject = null;
        this.editingTask = null;
        this.editingMember = null;
        
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateStats();
        this.renderProjects();
        this.setupDateInputs();
    }

    bindEvents() {
        // Navegación por pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Botones principales
        const newProjectBtn = document.createElement('button');
        newProjectBtn.textContent = '+ Nuevo Proyecto';
        newProjectBtn.className = 'btn btn-primary';
        newProjectBtn.addEventListener('click', () => this.showProjectModal());
        
        const viewCalendarBtn = document.createElement('button');
        viewCalendarBtn.textContent = '📅 Calendario';
        viewCalendarBtn.className = 'btn btn-secondary';
        viewCalendarBtn.addEventListener('click', () => this.showCalendar());
        
        // Agregar botones debajo del header
        const headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        headerActions.appendChild(newProjectBtn);
        headerActions.appendChild(viewCalendarBtn);
        
        // Insertar después del header
        const header = document.querySelector('header');
        header.insertAdjacentElement('afterend', headerActions);
        
        // Filtros de proyectos
        document.getElementById('projectSearch').addEventListener('input', () => this.filterProjects());
        document.getElementById('projectSearchBtn').addEventListener('click', () => this.filterProjects());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterProjects());
        document.getElementById('priorityFilter').addEventListener('change', () => this.filterProjects());
        document.getElementById('clearProjectFilters').addEventListener('click', () => this.clearProjectFilters());        
        // Botones del header principal
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        
        document.getElementById('toggle-mode').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        
        // Filtros de tareas
        document.getElementById('taskSearch').addEventListener('input', () => this.filterTasks());
        document.getElementById('taskSearchBtn').addEventListener('click', () => this.filterTasks());
        document.getElementById('taskStatusFilter').addEventListener('change', () => this.filterTasks());
        document.getElementById('taskProjectFilter').addEventListener('change', () => this.filterTasks());
        document.getElementById('addTask').addEventListener('click', () => this.showTaskModal());        
        // Botones del header principal
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        
        document.getElementById('toggle-mode').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        
        // Filtros de equipo
        document.getElementById('teamSearch').addEventListener('input', () => this.filterTeam());
        document.getElementById('teamSearchBtn').addEventListener('click', () => this.filterTeam());
        document.getElementById('roleFilter').addEventListener('change', () => this.filterTeam());
        document.getElementById('addMember').addEventListener('click', () => this.showMemberModal());
        
        // Modales de proyectos
        document.getElementById('closeProjectModal').addEventListener('click', () => this.hideProjectModal());
        document.getElementById('cancelProjectBtn').addEventListener('click', () => this.hideProjectModal());
        document.getElementById('projectForm').addEventListener('submit', (e) => this.handleProjectSubmit(e));
        
        // Modales de tareas
        document.getElementById('closeTaskModal').addEventListener('click', () => this.hideTaskModal());
        document.getElementById('cancelTaskBtn').addEventListener('click', () => this.hideTaskModal());
        document.getElementById('taskForm').addEventListener('submit', (e) => this.handleTaskSubmit(e));
        
        // Modales de miembros
        document.getElementById('closeMemberModal').addEventListener('click', () => this.hideMemberModal());
        document.getElementById('cancelMemberBtn').addEventListener('click', () => this.hideMemberModal());
        document.getElementById('memberForm').addEventListener('submit', (e) => this.handleMemberSubmit(e));
        
        // Cerrar modales al hacer clic fuera
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    this.hideAllModals();
                }
            });
        });
    }

    setupDateInputs() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('projectStartDate').value = today;
        document.getElementById('taskDueDate').value = this.getDueDate(today);
    }

    getDueDate(startDate) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + 7); // 7 días por defecto
        return date.toISOString().split('T')[0];
    }

    loadData() {
        // Cargar proyectos
        const savedProjects = localStorage.getItem('project_management_projects');
        if (savedProjects) {
            this.projects = JSON.parse(savedProjects);
        } else {
            this.projects = [
                {
                    id: 1,
                    name: 'Sistema de E-commerce',
                    status: 'En Progreso',
                    priority: 'Alta',
                    manager: 'Juan Pérez',
                    startDate: '2024-01-01',
                    endDate: '2024-03-31',
                    description: 'Desarrollo de una plataforma de comercio electrónico completa',
                    progress: 65,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'App Móvil de Delivery',
                    status: 'Planificación',
                    priority: 'Media',
                    manager: 'María García',
                    startDate: '2024-02-01',
                    endDate: '2024-05-31',
                    description: 'Aplicación móvil para servicio de delivery de comida',
                    progress: 15,
                    createdAt: new Date().toISOString()
                }
            ];
        }

        // Cargar tareas
        const savedTasks = localStorage.getItem('project_management_tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        } else {
            this.tasks = [
                {
                    id: 1,
                    title: 'Diseño de la base de datos',
                    projectId: 1,
                    assignee: 'Carlos López',
                    status: 'Completada',
                    priority: 'Alta',
                    dueDate: '2024-01-15',
                    description: 'Crear el esquema de la base de datos para el sistema de e-commerce',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Implementar autenticación',
                    projectId: 1,
                    assignee: 'Ana Martínez',
                    status: 'En Progreso',
                    priority: 'Alta',
                    dueDate: '2024-01-30',
                    description: 'Sistema de login y registro de usuarios',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Diseño de la interfaz',
                    projectId: 2,
                    assignee: 'Luis Rodríguez',
                    status: 'Pendiente',
                    priority: 'Media',
                    dueDate: '2024-02-15',
                    description: 'Crear mockups y prototipos de la app móvil',
                    createdAt: new Date().toISOString()
                }
            ];
        }

        // Cargar equipo
        const savedTeam = localStorage.getItem('project_management_team');
        if (savedTeam) {
            this.team = JSON.parse(savedTeam);
        } else {
            this.team = [
                {
                    id: 1,
                    name: 'Juan Pérez',
                    email: 'juan@email.com',
                    role: 'Product Manager',
                    phone: '+1234567890',
                    skills: 'Gestión de proyectos, Scrum, Agile',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'María García',
                    email: 'maria@email.com',
                    role: 'Desarrollador',
                    phone: '+1234567891',
                    skills: 'JavaScript, React, Node.js',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'Carlos López',
                    email: 'carlos@email.com',
                    role: 'Desarrollador',
                    phone: '+1234567892',
                    skills: 'Python, Django, PostgreSQL',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    name: 'Ana Martínez',
                    email: 'ana@email.com',
                    role: 'Diseñador',
                    phone: '+1234567893',
                    skills: 'UI/UX, Figma, Adobe Creative Suite',
                    createdAt: new Date().toISOString()
                }
            ];
        }

        this.saveData();
    }

    saveData() {
        localStorage.setItem('project_management_projects', JSON.stringify(this.projects));
        localStorage.setItem('project_management_tasks', JSON.stringify(this.tasks));
        localStorage.setItem('project_management_team', JSON.stringify(this.team));
    }

    generateId(type) {
        const collections = {
            'project': this.projects,
            'task': this.tasks,
            'member': this.team
        };
        return Math.max(...collections[type].map(item => item.id), 0) + 1;
    }

    updateStats() {
        const activeProjects = this.projects.filter(p => p.status === 'En Progreso').length;
        const completedProjects = this.projects.filter(p => p.status === 'Completado').length;
        const inProgressProjects = this.projects.filter(p => p.status === 'En Progreso').length;
        
        const pendingTasks = this.tasks.filter(t => t.status === 'Pendiente').length;
        const inProgressTasks = this.tasks.filter(t => t.status === 'En Progreso').length;
        const completedTasks = this.tasks.filter(t => t.status === 'Completada').length;
        
        document.getElementById('activeProjects').textContent = activeProjects;
        document.getElementById('completedProjects').textContent = completedProjects;
        document.getElementById('inProgressProjects').textContent = inProgressProjects;
        
        document.getElementById('pendingTasks').textContent = pendingTasks;
        document.getElementById('inProgressTasks').textContent = inProgressTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        
        // Actualizar selectores
        this.updateSelectors();
        
        // Actualizar reportes si estamos en esa pestaña
        if (this.currentTab === 'reports') {
            this.updateReports();
        }
    }

    updateSelectors() {
        // Actualizar selector de gerentes de proyecto
        const projectManagerSelect = document.getElementById('projectManager');
        projectManagerSelect.innerHTML = '<option value="">Seleccionar gerente</option>';
        this.team.forEach(member => {
            const option = document.createElement('option');
            option.value = member.name;
            option.textContent = member.name;
            projectManagerSelect.appendChild(option);
        });
        
        // Actualizar selector de proyectos para tareas
        const taskProjectSelect = document.getElementById('taskProject');
        taskProjectSelect.innerHTML = '<option value="">Seleccionar proyecto</option>';
        this.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            taskProjectSelect.appendChild(option);
        });
        
        // Actualizar selector de proyectos para filtros
        const taskProjectFilter = document.getElementById('taskProjectFilter');
        taskProjectFilter.innerHTML = '<option value="">Todos los proyectos</option>';
        this.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            taskProjectFilter.appendChild(option);
        });
        
        // Actualizar selector de asignados para tareas
        const taskAssigneeSelect = document.getElementById('taskAssignee');
        taskAssigneeSelect.innerHTML = '<option value="">Seleccionar asignado</option>';
        this.team.forEach(member => {
            const option = document.createElement('option');
            option.value = member.name;
            option.textContent = member.name;
            taskAssigneeSelect.appendChild(option);
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        
        // Actualizar botones de pestaña
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        // Mostrar contenido de pestaña
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tab}-tab`);
        });
        
        // Renderizar contenido según la pestaña
        switch (tab) {
            case 'projects':
                this.renderProjects();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'team':
                this.renderTeam();
                break;
            case 'reports':
                this.updateReports();
                break;
        }
    }

    renderProjects(projectsToRender = this.projects) {
        const container = document.getElementById('projectsContainer');
        if (!container) return;
        
        if (projectsToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">📋</div>
                    <h3>No hay proyectos</h3>
                    <p>Agrega tu primer proyecto para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = projectsToRender.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <h3 class="project-name">${project.name}</h3>
                    <span class="project-status ${project.status.toLowerCase().replace(' ', '-')}">
                        ${project.status}
                    </span>
                </div>
                <div class="project-priority ${project.priority.toLowerCase()}">${project.priority}</div>
                <p class="project-manager">Gerente: ${project.manager || 'Sin asignar'}</p>
                <div class="project-dates">
                    <div class="project-date">
                        <div class="project-date-label">Inicio</div>
                        <div class="project-date-value">${this.formatDate(project.startDate)}</div>
                    </div>
                    <div class="project-date">
                        <div class="project-date-label">Fin</div>
                        <div class="project-date-value">${this.formatDate(project.endDate)}</div>
                    </div>
                </div>
                <div class="project-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <div class="progress-text">${project.progress}% completado</div>
                </div>
                ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                <div class="project-actions">
                    <button class="action-btn view-btn" onclick="projectSystem.viewProject(${project.id})">
                        👁️ Ver
                    </button>
                    <button class="action-btn edit-btn" onclick="projectSystem.editProject(${project.id})">
                        ✏️ Editar
                    </button>
                    <button class="action-btn delete-btn" onclick="projectSystem.deleteProject(${project.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderTasks(tasksToRender = this.tasks) {
        const container = document.getElementById('tasksContainer');
        if (!container) return;
        
        if (tasksToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">✅</div>
                    <h3>No hay tareas</h3>
                    <p>Agrega tu primera tarea para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = tasksToRender.map(task => {
            const project = this.projects.find(p => p.id === task.projectId);
            return `
                <div class="task-card">
                    <div class="task-header">
                        <h3 class="task-title">${task.title}</h3>
                        <span class="task-status ${task.status.toLowerCase().replace(' ', '-')}">
                            ${task.status}
                        </span>
                    </div>
                    <div class="task-priority ${task.priority.toLowerCase()}">${task.priority}</div>
                    <div class="task-details">
                        <div class="task-detail">
                            <span class="task-detail-label">Proyecto:</span>
                            <span class="task-detail-value">${project ? project.name : 'Sin proyecto'}</span>
                        </div>
                        <div class="task-detail">
                            <span class="task-detail-label">Asignado:</span>
                            <span class="task-detail-value">${task.assignee || 'Sin asignar'}</span>
                        </div>
                        <div class="task-detail">
                            <span class="task-detail-label">Vencimiento:</span>
                            <span class="task-detail-value">${task.dueDate ? this.formatDate(task.dueDate) : 'Sin fecha'}</span>
                        </div>
                    </div>
                    ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                    <div class="task-actions">
                        <button class="action-btn edit-btn" onclick="projectSystem.editTask(${task.id})">
                            ✏️ Editar
                        </button>
                        <button class="action-btn delete-btn" onclick="projectSystem.deleteTask(${task.id})">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderTeam(membersToRender = this.team) {
        const container = document.getElementById('teamContainer');
        if (!container) return;
        
        if (membersToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">👥</div>
                    <h3>No hay miembros del equipo</h3>
                    <p>Agrega tu primer miembro para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = membersToRender.map(member => `
            <div class="member-card">
                <div class="member-avatar">${member.name.charAt(0).toUpperCase()}</div>
                <h3 class="member-name">${member.name}</h3>
                <div class="member-role">${member.role}</div>
                <div class="member-details">${member.email}</div>
                <div class="member-details">${member.phone || 'Sin teléfono'}</div>
                ${member.skills ? `<p class="member-skills">${member.skills}</p>` : ''}
                <div class="member-actions">
                    <button class="action-btn edit-btn" onclick="projectSystem.editMember(${member.id})">
                        ✏️ Editar
                    </button>
                    <button class="action-btn delete-btn" onclick="projectSystem.deleteMember(${member.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateReports() {
        // Progreso general
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.status === 'Completada').length;
        const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        document.getElementById('overallProgress').style.width = `${overallProgress}%`;
        document.getElementById('overallProgressText').textContent = `${overallProgress}%`;
        
        // Tareas por estado
        const taskStatusData = {
            'Pendiente': this.tasks.filter(t => t.status === 'Pendiente').length,
            'En Progreso': this.tasks.filter(t => t.status === 'En Progreso').length,
            'Completada': this.tasks.filter(t => t.status === 'Completada').length,
            'Bloqueada': this.tasks.filter(t => t.status === 'Bloqueada').length
        };
        
        const taskStatusChart = document.getElementById('taskStatusChart');
        taskStatusChart.innerHTML = Object.entries(taskStatusData).map(([status, count]) => `
            <div class="productivity-item">
                <span class="productivity-name">${status}</span>
                <span class="productivity-value">${count}</span>
            </div>
        `).join('');
        
        // Productividad del equipo
        const teamProductivity = document.getElementById('teamProductivity');
        const memberTasks = {};
        
        this.tasks.forEach(task => {
            if (task.assignee) {
                memberTasks[task.assignee] = (memberTasks[task.assignee] || 0) + 1;
            }
        });
        
        teamProductivity.innerHTML = Object.entries(memberTasks).map(([member, count]) => `
            <div class="productivity-item">
                <span class="productivity-name">${member}</span>
                <span class="productivity-value">${count} tareas</span>
            </div>
        `).join('');
        
        // Proyectos por prioridad
        const priorityData = {
            'Baja': this.projects.filter(p => p.priority === 'Baja').length,
            'Media': this.projects.filter(p => p.priority === 'Media').length,
            'Alta': this.projects.filter(p => p.priority === 'Alta').length,
            'Crítica': this.projects.filter(p => p.priority === 'Crítica').length
        };
        
        const priorityChart = document.getElementById('priorityChart');
        priorityChart.innerHTML = Object.entries(priorityData).map(([priority, count]) => `
            <div class="productivity-item">
                <span class="productivity-name">${priority}</span>
                <span class="productivity-value">${count}</span>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        if (!dateString) return 'Sin fecha';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    filterProjects() {
        const searchTerm = document.getElementById('projectSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;

        let filtered = this.projects.filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm) ||
                                project.description.toLowerCase().includes(searchTerm) ||
                                (project.manager && project.manager.toLowerCase().includes(searchTerm));
            
            const matchesStatus = !statusFilter || project.status === statusFilter;
            const matchesPriority = !priorityFilter || project.priority === priorityFilter;
            
            return matchesSearch && matchesStatus && matchesPriority;
        });

        this.renderProjects(filtered);
    }

    filterTasks() {
        const searchTerm = document.getElementById('taskSearch').value.toLowerCase();
        const statusFilter = document.getElementById('taskStatusFilter').value;
        const projectFilter = document.getElementById('taskProjectFilter').value;

        let filtered = this.tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm) ||
                                task.description.toLowerCase().includes(searchTerm) ||
                                (task.assignee && task.assignee.toLowerCase().includes(searchTerm));
            
            const matchesStatus = !statusFilter || task.status === statusFilter;
            const matchesProject = !projectFilter || task.projectId === parseInt(projectFilter);
            
            return matchesSearch && matchesStatus && matchesProject;
        });

        this.renderTasks(filtered);
    }

    filterTeam() {
        const searchTerm = document.getElementById('teamSearch').value.toLowerCase();
        const roleFilter = document.getElementById('roleFilter').value;

        let filtered = this.team.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchTerm) ||
                                member.email.toLowerCase().includes(searchTerm) ||
                                (member.skills && member.skills.toLowerCase().includes(searchTerm));
            
            const matchesRole = !roleFilter || member.role === roleFilter;
            
            return matchesSearch && matchesRole;
        });

        this.renderTeam(filtered);
    }

    clearProjectFilters() {
        document.getElementById('projectSearch').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('priorityFilter').value = '';
        this.renderProjects();
    }

    // Modales de proyectos
    showProjectModal(project = null) {
        this.editingProject = project;
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('projectModalTitle');
        const form = document.getElementById('projectForm');
        
        if (project) {
            title.textContent = 'Editar Proyecto';
            form.projectName.value = project.name;
            form.projectStatus.value = project.status;
            form.projectPriority.value = project.priority;
            form.projectManager.value = project.manager || '';
            form.projectStartDate.value = project.startDate || '';
            form.projectEndDate.value = project.endDate || '';
            form.projectDescription.value = project.description || '';
        } else {
            title.textContent = 'Nuevo Proyecto';
            form.reset();
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideProjectModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.editingProject = null;
    }

    handleProjectSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const projectData = {
            name: formData.get('projectName'),
            status: formData.get('projectStatus'),
            priority: formData.get('projectPriority'),
            manager: formData.get('projectManager'),
            startDate: formData.get('projectStartDate'),
            endDate: formData.get('projectEndDate'),
            description: formData.get('projectDescription'),
            progress: 0
        };

        if (this.editingProject) {
            // Editar proyecto existente
            const index = this.projects.findIndex(p => p.id === this.editingProject.id);
            this.projects[index] = { ...this.editingProject, ...projectData };
        } else {
            // Agregar nuevo proyecto
            const newProject = {
                id: this.generateId('project'),
                ...projectData,
                createdAt: new Date().toISOString()
            };
            this.projects.push(newProject);
        }

        this.saveData();
        this.updateStats();
        this.renderProjects();
        this.hideProjectModal();
        this.showNotification(
            this.editingProject ? 'Proyecto actualizado correctamente' : 'Proyecto creado correctamente',
            'success'
        );
    }

    editProject(id) {
        const project = this.projects.find(p => p.id === id);
        if (project) {
            this.showProjectModal(project);
        }
    }

    deleteProject(id) {
        const project = this.projects.find(p => p.id === id);
        if (project && confirm(`¿Estás seguro de que quieres eliminar "${project.name}"?`)) {
            this.projects = this.projects.filter(p => p.id !== id);
            // Eliminar tareas relacionadas
            this.tasks = this.tasks.filter(t => t.projectId !== id);
            this.saveData();
            this.updateStats();
            this.renderProjects();
            this.showNotification('Proyecto eliminado correctamente', 'success');
        }
    }

    viewProject(id) {
        this.showNotification('Vista detallada del proyecto próximamente disponible', 'info');
    }

    // Modales de tareas
    showTaskModal(task = null) {
        this.editingTask = task;
        const modal = document.getElementById('taskModal');
        const title = document.getElementById('taskModalTitle');
        const form = document.getElementById('taskForm');
        
        if (task) {
            title.textContent = 'Editar Tarea';
            form.taskTitle.value = task.title;
            form.taskProject.value = task.projectId || '';
            form.taskAssignee.value = task.assignee || '';
            form.taskStatus.value = task.status;
            form.taskPriority.value = task.priority;
            form.taskDueDate.value = task.dueDate || '';
            form.taskDescription.value = task.description || '';
        } else {
            title.textContent = 'Nueva Tarea';
            form.reset();
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideTaskModal() {
        const modal = document.getElementById('taskModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.editingTask = null;
    }

    handleTaskSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const taskData = {
            title: formData.get('taskTitle'),
            projectId: formData.get('taskProject') ? parseInt(formData.get('taskProject')) : null,
            assignee: formData.get('taskAssignee'),
            status: formData.get('taskStatus'),
            priority: formData.get('taskPriority'),
            dueDate: formData.get('taskDueDate'),
            description: formData.get('taskDescription')
        };

        if (this.editingTask) {
            // Editar tarea existente
            const index = this.tasks.findIndex(t => t.id === this.editingTask.id);
            this.tasks[index] = { ...this.editingTask, ...taskData };
        } else {
            // Agregar nueva tarea
            const newTask = {
                id: this.generateId('task'),
                ...taskData,
                createdAt: new Date().toISOString()
            };
            this.tasks.push(newTask);
        }

        this.saveData();
        this.updateStats();
        this.renderTasks();
        this.hideTaskModal();
        this.showNotification(
            this.editingTask ? 'Tarea actualizada correctamente' : 'Tarea creada correctamente',
            'success'
        );
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.showTaskModal(task);
        }
    }

    deleteTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task && confirm(`¿Estás seguro de que quieres eliminar "${task.title}"?`)) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveData();
            this.updateStats();
            this.renderTasks();
            this.showNotification('Tarea eliminada correctamente', 'success');
        }
    }

    // Modales de miembros
    showMemberModal(member = null) {
        this.editingMember = member;
        const modal = document.getElementById('memberModal');
        const title = document.getElementById('memberModalTitle');
        const form = document.getElementById('memberForm');
        
        if (member) {
            title.textContent = 'Editar Miembro';
            form.memberName.value = member.name;
            form.memberEmail.value = member.email;
            form.memberRole.value = member.role;
            form.memberPhone.value = member.phone || '';
            form.memberSkills.value = member.skills || '';
        } else {
            title.textContent = 'Nuevo Miembro';
            form.reset();
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideMemberModal() {
        const modal = document.getElementById('memberModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.editingMember = null;
    }

    handleMemberSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const memberData = {
            name: formData.get('memberName'),
            email: formData.get('memberEmail'),
            role: formData.get('memberRole'),
            phone: formData.get('memberPhone'),
            skills: formData.get('memberSkills')
        };

        if (this.editingMember) {
            // Editar miembro existente
            const index = this.team.findIndex(m => m.id === this.editingMember.id);
            this.team[index] = { ...this.editingMember, ...memberData };
        } else {
            // Agregar nuevo miembro
            const newMember = {
                id: this.generateId('member'),
                ...memberData,
                createdAt: new Date().toISOString()
            };
            this.team.push(newMember);
        }

        this.saveData();
        this.updateStats();
        this.renderTeam();
        this.hideMemberModal();
        this.showNotification(
            this.editingMember ? 'Miembro actualizado correctamente' : 'Miembro agregado correctamente',
            'success'
        );
    }

    editMember(id) {
        const member = this.team.find(m => m.id === id);
        if (member) {
            this.showMemberModal(member);
        }
    }

    deleteMember(id) {
        const member = this.team.find(m => m.id === id);
        if (member && confirm(`¿Estás seguro de que quieres eliminar a "${member.name}"?`)) {
            this.team = this.team.filter(m => m.id !== id);
            this.saveData();
            this.updateStats();
            this.renderTeam();
            this.showNotification('Miembro eliminado correctamente', 'success');
        }
    }

    showCalendar() {
        this.showNotification('Vista de calendario próximamente disponible', 'info');
    }

    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = 'auto';
    }

    showNotification(message, type = 'info') {
        // Usar la función común de notificaciones
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        }
    }
}

// Inicializar la aplicación
const projectSystem = new ProjectManagementSystem();

// Los estilos de notificaciones ya están en common.js
