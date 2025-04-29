# 🏨 Día 62 - Sistema de Reservas de Hotel

## 📋 Descripción
Sistema completo de gestión de reservas de hotel que permite administrar habitaciones, huéspedes, servicios adicionales y generar reportes de ingresos. Incluye funcionalidades avanzadas como cálculo automático de costos, gestión de estados de reserva y filtros avanzados.

## ✨ Características Principales

### 🏨 **Gestión de Reservas**
- **Crear Reservas**: Formulario completo con validaciones
- **Estados de Reserva**: Pendiente, Confirmada, Completada, Cancelada
- **Cálculo Automático**: Costos de habitación y servicios
- **Validación de Fechas**: Prevención de fechas inválidas
- **Gestión de Huéspedes**: Información detallada del cliente

### 🛏️ **Tipos de Habitaciones**
- **Individual**: $80/noche - Para 1 persona
- **Doble**: $120/noche - Para 2 personas
- **Suite**: $200/noche - Para 2-4 personas
- **Familiar**: $150/noche - Para 4-6 personas
- **Asignación Automática**: Sistema de asignación de habitaciones

### 🎯 **Servicios Adicionales**
- **Desayuno**: +$15/día
- **WiFi Premium**: +$5/día
- **Estacionamiento**: +$10/día
- **Acceso al Spa**: +$25/día
- **Cálculo Dinámico**: Costos actualizados en tiempo real

### 📊 **Estadísticas y Reportes**
- **Total de Reservas**: Contador de reservas activas
- **Ingresos Totales**: Cálculo de ingresos por reservas confirmadas
- **Reservas Confirmadas**: Estadísticas de confirmación
- **Reservas Pendientes**: Seguimiento de reservas por confirmar

### 🔍 **Sistema de Filtros**
- **Búsqueda por Huésped**: Nombre, email, teléfono
- **Filtros por Fecha**: Rango de fechas de entrada/salida
- **Filtros por Estado**: Pendiente, Confirmada, etc.
- **Filtros por Tipo**: Tipo de habitación
- **Vista Dual**: Lista y tarjetas

## 🛠️ Cómo Funciona

### 📝 **Crear Nueva Reserva**
```javascript
handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const selectedServices = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.id);
    
    const reservationData = {
        guestName: formData.get('guestName'),
        guestEmail: formData.get('guestEmail'),
        // ... más campos
        services: selectedServices
    };

    // Validar fechas
    if (new Date(reservationData.checkInDate) >= new Date(reservationData.checkOutDate)) {
        alert('La fecha de salida debe ser posterior a la fecha de entrada.');
        return;
    }
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

### 🔄 **Gestión de Estados**
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
    }
}
```

## 🎯 Conceptos Aprendidos

### 💻 **JavaScript Avanzado**
- **FormData API**: Manejo de formularios complejos
- **Date Object**: Cálculos de fechas y validaciones
- **Array Methods**: `filter()`, `map()`, `reduce()`, `find()`
- **Event Delegation**: Gestión eficiente de eventos
- **LocalStorage**: Persistencia de datos del hotel

### 🎨 **CSS Avanzado**
- **CSS Grid**: Layout complejo de tarjetas
- **Flexbox**: Alineación y distribución
- **CSS Variables**: Sistema de colores consistente
- **Media Queries**: Diseño responsive completo
- **Transitions**: Animaciones suaves

### 🏗️ **Arquitectura de Datos**
- **Relaciones de Datos**: Conexión entre reservas y habitaciones
- **Validación de Negocio**: Reglas de negocio del hotel
- **Estado de Aplicación**: Gestión centralizada
- **Persistencia**: Almacenamiento local robusto

### 📱 **UX/UI Design**
- **Formularios Intuitivos**: Flujo de reserva claro
- **Feedback Visual**: Estados claros de reserva
- **Cálculos en Tiempo Real**: Transparencia en precios
- **Responsive Design**: Funciona en todos los dispositivos

## 🚀 Tecnologías Utilizadas

