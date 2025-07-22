class PortfolioCMS {
  constructor() {
    this.portfolio = JSON.parse(localStorage.getItem('portfolioData')) || this.getDefaultPortfolio();
    this.isEditMode = true;
    this.init();
  }

  getDefaultPortfolio() {
    return {
      name: 'Tu Nombre',
      title: 'Desarrollador Frontend',
      description: 'Apasionado desarrollador con experiencia en tecnologías web modernas.',
      email: 'tu@email.com',
      phone: '+1 234 567 8900',
      skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js'],
      projects: [],
      experience: []
    };
  }

  init() {
    this.bindEvents();
    this.loadPortfolioData();
    this.renderSkills();
    this.renderProjects();
    this.renderExperience();
  }

  bindEvents() {
    // Mode toggle
    document.getElementById('editMode').addEventListener('click', () => this.setEditMode(true));
    document.getElementById('previewMode').addEventListener('click', () => this.setEditMode(false));
    document.getElementById('savePortfolio').addEventListener('click', () => this.savePortfolio());

    // Skills
    document.getElementById('addSkill').addEventListener('click', () => this.addSkill());
    document.getElementById('skillInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addSkill();
    });

    // Projects and Experience
    document.getElementById('addProject').addEventListener('click', () => this.addProject());
    document.getElementById('addExperience').addEventListener('click', () => this.addExperience());
  }

  setEditMode(edit) {
    this.isEditMode = edit;
    const editor = document.getElementById('portfolioEditor');
    const preview = document.getElementById('portfolioPreview');
    
    if (edit) {
      editor.style.display = 'block';
      preview.style.display = 'none';
      document.getElementById('editMode').classList.add('btn-secondary');
      document.getElementById('previewMode').classList.remove('btn-secondary');
    } else {
      editor.style.display = 'none';
      preview.style.display = 'block';
      this.updatePreview();
      document.getElementById('previewMode').classList.add('btn-secondary');
      document.getElementById('editMode').classList.remove('btn-secondary');
    }
  }

  loadPortfolioData() {
    document.getElementById('name').value = this.portfolio.name;
    document.getElementById('title').value = this.portfolio.title;
    document.getElementById('description').value = this.portfolio.description;
    document.getElementById('email').value = this.portfolio.email;
    document.getElementById('phone').value = this.portfolio.phone;
  }

  addSkill() {
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    if (skill && !this.portfolio.skills.includes(skill)) {
      this.portfolio.skills.push(skill);
      this.renderSkills();
      skillInput.value = '';
    }
  }

  removeSkill(skill) {
    this.portfolio.skills = this.portfolio.skills.filter(s => s !== skill);
    this.renderSkills();
  }

  renderSkills() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = this.portfolio.skills.map(skill => `
      <div class="skill-tag">
        ${this.escapeHtml(skill)}
        <button class="remove-skill" onclick="portfolioCMS.removeSkill('${this.escapeHtml(skill)}')">×</button>
      </div>
    `).join('');
  }

  addProject() {
    const name = prompt('Nombre del proyecto:');
    if (!name) return;
    
    const description = prompt('Descripción del proyecto:');
    const liveUrl = prompt('URL en vivo (opcional):');
    const githubUrl = prompt('URL de GitHub (opcional):');
    
    const project = {
      id: Date.now(),
      name,
      description: description || '',
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || ''
    };
    
    this.portfolio.projects.push(project);
    this.renderProjects();
  }

  removeProject(id) {
    if (confirm('¿Eliminar este proyecto?')) {
      this.portfolio.projects = this.portfolio.projects.filter(p => p.id !== id);
      this.renderProjects();
    }
  }

  renderProjects() {
    const projectsList = document.getElementById('projectsList');
    
    if (this.portfolio.projects.length === 0) {
      projectsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No hay proyectos agregados</p>';
      return;
    }
    
    projectsList.innerHTML = this.portfolio.projects.map(project => `
      <div class="project-item">
        <button class="remove-item" onclick="portfolioCMS.removeProject(${project.id})">×</button>
        <h4>${this.escapeHtml(project.name)}</h4>
        <p>${this.escapeHtml(project.description)}</p>
        <div class="project-links">
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Ver en vivo</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">Código fuente</a>` : ''}
        </div>
      </div>
    `).join('');
  }

  addExperience() {
    const company = prompt('Empresa:');
    if (!company) return;
    
    const position = prompt('Posición:');
    const duration = prompt('Duración (ej: 2020-2022):');
    const description = prompt('Descripción:');
    
    const experience = {
      id: Date.now(),
      company,
      position: position || '',
      duration: duration || '',
      description: description || ''
    };
    
    this.portfolio.experience.push(experience);
    this.renderExperience();
  }

  removeExperience(id) {
    if (confirm('¿Eliminar esta experiencia?')) {
      this.portfolio.experience = this.portfolio.experience.filter(e => e.id !== id);
      this.renderExperience();
    }
  }

  renderExperience() {
    const experienceList = document.getElementById('experienceList');
    
    if (this.portfolio.experience.length === 0) {
      experienceList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No hay experiencia agregada</p>';
      return;
    }
    
    experienceList.innerHTML = this.portfolio.experience.map(exp => `
      <div class="experience-item">
        <button class="remove-item" onclick="portfolioCMS.removeExperience(${exp.id})">×</button>
        <h4>${this.escapeHtml(exp.position)} - ${this.escapeHtml(exp.company)}</h4>
        <p>${this.escapeHtml(exp.description)}</p>
        <div class="experience-dates">
          <span>${this.escapeHtml(exp.duration)}</span>
        </div>
      </div>
    `).join('');
  }

  updatePreview() {
    // Update basic info
    document.getElementById('previewName').textContent = this.portfolio.name;
    document.getElementById('previewTitle').textContent = this.portfolio.title;
    document.getElementById('previewDescription').textContent = this.portfolio.description;
    document.getElementById('previewEmail').textContent = this.portfolio.email;
    document.getElementById('previewPhone').textContent = this.portfolio.phone;

    // Update skills
    const skillsPreview = document.getElementById('skillsPreview');
    skillsPreview.innerHTML = this.portfolio.skills.map(skill => 
      `<span class="skill-preview">${this.escapeHtml(skill)}</span>`
    ).join('');

    // Update projects
    const projectsPreview = document.getElementById('projectsPreview');
    if (this.portfolio.projects.length === 0) {
      projectsPreview.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No hay proyectos</p>';
    } else {
      projectsPreview.innerHTML = this.portfolio.projects.map(project => `
        <div class="project-preview">
          <h4>${this.escapeHtml(project.name)}</h4>
          <p>${this.escapeHtml(project.description)}</p>
          <div class="project-links">
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Ver en vivo</a>` : ''}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">Código fuente</a>` : ''}
          </div>
        </div>
      `).join('');
    }

    // Update experience
    const experiencePreview = document.getElementById('experiencePreview');
    if (this.portfolio.experience.length === 0) {
      experiencePreview.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No hay experiencia</p>';
    } else {
      experiencePreview.innerHTML = this.portfolio.experience.map(exp => `
        <div class="experience-preview-item">
          <h4>${this.escapeHtml(exp.position)} - ${this.escapeHtml(exp.company)}</h4>
          <p>${this.escapeHtml(exp.description)}</p>
          <div class="experience-dates">
            <span>${this.escapeHtml(exp.duration)}</span>
          </div>
        </div>
      `).join('');
    }
  }

  savePortfolio() {
    // Update portfolio data from form
    this.portfolio.name = document.getElementById('name').value;
    this.portfolio.title = document.getElementById('title').value;
    this.portfolio.description = document.getElementById('description').value;
    this.portfolio.email = document.getElementById('email').value;
    this.portfolio.phone = document.getElementById('phone').value;

    // Save to localStorage
    localStorage.setItem('portfolioData', JSON.stringify(this.portfolio));
    
    // Show success message
    const saveBtn = document.getElementById('savePortfolio');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '¡Guardado!';
    saveBtn.style.background = '#10b981';
    
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.background = '';
    }, 2000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the CMS
const portfolioCMS = new PortfolioCMS();
