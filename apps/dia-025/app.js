// Note Taking App
let notes = [];
let currentNote = null;
let stats = {
  totalNotes: 0,
  totalWords: 0,
  avgWords: 0
};

// Elements
const notesListEl = document.getElementById('notesList');
const newNoteBtn = document.getElementById('newNoteBtn');
const searchInputEl = document.getElementById('searchInput');
const noteTitleEl = document.getElementById('noteTitle');
const noteContentEl = document.getElementById('noteContent');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');
const shareBtn = document.getElementById('shareBtn');
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const lastModifiedEl = document.getElementById('lastModified');
const totalNotesEl = document.getElementById('totalNotes');
const totalWordsEl = document.getElementById('totalWords');
const avgWordsEl = document.getElementById('avgWords');
const recentListEl = document.getElementById('recentList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
  updateStats();
  updateNotesList();
  updateRecentList();
  
  // Event listeners
  newNoteBtn.addEventListener('click', createNewNote);
  saveBtn.addEventListener('click', saveNote);
  deleteBtn.addEventListener('click', deleteNote);
  shareBtn.addEventListener('click', shareNote);
  searchInputEl.addEventListener('input', searchNotes);
  noteTitleEl.addEventListener('input', updateCounts);
  noteContentEl.addEventListener('input', updateCounts);
});

function createNewNote() {
  const newNote = {
    id: Date.now(),
    title: 'Untitled Note',
    content: '',
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString()
  };
  
  notes.unshift(newNote);
  currentNote = newNote;
  
  saveNotes();
  updateNotesList();
  updateEditor();
  updateStats();
}

function saveNote() {
  if (!currentNote) return;
  
  currentNote.title = noteTitleEl.value || 'Untitled Note';
  currentNote.content = noteContentEl.value;
  currentNote.modifiedAt = new Date().toISOString();
  
  // Update the note in the array
  const index = notes.findIndex(note => note.id === currentNote.id);
  if (index !== -1) {
    notes[index] = currentNote;
  }
  
  saveNotes();
  updateNotesList();
  updateRecentList();
  updateStats();
  updateCounts();
  
  // Show save confirmation
  saveBtn.textContent = '✓ Saved';
  setTimeout(() => {
    saveBtn.textContent = '💾 Save';
  }, 1000);
}

function deleteNote() {
  if (!currentNote) return;
  
  if (confirm('Are you sure you want to delete this note?')) {
    notes = notes.filter(note => note.id !== currentNote.id);
    currentNote = notes.length > 0 ? notes[0] : null;
    
    saveNotes();
    updateNotesList();
    updateEditor();
    updateStats();
  }
}

function shareNote() {
  if (!currentNote) return;
  
  const text = `${currentNote.title}\n\n${currentNote.content}`;
  
  if (navigator.share) {
    navigator.share({
      title: currentNote.title,
      text: currentNote.content
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      shareBtn.textContent = '✓ Copied';
      setTimeout(() => {
        shareBtn.textContent = '📤 Share';
      }, 1000);
    });
  }
}

function selectNote(noteId) {
  currentNote = notes.find(note => note.id === noteId);
  updateEditor();
  updateNotesList();
}

function updateEditor() {
  if (currentNote) {
    noteTitleEl.value = currentNote.title;
    noteContentEl.value = currentNote.content;
    updateCounts();
  } else {
    noteTitleEl.value = '';
    noteContentEl.value = '';
    updateCounts();
  }
}

function updateCounts() {
  const content = noteContentEl.value;
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  
  wordCountEl.textContent = `${words} words`;
  charCountEl.textContent = `${chars} characters`;
  
  if (currentNote) {
    const date = new Date(currentNote.modifiedAt).toLocaleString();
    lastModifiedEl.textContent = `Last modified: ${date}`;
  } else {
    lastModifiedEl.textContent = 'Last modified: Never';
  }
}

function searchNotes() {
  const searchTerm = searchInputEl.value.toLowerCase();
  const noteItems = notesListEl.querySelectorAll('.note-item');
  
  noteItems.forEach(item => {
    const title = item.querySelector('.note-title').textContent.toLowerCase();
    const preview = item.querySelector('.note-preview').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || preview.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function updateNotesList() {
  notesListEl.innerHTML = '';
  
  notes.forEach(note => {
    const item = document.createElement('div');
    item.className = 'note-item';
    if (currentNote && note.id === currentNote.id) {
      item.classList.add('active');
    }
    
    const preview = note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '');
    const date = new Date(note.modifiedAt).toLocaleDateString();
    
    item.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-preview">${preview}</div>
      <div class="note-date">${date}</div>
    `;
    
    item.addEventListener('click', () => selectNote(note.id));
    notesListEl.appendChild(item);
  });
}

function updateRecentList() {
  recentListEl.innerHTML = '';
  
  const recentNotes = notes.slice(0, 5);
  
  recentNotes.forEach(note => {
    const item = document.createElement('div');
    item.className = 'recent-item';
    
    const preview = note.content.substring(0, 30) + (note.content.length > 30 ? '...' : '');
    const date = new Date(note.modifiedAt).toLocaleDateString();
    
    item.innerHTML = `
      <div class="recent-title">${note.title}</div>
      <div class="recent-preview">${preview}</div>
      <div class="note-date">${date}</div>
    `;
    
    item.addEventListener('click', () => selectNote(note.id));
    recentListEl.appendChild(item);
  });
}

function updateStats() {
  stats.totalNotes = notes.length;
  stats.totalWords = notes.reduce((total, note) => {
    return total + (note.content.trim() ? note.content.trim().split(/\s+/).length : 0);
  }, 0);
  stats.avgWords = notes.length > 0 ? Math.round(stats.totalWords / notes.length) : 0;
  
  totalNotesEl.textContent = stats.totalNotes;
  totalWordsEl.textContent = stats.totalWords;
  avgWordsEl.textContent = stats.avgWords;
}

function saveNotes() {
  localStorage.setItem('notes-data', JSON.stringify(notes));
}

function loadNotes() {
  const saved = localStorage.getItem('notes-data');
  if (saved) {
    notes = JSON.parse(saved);
    if (notes.length > 0) {
      currentNote = notes[0];
    }
  }
} 