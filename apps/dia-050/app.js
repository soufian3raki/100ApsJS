class PasswordManager {
  constructor() {
    this.passwords = JSON.parse(localStorage.getItem('passwordManager')) || [];
    this.currentPasswordId = null;
    this.searchTerm = '';
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderPasswords();
  }

  bindEvents() {
    // Password generator
    document.getElementById('passwordLength').addEventListener('input', (e) => {
      document.getElementById('lengthValue').textContent = e.target.value;
    });

    document.getElementById('generateNew').addEventListener('click', () => {
      this.generatePassword();
    });

    document.getElementById('copyPassword').addEventListener('click', () => {
      this.copyToClipboard('generatedPassword');
    });

    // Generator controls
    ['includeUppercase', 'includeLowercase', 'includeNumbers', 'includeSymbols', 'excludeSimilar'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        this.generatePassword();
      });
    });

    // Password manager
    document.getElementById('searchPasswords').addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.renderPasswords();
    });

    document.getElementById('addPassword').addEventListener('click', () => {
      this.showAddForm();
    });

    // Modal events
    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('cancelPassword').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('savePassword').addEventListener('click', () => {
      this.savePassword();
    });

    document.getElementById('deletePassword').addEventListener('click', () => {
      this.deletePassword();
    });

    document.getElementById('togglePassword').addEventListener('click', () => {
      this.togglePasswordVisibility();
    });

    document.getElementById('generateForForm').addEventListener('click', () => {
      this.generatePasswordForForm();
    });

    // Close modal on outside click
    document.getElementById('passwordModal').addEventListener('click', (e) => {
      if (e.target.id === 'passwordModal') {
        this.closeModal();
      }
    });

    // Generate initial password
    this.generatePassword();
  }

  generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const excludeSimilar = document.getElementById('excludeSimilar').checked;

    let charset = '';
    if (includeUppercase) charset += excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += excludeSimilar ? 'abcdefghijkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += excludeSimilar ? '23456789' : '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      alert('Selecciona al menos un tipo de caracteres');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    document.getElementById('generatedPassword').value = password;
    this.updatePasswordStrength(password);
  }

  generatePasswordForForm() {
    this.generatePassword();
    const generatedPassword = document.getElementById('generatedPassword').value;
    document.getElementById('password').value = generatedPassword;
  }

  updatePasswordStrength(password) {
    const strength = this.calculatePasswordStrength(password);
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    strengthFill.className = 'strength-fill';
    strengthFill.style.width = strength.score + '%';

    if (strength.score < 25) {
      strengthFill.classList.add('strength-weak');
      strengthText.textContent = 'Débil';
    } else if (strength.score < 50) {
      strengthFill.classList.add('strength-fair');
      strengthText.textContent = 'Regular';
    } else if (strength.score < 75) {
      strengthFill.classList.add('strength-good');
      strengthText.textContent = 'Buena';
    } else {
      strengthFill.classList.add('strength-strong');
      strengthText.textContent = 'Muy Fuerte';
    }
  }

  calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];

    // Length
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Character variety
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;

    // Patterns
    if (!/(.)\1{2,}/.test(password)) score += 10; // No repeated characters
    if (!/123|abc|qwe/i.test(password)) score += 10; // No common sequences

    return { score: Math.min(score, 100), feedback };
  }

  copyToClipboard(inputId) {
    const input = document.getElementById(inputId);
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    try {
      document.execCommand('copy');
      this.showNotification('Contraseña copiada al portapapeles');
    } catch (err) {
      // Fallback for modern browsers
      navigator.clipboard.writeText(input.value).then(() => {
        this.showNotification('Contraseña copiada al portapapeles');
      });
    }
  }

  showAddForm() {
    this.currentPasswordId = null;
    this.openModal();
  }

  editPassword(id) {
    const password = this.passwords.find(p => p.id === id);
    if (!password) return;

    this.currentPasswordId = id;
    this.openModal(password);
  }

  openModal(password = null) {
    const modal = document.getElementById('passwordModal');
    const title = document.getElementById('modalTitle');
    const deleteBtn = document.getElementById('deletePassword');

    if (password) {
      title.textContent = 'Editar Contraseña';
      deleteBtn.style.display = 'inline-block';
      
      document.getElementById('serviceName').value = password.service;
      document.getElementById('username').value = password.username;
      document.getElementById('password').value = password.password;
      document.getElementById('website').value = password.website || '';
      document.getElementById('notes').value = password.notes || '';
      document.getElementById('category').value = password.category;
    } else {
      title.textContent = 'Agregar Contraseña';
      deleteBtn.style.display = 'none';
      
      document.getElementById('serviceName').value = '';
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('website').value = '';
      document.getElementById('notes').value = '';
      document.getElementById('category').value = 'personal';
    }

    modal.classList.add('show');
    document.getElementById('serviceName').focus();
  }

  closeModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.remove('show');
    this.currentPasswordId = null;
  }

  savePassword() {
    const service = document.getElementById('serviceName').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const website = document.getElementById('website').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const category = document.getElementById('category').value;

    if (!service || !username || !password) {
      alert('Por favor completa el servicio, usuario y contraseña');
      return;
    }

    const passwordData = {
      service,
      username,
      password,
      website,
      notes,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (this.currentPasswordId) {
      // Update existing password
      const passwordIndex = this.passwords.findIndex(p => p.id === this.currentPasswordId);
      if (passwordIndex !== -1) {
        this.passwords[passwordIndex] = {
          ...this.passwords[passwordIndex],
          ...passwordData,
          id: this.currentPasswordId
        };
      }
    } else {
      // Create new password
      const newPassword = {
        id: Date.now(),
        ...passwordData
      };
      this.passwords.unshift(newPassword);
    }

    this.savePasswords();
    this.renderPasswords();
    this.closeModal();
  }

  deletePassword() {
    if (!this.currentPasswordId) return;

    if (confirm('¿Estás seguro de que quieres eliminar esta contraseña?')) {
      this.passwords = this.passwords.filter(p => p.id !== this.currentPasswordId);
      this.savePasswords();
      this.renderPasswords();
      this.closeModal();
    }
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  }

  getFilteredPasswords() {
    if (!this.searchTerm) return this.passwords;
    
    return this.passwords.filter(password => 
      password.service.toLowerCase().includes(this.searchTerm) ||
      password.username.toLowerCase().includes(this.searchTerm) ||
      password.notes.toLowerCase().includes(this.searchTerm) ||
      password.category.toLowerCase().includes(this.searchTerm)
    );
  }

  renderPasswords() {
    const passwordsGrid = document.getElementById('passwordsGrid');
    const noPasswords = document.getElementById('noPasswords');
    const filteredPasswords = this.getFilteredPasswords();

    if (filteredPasswords.length === 0) {
      passwordsGrid.style.display = 'none';
      noPasswords.style.display = 'block';
      return;
    }

    passwordsGrid.style.display = 'grid';
    noPasswords.style.display = 'none';

    passwordsGrid.innerHTML = filteredPasswords.map(password => `
      <div class="password-card category-${password.category}" onclick="passwordManager.editPassword(${password.id})">
        <div class="service-name">${this.escapeHtml(password.service)}</div>
        <div class="username">${this.escapeHtml(password.username)}</div>
        <div class="password-display">
          <input type="password" value="${this.escapeHtml(password.password)}" readonly>
          <button onclick="event.stopPropagation(); passwordManager.copyToClipboard(this.previousElementSibling)" class="copy-btn">📋</button>
        </div>
        <div class="password-meta">
          <span>${this.formatDate(password.updatedAt)}</span>
          <span>${this.getCategoryName(password.category)}</span>
        </div>
        <div class="password-actions">
          <button class="edit-btn" onclick="event.stopPropagation(); passwordManager.editPassword(${password.id})" title="Editar">
            ✏️
          </button>
          <button class="delete-btn" onclick="event.stopPropagation(); passwordManager.deletePassword(${password.id})" title="Eliminar">
            🗑️
          </button>
        </div>
      </div>
    `).join('');
  }

  getCategoryName(category) {
    const categories = {
      personal: 'Personal',
      work: 'Trabajo',
      social: 'Redes Sociales',
      finance: 'Finanzas',
      entertainment: 'Entretenimiento',
      other: 'Otro'
    };
    return categories[category] || category;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Hoy';
    } else if (diffDays === 2) {
      return 'Ayer';
    } else if (diffDays <= 7) {
      return `Hace ${diffDays - 1} días`;
    } else {
      return date.toLocaleDateString();
    }
  }

  savePasswords() {
    localStorage.setItem('passwordManager', JSON.stringify(this.passwords));
  }

  showNotification(message) {
    // Simple notification - could be enhanced with a proper notification system
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the password manager
const passwordManager = new PasswordManager();
