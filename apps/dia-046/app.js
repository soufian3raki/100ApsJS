class BookLibrary {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderStats();
    this.renderBooks();
  }

  bindEvents() {
    // Form submission
    document.getElementById('bookForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addBook();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setFilter(e.target.dataset.filter);
      });
    });
  }

  addBook() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const status = document.getElementById('status').value;
    const rating = parseInt(document.getElementById('rating').value) || null;
    const notes = document.getElementById('notes').value.trim();

    if (!title || !author) {
      alert('Por favor completa el título y autor');
      return;
    }

    const book = {
      id: Date.now(),
      title,
      author,
      status,
      rating,
      notes,
      dateAdded: new Date().toISOString()
    };

    this.books.unshift(book);
    this.saveBooks();
    this.clearForm();
    this.renderStats();
    this.renderBooks();
  }

  clearForm() {
    document.getElementById('bookForm').reset();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    this.renderBooks();
  }

  getFilteredBooks() {
    if (this.currentFilter === 'all') {
      return this.books;
    }
    return this.books.filter(book => book.status === this.currentFilter);
  }

  renderBooks() {
    const booksGrid = document.getElementById('booksGrid');
    const filteredBooks = this.getFilteredBooks();

    if (filteredBooks.length === 0) {
      booksGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
          <p>No hay libros en esta categoría</p>
        </div>
      `;
      return;
    }

    booksGrid.innerHTML = filteredBooks.map(book => `
      <div class="book-card">
        <div class="book-title">${this.escapeHtml(book.title)}</div>
        <div class="book-author">por ${this.escapeHtml(book.author)}</div>
        <div class="book-status status-${book.status}">
          ${this.getStatusText(book.status)}
        </div>
        ${book.rating ? this.renderRating(book.rating) : ''}
        ${book.notes ? `<div class="book-notes">${this.escapeHtml(book.notes)}</div>` : ''}
        <div class="book-actions">
          <button class="edit-btn" onclick="bookLibrary.editBook(${book.id})">Editar</button>
          <button class="delete-btn" onclick="bookLibrary.deleteBook(${book.id})">Eliminar</button>
        </div>
      </div>
    `).join('');
  }

  renderRating(rating) {
    return `
      <div class="book-rating">
        ${Array.from({length: 5}, (_, i) => 
          `<span class="star ${i < rating ? '' : 'empty'}">★</span>`
        ).join('')}
      </div>
    `;
  }

  getStatusText(status) {
    const statusMap = {
      'to-read': 'Por leer',
      'reading': 'Leyendo',
      'read': 'Leído'
    };
    return statusMap[status] || status;
  }

  renderStats() {
    const stats = this.calculateStats();
    
    // Create or update stats section
    let statsSection = document.querySelector('.stats');
    if (!statsSection) {
      statsSection = document.createElement('div');
      statsSection.className = 'stats';
      document.querySelector('.app-content').insertBefore(statsSection, document.querySelector('.filters'));
    }

    statsSection.innerHTML = `
      <div class="stat-card">
        <div class="stat-number">${stats.total}</div>
        <div class="stat-label">Total Libros</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${stats.read}</div>
        <div class="stat-label">Leídos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${stats.reading}</div>
        <div class="stat-label">Leyendo</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${stats.toRead}</div>
        <div class="stat-label">Por leer</div>
      </div>
    `;
  }

  calculateStats() {
    return {
      total: this.books.length,
      read: this.books.filter(book => book.status === 'read').length,
      reading: this.books.filter(book => book.status === 'reading').length,
      toRead: this.books.filter(book => book.status === 'to-read').length
    };
  }

  editBook(id) {
    const book = this.books.find(b => b.id === id);
    if (!book) return;

    // Fill form with book data
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('status').value = book.status;
    document.getElementById('rating').value = book.rating || '';
    document.getElementById('notes').value = book.notes;

    // Remove book from list
    this.deleteBook(id, false);

    // Scroll to form
    document.querySelector('.book-form').scrollIntoView({ behavior: 'smooth' });
  }

  deleteBook(id, confirm = true) {
    if (confirm && !window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      return;
    }

    this.books = this.books.filter(book => book.id !== id);
    this.saveBooks();
    this.renderStats();
    this.renderBooks();
  }

  saveBooks() {
    localStorage.setItem('bookLibrary', JSON.stringify(this.books));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the library
const bookLibrary = new BookLibrary();
