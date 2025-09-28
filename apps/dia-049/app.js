class NotesApp {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('advancedNotes')) || [];
    this.currentNoteId = null;
    this.searchTerm = '';
    this.filterTag = '';
    this.sortBy = 'newest';
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateStats();
    this.renderNotes();
    this.updateTagFilter();
  }

  bindEvents() {
    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.renderNotes();
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
      this.renderNotes();
    });

    // Filters
    document.getElementById('tagFilter').addEventListener('change', (e) => {
      this.filterTag = e.target.value;
      this.renderNotes();
    });

    document.getElementById('sortBy').addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.renderNotes();
    });

    // New note
    document.getElementById('newNote').addEventListener('click', () => {
      this.createNewNote();
    });

    // Modal events
    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('cancelNote').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('saveNote').addEventListener('click', () => {
      this.saveNote();
    });

    document.getElementById('deleteNote').addEventListener('click', () => {
      this.deleteNote();
    });

    // Close modal on outside click
    document.getElementById('noteModal').addEventListener('click', (e) => {
      if (e.target.id === 'noteModal') {
        this.closeModal();
      }
    });
  }

  createNewNote() {
    this.currentNoteId = null;
    this.openModal();
  }

  editNote(id) {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    this.currentNoteId = id;
    this.openModal(note);
  }

  openModal(note = null) {
    const modal = document.getElementById('noteModal');
    const title = document.getElementById('modalTitle');
    const deleteBtn = document.getElementById('deleteNote');

    if (note) {
      title.textContent = 'Editar Nota';
      deleteBtn.style.display = 'inline-block';
      
      document.getElementById('noteTitle').value = note.title;
      document.getElementById('noteContent').value = note.content;
      document.getElementById('noteTags').value = note.tags.join(', ');
      document.getElementById('noteFavorite').checked = note.favorite;
      document.getElementById('noteColor').value = note.color;
    } else {
      title.textContent = 'Nueva Nota';
      deleteBtn.style.display = 'none';
      
      document.getElementById('noteTitle').value = '';
      document.getElementById('noteContent').value = '';
      document.getElementById('noteTags').value = '';
      document.getElementById('noteFavorite').checked = false;
      document.getElementById('noteColor').value = 'default';
    }

    modal.classList.add('show');
    document.getElementById('noteTitle').focus();
  }

  closeModal() {
    const modal = document.getElementById('noteModal');
    modal.classList.remove('show');
    this.currentNoteId = null;
  }

  saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const tagsInput = document.getElementById('noteTags').value.trim();
    const favorite = document.getElementById('noteFavorite').checked;
    const color = document.getElementById('noteColor').value;

    if (!title || !content) {
      alert('Por favor completa el título y contenido');
      return;
    }

    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    const noteData = {
      title,
      content,
      tags,
      favorite,
      color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (this.currentNoteId) {
      // Update existing note
      const noteIndex = this.notes.findIndex(n => n.id === this.currentNoteId);
      if (noteIndex !== -1) {
        this.notes[noteIndex] = {
          ...this.notes[noteIndex],
          ...noteData,
          id: this.currentNoteId
        };
      }
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        ...noteData
      };
      this.notes.unshift(newNote);
    }

    this.saveNotes();
    this.updateStats();
    this.updateTagFilter();
    this.renderNotes();
    this.closeModal();
  }

  deleteNote() {
    if (!this.currentNoteId) return;

    if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
      this.saveNotes();
      this.updateStats();
      this.updateTagFilter();
      this.renderNotes();
      this.closeModal();
    }
  }

  toggleFavorite(id) {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.favorite = !note.favorite;
      note.updatedAt = new Date().toISOString();
      this.saveNotes();
      this.updateStats();
      this.renderNotes();
    }
  }

  getFilteredNotes() {
    let filtered = [...this.notes];

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(this.searchTerm) ||
        note.content.toLowerCase().includes(this.searchTerm) ||
        note.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
      );
    }

    // Tag filter
    if (this.filterTag) {
      filtered = filtered.filter(note => 
        note.tags.includes(this.filterTag)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'oldest':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }

  renderNotes() {
    const notesGrid = document.getElementById('notesGrid');
    const noNotes = document.getElementById('noNotes');
    const filteredNotes = this.getFilteredNotes();

    if (filteredNotes.length === 0) {
      notesGrid.style.display = 'none';
      noNotes.style.display = 'block';
      return;
    }

    notesGrid.style.display = 'grid';
    noNotes.style.display = 'none';

    notesGrid.innerHTML = filteredNotes.map(note => `
      <div class="note-card ${note.color !== 'default' ? `color-${note.color}` : ''} ${note.favorite ? 'favorite' : ''}" 
           onclick="notesApp.editNote(${note.id})">
        <div class="note-title">${this.escapeHtml(note.title)}</div>
        <div class="note-content">${this.escapeHtml(note.content)}</div>
        <div class="note-tags">
          ${note.tags.map(tag => `<span class="note-tag">${this.escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="note-meta">
          <span>${this.formatDate(note.updatedAt)}</span>
          <div class="note-actions">
            <button class="edit-btn" onclick="event.stopPropagation(); notesApp.editNote(${note.id})" title="Editar">
              ✏️
            </button>
            <button class="favorite-btn" onclick="event.stopPropagation(); notesApp.toggleFavorite(${note.id})" title="Favorita">
              ${note.favorite ? '⭐' : '☆'}
            </button>
            <button class="delete-btn" onclick="event.stopPropagation(); notesApp.deleteNote(${note.id})" title="Eliminar">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  updateStats() {
    const total = this.notes.length;
    const tagged = this.notes.filter(note => note.tags.length > 0).length;
    const favorites = this.notes.filter(note => note.favorite).length;

    document.getElementById('totalNotes').textContent = total;
    document.getElementById('taggedNotes').textContent = tagged;
    document.getElementById('favoriteNotes').textContent = favorites;
  }

  updateTagFilter() {
    const tagFilter = document.getElementById('tagFilter');
    const allTags = [...new Set(this.notes.flatMap(note => note.tags))].sort();

    // Keep current selection
    const currentValue = tagFilter.value;

    // Update options
    tagFilter.innerHTML = '<option value="">Todas las etiquetas</option>' +
      allTags.map(tag => `<option value="${this.escapeHtml(tag)}">${this.escapeHtml(tag)}</option>`).join('');

    // Restore selection if still valid
    if (allTags.includes(currentValue)) {
      tagFilter.value = currentValue;
    }
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

  saveNotes() {
    localStorage.setItem('advancedNotes', JSON.stringify(this.notes));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the notes app
const notesApp = new NotesApp();
