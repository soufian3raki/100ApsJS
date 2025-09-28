// Cronograma Interactivo con Eventos - Día 33
class TimelineManager {
  constructor() {
    this.events = JSON.parse(localStorage.getItem("timelineEvents")) || [];
    this.currentView = "lista";
    this.editingEvent = null;
    
    this.initializeElements();
    this.setupEventListeners();
    this.renderTimeline();
    this.updateStats();
  }

  initializeElements() {
    this.timelineView = document.getElementById("timelineView");
    this.addEventBtn = document.getElementById("addEventBtn");
    this.viewToggle = document.getElementById("viewToggle");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.statusFilter = document.getElementById("statusFilter");
    this.dateFilter = document.getElementById("dateFilter");
    this.eventModal = document.getElementById("eventModal");
    this.closeModal = document.getElementById("closeModal");
    this.eventForm = document.getElementById("eventForm");
    this.saveEvent = document.getElementById("saveEvent");
    this.deleteEvent = document.getElementById("deleteEvent");
    this.cancelEvent = document.getElementById("cancelEvent");
    this.modalTitle = document.getElementById("modalTitle");
  }

  setupEventListeners() {
    this.addEventBtn.addEventListener("click", () => this.openEventModal());
    this.viewToggle.addEventListener("click", () => this.toggleView());
    this.categoryFilter.addEventListener("change", () => this.renderTimeline());
    this.statusFilter.addEventListener("change", () => this.renderTimeline());
    this.dateFilter.addEventListener("change", () => this.renderTimeline());
    this.closeModal.addEventListener("click", () => this.closeEventModal());
    this.saveEvent.addEventListener("click", () => this.saveEventData());
    this.deleteEvent.addEventListener("click", () => this.deleteEventData());
    this.cancelEvent.addEventListener("click", () => this.closeEventModal());
  }

  renderTimeline() {
    let filteredEvents = [...this.events];
    
    if (this.categoryFilter.value) {
      filteredEvents = filteredEvents.filter(event => event.category === this.categoryFilter.value);
    }
    
    if (this.statusFilter.value) {
      filteredEvents = filteredEvents.filter(event => event.status === this.statusFilter.value);
    }
    
    if (this.dateFilter.value) {
      filteredEvents = filteredEvents.filter(event => event.date === this.dateFilter.value);
    }
    
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (filteredEvents.length === 0) {
      this.timelineView.innerHTML = "<div class=\"empty-timeline\"><h3>No hay eventos</h3><p>Agrega tu primer evento para comenzar</p></div>";
      return;
    }
    
    this.timelineView.innerHTML = "<div class=\"timeline-list\">" + filteredEvents.map(event => this.createEventHTML(event)).join("") + "</div>";
    
    this.updateStats();
  }

