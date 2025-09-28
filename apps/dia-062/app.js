class HotelReservationSystem {
    constructor() {
        this.reservations = [];
        this.currentView = 'list';
        this.editingReservation = null;
        this.roomPrices = {
            'Individual': 80,
            'Doble': 120,
            'Suite': 200,
            'Familiar': 150
        };
        this.servicePrices = {
            'breakfast': 15,
            'wifi': 5,
            'parking': 10,
            'spa': 25
        };
        
        this.init();
    }

    init() {
        this.loadReservations();
        this.bindEvents();
        this.updateStats();
        this.renderReservations();
        this.setupDateInputs();
    }

    bindEvents() {
        // Botones principales
        const newReservationBtn = document.createElement('button');
        newReservationBtn.textContent = '+ Nueva Reserva';
        newReservationBtn.className = 'btn btn-primary';
        newReservationBtn.addEventListener('click', () => this.showReservationModal());
        
        const viewCalendarBtn = document.createElement('button');
        viewCalendarBtn.textContent = '📅 Calendario';
        viewCalendarBtn.className = 'btn btn-secondary';
        viewCalendarBtn.addEventListener('click', () => this.showCalendar());
        
        // Agregar botones debajo del header
        const headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        headerActions.appendChild(newReservationBtn);
        headerActions.appendChild(viewCalendarBtn);
        
        // Insertar después del header
        const header = document.querySelector('header');
        header.insertAdjacentElement('afterend', headerActions);
        
        // Botones del header principal
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        
        document.getElementById('toggle-mode').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Filtros y búsqueda
        document.getElementById('searchInput').addEventListener('input', () => this.filterReservations());
        document.getElementById('searchBtn').addEventListener('click', () => this.filterReservations());
        document.getElementById('checkInFilter').addEventListener('change', () => this.filterReservations());
        document.getElementById('checkOutFilter').addEventListener('change', () => this.filterReservations());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterReservations());
        document.getElementById('roomTypeFilter').addEventListener('change', () => this.filterReservations());
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());
        
        // Vista
        document.getElementById('listView').addEventListener('click', () => this.setView('list'));
        document.getElementById('cardView').addEventListener('click', () => this.setView('card'));
        
        // Modal
        document.getElementById('closeModal').addEventListener('click', () => this.hideReservationModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.hideReservationModal());
        document.getElementById('reservationForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Cálculo de costos en tiempo real
        document.getElementById('roomType').addEventListener('change', () => this.calculateCosts());
        document.getElementById('checkInDate').addEventListener('change', () => this.calculateCosts());
        document.getElementById('checkOutDate').addEventListener('change', () => this.calculateCosts());
        document.getElementById('adults').addEventListener('change', () => this.calculateCosts());
        document.getElementById('children').addEventListener('change', () => this.calculateCosts());
        
        // Servicios adicionales
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.calculateCosts());
        });
        
        // Cerrar modal al hacer clic fuera
        document.getElementById('reservationModal').addEventListener('click', (e) => {
            if (e.target.id === 'reservationModal') {
                this.hideReservationModal();
            }
        });
    }

    setupDateInputs() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('checkInDate').min = today;
        document.getElementById('checkOutDate').min = today;
    }

    loadReservations() {
        const saved = localStorage.getItem('hotel_reservations');
        if (saved) {
            this.reservations = JSON.parse(saved);
        } else {
            // Datos de ejemplo
            this.reservations = [
                {
                    id: 1,
                    guestName: 'Juan Pérez',
                    guestEmail: 'juan@email.com',
                    guestPhone: '+1234567890',
                    guestId: '12345678',
                    roomType: 'Suite',
                    roomNumber: '201',
                    checkInDate: '2024-01-15',
                    checkOutDate: '2024-01-18',
                    adults: 2,
                    children: 1,
                    services: ['breakfast', 'wifi', 'spa'],
                    status: 'Confirmada',
                    totalCost: 675,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    guestName: 'María García',
                    guestEmail: 'maria@email.com',
                    guestPhone: '+1234567891',
                    guestId: '87654321',
                    roomType: 'Doble',
                    roomNumber: '105',
                    checkInDate: '2024-01-20',
                    checkOutDate: '2024-01-22',
                    adults: 2,
                    children: 0,
                    services: ['wifi'],
                    status: 'Pendiente',
                    totalCost: 250,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    guestName: 'Carlos López',
                    guestEmail: 'carlos@email.com',
                    guestPhone: '+1234567892',
                    guestId: '11223344',
                    roomType: 'Individual',
                    roomNumber: '301',
                    checkInDate: '2024-01-10',
                    checkOutDate: '2024-01-12',
                    adults: 1,
                    children: 0,
                    services: [],
                    status: 'Completada',
                    totalCost: 160,
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveReservations();
        }
    }

    saveReservations() {
        localStorage.setItem('hotel_reservations', JSON.stringify(this.reservations));
    }

    generateId() {
        return Math.max(...this.reservations.map(r => r.id), 0) + 1;
    }

    generateRoomNumber(roomType) {
        const roomNumbers = {
            'Individual': ['301', '302', '303', '304', '305'],
            'Doble': ['101', '102', '103', '104', '105'],
            'Suite': ['201', '202', '203'],
            'Familiar': ['401', '402', '403', '404']
        };
        
        const available = roomNumbers[roomType].filter(num => 
            !this.reservations.some(r => r.roomNumber === num && r.status !== 'Cancelada')
        );
        
        return available[0] || roomNumbers[roomType][0];
    }

    calculateNights(checkIn, checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    calculateCosts() {
        const roomType = document.getElementById('roomType').value;
        const checkIn = document.getElementById('checkInDate').value;
        const checkOut = document.getElementById('checkOutDate').value;
        
        if (!roomType || !checkIn || !checkOut) {
            this.updateCostDisplay(0, 0, 0);
            return;
        }

        const nights = this.calculateNights(checkIn, checkOut);
        const roomCost = this.roomPrices[roomType] * nights;
        
        let servicesCost = 0;
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            servicesCost += this.servicePrices[checkbox.id] * nights;
        });

        const totalCost = roomCost + servicesCost;
        this.updateCostDisplay(roomCost, servicesCost, totalCost);
    }

    updateCostDisplay(roomCost, servicesCost, totalCost) {
        document.getElementById('roomCost').textContent = `$${roomCost.toFixed(2)}`;
        document.getElementById('servicesCost').textContent = `$${servicesCost.toFixed(2)}`;
        document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
    }

    updateStats() {
        const totalReservations = this.reservations.length;
        const totalRevenue = this.reservations
            .filter(r => r.status === 'Confirmada' || r.status === 'Completada')
            .reduce((sum, r) => sum + r.totalCost, 0);
        const confirmedReservations = this.reservations.filter(r => r.status === 'Confirmada').length;
        const pendingReservations = this.reservations.filter(r => r.status === 'Pendiente').length;

        document.getElementById('totalReservations').textContent = totalReservations;
        document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
        document.getElementById('confirmedReservations').textContent = confirmedReservations;
        document.getElementById('pendingReservations').textContent = pendingReservations;
    }

    renderReservations(reservationsToRender = this.reservations) {
        const container = document.getElementById('reservationsContainer');
        
        if (reservationsToRender.length === 0) {
            container.innerHTML = `
                <div class="no-reservations">
                    <div class="no-reservations-icon">🏨</div>
                    <h3>No hay reservas</h3>
                    <p>Agrega tu primera reserva para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = reservationsToRender.map(reservation => `
            <div class="reservation-card ${this.currentView === 'card' ? 'card-view' : ''}">
                <div class="reservation-header">
                    <span class="reservation-id">#${reservation.id.toString().padStart(4, '0')}</span>
                    <span class="reservation-status ${reservation.status.toLowerCase()}">${reservation.status}</span>
                </div>
                
                <div class="guest-info">
                    <h3 class="guest-name">${reservation.guestName}</h3>
                    <p class="guest-contact">${reservation.guestEmail} • ${reservation.guestPhone}</p>
                </div>
                
                <div class="room-info">
                    <div class="room-details">
                        <h4>Habitación ${reservation.roomNumber}</h4>
                        <p>${reservation.roomType} • ${reservation.adults} adulto${reservation.adults > 1 ? 's' : ''}${reservation.children > 0 ? `, ${reservation.children} niño${reservation.children > 1 ? 's' : ''}` : ''}</p>
                    </div>
                    <div class="room-price">$${reservation.totalCost.toFixed(2)}</div>
                </div>
                
                <div class="dates-info">
                    <div class="date-item">
                        <h5>Entrada</h5>
                        <p>${this.formatDate(reservation.checkInDate)}</p>
                    </div>
                    <div class="date-item">
                        <h5>Salida</h5>
                        <p>${this.formatDate(reservation.checkOutDate)}</p>
                    </div>
                </div>
                
                ${reservation.services.length > 0 ? `
                    <div class="services-list">
                        <h5>Servicios</h5>
                        <div class="services-tags">
                            ${reservation.services.map(service => {
                                const serviceNames = {
                                    'breakfast': 'Desayuno',
                                    'wifi': 'WiFi',
                                    'parking': 'Estacionamiento',
                                    'spa': 'Spa'
                                };
                                return `<span class="service-tag">${serviceNames[service]}</span>`;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="reservation-actions">
                    <button class="action-btn edit-btn" onclick="hotelSystem.editReservation(${reservation.id})">
                        ✏️ Editar
                    </button>
                    ${reservation.status === 'Confirmada' ? `
                        <button class="action-btn cancel-btn" onclick="hotelSystem.cancelReservation(${reservation.id})">
                            ❌ Cancelar
                        </button>
                    ` : ''}
                    ${reservation.status === 'Pendiente' ? `
                        <button class="action-btn complete-btn" onclick="hotelSystem.completeReservation(${reservation.id})">
                            ✅ Confirmar
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    filterReservations() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const checkInFilter = document.getElementById('checkInFilter').value;
        const checkOutFilter = document.getElementById('checkOutFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const roomTypeFilter = document.getElementById('roomTypeFilter').value;

        let filtered = this.reservations.filter(reservation => {
            const matchesSearch = reservation.guestName.toLowerCase().includes(searchTerm) ||
                                reservation.guestEmail.toLowerCase().includes(searchTerm) ||
                                reservation.roomNumber.toLowerCase().includes(searchTerm);
            
            const matchesCheckIn = !checkInFilter || reservation.checkInDate >= checkInFilter;
            const matchesCheckOut = !checkOutFilter || reservation.checkOutDate <= checkOutFilter;
            const matchesStatus = !statusFilter || reservation.status === statusFilter;
            const matchesRoomType = !roomTypeFilter || reservation.roomType === roomTypeFilter;
            
            return matchesSearch && matchesCheckIn && matchesCheckOut && matchesStatus && matchesRoomType;
        });

        this.renderReservations(filtered);
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('checkInFilter').value = '';
        document.getElementById('checkOutFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('roomTypeFilter').value = '';
        this.renderReservations();
    }

    setView(view) {
        this.currentView = view;
        document.getElementById('listView').classList.toggle('active', view === 'list');
        document.getElementById('cardView').classList.toggle('active', view === 'card');
        
        const container = document.getElementById('reservationsContainer');
        container.classList.toggle('card-view', view === 'card');
        
        this.renderReservations();
    }

    showReservationModal(reservation = null) {
        this.editingReservation = reservation;
        const modal = document.getElementById('reservationModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('reservationForm');
        
        if (reservation) {
            title.textContent = 'Editar Reserva';
            form.guestName.value = reservation.guestName;
            form.guestEmail.value = reservation.guestEmail;
            form.guestPhone.value = reservation.guestPhone;
            form.guestId.value = reservation.guestId || '';
            form.roomType.value = reservation.roomType;
            form.roomNumber.value = reservation.roomNumber;
            form.checkInDate.value = reservation.checkInDate;
            form.checkOutDate.value = reservation.checkOutDate;
            form.adults.value = reservation.adults;
            form.children.value = reservation.children;
            
            // Marcar servicios
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = reservation.services.includes(checkbox.id);
            });
        } else {
            title.textContent = 'Nueva Reserva';
            form.reset();
            document.getElementById('roomNumber').value = '';
        }
        
        this.calculateCosts();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideReservationModal() {
        const modal = document.getElementById('reservationModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.editingReservation = null;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const selectedServices = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.id);
        
        const reservationData = {
            guestName: formData.get('guestName'),
            guestEmail: formData.get('guestEmail'),
            guestPhone: formData.get('guestPhone'),
            guestId: formData.get('guestId'),
            roomType: formData.get('roomType'),
            roomNumber: formData.get('roomNumber') || this.generateRoomNumber(formData.get('roomType')),
            checkInDate: formData.get('checkInDate'),
            checkOutDate: formData.get('checkOutDate'),
            adults: parseInt(formData.get('adults')),
            children: parseInt(formData.get('children')),
            services: selectedServices
        };

        // Validar fechas
        if (new Date(reservationData.checkInDate) >= new Date(reservationData.checkOutDate)) {
            alert('La fecha de salida debe ser posterior a la fecha de entrada.');
            return;
        }

        // Calcular costo total
        const nights = this.calculateNights(reservationData.checkInDate, reservationData.checkOutDate);
        const roomCost = this.roomPrices[reservationData.roomType] * nights;
        const servicesCost = selectedServices.reduce((sum, service) => 
            sum + (this.servicePrices[service] * nights), 0);
        const totalCost = roomCost + servicesCost;

        if (this.editingReservation) {
            // Editar reserva existente
            const index = this.reservations.findIndex(r => r.id === this.editingReservation.id);
            this.reservations[index] = { 
                ...this.editingReservation, 
                ...reservationData, 
                totalCost,
                status: this.editingReservation.status
            };
        } else {
            // Agregar nueva reserva
            const newReservation = {
                id: this.generateId(),
                ...reservationData,
                totalCost,
                status: 'Pendiente',
                createdAt: new Date().toISOString()
            };
            this.reservations.push(newReservation);
        }

        this.saveReservations();
        this.updateStats();
        this.renderReservations();
        this.hideReservationModal();
        
        this.showNotification(
            this.editingReservation ? 'Reserva actualizada correctamente' : 'Reserva creada correctamente',
            'success'
        );
    }

    editReservation(id) {
        const reservation = this.reservations.find(r => r.id === id);
        if (reservation) {
            this.showReservationModal(reservation);
        }
    }

    cancelReservation(id) {
        const reservation = this.reservations.find(r => r.id === id);
        if (reservation && confirm(`¿Estás seguro de que quieres cancelar la reserva de ${reservation.guestName}?`)) {
            reservation.status = 'Cancelada';
            this.saveReservations();
            this.updateStats();
            this.renderReservations();
            this.showNotification('Reserva cancelada correctamente', 'success');
        }
    }

    completeReservation(id) {
        const reservation = this.reservations.find(r => r.id === id);
        if (reservation) {
            reservation.status = 'Confirmada';
            this.saveReservations();
            this.updateStats();
            this.renderReservations();
            this.showNotification('Reserva confirmada correctamente', 'success');
        }
    }

    showCalendar() {
        this.showNotification('Función de calendario próximamente disponible', 'info');
    }showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Inicializar la aplicación
const hotelSystem = new HotelReservationSystem();

// Los estilos de notificaciones ya están en common.js

