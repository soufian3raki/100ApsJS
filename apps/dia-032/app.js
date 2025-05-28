// App de Calendario - Día 32
class Calendar {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    this.editingEvent = null;
    
    this.initializeElements();
    this.setupEventListeners();
    this.renderCalendar();
    this.updateEventsList();
  }

  initializeElements() {
    this.currentMonthEl = document.getElementById("currentMonth");
    this.calendarDaysEl = document.getElementById("calendarDays");
    this.selectedDateEl = document.getElementById("selectedDate");
    this.eventsListEl = document.getElementById("eventsList");
    this.prevMonthBtn = document.getElementById("prevMonth");
    this.nextMonthBtn = document.getElementById("nextMonth");
    this.todayBtn = document.getElementById("todayBtn");
    this.addEventBtn = document.getElementById("addEventBtn");
    this.eventModal = document.getElementById("eventModal");
    this.closeModalBtn = document.getElementById("closeModal");
    this.eventForm = document.getElementById("eventForm");
    this.saveEventBtn = document.getElementById("saveEvent");
    this.deleteEventBtn = document.getElementById("deleteEvent");
    this.cancelEventBtn = document.getElementById("cancelEvent");
  }

  setupEventListeners() {
    this.prevMonthBtn.addEventListener("click", () => this.previousMonth());
    this.nextMonthBtn.addEventListener("click", () => this.nextMonth());
    this.todayBtn.addEventListener("click", () => this.goToToday());
    this.addEventBtn.addEventListener("click", () => this.openEventModal());
    this.closeModalBtn.addEventListener("click", () => this.closeEventModal());
    this.saveEventBtn.addEventListener("click", () => this.saveEvent());
    this.deleteEventBtn.addEventListener("click", () => this.deleteEvent());
    this.cancelEventBtn.addEventListener("click", () => this.closeEventModal());
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    this.currentMonthEl.textContent = monthNames[month] + " " + year;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    this.calendarDaysEl.innerHTML = "";
    
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      this.createDayElement(day, true);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      this.createDayElement(day, false);
    }
    
    const totalCells = this.calendarDaysEl.children.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      this.createDayElement(day, true);
    }
  }

  createDayElement(day, isOtherMonth) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";
    if (isOtherMonth) {
      dayEl.classList.add("other-month");
    }
    
    dayEl.textContent = day;
    
    const today = new Date();
    if (!isOtherMonth && 
        day === today.getDate() && 
        this.currentDate.getMonth() === today.getMonth() && 
        this.currentDate.getFullYear() === today.getFullYear()) {
      dayEl.classList.add("today");
    }
    
    if (!isOtherMonth && this.hasEvents(day)) {
      dayEl.classList.add("has-events");
    }
    
    dayEl.addEventListener("click", () => {
      if (!isOtherMonth) {
        this.selectDate(day);
      }
    });
    
    this.calendarDaysEl.appendChild(dayEl);
  }

  hasEvents(day) {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
    
    return this.events.some(event => event.date === dateStr);
  }

  selectDate(day) {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    this.selectedDate = new Date(year, month, day);
    
    document.querySelectorAll(".calendar-day").forEach(el => {
      el.classList.remove("selected");
    });
    event.target.classList.add("selected");
    
    this.updateEventsList();
  }

  updateEventsList() {
    const dateStr = this.formatDate(this.selectedDate);
    const dayEvents = this.events.filter(event => event.date === dateStr);
    
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const dayName = dayNames[this.selectedDate.getDay()];
    const day = this.selectedDate.getDate();
    const monthName = monthNames[this.selectedDate.getMonth()];
    const year = this.selectedDate.getFullYear();
    
    this.selectedDateEl.textContent = dayName + ", " + day + " de " + monthName + " " + year;
    
    if (dayEvents.length === 0) {
      this.eventsListEl.innerHTML = "<div class=\"empty-events\"><p>No hay eventos para este día</p></div>";
    } else {
      this.eventsListEl.innerHTML = dayEvents.map(event => {
        return "<div class=\"event-item\" onclick=\"calendar.editEvent(\
 + event.id + 
\)\">" +
               "<div class=\"event-title\" style=\"color: " + event.color + "\">" + event.title + "</div>" +
               (event.time ? "<div class=\"event-time\">" + event.time + "</div>" : "") +
               (event.description ? "<div class=\"event-description\">" + event.description + "</div>" : "") +
               "</div>";
      }).join("");
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  goToToday() {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.renderCalendar();
    this.updateEventsList();
  }

  openEventModal(eventId = null) {
    this.editingEvent = eventId;
    const modalTitle = document.getElementById("modalTitle");
    const eventTitle = document.getElementById("eventTitle");
    const eventDate = document.getElementById("eventDate");
    const eventTime = document.getElementById("eventTime");
    const eventDescription = document.getElementById("eventDescription");
    const eventColor = document.getElementById("eventColor");
    
    if (eventId) {
      const event = this.events.find(e => e.id === eventId);
      modalTitle.textContent = "Editar Evento";
      eventTitle.value = event.title;
      eventDate.value = event.date;
      eventTime.value = event.time || "";
      eventDescription.value = event.description || "";
      eventColor.value = event.color;
      this.deleteEventBtn.style.display = "inline-block";
    } else {
      modalTitle.textContent = "Agregar Evento";
      eventTitle.value = "";
      eventDate.value = this.formatDate(this.selectedDate);
      eventTime.value = "";
      eventDescription.value = "";
      eventColor.value = "#3b82f6";
      this.deleteEventBtn.style.display = "none";
    }
    
    this.eventModal.classList.add("show");
  }

  closeEventModal() {
    this.eventModal.classList.remove("show");
    this.editingEvent = null;
    this.eventForm.reset();
  }

  saveEvent() {
    const eventTitle = document.getElementById("eventTitle").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTime = document.getElementById("eventTime").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventColor = document.getElementById("eventColor").value;
    
    if (!eventTitle || !eventDate) {
      alert("Por favor completa los campos obligatorios");
      return;
    }
    
    const event = {
      id: this.editingEvent || Date.now().toString(),
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      description: eventDescription,
      color: eventColor
    };
    
    if (this.editingEvent) {
      const index = this.events.findIndex(e => e.id === this.editingEvent);
      this.events[index] = event;
    } else {
      this.events.push(event);
    }
    
    this.saveEvents();
    this.closeEventModal();
    this.renderCalendar();
    this.updateEventsList();
  }

  editEvent(eventId) {
    this.openEventModal(eventId);
  }

  deleteEvent() {
    if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      this.events = this.events.filter(e => e.id !== this.editingEvent);
      this.saveEvents();
      this.closeEventModal();
      this.renderCalendar();
      this.updateEventsList();
    }
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  saveEvents() {
    localStorage.setItem("calendarEvents", JSON.stringify(this.events));
  }
}

let calendar;

document.addEventListener("DOMContentLoaded", () => {
  calendar = new Calendar();
});
