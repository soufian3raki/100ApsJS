# 🍽️ Día 64 - Sistema de Gestión de Restaurante

## 📋 Descripción
Sistema completo de gestión de restaurante que permite administrar órdenes, menú, mesas y generar reportes de ventas. Incluye funcionalidades avanzadas como cálculo automático de costos, gestión de estados de órdenes y control de mesas en tiempo real.

## ✨ Características Principales

### 📋 **Gestión de Órdenes**
- **Crear Órdenes**: Formulario completo con selección de mesa y cliente
- **Estados de Orden**: Pendiente, En Proceso, Listo, Entregado, Cancelado
- **Cálculo Automático**: Costos de platos y servicios
- **Gestión de Estados**: Flujo de trabajo de cocina
- **Historial Completo**: Seguimiento de todas las órdenes

### 🍽️ **Gestión del Menú**
- **Catálogo de Platos**: Entradas, platos principales, postres, bebidas
- **Precios Dinámicos**: Actualización en tiempo real
- **Tiempo de Preparación**: Estimación de tiempo por plato
- **Ingredientes**: Lista detallada de ingredientes
- **Disponibilidad**: Control de platos disponibles

### 🪑 **Control de Mesas**
- **Estados de Mesa**: Disponible, Ocupada, Reservada
- **Capacidad**: Control de número de personas
- **Asignación**: Asignación automática de mesas
- **Liberación**: Liberación automática al completar orden
- **Estadísticas**: Contadores de mesas por estado

### 📊 **Reportes y Estadísticas**
- **Ventas del Día**: Ingresos totales
- **Órdenes Completadas**: Contador de órdenes exitosas
- **Plato Más Vendido**: Análisis de popularidad
- **Promedio por Mesa**: Análisis de rentabilidad
- **Tiempo de Preparación**: Estadísticas de cocina

### 🔍 **Sistema de Filtros**
- **Búsqueda Global**: En órdenes, menú y mesas
- **Filtros por Estado**: Estados de órdenes y mesas
- **Filtros por Fecha**: Rango de fechas
- **Filtros por Mesa**: Órdenes por mesa específica
- **Vista Dual**: Lista y tarjetas

## 🛠️ Cómo Funciona

### 📝 **Crear Nueva Orden**
```javascript
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
    
    const newOrder = {
        id: this.generateId('order'),
        tableId: tableId,
        customer: customer || 'Cliente no especificado',
        items: items,
        total: total,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
    };
}
```

### 💰 **Cálculo de Costos**
```javascript
calculateCosts() {
    const roomType = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    
    const nights = this.calculateNights(checkIn, checkOut);
    const roomCost = this.roomPrices[roomType] * nights;
    
    let servicesCost = 0;
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        servicesCost += this.servicePrices[checkbox.id] * nights;
    });

    const totalCost = roomCost + servicesCost;
    this.updateCostDisplay(roomCost, servicesCost, totalCost);
}
```

### 🔄 **Gestión de Estados de Orden**
```javascript
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
    }
}
```

## 🎯 Conceptos Aprendidos

### 💻 **JavaScript Avanzado**
- **Gestión de Estado**: Control de estados de órdenes y mesas
- **Cálculos Dinámicos**: Costos en tiempo real
- **Array Methods**: `filter()`, `map()`, `reduce()`, `find()`
- **Form Validation**: Validación de formularios complejos
- **LocalStorage**: Persistencia de datos del restaurante

### 🎨 **CSS Avanzado**
- **CSS Grid**: Layout complejo de tarjetas
- **Flexbox**: Alineación y distribución
- **CSS Variables**: Sistema de colores consistente
- **Media Queries**: Diseño responsive completo
- **Transitions**: Animaciones suaves

### 🏗️ **Arquitectura de Datos**
- **Relaciones de Datos**: Conexión entre órdenes, mesas y menú
- **Estado de Aplicación**: Gestión centralizada
- **Validación de Negocio**: Reglas del restaurante
- **Persistencia**: Almacenamiento local robusto

### 📱 **UX/UI Design**
- **Navegación por Pestañas**: Organización clara
- **Formularios Intuitivos**: Flujo de trabajo lógico
- **Feedback Visual**: Estados claros
- **Responsive Design**: Funciona en todos los dispositivos

## 🚀 Tecnologías Utilizadas

