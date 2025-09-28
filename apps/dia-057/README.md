# 🛒 Día 57: Simulador de Carrito de Compras

## 📋 Descripción
Sistema completo de e-commerce con carrito de compras, búsqueda de productos, filtros, cupones de descuento, proceso de checkout y historial de pedidos. Simula una experiencia de compra online completa con persistencia de datos.

## ✨ Características
- **🛍️ Catálogo de Productos**: 10+ productos con categorías y ratings
- **🔍 Búsqueda y Filtros**: Búsqueda por texto y filtros por categoría
- **📊 Ordenamiento**: Por nombre, precio y rating
- **🛒 Carrito Inteligente**: Agregar, quitar y modificar cantidades
- **🎫 Sistema de Cupones**: Descuentos y envío gratis
- **💳 Checkout Completo**: Formulario de pago y envío
- **📋 Historial de Pedidos**: Gestión de compras anteriores
- **📱 Responsive**: Diseño adaptativo completo
- **💾 Persistencia**: Datos guardados en localStorage

## 🔧 Cómo Funciona

### 🛍️ Gestión de Productos
```javascript
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
    // ... más productos
  ];
}
```

### 🛒 Sistema de Carrito
```javascript
addToCart(productId) {
  const product = this.products.find(p => p.id === productId);
  const existingItem = this.cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    this.cart.push({ ...product, quantity: 1 });
  }
  
  this.updateCartDisplay();
}
```

### 🎫 Aplicación de Cupones
```javascript
applyCoupon() {
  const couponCode = prompt('Ingresa el código de cupón:');
  const coupon = this.coupons[couponCode.toUpperCase()];
  
  if (coupon) {
    this.appliedCoupon = coupon;
    this.updateCartSummary();
  }
}
```

## 🎓 Conceptos Aprendidos

### 💻 JavaScript
- Clases ES6: Organización del código
- Array methods: find(), filter(), map(), reduce()
- localStorage: Persistencia de datos
- Event delegation: Manejo de eventos dinámicos
- FormData: Manejo de formularios
- Date object: Fechas y timestamps

### 🎨 CSS
- CSS Grid: Layout de productos y carrito
- Flexbox: Alineación de elementos
- CSS Variables: Temas consistentes
- Responsive design: Media queries
- Hover effects: Interacciones visuales
- Modal design: Overlays y popups

### 🌐 HTML
- Form controls: Inputs, select, buttons
- Semantic HTML: Estructura semántica
- Accessibility: Labels y aria-labels
- Data attributes: Almacenamiento de datos

## 🛠️ Tecnologías Utilizadas
- HTML5: Formularios y semantic HTML
- CSS3: Grid, Flexbox, variables CSS
- JavaScript ES6+: Clases, arrow functions
- localStorage: Persistencia de datos
- Sin dependencias: JavaScript puro

## 🛍️ Categorías de Productos
- **📱 Electrónicos**: iPhone, MacBook, etc.
- **👕 Ropa**: Camisetas, jeans, etc.
- **📚 Libros**: Programación, desarrollo
- **🏠 Hogar**: Muebles, decoración
- **⚽ Deportes**: Equipamiento deportivo

## 🔍 Funciones de Búsqueda
- **Búsqueda por Texto**: Nombre y descripción
- **Filtro por Categoría**: Todas las categorías
- **Ordenamiento**: Nombre, precio, rating
- **Resultados en Tiempo Real**: Actualización instantánea

## 🛒 Características del Carrito
- **Agregar Productos**: Con validación de stock
- **Modificar Cantidades**: Incrementar/decrementar
- **Eliminar Items**: Botón de eliminación
- **Cálculo Automático**: Subtotal, descuentos, envío
- **Persistencia**: Mantiene estado entre sesiones

## 🎫 Sistema de Cupones
- **WELCOME10**: 10% de descuento
- **SAVE20**: 20% de descuento
- **FREESHIP**: Envío gratis
- **Validación**: Códigos válidos únicamente
- **Aplicación**: Descuentos automáticos

## 💳 Proceso de Checkout
- **Información de Envío**: Nombre, dirección, ciudad
- **Información de Pago**: Tarjeta, CVV, expiración
- **Validación**: Campos requeridos
- **Resumen**: Detalle completo del pedido
- **Confirmación**: Número de pedido y fecha

## 📋 Historial de Pedidos
- **Lista de Pedidos**: Todos los pedidos anteriores
- **Detalles Completos**: Productos, precios, fechas
- **Búsqueda**: Por número de pedido
- **Eliminación**: Limpiar historial completo

## 🎮 Controles Disponibles
- **Buscar**: Búsqueda de productos
- **Filtrar**: Por categoría y ordenamiento
- **Agregar al Carrito**: Botón en cada producto
- **Modificar Cantidad**: Controles +/- en carrito
- **Aplicar Cupón**: Códigos de descuento
- **Checkout**: Proceso de compra
- **Ver Historial**: Pedidos anteriores

## 🚀 Cómo Ejecutar
1. Abre index.html en tu navegador
2. Explora los productos disponibles
3. Usa la búsqueda y filtros
4. Agrega productos al carrito
5. Aplica cupones de descuento
6. Procede al checkout
7. Completa la información de pago
8. Confirma tu pedido
9. Revisa el historial de compras

## 💰 Cálculo de Precios
- **Subtotal**: Suma de todos los productos
- **Descuento**: Porcentaje según cupón
- **Envío**: Gratis si compra > $100 o cupón FREESHIP
- **Total**: Subtotal - descuento + envío

## 📊 Gestión de Stock
- **Control de Inventario**: Cantidad disponible
- **Validación**: No permitir exceder stock
- **Indicadores Visuales**: "Sin Stock" cuando agotado
- **Actualización**: Estado en tiempo real

## ⚡ Características Avanzadas
- **Búsqueda Inteligente**: Nombre y descripción
- **Filtros Múltiples**: Categoría y ordenamiento
- **Cálculo Dinámico**: Precios en tiempo real
- **Validación de Formularios**: Campos requeridos
- **Responsive**: Adaptación completa a móviles

## 📊 Estadísticas Técnicas
- Líneas de código: ~700 líneas
- Funcionalidades: 30 principales
- Tiempo de desarrollo: ~8 horas
- Complejidad: Intermedia-Alta
- Dependencias: Ninguna
- Productos: 10+ incluidos

## 💼 Casos de Uso
- **E-commerce**: Tienda online completa
- **Prototipado**: Demostración de funcionalidades
- **Aprendizaje**: Conceptos de programación
- **Testing**: Validación de interfaces
- **Portfolio**: Demostración de habilidades

## 🛍️ Productos Incluidos
- **Electrónicos**: iPhone, MacBook
- **Ropa**: Camisetas, jeans
- **Libros**: Programación, desarrollo
- **Hogar**: Sofá, mesa de centro
- **Deportes**: Pelota, raqueta

## ⚠️ Limitaciones
- Solo funciona localmente
- No incluye procesamiento de pago real
- No tiene sistema de usuarios
- No incluye notificaciones
- No soporta imágenes reales

---
*Parte del proyecto '100 Apps JS en 100 Días' - Día 57*