- **HTML5**: Formularios avanzados y validaciones
- **CSS3**: Diseño responsive y animaciones
- **JavaScript ES6+**: Programación orientada a objetos
- **LocalStorage API**: Almacenamiento persistente
- **Date API**: Manejo de fechas

## 📱 Diseño Responsive

### 🖥️ **Desktop (1200px+)**
- Grid de 3-4 columnas para reservas
- Filtros en línea horizontal
- Estadísticas en grid de 4 columnas

### 📱 **Tablet (768px - 1199px)**
- Grid de 2 columnas para reservas
- Filtros apilados verticalmente
- Estadísticas en grid de 2 columnas

### 📱 **Mobile (< 768px)**
- Lista vertical de reservas
- Filtros en columna única
- Estadísticas apiladas verticalmente

## 🎮 Controles

### 🖱️ **Mouse**
- **Click en Reserva**: Ver detalles
- **Click en Botones**: Acciones de estado
- **Hover**: Efectos visuales

### ⌨️ **Teclado**
- **Tab**: Navegación entre campos
- **Enter**: Enviar formularios
- **Escape**: Cerrar modales

### 📱 **Touch**
- **Tap**: Selección de elementos
- **Swipe**: Navegación en móviles

## 🏗️ Estructura del Código

### 📁 **Archivos**
```
dia-062/
├── index.html          # Estructura HTML
├── app.css            # Estilos específicos
├── app.js             # Lógica de la aplicación
└── README.md          # Documentación
```

### 🔧 **Clase Principal**
```javascript
class HotelReservationSystem {
    constructor() {
        this.reservations = [];
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
    }
}
```

## 🚀 Pasos para Ejecutar

1. **Abrir el archivo**: `src/apps/dia-062/index.html`
2. **Ver reservas existentes**: Explorar las reservas de ejemplo
3. **Crear nueva reserva**: Usar el botón "+ Nueva Reserva"
4. **Seleccionar habitación**: Elegir tipo y servicios
5. **Calcular costos**: Ver el cálculo automático
6. **Gestionar estados**: Cambiar estados de reservas

## 🔮 Mejoras Futuras

### 📈 **Funcionalidades Avanzadas**
- **Calendario Visual**: Vista de calendario para reservas
- **Integración de Pagos**: Procesamiento de pagos
- **Notificaciones**: Alertas por email/SMS
- **Múltiples Hoteles**: Gestión de cadenas hoteleras
- **API Externa**: Integración con sistemas de reservas

### 🎨 **Mejoras de UI/UX**
- **Drag & Drop**: Reordenamiento de reservas
- **Búsqueda Avanzada**: Filtros múltiples
- **Gráficos**: Visualización de ingresos
- **Temas**: Modo oscuro/claro
- **PWA**: Aplicación web progresiva

### 🔧 **Optimizaciones Técnicas**
- **IndexedDB**: Almacenamiento más robusto
- **Service Workers**: Funcionamiento offline
- **Caching**: Almacenamiento en caché
- **Compresión**: Optimización de datos
- **Testing**: Pruebas automatizadas

## 📊 Estadísticas Técnicas

- **Líneas de Código**: ~900 líneas
- **Archivos**: 4 archivos
- **Funciones**: 30+ métodos
- **Eventos**: 20+ event listeners
- **Responsive**: 3 breakpoints
- **Compatibilidad**: Todos los navegadores modernos

## 🎯 Casos de Uso

### 🏨 **Hoteles Independientes**
- Gestión de reservas diarias
- Control de habitaciones disponibles
- Seguimiento de ingresos
- Gestión de huéspedes

### 🏢 **Cadenas Hoteleras**
- Gestión centralizada
- Reportes consolidados
- Control de múltiples propiedades
- Análisis de rendimiento

### 🏖️ **Resorts y Spas**
- Gestión de servicios adicionales
- Control de paquetes especiales
- Gestión de eventos
- Programación de actividades

### 🏠 **Airbnb y Alojamientos**
- Gestión de propiedades
- Control de disponibilidad
- Gestión de huéspedes
- Análisis de rentabilidad

¡El Sistema de Reservas de Hotel está listo para usar! 🎉