- **HTML5**: Formularios avanzados y validaciones
- **CSS3**: Diseño responsive y animaciones
- **JavaScript ES6+**: Programación orientada a objetos
- **LocalStorage API**: Almacenamiento persistente
- **Date API**: Manejo de fechas

## 📱 Diseño Responsive

### 🖥️ **Desktop (1200px+)**
- Grid de 3-4 columnas para elementos
- Navegación por pestañas horizontal
- Filtros en línea horizontal

### 📱 **Tablet (768px - 1199px)**
- Grid de 2 columnas para elementos
- Navegación por pestañas apilada
- Filtros en columna única

### 📱 **Mobile (< 768px)**
- Lista vertical de elementos
- Navegación por pestañas vertical
- Filtros apilados verticalmente

## 🎮 Controles

### 🖱️ **Mouse**
- **Click en Pestañas**: Cambiar sección
- **Click en Elementos**: Ver detalles
- **Click en Botones**: Acciones

### ⌨️ **Teclado**
- **Tab**: Navegación entre elementos
- **Enter**: Enviar formularios
- **Escape**: Cerrar modales

### 📱 **Touch**
- **Tap**: Selección de elementos
- **Swipe**: Navegación en móviles

## 🏗️ Estructura del Código

### 📁 **Archivos**
```
dia-064/
├── index.html          # Estructura HTML
├── app.css            # Estilos específicos
├── app.js             # Lógica de la aplicación
└── README.md          # Documentación
```

### 🔧 **Clase Principal**
```javascript
class RestaurantManagementSystem {
    constructor() {
        this.orders = [];
        this.menuItems = [];
        this.tables = [];
        this.currentTab = 'orders';
        this.editingMenuItem = null;
    }
    
    // Métodos principales
    switchTab(tab)           // Cambiar pestaña
    renderOrders()           // Renderizar órdenes
    renderMenuItems()        // Renderizar menú
    renderTables()           // Renderizar mesas
    updateOrderStatus()      // Actualizar estado
    calculateCosts()         // Calcular costos
}
```

## 🚀 Pasos para Ejecutar

1. **Abrir el archivo**: `src/apps/dia-064/index.html`
2. **Explorar el menú**: Ver platos disponibles
3. **Crear orden**: Usar el botón "+ Nueva Orden"
4. **Seleccionar mesa**: Elegir mesa disponible
5. **Agregar platos**: Seleccionar items del menú
6. **Gestionar estados**: Cambiar estados de órdenes

## 🔮 Mejoras Futuras

### 📈 **Funcionalidades Avanzadas**
- **Cocina Digital**: Vista especializada para cocina
- **Integración de Pagos**: Procesamiento de pagos
- **Notificaciones**: Alertas por email/SMS
- **Múltiples Restaurantes**: Gestión de cadenas
- **API Externa**: Integración con sistemas POS

### 🎨 **Mejoras de UI/UX**
- **Drag & Drop**: Reordenamiento de órdenes
- **Búsqueda Avanzada**: Filtros múltiples
- **Gráficos**: Visualización de ventas
- **Temas**: Modo oscuro/claro
- **PWA**: Aplicación web progresiva

### 🔧 **Optimizaciones Técnicas**
- **IndexedDB**: Almacenamiento más robusto
- **Service Workers**: Funcionamiento offline
- **Caching**: Almacenamiento en caché
- **Compresión**: Optimización de datos
- **Testing**: Pruebas automatizadas

## 📊 Estadísticas Técnicas

- **Líneas de Código**: ~1100 líneas
- **Archivos**: 4 archivos
- **Funciones**: 40+ métodos
- **Eventos**: 30+ event listeners
- **Responsive**: 3 breakpoints
- **Compatibilidad**: Todos los navegadores modernos

## 🎯 Casos de Uso

### 🍽️ **Restaurantes Independientes**
- Gestión de órdenes diarias
- Control de mesas
- Seguimiento de ventas
- Gestión de menú

### 🏢 **Cadenas de Restaurantes**
- Gestión centralizada
- Reportes consolidados
- Control de múltiples ubicaciones
- Análisis de rendimiento

### 🍕 **Delivery y Takeout**
- Gestión de órdenes online
- Control de tiempos de entrega
- Seguimiento de pedidos
- Análisis de popularidad

### 🏖️ **Restaurantes de Hotel**
- Integración con sistema de hotel
- Gestión de huéspedes
- Control de servicios
- Análisis de satisfacción

¡El Sistema de Gestión de Restaurante está listo para usar! 🎉
