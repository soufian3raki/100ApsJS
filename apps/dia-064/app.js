class RestaurantManagementSystem {
    constructor() {
        this.orders = [];
        this.menuItems = [];
        this.tables = [];
        this.currentTab = 'orders';
        this.editingMenuItem = null;
        
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateStats();
        this.renderOrders();
        this.setupTables();
    }

    bindEvents() {
        // Navegación por pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Botones principales
        const newOrderBtn = document.createElement('button');
        newOrderBtn.textContent = '+ Nueva Orden';
        newOrderBtn.className = 'btn btn-primary';
        newOrderBtn.addEventListener('click', () => this.showOrderModal());
        
        const viewKitchenBtn = document.createElement('button');
        viewKitchenBtn.textContent = '👨‍🍳 Cocina';
        viewKitchenBtn.className = 'btn btn-secondary';
        viewKitchenBtn.addEventListener('click', () => this.showKitchenView());
        
        // Agregar botones debajo del header
        const headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        headerActions.appendChild(newOrderBtn);
        headerActions.appendChild(viewKitchenBtn);
        
        // Insertar después del header
        const header = document.querySelector('header');
        header.insertAdjacentElement('afterend', headerActions);
        
        // Filtros de órdenes
        document.getElementById('orderSearch').addEventListener('input', () => this.filterOrders());
        document.getElementById('orderSearchBtn').addEventListener('click', () => this.filterOrders());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterOrders());
        document.getElementById('tableFilter').addEventListener('change', () => this.filterOrders());
        document.getElementById('clearOrderFilters').addEventListener('click', () => this.clearOrderFilters());        
        // Botones del header principal
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        
        document.getElementById('toggle-mode').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        
        // Filtros de menú
        document.getElementById('menuSearch').addEventListener('input', () => this.filterMenuItems());
        document.getElementById('menuSearchBtn').addEventListener('click', () => this.filterMenuItems());
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterMenuItems());
        document.getElementById('addMenuItem').addEventListener('click', () => this.showMenuItemModal());
        
        // Modales de órdenes
        document.getElementById('closeOrderModal').addEventListener('click', () => this.hideOrderModal());
        document.getElementById('cancelOrderBtn').addEventListener('click', () => this.hideOrderModal());
        document.getElementById('orderForm').addEventListener('submit', (e) => this.handleOrderSubmit(e));
        
        // Modales de items del menú
        document.getElementById('closeMenuItemModal').addEventListener('click', () => this.hideMenuItemModal());
        document.getElementById('cancelMenuItemBtn').addEventListener('click', () => this.hideMenuItemModal());
        document.getElementById('menuItemForm').addEventListener('submit', (e) => this.handleMenuItemSubmit(e));
        
        // Cerrar modales al hacer clic fuera
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    this.hideAllModals();
                }
            });
        });
    }

    loadData() {
        // Cargar órdenes
        const savedOrders = localStorage.getItem('restaurant_orders');
        if (savedOrders) {
            this.orders = JSON.parse(savedOrders);
        } else {
            this.orders = [];
        }

        // Cargar items del menú
        const savedMenuItems = localStorage.getItem('restaurant_menu');
        if (savedMenuItems) {
            this.menuItems = JSON.parse(savedMenuItems);
        } else {
            this.menuItems = [
                {
                    id: 1,
                    name: 'Ensalada César',
                    category: 'Entradas',
                    price: 12.99,
                    prepTime: 10,
                    description: 'Lechuga romana, crutones, parmesano y aderezo césar',
                    ingredients: 'Lechuga, crutones, parmesano, aderezo césar',
                    available: true
                },
                {
                    id: 2,
                    name: 'Pasta Carbonara',
                    category: 'Platos Principales',
                    price: 18.99,
                    prepTime: 20,
                    description: 'Pasta con salsa carbonara, panceta y parmesano',
                    ingredients: 'Pasta, panceta, huevo, parmesano, crema',
                    available: true
                },
                {
                    id: 3,
                    name: 'Tiramisú',
                    category: 'Postres',
                    price: 8.99,
                    prepTime: 15,
                    description: 'Postre italiano con café y mascarpone',
                    ingredients: 'Mascarpone, café, cacao, bizcocho',
                    available: true
                },
                {
                    id: 4,
                    name: 'Coca Cola',
                    category: 'Bebidas',
                    price: 3.99,
                    prepTime: 2,
                    description: 'Refresco de cola 330ml',
                    ingredients: 'Agua, azúcar, colorante, saborizantes',
                    available: true
                }
            ];
        }

        // Cargar mesas
        const savedTables = localStorage.getItem('restaurant_tables');
        if (savedTables) {
            this.tables = JSON.parse(savedTables);
        } else {
            this.tables = [
                { id: 1, number: 1, capacity: 4, status: 'available' },
                { id: 2, number: 2, capacity: 2, status: 'available' },
                { id: 3, number: 3, capacity: 6, status: 'available' },
                { id: 4, number: 4, capacity: 4, status: 'available' },
                { id: 5, number: 5, capacity: 8, status: 'available' },
                { id: 6, number: 6, capacity: 2, status: 'available' }
            ];
        }

        this.saveData();
    }

    saveData() {
        localStorage.setItem('restaurant_orders', JSON.stringify(this.orders));
        localStorage.setItem('restaurant_menu', JSON.stringify(this.menuItems));
        localStorage.setItem('restaurant_tables', JSON.stringify(this.tables));
    }

    generateId(type) {
        const collections = {
            'order': this.orders,
            'menuItem': this.menuItems
        };
        return Math.max(...collections[type].map(item => item.id), 0) + 1;
    }

    setupTables() {
        const tableSelect = document.getElementById('orderTable');
        const tableFilter = document.getElementById('tableFilter');
        
        // Limpiar opciones existentes
        tableSelect.innerHTML = '<option value="">Seleccionar mesa</option>';
        tableFilter.innerHTML = '<option value="">Todas las mesas</option>';
        
        this.tables.forEach(table => {
            const option1 = document.createElement('option');
            option1.value = table.id;
            option1.textContent = `Mesa ${table.number} (${table.capacity} personas)`;
            tableSelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = table.id;
            option2.textContent = `Mesa ${table.number}`;
            tableFilter.appendChild(option2);
        });
    }

    updateStats() {
        const pendingCount = this.orders.filter(o => o.status === 'Pendiente').length;
        const processingCount = this.orders.filter(o => o.status === 'En Proceso').length;
        const readyCount = this.orders.filter(o => o.status === 'Listo').length;
        
        const availableTables = this.tables.filter(t => t.status === 'available').length;
        const occupiedTables = this.tables.filter(t => t.status === 'occupied').length;
        const reservedTables = this.tables.filter(t => t.status === 'reserved').length;
        
        const completedOrders = this.orders.filter(o => o.status === 'Entregado');
        const dailySales = completedOrders.reduce((sum, order) => sum + order.total, 0);
        
        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('processingCount').textContent = processingCount;
        document.getElementById('readyCount').textContent = readyCount;
        
        document.getElementById('availableTables').textContent = availableTables;
        document.getElementById('occupiedTables').textContent = occupiedTables;
        document.getElementById('reservedTables').textContent = reservedTables;
        
        document.getElementById('dailySales').textContent = `$${dailySales.toFixed(2)}`;
        document.getElementById('completedOrders').textContent = completedOrders.length;
        
        // Plato más vendido
        const itemCounts = {};
        completedOrders.forEach(order => {
            order.items.forEach(item => {
                itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
            });
        });
        
        const topDish = Object.keys(itemCounts).reduce((a, b) => 
            itemCounts[a] > itemCounts[b] ? a : b, '-');
        document.getElementById('topDish').textContent = topDish;
        
        // Promedio por mesa
        const avgPerTable = completedOrders.length > 0 ? dailySales / completedOrders.length : 0;
        document.getElementById('avgPerTable').textContent = `$${avgPerTable.toFixed(2)}`;
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
            case 'orders':
                this.renderOrders();
                break;
            case 'menu':
                this.renderMenuItems();
                break;
            case 'tables':
                this.renderTables();
                break;
            case 'reports':
                this.updateStats();
                break;
        }
    }

    renderOrders(ordersToRender = this.orders) {
        const container = document.getElementById('ordersContainer');
        if (!container) return;
        
        if (ordersToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">📋</div>
                    <h3>No hay órdenes</h3>
                    <p>Las órdenes aparecerán aquí</p>
                </div>
            `;
            return;
        }

        container.innerHTML = ordersToRender.map(order => {
            const table = this.tables.find(t => t.id === order.tableId);
            return `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">#${order.id.toString().padStart(4, '0')}</span>
                        <span class="order-status ${order.status.toLowerCase().replace(' ', '-')}">
                            ${order.status}
                        </span>
                    </div>
                    <div class="order-info">
                        <h3 class="order-table">Mesa ${table ? table.number : 'N/A'}</h3>
                        <p class="order-customer">${order.customer || 'Cliente no especificado'}</p>
                    </div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <div>
                                    <div class="item-name">${item.name}</div>
                                    <div class="item-quantity">Cantidad: ${item.quantity}</div>
                                </div>
                                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <span>Total</span>
                        <span>$${order.total.toFixed(2)}</span>
                    </div>
                    <div class="order-actions">
                        ${order.status === 'Pendiente' ? `
                            <button class="action-btn process-btn" onclick="restaurantSystem.updateOrderStatus(${order.id}, 'En Proceso')">
                                ⚙️ Procesar
                            </button>
                        ` : ''}
                        ${order.status === 'En Proceso' ? `
                            <button class="action-btn ready-btn" onclick="restaurantSystem.updateOrderStatus(${order.id}, 'Listo')">
                                ✅ Listo
                            </button>
                        ` : ''}
                        ${order.status === 'Listo' ? `
                            <button class="action-btn deliver-btn" onclick="restaurantSystem.updateOrderStatus(${order.id}, 'Entregado')">
                                🚚 Entregar
                            </button>
                        ` : ''}
                        ${order.status !== 'Entregado' && order.status !== 'Cancelado' ? `
                            <button class="action-btn cancel-btn" onclick="restaurantSystem.updateOrderStatus(${order.id}, 'Cancelado')">
                                ❌ Cancelar
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderMenuItems(menuItemsToRender = this.menuItems) {
        const container = document.getElementById('menuContainer');
        if (!container) return;
        
        if (menuItemsToRender.length === 0) {
            container.innerHTML = `
                <div class="no-items">
                    <div class="no-items-icon">🍽️</div>
                    <h3>No hay items en el menú</h3>
                    <p>Agrega tu primer item para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = menuItemsToRender.map(item => `
            <div class="menu-item-card">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="menu-item-category">${item.category}</div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-details">
                    <div class="menu-item-detail">
                        <span class="menu-item-detail-label">Tiempo de Prep:</span>
                        <span class="menu-item-detail-value">${item.prepTime} min</span>
                    </div>
                    <div class="menu-item-detail">
                        <span class="menu-item-detail-label">Estado:</span>
                        <span class="menu-item-detail-value">${item.available ? 'Disponible' : 'No disponible'}</span>
                    </div>
                </div>
                ${item.ingredients ? `<p class="menu-item-description"><strong>Ingredientes:</strong> ${item.ingredients}</p>` : ''}
                <div class="menu-item-actions">
                    <button class="action-btn edit-btn" onclick="restaurantSystem.editMenuItem(${item.id})">
                        ✏️ Editar
                    </button>
                    <button class="action-btn ${item.available ? 'cancel-btn' : 'ready-btn'}" 
                            onclick="restaurantSystem.toggleMenuItemAvailability(${item.id})">
                        ${item.available ? '❌ Desactivar' : '✅ Activar'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderTables() {
        const container = document.getElementById('tablesContainer');
        if (!container) return;
        
        container.innerHTML = this.tables.map(table => `
            <div class="table-card ${table.status}" onclick="restaurantSystem.toggleTableStatus(${table.id})">
                <h3 class="table-number">${table.number}</h3>
                <div class="table-status ${table.status}">
                    ${table.status === 'available' ? 'Disponible' : 
                      table.status === 'occupied' ? 'Ocupada' : 'Reservada'}
                </div>
                <p class="table-capacity">${table.capacity} personas</p>
            </div>
        `).join('');
    }

    filterOrders() {
        const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const tableFilter = document.getElementById('tableFilter').value;

        let filtered = this.orders.filter(order => {
            const table = this.tables.find(t => t.id === order.tableId);
            const matchesSearch = order.customer.toLowerCase().includes(searchTerm) ||
                                order.id.toString().includes(searchTerm) ||
                                (table && table.number.toString().includes(searchTerm));
            
            const matchesStatus = !statusFilter || order.status === statusFilter;
            const matchesTable = !tableFilter || order.tableId === parseInt(tableFilter);
            
            return matchesSearch && matchesStatus && matchesTable;
        });

        this.renderOrders(filtered);
    }

    filterMenuItems() {
        const searchTerm = document.getElementById('menuSearch').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;

        let filtered = this.menuItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                                item.description.toLowerCase().includes(searchTerm) ||
                                item.ingredients.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || item.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });

        this.renderMenuItems(filtered);
    }

    clearOrderFilters() {
        document.getElementById('orderSearch').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('tableFilter').value = '';
        this.renderOrders();
    }

    // Modales de órdenes
    showOrderModal() {
        const modal = document.getElementById('orderModal');
        this.populateMenuItems();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideOrderModal() {
        const modal = document.getElementById('orderModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    populateMenuItems() {
        const container = document.getElementById('menuItemsList');
        container.innerHTML = '';
        
        this.menuItems.filter(item => item.available).forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item-option';
            itemElement.innerHTML = `
                <div class="menu-item-info">
                    <div class="menu-item-option-name">${item.name}</div>
                    <div class="menu-item-option-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="restaurantSystem.decreaseQuantity('${item.id}')">-</button>
                    <input type="number" class="quantity-input" id="qty-${item.id}" value="0" min="0" max="10">
                    <button class="quantity-btn" onclick="restaurantSystem.increaseQuantity('${item.id}')">+</button>
                </div>
            `;
            container.appendChild(itemElement);
        });
    }

    increaseQuantity(itemId) {
        const input = document.getElementById(`qty-${itemId}`);
        const currentValue = parseInt(input.value) || 0;
        if (currentValue < 10) {
            input.value = currentValue + 1;
            this.updateOrderSummary();
        }
    }

    decreaseQuantity(itemId) {
        const input = document.getElementById(`qty-${itemId}`);
        const currentValue = parseInt(input.value) || 0;
        if (currentValue > 0) {
            input.value = currentValue - 1;
            this.updateOrderSummary();
        }
    }

    updateOrderSummary() {
        const container = document.getElementById('orderItems');
        const totalElement = document.getElementById('orderTotal');
        
        let total = 0;
        let items = [];
        
        this.menuItems.forEach(item => {
            const quantity = parseInt(document.getElementById(`qty-${item.id}`).value) || 0;
            if (quantity > 0) {
                items.push({
                    name: item.name,
                    price: item.price,
                    quantity: quantity
                });
                total += item.price * quantity;
            }
        });
        
        container.innerHTML = items.map(item => `
            <div class="order-item">
                <div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">Cantidad: ${item.quantity}</div>
                </div>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
        
        totalElement.textContent = total.toFixed(2);
    }

    handleOrderSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const tableId = parseInt(formData.get('orderTable'));
        const customer = formData.get('orderCustomer');
        
        let items = [];
        let total = 0;
        
        this.menuItems.forEach(item => {
            const quantity = parseInt(document.getElementById(`qty-${item.id}`).value) || 0;
            if (quantity > 0) {
                items.push({
                    name: item.name,
                    price: item.price,
                    quantity: quantity
                });
                total += item.price * quantity;
            }
        });
        
        if (items.length === 0) {
            alert('Debes seleccionar al menos un item del menú.');
            return;
        }
        
        const newOrder = {
            id: this.generateId('order'),
            tableId: tableId,
            customer: customer || 'Cliente no especificado',
            items: items,
            total: total,
            status: 'Pendiente',
            createdAt: new Date().toISOString()
        };
        
        this.orders.push(newOrder);
        
        // Actualizar estado de la mesa
        const table = this.tables.find(t => t.id === tableId);
        if (table) {
            table.status = 'occupied';
        }
        
        this.saveData();
        this.updateStats();
        this.renderOrders();
        this.hideOrderModal();
        this.showNotification('Orden creada correctamente', 'success');
    }

    updateOrderStatus(orderId, newStatus) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            
            // Si se entrega o cancela, liberar la mesa
            if (newStatus === 'Entregado' || newStatus === 'Cancelado') {
                const table = this.tables.find(t => t.id === order.tableId);
                if (table) {
                    table.status = 'available';
                }
            }
            
            this.saveData();
            this.updateStats();
            this.renderOrders();
            this.showNotification(`Orden ${newStatus.toLowerCase()}`, 'success');
        }
    }

    // Modales de items del menú
    showMenuItemModal(item = null) {
        this.editingMenuItem = item;
        const modal = document.getElementById('menuItemModal');
        const title = document.getElementById('menuItemModalTitle');
        const form = document.getElementById('menuItemForm');
        
        if (item) {
            title.textContent = 'Editar Item del Menú';
            form.itemName.value = item.name;
            form.itemCategory.value = item.category;
            form.itemPrice.value = item.price;
            form.itemPrepTime.value = item.prepTime;
            form.itemDescription.value = item.description || '';
            form.itemIngredients.value = item.ingredients || '';
        } else {
            title.textContent = 'Agregar Item al Menú';
            form.reset();
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideMenuItemModal() {
        const modal = document.getElementById('menuItemModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.editingMenuItem = null;
    }

    handleMenuItemSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const itemData = {
            name: formData.get('itemName'),
            category: formData.get('itemCategory'),
            price: parseFloat(formData.get('itemPrice')),
            prepTime: parseInt(formData.get('itemPrepTime')),
            description: formData.get('itemDescription'),
            ingredients: formData.get('itemIngredients'),
            available: true
        };

        if (this.editingMenuItem) {
            // Editar item existente
            const index = this.menuItems.findIndex(i => i.id === this.editingMenuItem.id);
            this.menuItems[index] = { ...this.editingMenuItem, ...itemData };
        } else {
            // Agregar nuevo item
            const newItem = {
                id: this.generateId('menuItem'),
                ...itemData
            };
            this.menuItems.push(newItem);
        }

        this.saveData();
        this.renderMenuItems();
        this.hideMenuItemModal();
        this.showNotification(
            this.editingMenuItem ? 'Item actualizado correctamente' : 'Item agregado correctamente',
            'success'
        );
    }

    editMenuItem(id) {
        const item = this.menuItems.find(i => i.id === id);
        if (item) {
            this.showMenuItemModal(item);
        }
    }

    toggleMenuItemAvailability(id) {
        const item = this.menuItems.find(i => i.id === id);
        if (item) {
            item.available = !item.available;
            this.saveData();
            this.renderMenuItems();
            this.showNotification(
                `Item ${item.available ? 'activado' : 'desactivado'} correctamente`,
                'success'
            );
        }
    }

    toggleTableStatus(tableId) {
        const table = this.tables.find(t => t.id === tableId);
        if (table) {
            const statuses = ['available', 'occupied', 'reserved'];
            const currentIndex = statuses.indexOf(table.status);
            const nextIndex = (currentIndex + 1) % statuses.length;
            table.status = statuses[nextIndex];
            
            this.saveData();
            this.renderTables();
            this.updateStats();
            this.showNotification(`Mesa ${table.number} ${table.status}`, 'success');
        }
    }

    showKitchenView() {
        this.showNotification('Vista de cocina próximamente disponible', 'info');
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
const restaurantSystem = new RestaurantManagementSystem();

// Los estilos de notificaciones ya están en common.js
