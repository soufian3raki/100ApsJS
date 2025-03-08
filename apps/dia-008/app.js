// Elementos del DOM
const searchInput = document.getElementById('search-input');
const newNoteBtn = document.getElementById('new-note');
const sortNotesBtn = document.getElementById('sort-notes');
const notesList = document.getElementById('notes-list');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const saveNoteBtn = document.getElementById('save-note');
const deleteNoteBtn = document.getElementById('delete-note');
const noteDate = document.getElementById('note-date');
const noteLength = document.getElementById('note-length');

// Estadísticas
const totalNotesEl = document.getElementById('total-notes');
const totalWordsEl = document.getElementById('total-words');
const totalCharsEl = document.getElementById('total-chars');

// Estado de la aplicación
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentNoteId = null;
let currentFilter = '';

// Función para guardar notas en localStorage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Función para generar ID único
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para crear nueva nota
function createNewNote() {
  const note = {
    id: generateId(),
    title: 'Nueva Nota',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  notes.unshift(note);
  saveNotes();
  renderNotesList();
  selectNote(note.id);
  updateStats();
  
  // Enfocar en el título
  setTimeout(() => {
    noteTitle.focus();
    noteTitle.select();
  }, 100);
}

// Función para seleccionar nota
function selectNote(id) {
  currentNoteId = id;
  const note = notes.find(n => n.id === id);
  
  if (note) {
    noteTitle.value = note.title;
    noteContent.value = note.content;
    noteDate.textContent = formatDate(new Date(note.updatedAt));
    updateNoteLength();
    
    // Actualizar clases activas
    document.querySelectorAll('.note-item').forEach(item => {
      item.classList.toggle('active', item.dataset.id === id);
    });
  }
}

// Función para guardar nota actual
function saveCurrentNote() {
  if (!currentNoteId) return;
  
  const noteIndex = notes.findIndex(n => n.id === currentNoteId);
  if (noteIndex === -1) return;
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title: noteTitle.value.trim() || 'Sin título',
    content: noteContent.value,
    updatedAt: new Date().toISOString()
  };
  
  saveNotes();
  renderNotesList();
  updateStats();
  
  // Mostrar notificación
  showNotification('Nota guardada');
}

// Función para eliminar nota actual
function deleteCurrentNote() {
  if (!currentNoteId) return;
  
  if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
    notes = notes.filter(n => n.id !== currentNoteId);
    saveNotes();
    renderNotesList();
    updateStats();
    
    // Limpiar editor
    clearEditor();
    
    showNotification('Nota eliminada');
  }
}

// Función para limpiar editor
function clearEditor() {
  currentNoteId = null;
  noteTitle.value = '';
  noteContent.value = '';
  noteDate.textContent = 'Sin fecha';
  noteLength.textContent = '0 caracteres';
  
  // Remover clases activas
  document.querySelectorAll('.note-item').forEach(item => {
    item.classList.remove('active');
  });
}

// Función para renderizar lista de notas
function renderNotesList() {
  let filteredNotes = notes;
  
  // Aplicar filtro de búsqueda
  if (currentFilter) {
    const filterLower = currentFilter.toLowerCase();
    filteredNotes = notes.filter(note => 
      note.title.toLowerCase().includes(filterLower) ||
      note.content.toLowerCase().includes(filterLower)
    );
  }
  
  notesList.innerHTML = '';
  
  if (filteredNotes.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-message';
    
    if (currentFilter) {
      emptyMessage.innerHTML = `
        <div class="empty-icon">🔍</div>
        <h3>No se encontraron notas</h3>
        <p>Intenta con otros términos de búsqueda</p>
      `;
    } else {
      emptyMessage.innerHTML = `
        <div class="empty-icon">📝</div>
        <h3>No hay notas</h3>
        <p>¡Crea tu primera nota para comenzar!</p>
      `;
    }
    
    notesList.appendChild(emptyMessage);
    return;
  }
  
  filteredNotes.forEach(note => {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.dataset.id = note.id;
    
    const preview = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');
    const date = formatDate(new Date(note.updatedAt));
    
    noteItem.innerHTML = `
      <div class="note-item-header">
        <h3 class="note-item-title">${note.title}</h3>
        <span class="note-item-date">${date}</span>
      </div>
      <p class="note-item-preview">${preview}</p>
    `;
    
    noteItem.addEventListener('click', () => {
      selectNote(note.id);
    });
    
    notesList.appendChild(noteItem);
  });
}

