class LibraryManagementSystem {
    constructor() {
        this.books = [];
        this.members = [];
        this.loans = [];
        this.currentTab = 'books';
        this.currentView = 'grid';
        this.editingBook = null;
        this.editingMember = null;
        
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateStats();
        this.renderBooks();
        this.setupDateInputs();
    }

    bindEvents() {
        // Navegación por pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Botones principales
        const addBookBtn = document.createElement('button');
        addBookBtn.textContent = '+ Agregar Libro';
        addBookBtn.className = 'btn btn-primary';
        addBookBtn.addEventListener('click', () => this.showBookModal());
        
        const addMemberBtn = document.createElement('button');
        addMemberBtn.textContent = '👤 Nuevo Miembro';
        addMemberBtn.className = 'btn btn-secondary';
        addMemberBtn.addEventListener('click', () => this.showMemberModal());
        
        // Agregar botones debajo del header
        const headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        headerActions.appendChild(addBookBtn);
        headerActions.appendChild(addMemberBtn);
        
        // Insertar después del header
        const header = document.querySelector('header');
        header.insertAdjacentElement('afterend', headerActions);
        
        // Filtros de libros
        document.getElementById('bookSearch').addEventListener('input', () => this.filterBooks());
        document.getElementById('bookSearchBtn').addEventListener('click', () => this.filterBooks());
        document.getElementById('genreFilter').addEventListener('change', () => this.filterBooks());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterBooks());
        document.getElementById('clearBookFilters').addEventListener('click', () => this.clearBookFilters());        
        // Botones del header principal
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        
        document.getElementById('toggle-mode').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        
        // Filtros de miembros
        document.getElementById('memberSearch').addEventListener('input', () => this.filterMembers());
        document.getElementById('memberSearchBtn').addEventListener('click', () => this.filterMembers());
        document.getElementById('memberTypeFilter').addEventListener('change', () => this.filterMembers());
        document.getElementById('clearMemberFilters').addEventListener('click', () => this.clearMemberFilters());        
        // Botones del header principal
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        
        document.getElementById('toggle-mode').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        
        // Filtros de préstamos
        document.getElementById('loanSearch').addEventListener('input', () => this.filterLoans());
        document.getElementById('loanSearchBtn').addEventListener('click', () => this.filterLoans());
        document.getElementById('loanStatusFilter').addEventListener('change', () => this.filterLoans());
        document.getElementById('clearLoanFilters').addEventListener('click', () => this.clearLoanFilters());
        
        // Vista
        document.getElementById('gridView').addEventListener('click', () => this.setView('grid'));
        document.getElementById('listView').addEventListener('click', () => this.setView('list'));
        
        // Modales de libros
        document.getElementById('closeBookModal').addEventListener('click', () => this.hideBookModal());
        document.getElementById('cancelBookBtn').addEventListener('click', () => this.hideBookModal());
        document.getElementById('bookForm').addEventListener('submit', (e) => this.handleBookSubmit(e));
        
        // Modales de miembros
        document.getElementById('closeMemberModal').addEventListener('click', () => this.hideMemberModal());
        document.getElementById('cancelMemberBtn').addEventListener('click', () => this.hideMemberModal());
        document.getElementById('memberForm').addEventListener('submit', (e) => this.handleMemberSubmit(e));
        
