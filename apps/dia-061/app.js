class InventoryManager {
    constructor() {
        this.products = [];
        this.currentView = 'grid';
        this.editingProduct = null;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindEvents();
        this.updateStats();
        this.renderProducts();
    }

    bindEvents() {
        // Botones principales
        const addProductBtn = document.createElement('button');
        addProductBtn.textContent = '+ Agregar Producto';
        addProductBtn.className = 'btn btn-primary';
        addProductBtn.addEventListener('click', () => this.showProductModal());
        
        const exportDataBtn = document.createElement('button');
        exportDataBtn.textContent = '📊 Exportar';
        exportDataBtn.className = 'btn btn-secondary';
        exportDataBtn.addEventListener('click', () => this.exportData());
        
        // Agregar botones debajo del header
        const headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        headerActions.appendChild(addProductBtn);
        headerActions.appendChild(exportDataBtn);
        
        // Insertar después del header
        const header = document.querySelector('header');
        header.insertAdjacentElement('afterend', headerActions);
        
        // Filtros y búsqueda
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterProducts());
        document.getElementById('searchBtn').addEventListener('click', () => this.filterProducts());
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterProducts());
        document.getElementById('statusFilter').addEventListener('change', () => this.filterProducts());
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());
        
        // Vista
        document.getElementById('gridView').addEventListener('click', () => this.setView('grid'));
        document.getElementById('listView').addEventListener('click', () => this.setView('list'));
        
        // Modal
        document.getElementById('closeModal').addEventListener('click', () => this.hideProductModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.hideProductModal());
        document.getElementById('productForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Cerrar modal al hacer clic fuera
        document.getElementById('productModal').addEventListener('click', (e) => {
            if (e.target.id === 'productModal') {
                this.hideProductModal();
            }
        });
    }

    loadProducts() {
        const saved = localStorage.getItem('inventory_products');
        if (saved) {
            this.products = JSON.parse(saved);
        } else {
            // Datos de ejemplo
            this.products = [
                {
                    id: 1,
                    name: 'Laptop Dell XPS 13',
                    sku: 'DELL-XPS13-001',
                    category: 'Electrónicos',
                    price: 1299.99,
                    stock: 15,
                    minStock: 5,
                    description: 'Laptop ultradelgada con pantalla 13 pulgadas'
                },
                {
                    id: 2,
                    name: 'Camiseta Algodón',
                    sku: 'ROPA-CAM-001',
                    category: 'Ropa',
                    price: 24.99,
                    stock: 2,
                    minStock: 10,
                    description: 'Camiseta 100% algodón, varios colores'
                },
                {
                    id: 3,
                    name: 'Sofá 3 Plazas',
                    sku: 'HOG-SOF-001',
                    category: 'Hogar',
                    price: 899.99,
                    stock: 0,
                    minStock: 3,
                    description: 'Sofá moderno de tela gris'
                },
                {
                    id: 4,
                    name: 'Balón de Fútbol',
                    sku: 'DEP-BAL-001',
                    category: 'Deportes',
                    price: 29.99,
                    stock: 8,
                    minStock: 5,
                    description: 'Balón oficial de fútbol'
                },
                {
                    id: 5,
                    name: 'JavaScript: The Good Parts',
                    sku: 'LIB-JS-001',
                    category: 'Libros',
                    price: 39.99,
                    stock: 12,
                    minStock: 3,
                    description: 'Libro clásico de programación en JavaScript'
                }
            ];
            this.saveProducts();
        }
    }

    saveProducts() {
        localStorage.setItem('inventory_products', JSON.stringify(this.products));
    }

    generateId() {
        return Math.max(...this.products.map(p => p.id), 0) + 1;
    }

    getStockStatus(stock, minStock) {
        if (stock === 0) return 'out-of-stock';
        if (stock <= minStock) return 'low-stock';
        return 'in-stock';
    }

    getStockStatusText(stock, minStock) {
        if (stock === 0) return 'Agotado';
        if (stock <= minStock) return 'Bajo Stock';
        return 'En Stock';
    }

    updateStats() {
        const totalProducts = this.products.length;
        const totalValue = this.products.reduce((sum, product) => sum + (product.price * product.stock), 0);
        const lowStock = this.products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
        const outOfStock = this.products.filter(p => p.stock === 0).length;

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('totalValue').textContent = `$${totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
        document.getElementById('lowStock').textContent = lowStock;
        document.getElementById('outOfStock').textContent = outOfStock;
    }

    renderProducts(productsToRender = this.products) {
        const container = document.getElementById('productsContainer');
        
        if (productsToRender.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <div class="no-products-icon">📦</div>
                    <h3>No hay productos</h3>
                    <p>Agrega tu primer producto para comenzar</p>
                </div>
            `;
            return;
        }

        container.innerHTML = productsToRender.map(product => `
            <div class="product-card ${this.currentView === 'list' ? 'list-view' : ''}">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-sku">${product.sku}</span>
                </div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                <div class="product-stock">
                    <div class="stock-info">
                        <div class="stock-quantity">Stock: ${product.stock}</div>
                        <div class="stock-status ${this.getStockStatus(product.stock, product.minStock)}">
                            ${this.getStockStatusText(product.stock, product.minStock)}
                        </div>
                    </div>
                    <div class="stock-min">Mín: ${product.minStock}</div>
                </div>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-actions">
                    <button class="action-btn edit-btn" onclick="inventoryManager.editProduct(${product.id})">
                        ✏️ Editar
                    </button>
                    <button class="action-btn delete-btn" onclick="inventoryManager.deleteProduct(${product.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        let filtered = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.sku.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || product.category === categoryFilter;
            
            let matchesStatus = true;
            if (statusFilter) {
                const status = this.getStockStatus(product.stock, product.minStock);
                matchesStatus = status === statusFilter.toLowerCase().replace(' ', '-');
            }
            
            return matchesSearch && matchesCategory && matchesStatus;
        });

        this.renderProducts(filtered);
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('statusFilter').value = '';
        this.renderProducts();
    }

    setView(view) {
        this.currentView = view;
        document.getElementById('gridView').classList.toggle('active', view === 'grid');
        document.getElementById('listView').classList.toggle('active', view === 'list');
        
        const container = document.getElementById('productsContainer');
        container.classList.toggle('list-view', view === 'list');
        
        this.renderProducts();
    }

    showProductModal(product = null) {
        this.editingProduct = product;
        const modal = document.getElementById('productModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('productForm');
        
        if (product) {
            title.textContent = 'Editar Producto';
            form.productName.value = product.name;
            form.productSku.value = product.sku;
            form.productCategory.value = product.category;
            form.productPrice.value = product.price;
            form.productStock.value = product.stock;
            form.minStock.value = product.minStock;
            form.productDescription.value = product.description || '';
        } else {
            title.textContent = 'Agregar Producto';
            form.reset();
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideProductModal() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.editingProduct = null;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const productData = {
            name: formData.get('productName'),
            sku: formData.get('productSku'),
            category: formData.get('productCategory'),
            price: parseFloat(formData.get('productPrice')),
            stock: parseInt(formData.get('productStock')),
            minStock: parseInt(formData.get('minStock')),
            description: formData.get('productDescription')
        };

        // Validar SKU único
        if (!this.editingProduct) {
            const existingSku = this.products.find(p => p.sku === productData.sku);
            if (existingSku) {
                alert('El SKU ya existe. Por favor, usa un SKU único.');
                return;
            }
        }

        if (this.editingProduct) {
            // Editar producto existente
            const index = this.products.findIndex(p => p.id === this.editingProduct.id);
            this.products[index] = { ...this.editingProduct, ...productData };
        } else {
            // Agregar nuevo producto
            const newProduct = {
                id: this.generateId(),
                ...productData
            };
            this.products.push(newProduct);
        }

        this.saveProducts();
        this.updateStats();
        this.renderProducts();
        this.hideProductModal();
        
        // Mostrar mensaje de éxito
        this.showNotification(
            this.editingProduct ? 'Producto actualizado correctamente' : 'Producto agregado correctamente',
            'success'
        );
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            this.showProductModal(product);
        }
    }

    deleteProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product && confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
            this.products = this.products.filter(p => p.id !== id);
            this.saveProducts();
            this.updateStats();
            this.renderProducts();
            this.showNotification('Producto eliminado correctamente', 'success');
        }
    }

    exportData() {
        const data = {
            products: this.products,
            exportDate: new Date().toISOString(),
            stats: {
                totalProducts: this.products.length,
                totalValue: this.products.reduce((sum, p) => sum + (p.price * p.stock), 0),
                lowStock: this.products.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
                outOfStock: this.products.filter(p => p.stock === 0).length
            }
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inventario_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Datos exportados correctamente', 'success');
    }

    showNotification(message, type = 'info') {
        // Usar la función común de notificaciones
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        }
    }
}

// Inicializar la aplicación
const inventoryManager = new InventoryManager();

// Los estilos de notificaciones ya están en common.js

