class ShoppingCart {
  constructor() {
    this.products = [];
    this.cart = [];
    this.orders = JSON.parse(localStorage.getItem('shoppingOrders')) || [];
    this.coupons = {
      'WELCOME10': { discount: 0.1, description: '10% de descuento' },
      'SAVE20': { discount: 0.2, description: '20% de descuento' },
      'FREESHIP': { discount: 0, description: 'Envío gratis', freeShipping: true }
    };
    this.appliedCoupon = null;
    this.init();
  }

  init() {
    this.loadProducts();
    this.bindEvents();
    this.renderProducts();
    this.updateCartDisplay();
  }

  loadProducts() {
    this.products = [
      {
        id: 1,
        name: 'iPhone 15 Pro',
        description: 'El iPhone más avanzado con chip A17 Pro',
        price: 999.99,
        category: 'electronics',
        rating: 4.8,
        image: '📱',
        stock: 10
      },
      {
        id: 2,
        name: 'MacBook Air M2',
        description: 'Laptop ultradelgada con chip M2',
        price: 1199.99,
        category: 'electronics',
        rating: 4.9,
        image: '💻',
        stock: 5
      },
      {
        id: 3,
        name: 'Camiseta Básica',
        description: 'Camiseta de algodón 100%',
        price: 19.99,
        category: 'clothing',
        rating: 4.2,
        image: '👕',
        stock: 50
      },
      {
        id: 4,
        name: 'Jeans Clásicos',
        description: 'Jeans de corte clásico',
        price: 49.99,
        category: 'clothing',
        rating: 4.5,
        image: '👖',
        stock: 30
      },
      {
        id: 5,
        name: 'JavaScript: The Good Parts',
        description: 'Libro clásico de programación',
        price: 29.99,
        category: 'books',
        rating: 4.7,
        image: '📚',
        stock: 20
      },
      {
        id: 6,
        name: 'Clean Code',
        description: 'Guía para escribir código limpio',
        price: 34.99,
        category: 'books',
        rating: 4.8,
        image: '📖',
        stock: 15
      },
      {
        id: 7,
        name: 'Sofá Moderno',
        description: 'Sofá de 3 plazas color gris',
        price: 599.99,
        category: 'home',
        rating: 4.3,
        image: '🛋️',
        stock: 3
      },
      {
        id: 8,
        name: 'Mesa de Centro',
        description: 'Mesa de centro de madera',
        price: 199.99,
        category: 'home',
        rating: 4.4,
        image: '🪑',
        stock: 8
      },
      {
        id: 9,
        name: 'Pelota de Fútbol',
        description: 'Pelota oficial de fútbol',
        price: 24.99,
        category: 'sports',
        rating: 4.6,
        image: '⚽',
        stock: 25
      },
      {
        id: 10,
        name: 'Raqueta de Tenis',
        description: 'Raqueta profesional de tenis',
        price: 89.99,
        category: 'sports',
        rating: 4.5,
        image: '🎾',
        stock: 12
      }
    ];
  }

  bindEvents() {
    document.getElementById('searchBtn').addEventListener('click', () => {
      this.searchProducts();
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.searchProducts();
      }
    });

    document.getElementById('categoryFilter').addEventListener('change', () => {
      this.filterProducts();
    });

    document.getElementById('sortBy').addEventListener('change', () => {
      this.sortProducts();
    });

    document.getElementById('cartToggle').addEventListener('click', () => {
      this.toggleCart();
    });

    document.getElementById('clearCart').addEventListener('click', () => {
      this.clearCart();
    });

    document.getElementById('applyCoupon').addEventListener('click', () => {
      this.applyCoupon();
    });

    document.getElementById('checkout').addEventListener('click', () => {
      this.showCheckoutModal();
    });

    document.getElementById('closeModal').addEventListener('click', () => {
      this.hideCheckoutModal();
    });

    document.getElementById('cancelCheckout').addEventListener('click', () => {
      this.hideCheckoutModal();
    });

    document.getElementById('confirmOrder').addEventListener('click', () => {
      this.confirmOrder();
    });

    document.getElementById('newOrder').addEventListener('click', () => {
      this.newOrder();
    });

    document.getElementById('viewOrder').addEventListener('click', () => {
      this.viewOrderHistory();
    });

    document.getElementById('backToShop').addEventListener('click', () => {
      this.backToShop();
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
      this.clearHistory();
    });

