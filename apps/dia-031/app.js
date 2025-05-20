// Chat Offline con Bots - Día 31
class ChatBot {
  constructor() {
    this.messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    this.currentBot = "assistant";
    this.initializeElements();
    this.setupEventListeners();
    this.loadMessages();
  }

  initializeElements() {
    this.chatMessages = document.getElementById("chatMessages");
    this.messageInput = document.getElementById("messageInput");
    this.sendBtn = document.getElementById("sendBtn");
    this.botSelect = document.getElementById("botSelect");
    this.clearBtn = document.getElementById("clearBtn");
    this.exportBtn = document.getElementById("exportBtn");
  }

  setupEventListeners() {
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });
    this.botSelect.addEventListener("change", (e) => {
      this.currentBot = e.target.value;
    });
    this.clearBtn.addEventListener("click", () => this.clearChat());
    this.exportBtn.addEventListener("click", () => this.exportChat());
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message) return;

    // Agregar mensaje del usuario
    this.addMessage(message, "user");
    this.messageInput.value = "";

    // Simular respuesta del bot
    setTimeout(() => {
      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        const botResponse = this.getBotResponse(message);
        this.addMessage(botResponse, "bot");
      }, 1500);
    }, 500);
  }

  addMessage(text, sender) {
    const message = {
      id: Date.now(),
      text: text,
      sender: sender,
      bot: this.currentBot,
      timestamp: new Date().toISOString()
    };

    this.messages.push(message);
    this.saveMessages();
    this.renderMessage(message);
  }

  renderMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${message.sender}-message`;
    
    const avatar = message.sender === "user" ? "👤" : "🤖";
    const time = new Date(message.timestamp).toLocaleTimeString();
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <div class="message-text">${message.text}</div>
        <div class="message-time">${time}</div>
      </div>
    `;
    
    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    switch (this.currentBot) {
      case "assistant":
        return this.getAssistantResponse(lowerMessage);
      case "weather":
        return this.getWeatherResponse(lowerMessage);
      case "joke":
        return this.getJokeResponse(lowerMessage);
      case "math":
        return this.getMathResponse(lowerMessage);
      case "quote":
        return this.getQuoteResponse(lowerMessage);
      default:
        return "Lo siento, no entiendo tu mensaje.";
    }
  }

  getAssistantResponse(message) {
    if (message.includes("hola") || message.includes("hi")) {
      return "¡Hola! ¿En qué puedo ayudarte hoy?";
    } else if (message.includes("ayuda") || message.includes("help")) {
      return "Puedo ayudarte con información general, chistes, matemáticas, frases motivadoras y más. ¿Qué te interesa?";
    } else if (message.includes("gracias") || message.includes("thanks")) {
      return "¡De nada! Estoy aquí para ayudarte.";
    } else if (message.includes("adios") || message.includes("bye")) {
      return "¡Hasta luego! Fue un placer charlar contigo.";
    } else {
      return "Interesante. ¿Podrías contarme más sobre eso?";
    }
  }

  getWeatherResponse(message) {
    const weatherResponses = [
      "Hoy está soleado con 25°C. ¡Perfecto para salir!",
      "Está nublado y fresco, 18°C. Ideal para quedarse en casa.",
      "¡Lluvia! 15°C. No olvides el paraguas.",
      "Día ventoso con 20°C. Cuidado con el viento.",
      "Temperatura agradable de 22°C. ¡Disfruta el día!"
    ];
    return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
  }

  getJokeResponse(message) {
    const jokes = [
      "¿Por qué los pájaros vuelan hacia el sur en invierno? ¡Porque es muy lejos caminando!",
      "¿Qué le dice un semáforo a otro? No me mires, me estoy cambiando.",
      "¿Por qué los peces no pueden usar Facebook? Porque se olvidan la contraseña del agua.",
      "¿Qué hace un perro con un taladro? Taladrando.",
      "¿Por qué los elefantes no pueden usar computadoras? Porque el mouse es muy pequeño para sus patas."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  getMathResponse(message) {
    if (message.includes("suma") || message.includes("+")) {
      const a = Math.floor(Math.random() * 100);
      const b = Math.floor(Math.random() * 100);
      return `La suma de ${a} + ${b} = ${a + b}`;
    } else if (message.includes("multiplica") || message.includes("*")) {
      const a = Math.floor(Math.random() * 20);
      const b = Math.floor(Math.random() * 20);
      return `La multiplicación de ${a} × ${b} = ${a * b}`;
    } else if (message.includes("raíz") || message.includes("sqrt")) {
      const num = Math.floor(Math.random() * 100) + 1;
      return `La raíz cuadrada de ${num} es ${Math.sqrt(num).toFixed(2)}`;
    } else {
      return "Puedo ayudarte con sumas, multiplicaciones y raíces cuadradas. ¿Qué operación necesitas?";
    }
  }

  getQuoteResponse(message) {
    const quotes = [
      "La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon",
      "El futuro pertenece a quienes creen en la belleza de sus sueños. - Eleanor Roosevelt",
      "No hay nada imposible, la palabra misma dice 
soy
posible. - Audrey Hepburn",
      "La única forma de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
      "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    this.chatMessages.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  loadMessages() {
    this.chatMessages.innerHTML = "";
    this.messages.forEach(message => this.renderMessage(message));
  }

  clearChat() {
    if (confirm("¿Estás seguro de que quieres limpiar el chat?")) {
      this.messages = [];
      this.saveMessages();
      this.chatMessages.innerHTML = `
        <div class="message bot-message">
          <div class="message-avatar">🤖</div>
          <div class="message-content">
            <div class="message-text">¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?</div>
            <div class="message-time">Ahora</div>
          </div>
        </div>
      `;
    }
  }

  exportChat() {
    const chatText = this.messages.map(msg => 
      `${msg.sender === "user" ? "Usuario" : "Bot"}: ${msg.text}`
    ).join("\n");
    
    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-export.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  saveMessages() {
    localStorage.setItem("chatMessages", JSON.stringify(this.messages));
  }
}

// Inicializar chat
let chatBot;

document.addEventListener("DOMContentLoaded", () => {
  chatBot = new ChatBot();
});