        // Modales de préstamos
        document.getElementById('closeLoanModal').addEventListener('click', () => this.hideLoanModal());
        document.getElementById('cancelLoanBtn').addEventListener('click', () => this.hideLoanModal());
        document.getElementById('loanForm').addEventListener('submit', (e) => this.handleLoanSubmit(e));
        
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
        document.getElementById('loanDate').value = today;
        document.getElementById('dueDate').value = this.getDueDate(today);
    }

    getDueDate(loanDate) {
        const date = new Date(loanDate);
        date.setDate(date.getDate() + 14); // 14 días de préstamo
        return date.toISOString().split('T')[0];
    }

    loadData() {
        // Cargar libros
        const savedBooks = localStorage.getItem('library_books');
        if (savedBooks) {
            this.books = JSON.parse(savedBooks);
        } else {
            this.books = [
                {
                    id: 1,
                    title: 'El Quijote',
                    author: 'Miguel de Cervantes',
                    isbn: '978-84-376-0494-7',
                    genre: 'Ficción',
                    year: 1605,
                    copies: 3,
                    availableCopies: 2,
                    description: 'Obra maestra de la literatura española'
                },
                {
                    id: 2,
                    title: 'Cien años de soledad',
                    author: 'Gabriel García Márquez',
                    isbn: '978-84-376-0495-4',
                    genre: 'Ficción',
                    year: 1967,
                    copies: 2,
                    availableCopies: 1,
                    description: 'Novela del realismo mágico'
                },
                {
                    id: 3,
                    title: 'Breve historia del tiempo',
                    author: 'Stephen Hawking',
                    isbn: '978-84-376-0496-1',
                    genre: 'Ciencia',
                    year: 1988,
                    copies: 1,
                    availableCopies: 1,
                    description: 'Divulgación científica sobre cosmología'
                }
            ];
        }

        // Cargar miembros
        const savedMembers = localStorage.getItem('library_members');
        if (savedMembers) {
            this.members = JSON.parse(savedMembers);
        } else {
            this.members = [
                {
                    id: 1,
                    name: 'Juan Pérez',
                    email: 'juan@email.com',
                    phone: '+1234567890',
                    type: 'Estudiante',
                    memberId: 'LIB001',
                    address: 'Calle Principal 123',
                    joinDate: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'María García',
                    email: 'maria@email.com',
                    phone: '+1234567891',
                    type: 'Profesor',
                    memberId: 'LIB002',
                    address: 'Avenida Central 456',
                    joinDate: new Date().toISOString()
                }
            ];
        }

        // Cargar préstamos
        const savedLoans = localStorage.getItem('library_loans');
        if (savedLoans) {
            this.loans = JSON.parse(savedLoans);
        } else {
            this.loans = [
                {
                    id: 1,
                    bookId: 1,
                    memberId: 1,
                    loanDate: '2024-01-10',
                    dueDate: '2024-01-24',
                    returnDate: null,
                    status: 'Activo'
                }
            ];
        }

        this.saveData();
    }

    saveData() {
        localStorage.setItem('library_books', JSON.stringify(this.books));
        localStorage.setItem('library_members', JSON.stringify(this.members));
        localStorage.setItem('library_loans', JSON.stringify(this.loans));
    }

    generateId(type) {
        const collections = {
            'book': this.books,
            'member': this.members,
            'loan': this.loans
        };
        return Math.max(...collections[type].map(item => item.id), 0) + 1;
    }

    generateMemberId() {
        const lastMember = this.members[this.members.length - 1];
        if (lastMember && lastMember.memberId) {
            const num = parseInt(lastMember.memberId.replace('LIB', '')) + 1;
            return `LIB${num.toString().padStart(3, '0')}`;
        }
        return 'LIB001';
    }

    getBookStatus(book) {
        if (book.availableCopies === 0) {
            return 'Prestado';
        }
        return 'Disponible';
    }

    updateStats() {
        // Esta función se puede expandir para mostrar estadísticas
        console.log('Stats updated');
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
            case 'books':
                this.renderBooks();
                break;
            case 'members':
                this.renderMembers();
                break;
            case 'loans':
                this.renderLoans();
                break;
            case 'overdue':
                this.renderOverdue();
                break;
        }
    }

    setView(view) {
        this.currentView = view;
        document.getElementById('gridView').classList.toggle('active', view === 'grid');
        document.getElementById('listView').classList.toggle('active', view === 'list');
        
        const container = document.getElementById('booksContainer');
        if (container) {
            container.classList.toggle('list-view', view === 'list');
        }
        
        this.renderBooks();
    }

    renderBooks(booksToRender = this.books) {
        const container = document.getElementById('booksContainer');
        if (!container) return;
        
        if (booksToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">📚</div>
                    <h3>No hay libros</h3>
                    <p>Agrega tu primer libro para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = booksToRender.map(book => `
            <div class="book-card ${this.currentView === 'list' ? 'list-view' : ''}">
                <div class="book-header">
                    <h3 class="book-title">${book.title}</h3>
                    <span class="book-status ${this.getBookStatus(book).toLowerCase().replace(' ', '-')}">
                        ${this.getBookStatus(book)}
                    </span>
                </div>
                <p class="book-author">Por ${book.author}</p>
                <div class="book-details">
                    <div class="book-detail">
                        <span class="book-detail-label">Género:</span>
                        <span class="book-detail-value">${book.genre}</span>
                    </div>
                    <div class="book-detail">
                        <span class="book-detail-label">Año:</span>
                        <span class="book-detail-value">${book.year || 'N/A'}</span>
                    </div>
                    <div class="book-detail">
                        <span class="book-detail-label">Copias:</span>
                        <span class="book-detail-value">${book.availableCopies}/${book.copies}</span>
                    </div>
                    <div class="book-detail">
                        <span class="book-detail-label">ISBN:</span>
                        <span class="book-detail-value">${book.isbn || 'N/A'}</span>
                    </div>
                </div>
                ${book.description ? `<p class="book-description">${book.description}</p>` : ''}
                <div class="book-actions">
                    ${book.availableCopies > 0 ? `
                        <button class="action-btn borrow-btn" onclick="librarySystem.showLoanModal(${book.id})">
                            📖 Prestar
                        </button>
                    ` : ''}
                    <button class="action-btn edit-btn" onclick="librarySystem.editBook(${book.id})">
                        ✏️ Editar
                    </button>
                    <button class="action-btn delete-btn" onclick="librarySystem.deleteBook(${book.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderMembers(membersToRender = this.members) {
        const container = document.getElementById('membersContainer');
        if (!container) return;
        
        if (membersToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">👥</div>
                    <h3>No hay miembros</h3>
                    <p>Agrega tu primer miembro para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = membersToRender.map(member => `
            <div class="member-card">
                <div class="member-header">
                    <h3 class="member-name">${member.name}</h3>
                    <span class="member-type">${member.type}</span>
                </div>
                <div class="member-details">
                    <div class="member-detail">
                        <span class="member-detail-label">ID:</span>
                        <span class="member-detail-value">${member.memberId}</span>
                    </div>
                    <div class="member-detail">
                        <span class="member-detail-label">Email:</span>
                        <span class="member-detail-value">${member.email}</span>
                    </div>
                    <div class="member-detail">
                        <span class="member-detail-label">Teléfono:</span>
                        <span class="member-detail-value">${member.phone}</span>
                    </div>
                    <div class="member-detail">
                        <span class="member-detail-label">Dirección:</span>
                        <span class="member-detail-value">${member.address || 'N/A'}</span>
                    </div>
                </div>
                <div class="member-actions">
                    <button class="action-btn edit-btn" onclick="librarySystem.editMember(${member.id})">
                        ✏️ Editar
                    </button>
                    <button class="action-btn delete-btn" onclick="librarySystem.deleteMember(${member.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderLoans(loansToRender = this.loans) {
        const container = document.getElementById('loansContainer');
        if (!container) return;
        
        if (loansToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">📋</div>
                    <h3>No hay préstamos</h3>
                    <p>Los préstamos aparecerán aquí</p>
                </div>
            `;
            return;
        }

        container.innerHTML = loansToRender.map(loan => {
            const book = this.books.find(b => b.id === loan.bookId);
            const member = this.members.find(m => m.id === loan.memberId);
            const isOverdue = new Date(loan.dueDate) < new Date() && loan.status === 'Activo';
            
            return `
                <div class="loan-card">
                    <div class="loan-header">
                        <span class="loan-id">#${loan.id.toString().padStart(4, '0')}</span>
                        <span class="loan-status ${loan.status.toLowerCase()}">
                            ${isOverdue ? 'Vencido' : loan.status}
                        </span>
                    </div>
                    <div class="loan-details">
                        <div class="loan-book">
                            <h4>Libro</h4>
                            <p>${book ? book.title : 'Libro no encontrado'}</p>
                        </div>
                        <div class="loan-member">
                            <h4>Miembro</h4>
                            <p>${member ? member.name : 'Miembro no encontrado'}</p>
                        </div>
                    </div>
                    <div class="loan-dates">
                        <div class="date-item">
                            <h5>Préstamo</h5>
                            <p>${this.formatDate(loan.loanDate)}</p>
                        </div>
                        <div class="date-item">
                            <h5>Vencimiento</h5>
                            <p>${this.formatDate(loan.dueDate)}</p>
                        </div>
                    </div>
                    ${loan.returnDate ? `
                        <div class="date-item">
                            <h5>Devolución</h5>
                            <p>${this.formatDate(loan.returnDate)}</p>
                        </div>
                    ` : ''}
                    <div class="loan-actions">
                        ${loan.status === 'Activo' ? `
                            <button class="action-btn return-btn" onclick="librarySystem.returnBook(${loan.id})">
                                📚 Devolver
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderOverdue() {
        const overdueLoans = this.loans.filter(loan => {
            const isOverdue = new Date(loan.dueDate) < new Date() && loan.status === 'Activo';
            return isOverdue;
        });
        
        this.renderLoans(overdueLoans);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    filterBooks() {
        const searchTerm = document.getElementById('bookSearch').value.toLowerCase();
        const genreFilter = document.getElementById('genreFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        let filtered = this.books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                                book.author.toLowerCase().includes(searchTerm) ||
                                (book.isbn && book.isbn.toLowerCase().includes(searchTerm));
            
            const matchesGenre = !genreFilter || book.genre === genreFilter;
            
            let matchesStatus = true;
            if (statusFilter) {
                const status = this.getBookStatus(book);
                matchesStatus = status === statusFilter;
            }
            
            return matchesSearch && matchesGenre && matchesStatus;
        });

        this.renderBooks(filtered);
    }

    filterMembers() {
        const searchTerm = document.getElementById('memberSearch').value.toLowerCase();
        const typeFilter = document.getElementById('memberTypeFilter').value;

        let filtered = this.members.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchTerm) ||
                                member.email.toLowerCase().includes(searchTerm) ||
                                member.memberId.toLowerCase().includes(searchTerm);
            
            const matchesType = !typeFilter || member.type === typeFilter;
            
            return matchesSearch && matchesType;
        });

        this.renderMembers(filtered);
    }

    filterLoans() {
        const searchTerm = document.getElementById('loanSearch').value.toLowerCase();
        const statusFilter = document.getElementById('loanStatusFilter').value;

        let filtered = this.loans.filter(loan => {
            const book = this.books.find(b => b.id === loan.bookId);
            const member = this.members.find(m => m.id === loan.memberId);
            
            const matchesSearch = (book && book.title.toLowerCase().includes(searchTerm)) ||
                                (member && member.name.toLowerCase().includes(searchTerm));
            
            const matchesStatus = !statusFilter || loan.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });

        this.renderLoans(filtered);
    }

    clearBookFilters() {
        document.getElementById('bookSearch').value = '';
        document.getElementById('genreFilter').value = '';
        document.getElementById('statusFilter').value = '';
        this.renderBooks();
    }

    clearMemberFilters() {
        document.getElementById('memberSearch').value = '';
        document.getElementById('memberTypeFilter').value = '';
        this.renderMembers();
    }

    clearLoanFilters() {
        document.getElementById('loanSearch').value = '';
        document.getElementById('loanStatusFilter').value = '';
        this.renderLoans();
    }

    // Modales de libros
    showBookModal(book = null) {
        this.editingBook = book;
        const modal = document.getElementById('bookModal');
        const title = document.getElementById('bookModalTitle');
        const form = document.getElementById('bookForm');
        
        if (book) {
            title.textContent = 'Editar Libro';
            form.bookTitle.value = book.title;
            form.bookAuthor.value = book.author;
            form.bookIsbn.value = book.isbn || '';
            form.bookGenre.value = book.genre;
            form.bookYear.value = book.year || '';
            form.bookCopies.value = book.copies;
            form.bookDescription.value = book.description || '';
        } else {
            title.textContent = 'Agregar Libro';
            form.reset();
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideBookModal() {
        const modal = document.getElementById('bookModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.editingBook = null;
    }

    handleBookSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const bookData = {
            title: formData.get('bookTitle'),
            author: formData.get('bookAuthor'),
            isbn: formData.get('bookIsbn'),
            genre: formData.get('bookGenre'),
            year: formData.get('bookYear') ? parseInt(formData.get('bookYear')) : null,
            copies: parseInt(formData.get('bookCopies')),
            description: formData.get('bookDescription')
        };

        if (this.editingBook) {
            // Editar libro existente
            const index = this.books.findIndex(b => b.id === this.editingBook.id);
            this.books[index] = { 
                ...this.editingBook, 
                ...bookData,
                availableCopies: this.editingBook.availableCopies
            };
        } else {
            // Agregar nuevo libro
            const newBook = {
                id: this.generateId('book'),
                ...bookData,
                availableCopies: bookData.copies
            };
            this.books.push(newBook);
        }

        this.saveData();
        this.renderBooks();
        this.hideBookModal();
        this.showNotification(
            this.editingBook ? 'Libro actualizado correctamente' : 'Libro agregado correctamente',
            'success'
        );
    }

    editBook(id) {
        const book = this.books.find(b => b.id === id);
        if (book) {
            this.showBookModal(book);
        }
    }

    deleteBook(id) {
        const book = this.books.find(b => b.id === id);
        if (book && confirm(`¿Estás seguro de que quieres eliminar "${book.title}"?`)) {
            this.books = this.books.filter(b => b.id !== id);
            this.saveData();
            this.renderBooks();
            this.showNotification('Libro eliminado correctamente', 'success');
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
            form.memberPhone.value = member.phone;
            form.memberType.value = member.type;
            form.memberId.value = member.memberId;
            form.memberAddress.value = member.address || '';
        } else {
            title.textContent = 'Agregar Miembro';
            form.reset();
            form.memberId.value = this.generateMemberId();
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
            phone: formData.get('memberPhone'),
            type: formData.get('memberType'),
            memberId: formData.get('memberId'),
            address: formData.get('memberAddress')
        };

        if (this.editingMember) {
            // Editar miembro existente
            const index = this.members.findIndex(m => m.id === this.editingMember.id);
            this.members[index] = { 
                ...this.editingMember, 
                ...memberData
            };
        } else {
            // Agregar nuevo miembro
            const newMember = {
                id: this.generateId('member'),
                ...memberData,
                joinDate: new Date().toISOString()
            };
            this.members.push(newMember);
        }

        this.saveData();
        this.renderMembers();
        this.hideMemberModal();
        this.showNotification(
            this.editingMember ? 'Miembro actualizado correctamente' : 'Miembro agregado correctamente',
            'success'
        );
    }

    editMember(id) {
        const member = this.members.find(m => m.id === id);
        if (member) {
            this.showMemberModal(member);
        }
    }

    deleteMember(id) {
        const member = this.members.find(m => m.id === id);
        if (member && confirm(`¿Estás seguro de que quieres eliminar a "${member.name}"?`)) {
            this.members = this.members.filter(m => m.id !== id);
            this.saveData();
            this.renderMembers();
            this.showNotification('Miembro eliminado correctamente', 'success');
        }
    }

    // Modales de préstamos
    showLoanModal(bookId = null) {
        const modal = document.getElementById('loanModal');
        const form = document.getElementById('loanForm');
        
        // Llenar selectores
        this.populateLoanSelectors();
        
        if (bookId) {
            form.loanBook.value = bookId;
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideLoanModal() {
        const modal = document.getElementById('loanModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    populateLoanSelectors() {
        const memberSelect = document.getElementById('loanMember');
        const bookSelect = document.getElementById('loanBook');
        
        // Llenar miembros
        memberSelect.innerHTML = '<option value="">Seleccionar miembro</option>';
        this.members.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = `${member.name} (${member.memberId})`;
            memberSelect.appendChild(option);
        });
        
        // Llenar libros disponibles
        bookSelect.innerHTML = '<option value="">Seleccionar libro</option>';
        this.books.filter(book => book.availableCopies > 0).forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = `${book.title} - ${book.author}`;
            bookSelect.appendChild(option);
        });
    }

    handleLoanSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const loanData = {
            bookId: parseInt(formData.get('loanMember')),
            memberId: parseInt(formData.get('loanBook')),
            loanDate: formData.get('loanDate'),
            dueDate: formData.get('dueDate'),
            status: 'Activo'
        };

        // Crear préstamo
        const newLoan = {
            id: this.generateId('loan'),
            ...loanData,
            returnDate: null
        };
        
        this.loans.push(newLoan);
        
        // Actualizar copias disponibles
        const book = this.books.find(b => b.id === loanData.bookId);
        if (book) {
            book.availableCopies--;
        }

        this.saveData();
        this.renderBooks();
        this.renderLoans();
        this.hideLoanModal();
        this.showNotification('Préstamo creado correctamente', 'success');
    }

    returnBook(loanId) {
        const loan = this.loans.find(l => l.id === loanId);
        if (loan) {
            loan.status = 'Devuelto';
            loan.returnDate = new Date().toISOString().split('T')[0];
            
            // Actualizar copias disponibles
            const book = this.books.find(b => b.id === loan.bookId);
            if (book) {
                book.availableCopies++;
            }
            
            this.saveData();
            this.renderBooks();
            this.renderLoans();
            this.showNotification('Libro devuelto correctamente', 'success');
        }
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
const librarySystem = new LibraryManagementSystem();

// Los estilos de notificaciones ya están en common.js
