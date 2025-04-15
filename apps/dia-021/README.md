# 📱 Día 21: App de Chat

## 📋 Descripción
Aplicación de chat en tiempo real con mensajes, emojis, notificaciones y funcionalidades de comunicación.

## ✨ Características
- **Mensajes en tiempo real** con WebSockets
- **Soporte para emojis** y reacciones
- **Notificaciones** de nuevos mensajes
- **Historial de conversaciones**
- **Usuarios online** en tiempo real
- **Diseño moderno** y responsive
- **Modo oscuro/claro**

## 🚀 Cómo Funciona

### Conexión WebSocket
```javascript
let socket;
let currentUser = null;
let messages = [];

function connectWebSocket() {
  socket = new WebSocket("ws://localhost:8080");
  
  socket.onopen = function() {
    console.log("Conectado al servidor");
    sendMessage("user_join", { username: currentUser });
  };
  
  socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    handleMessage(data);
  };
  
  socket.onclose = function() {
    console.log("Desconectado del servidor");
    setTimeout(connectWebSocket, 3000); // Reconectar
  };
}

function sendMessage(type, data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type, data }));
  }
}
```

### Gestión de Mensajes
```javascript
function handleMessage(data) {
  switch (data.type) {
    case "message":
      addMessage(data.data);
      break;
    case "user_join":
      showNotification(`${data.data.username} se unió al chat`);
      updateOnlineUsers(data.data.users);
      break;
    case "user_leave":
      showNotification(`${data.data.username} salió del chat`);
      updateOnlineUsers(data.data.users);
      break;
    case "typing":
      showTypingIndicator(data.data.username);
      break;
  }
}

function addMessage(message) {
  messages.push(message);
  renderMessages();
  scrollToBottom();
  
  // Notificación si no es el usuario actual
  if (message.username !== currentUser) {
    showNotification(`Nuevo mensaje de ${message.username}`);
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **WebSockets**: Comunicación en tiempo real
- **JSON**: Serialización de datos
- **Event handling**: Gestión de eventos
- **Array methods**: Gestión de mensajes
- **setTimeout()**: Reconexión automática
- **LocalStorage**: Persistencia de datos

### CSS
- **Flexbox para layout**: Disposición de mensajes
- **Grid para usuarios**: Organización de lista
- **Animaciones**: Transiciones suaves
- **Responsive design**: Adaptación móvil
- **Custom scrollbars**: Barras personalizadas

### Comunicación en Tiempo Real
- **WebSockets**: Conexión bidireccional
- **Notificaciones**: Alertas del navegador
- **Indicadores de estado**: Usuarios online
- **Reconexión automática**: Robustez

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura y notificaciones
- **CSS3**: Flexbox, animaciones, responsive
- **JavaScript ES6+**: Lógica del chat
- **WebSockets**: Comunicación en tiempo real

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Mensajes claros

## 🎮 Controles
- **Teclado**: 
  - `Enter`: Enviar mensaje
  - `Shift + Enter`: Nueva línea
  - `Escape`: Cerrar chat
  - `Tab`: Navegación

## 🔧 Estructura del Código
```
dia-021/
├── index.html          # Estructura HTML + chat
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + WebSockets
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Ingresa tu nombre de usuario
3. Escribe mensajes en el input
4. Observa los mensajes en tiempo real
5. Ve la lista de usuarios online

## 💡 Mejoras Futuras
- [ ] Salas de chat múltiples
- [ ] Archivos y multimedia
- [ ] Mensajes privados
- [ ] Modo de pantalla completa
- [ ] Historial de conversaciones
- [ ] Integración con APIs

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~300 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Alta
- **Dependencias**: WebSocket server
- **APIs**: WebSockets, Notifications

## 📱 Casos de Uso
- **Comunicación**: Chat en tiempo real
- **Colaboración**: Trabajo en equipo
- **Soporte**: Atención al cliente
- **Educación**: Aulas virtuales

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 21*