// Función para actualizar estadísticas
function updateStats() {
  const totalNotes = notes.length;
  const totalWords = notes.reduce((sum, note) => {
    return sum + (note.content.match(/\S+/g) || []).length;
  }, 0);
  const totalChars = notes.reduce((sum, note) => {
    return sum + note.content.length;
  }, 0);
  
  totalNotesEl.textContent = totalNotes;
  totalWordsEl.textContent = totalWords;
  totalCharsEl.textContent = totalChars;
}

// Función para actualizar longitud de nota actual
function updateNoteLength() {
  const length = noteContent.value.length;
  noteLength.textContent = `${length} caracteres`;
}

// Función para formatear fecha
function formatDate(date) {
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    if (diffInHours < 1) {
      return 'Hace un momento';
    } else {
      return `Hace ${diffInHours}h`;
    }
  } else {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  }
}

// Función para ordenar notas
function sortNotes() {
  const sortOptions = [
    { label: 'Más recientes', value: 'recent' },
    { label: 'Más antiguas', value: 'old' },
    { label: 'A-Z', value: 'az' },
    { label: 'Z-A', value: 'za' }
  ];
  
  const currentSort = localStorage.getItem('notesSort') || 'recent';
  const currentIndex = sortOptions.findIndex(opt => opt.value === currentSort);
  const nextIndex = (currentIndex + 1) % sortOptions.length;
  const nextSort = sortOptions[nextIndex].value;
  
  localStorage.setItem('notesSort', nextSort);
  
  // Aplicar ordenamiento
  switch (nextSort) {
    case 'recent':
      notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      break;
    case 'old':
      notes.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      break;
    case 'az':
      notes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'za':
      notes.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }
  
  saveNotes();
  renderNotesList();
  
  // Actualizar texto del botón
  sortNotesBtn.textContent = `📊 ${sortOptions[nextIndex].label}`;
  
  showNotification(`Ordenado por: ${sortOptions[nextIndex].label}`);
}

// Función para mostrar notificaciones
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Event listeners
newNoteBtn.addEventListener('click', createNewNote);
saveNoteBtn.addEventListener('click', saveCurrentNote);
deleteNoteBtn.addEventListener('click', deleteCurrentNote);
sortNotesBtn.addEventListener('click', sortNotes);

searchInput.addEventListener('input', (e) => {
  currentFilter = e.target.value;
  renderNotesList();
});

noteTitle.addEventListener('input', () => {
  if (currentNoteId) {
    // Auto-guardar después de un delay
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(saveCurrentNote, 1000);
  }
});

noteContent.addEventListener('input', () => {
  updateNoteLength();
  
  if (currentNoteId) {
    // Auto-guardar después de un delay
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(saveCurrentNote, 1000);
  }
});

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 's':
        e.preventDefault();
        saveCurrentNote();
        break;
      case 'n':
        e.preventDefault();
        createNewNote();
        break;
      case 'f':
        e.preventDefault();
        searchInput.focus();
        break;
    }
  }
  
  if (e.key === 'Escape') {
    searchInput.blur();
    noteTitle.blur();
    noteContent.blur();
  }
});

// Cargar ordenamiento guardado
const savedSort = localStorage.getItem('notesSort') || 'recent';
if (savedSort !== 'recent') {
  sortNotes();
}

// Inicializar
renderNotesList();
updateStats(); 