  createEventHTML(event) {
    const statusClass = event.status.replace("-", "");
    
    return "<div class=\"timeline-item " + statusClass + "\" onclick=\"timeline.editEvent(\
 + event.id + 
\)\">" +
           "<div class=\"timeline-item-content\">" +
           "<div class=\"timeline-item-title\">" + event.title + "</div>" +
           (event.description ? "<div class=\"timeline-item-description\">" + event.description + "</div>" : "") +
           "<div class=\"timeline-item-meta\">" +
           "<span>📅 " + this.formatDate(event.date) + "</span>" +
           (event.time ? "<span>🕐 " + event.time + "</span>" : "") +
           "<span>📂 " + this.getCategoryName(event.category) + "</span>" +
           "<span>⚡ " + this.getPriorityName(event.priority) + "</span>" +
           "</div>" +
           "</div>" +
           "<div class=\"timeline-item-actions\" onclick=\"event.stopPropagation()\">" +
           "<button class=\"edit-btn\" onclick=\"timeline.editEvent(\ + event.id + \)\">Editar</button>" +
           "<button class=\"status-btn\" onclick=\"timeline.toggleStatus(\ + event.id + \)\">" + this.getStatusName(event.status) + "</button>" +
           "<button class=\"delete-btn\" onclick=\"timeline.deleteEvent(\ + event.id + \)\">Eliminar</button>" +
           "</div>" +
           "</div>";
  }

  openEventModal(eventId = null) {
    this.editingEvent = eventId;
    
    if (eventId) {
      const event = this.events.find(e => e.id === eventId);
      this.modalTitle.textContent = "Editar Evento";
      document.getElementById("eventTitle").value = event.title;
      document.getElementById("eventDescription").value = event.description || "";
      document.getElementById("eventDate").value = event.date;
      document.getElementById("eventTime").value = event.time || "";
      document.getElementById("eventCategory").value = event.category;
      document.getElementById("eventStatus").value = event.status;
      document.getElementById("eventPriority").value = event.priority;
      this.deleteEvent.style.display = "inline-block";
    } else {
      this.modalTitle.textContent = "Nuevo Evento";
      this.eventForm.reset();
      document.getElementById("eventDate").value = new Date().toISOString().split("T")[0];
      this.deleteEvent.style.display = "none";
    }
    
    this.eventModal.classList.add("show");
  }

  closeEventModal() {
    this.eventModal.classList.remove("show");
    this.editingEvent = null;
    this.eventForm.reset();
  }

  saveEventData() {
    const title = document.getElementById("eventTitle").value;
    const description = document.getElementById("eventDescription").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const category = document.getElementById("eventCategory").value;
    const status = document.getElementById("eventStatus").value;
    const priority = document.getElementById("eventPriority").value;
    
    if (!title || !date) {
      alert("Por favor completa los campos obligatorios");
      return;
    }
    
    const event = {
      id: this.editingEvent || Date.now().toString(),
      title: title,
      description: description,
      date: date,
      time: time,
      category: category,
      status: status,
      priority: priority,
      createdAt: this.editingEvent ? this.events.find(e => e.id === this.editingEvent).createdAt : new Date().toISOString()
    };
    
    if (this.editingEvent) {
      const index = this.events.findIndex(e => e.id === this.editingEvent);
      this.events[index] = event;
    } else {
      this.events.push(event);
    }
    
    this.saveEvents();
    this.closeEventModal();
    this.renderTimeline();
  }

  editEvent(eventId) {
    this.openEventModal(eventId);
  }

  deleteEvent(eventId) {
    if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      this.events = this.events.filter(e => e.id !== eventId);
      this.saveEvents();
      this.renderTimeline();
    }
  }

  deleteEventData() {
    if (this.editingEvent) {
      this.deleteEvent(this.editingEvent);
      this.closeEventModal();
    }
  }

  toggleStatus(eventId) {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      const statuses = ["pendiente", "en-progreso", "completado", "cancelado"];
      const currentIndex = statuses.indexOf(event.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      event.status = statuses[nextIndex];
      
      this.saveEvents();
      this.renderTimeline();
    }
  }

  toggleView() {
    this.currentView = this.currentView === "lista" ? "calendario" : "lista";
    this.viewToggle.textContent = "Vista: " + (this.currentView === "lista" ? "Lista" : "Calendario");
    this.renderTimeline();
  }

  updateStats() {
    const total = this.events.length;
    const pending = this.events.filter(e => e.status === "pendiente").length;
    const completed = this.events.filter(e => e.status === "completado").length;
    const progress = this.events.filter(e => e.status === "en-progreso").length;
    
    document.getElementById("totalEvents").textContent = total;
    document.getElementById("pendingEvents").textContent = pending;
    document.getElementById("completedEvents").textContent = completed;
    document.getElementById("progressEvents").textContent = progress;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  getCategoryName(category) {
    const categories = {
      "trabajo": "Trabajo",
      "personal": "Personal",
      "estudio": "Estudio",
      "salud": "Salud",
      "ocio": "Ocio"
    };
    return categories[category] || category;
  }

  getStatusName(status) {
    const statuses = {
      "pendiente": "Pendiente",
      "en-progreso": "En Progreso",
      "completado": "Completado",
      "cancelado": "Cancelado"
    };
    return statuses[status] || status;
  }

  getPriorityName(priority) {
    const priorities = {
      "baja": "Baja",
      "media": "Media",
      "alta": "Alta"
    };
    return priorities[priority] || priority;
  }

  saveEvents() {
    localStorage.setItem("timelineEvents", JSON.stringify(this.events));
  }
}

let timeline;

document.addEventListener("DOMContentLoaded", () => {
  timeline = new TimelineManager();
});