    // Event delegation for dynamic content
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.productId);
        this.addToCart(productId);
      } else if (e.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(e.target.dataset.productId);
        this.removeFromCart(productId);
      } else if (e.target.classList.contains('update-quantity')) {
        const productId = parseInt(e.target.dataset.productId);
        const change = parseInt(e.target.dataset.change);
        this.updateQuantity(productId, change);
      }
    });
  }

  searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
    this.renderProducts();
  }

  filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    this.filteredProducts = category
      ? this.products.filter(product => product.category === category)
      : this.products;
    this.renderProducts();
  }

  sortProducts() {
    const sortBy = document.getElementById('sortBy').value;
    const products = this.filteredProducts || this.products;

    switch (sortBy) {
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
    }

    this.renderProducts();
  }

  renderProducts() {
    const products = this.filteredProducts || this.products;
    const productsGrid = document.getElementById('productsGrid');

    if (products.length === 0) {
      productsGrid.innerHTML = '<div class="no-products">No se encontraron productos</div>';
      return;
    }

    productsGrid.innerHTML = products.map(product => {
      const cartItem = this.cart.find(item => item.id === product.id);
      const quantity = cartItem ? cartItem.quantity : 0;
      const isInCart = quantity > 0;
      const isOutOfStock = product.stock === 0;

      return `
        <div class="product-card">
          <div class="product-image">${product.image}</div>
          <h3 class="product-title">${this.escapeHtml(product.name)}</h3>
          <p class="product-description">${this.escapeHtml(product.description)}</p>
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <div class="product-rating">
            <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
            <span class="rating-text">(${product.rating})</span>
          </div>
          <div class="product-actions">
            ${isInCart ? `
              <div class="quantity-controls">
                <button class="quantity-btn update-quantity" data-product-id="${product.id}" data-change="-1">-</button>
                <input type="number" class="quantity-input" value="${quantity}" min="0" max="${product.stock}" data-product-id="${product.id}">
                <button class="quantity-btn update-quantity" data-product-id="${product.id}" data-change="1">+</button>
              </div>
            ` : `
              <button class="add-to-cart" data-product-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
                ${isOutOfStock ? 'Sin Stock' : 'Agregar al Carrito'}
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = this.cart.find(item => item.id === productId);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
      }
    } else {
      this.cart.push({
        ...product,
        quantity: 1
      });
    }

    this.updateCartDisplay();
    this.renderProducts();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartDisplay();
    this.renderProducts();
  }

  updateQuantity(productId, change) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
    } else if (newQuantity <= item.stock) {
      item.quantity = newQuantity;
      this.updateCartDisplay();
    }
  }

  updateCartDisplay() {
    const cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);

    this.renderCartItems();
    this.updateCartSummary();
  }

  renderCartItems() {
    const cartItems = document.getElementById('cartItems');

    if (this.cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart">El carrito está vacío</div>';
      return;
    }

    cartItems.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <div class="item-image">${item.image}</div>
        <div class="item-details">
          <div class="item-title">${this.escapeHtml(item.name)}</div>
          <div class="item-price">$${item.price.toFixed(2)}</div>
          <div class="item-quantity">
            <button class="quantity-btn update-quantity" data-product-id="${item.id}" data-change="-1">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn update-quantity" data-product-id="${item.id}" data-change="1">+</button>
          </div>
        </div>
        <button class="item-remove remove-from-cart" data-product-id="${item.id}">×</button>
      </div>
    `).join('');
  }

  updateCartSummary() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = this.appliedCoupon ? subtotal * this.appliedCoupon.discount : 0;
    const shipping = this.appliedCoupon && this.appliedCoupon.freeShipping ? 0 : (subtotal > 100 ? 0 : 9.99);
    const total = subtotal - discount + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }

  toggleCart() {
    const cartSection = document.getElementById('cartSection');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
  }

  clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cart = [];
      this.appliedCoupon = null;
      this.updateCartDisplay();
      this.renderProducts();
    }
  }

  applyCoupon() {
    const couponCode = prompt('Ingresa el código de cupón:');
    if (!couponCode) return;

    const coupon = this.coupons[couponCode.toUpperCase()];
    if (coupon) {
      this.appliedCoupon = coupon;
      this.updateCartSummary();
      alert(`Cupón aplicado: ${coupon.description}`);
    } else {
      alert('Código de cupón inválido');
    }
  }

  showCheckoutModal() {
    if (this.cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    document.getElementById('checkoutModal').style.display = 'flex';
    this.renderOrderSummary();
  }

  hideCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
  }

  renderOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = this.appliedCoupon ? subtotal * this.appliedCoupon.discount : 0;
    const shipping = this.appliedCoupon && this.appliedCoupon.freeShipping ? 0 : (subtotal > 100 ? 0 : 9.99);
    const total = subtotal - discount + shipping;

    orderSummary.innerHTML = `
      ${this.cart.map(item => `
        <div class="order-item">
          <span>${this.escapeHtml(item.name)} x${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('')}
      <div class="order-item">
        <span>Subtotal:</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="order-item">
        <span>Descuento:</span>
        <span>-$${discount.toFixed(2)}</span>
      </div>
      <div class="order-item">
        <span>Envío:</span>
        <span>$${shipping.toFixed(2)}</span>
      </div>
      <div class="order-item" style="font-weight: 700; border-top: 1px solid var(--border); padding-top: 0.5rem;">
        <span>Total:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
    `;
  }

  confirmOrder() {
    const form = document.querySelector('.checkout-form');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode', 'cardNumber', 'expiryDate', 'cvv'];
    for (const field of requiredFields) {
      if (!document.getElementById(field).value.trim()) {
        alert(`Por favor completa el campo: ${field}`);
        return;
      }
    }

    const order = {
      id: Date.now(),
      items: [...this.cart],
      subtotal: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      discount: this.appliedCoupon ? this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * this.appliedCoupon.discount : 0,
      shipping: this.appliedCoupon && this.appliedCoupon.freeShipping ? 0 : (this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 100 ? 0 : 9.99),
      total: 0,
      customer: {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zipCode: document.getElementById('zipCode').value
      },
      date: new Date().toISOString()
    };

    order.total = order.subtotal - order.discount + order.shipping;

    this.orders.push(order);
    localStorage.setItem('shoppingOrders', JSON.stringify(this.orders));

    this.hideCheckoutModal();
    this.showOrderConfirmation(order);
  }

  showOrderConfirmation(order) {
    document.getElementById('orderNumber').textContent = `#${order.id}`;
    document.getElementById('orderTotal').textContent = `$${order.total.toFixed(2)}`;
    document.getElementById('shippingDate').textContent = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

    document.getElementById('orderConfirmation').style.display = 'flex';
  }

  newOrder() {
    this.cart = [];
    this.appliedCoupon = null;
    this.updateCartDisplay();
    this.renderProducts();
    document.getElementById('orderConfirmation').style.display = 'none';
    document.getElementById('orderHistory').style.display = 'none';
  }

  viewOrderHistory() {
    document.getElementById('orderConfirmation').style.display = 'none';
    document.getElementById('orderHistory').style.display = 'block';
    this.renderOrderHistory();
  }

  renderOrderHistory() {
    const historyList = document.getElementById('historyList');

    if (this.orders.length === 0) {
      historyList.innerHTML = '<div class="empty-cart">No hay pedidos anteriores</div>';
      return;
    }

    historyList.innerHTML = this.orders.reverse().map(order => `
      <div class="history-item" onclick="shoppingCart.viewOrderDetails(${order.id})">
        <div class="history-header">
          <div class="history-order-number">#${order.id}</div>
          <div class="history-date">${new Date(order.date).toLocaleDateString()}</div>
        </div>
        <div class="history-total">Total: $${order.total.toFixed(2)}</div>
        <div class="history-items">${order.items.length} producto(s)</div>
      </div>
    `).join('');
  }

  viewOrderDetails(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;

    const details = `
Pedido #${order.id}
Fecha: ${new Date(order.date).toLocaleString()}
Cliente: ${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}
Dirección: ${order.customer.address}, ${order.customer.city} ${order.customer.zipCode}

Productos:
${order.items.map(item => `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Subtotal: $${order.subtotal.toFixed(2)}
Descuento: -$${order.discount.toFixed(2)}
Envío: $${order.shipping.toFixed(2)}
Total: $${order.total.toFixed(2)}
    `;

    alert(details);
  }

  backToShop() {
    document.getElementById('orderHistory').style.display = 'none';
  }

  clearHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial de pedidos?')) {
      this.orders = [];
      localStorage.removeItem('shoppingOrders');
      this.renderOrderHistory();
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the shopping cart
const shoppingCart = new ShoppingCart();
