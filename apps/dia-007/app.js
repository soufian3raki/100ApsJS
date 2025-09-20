// Elementos del DOM
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');

// Estadísticas
const totalTodosEl = document.getElementById('total-todos');
const pendingTodosEl = document.getElementById('pending-todos');
const completedTodosEl = document.getElementById('completed-todos');

// Estado de la aplicación
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Función para guardar tareas en localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Función para generar ID único
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para agregar nueva tarea
function addTodo(text) {
  if (text.trim() === '') return;
  
  const todo = {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.unshift(todo);
  saveTodos();
  renderTodos();
  updateStats();
  
  // Limpiar input
  todoInput.value = '';
  todoInput.focus();
}

// Función para eliminar tarea
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
  updateStats();
}

// Función para toggle completado
function toggleTodo(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
  updateStats();
}

// Función para editar tarea
function editTodo(id, newText) {
  if (newText.trim() === '') {
    deleteTodo(id);
    return;
  }
  
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, text: newText.trim() } : todo
  );
  saveTodos();
  renderTodos();
}

// Función para filtrar tareas
function filterTodos(filter) {
  currentFilter = filter;
  
  // Actualizar botones de filtro
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  
  renderTodos();
}

// Función para renderizar tareas
function renderTodos() {
  let filteredTodos = todos;
  
  // Aplicar filtro
  switch (currentFilter) {
    case 'pending':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
  }
  
  todoList.innerHTML = '';
  
  if (filteredTodos.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-message';
    
    if (currentFilter === 'all') {
      emptyMessage.innerHTML = `
        <div class="empty-icon">📝</div>
        <h3>No hay tareas</h3>
        <p>¡Agrega tu primera tarea para comenzar!</p>
      `;
    } else if (currentFilter === 'pending') {
      emptyMessage.innerHTML = `
        <div class="empty-icon">✅</div>
        <h3>¡Excelente trabajo!</h3>
        <p>No tienes tareas pendientes</p>
      `;
    } else {
      emptyMessage.innerHTML = `
        <div class="empty-icon">🎯</div>
        <h3>No hay tareas completadas</h3>
        <p>¡Comienza a completar tus tareas!</p>
      `;
    }
    
    todoList.appendChild(emptyMessage);
    return;
  }
  
  filteredTodos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoItem.dataset.id = todo.id;
    
    const createdAt = new Date(todo.createdAt);
    const timeAgo = getTimeAgo(createdAt);
    
    todoItem.innerHTML = `
      <div class="todo-content">
        <button class="todo-checkbox ${todo.completed ? 'checked' : ''}" title="${todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}">
          ${todo.completed ? '✓' : ''}
        </button>
        <div class="todo-text" contenteditable="${!todo.completed}">${todo.text}</div>
        <div class="todo-time">${timeAgo}</div>
      </div>
      <button class="todo-delete" title="Eliminar tarea">🗑️</button>
    `;
    
    // Event listeners para la tarea
    const checkbox = todoItem.querySelector('.todo-checkbox');
    const textElement = todoItem.querySelector('.todo-text');
    const deleteBtn = todoItem.querySelector('.todo-delete');
    
    checkbox.addEventListener('click', () => {
      toggleTodo(todo.id);
    });
    
    deleteBtn.addEventListener('click', () => {
      deleteTodo(todo.id);
    });
    
    // Edición de texto
    textElement.addEventListener('blur', () => {
      editTodo(todo.id, textElement.textContent);
    });
    
    textElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        textElement.blur();
      }
    });
    
    todoList.appendChild(todoItem);
  });
}

// Función para actualizar estadísticas
function updateStats() {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  
  totalTodosEl.textContent = total;
  pendingTodosEl.textContent = pending;
  completedTodosEl.textContent = completed;
}

// Función para obtener tiempo transcurrido
function getTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Ahora';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Hace ${minutes} min`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Hace ${hours}h`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `Hace ${days}d`;
  }
}

// Función para limpiar tareas completadas
function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
  updateStats();
}

// Función para limpiar todas las tareas
function clearAll() {
  if (confirm('¿Estás seguro de que quieres eliminar todas las tareas?')) {
    todos = [];
    saveTodos();
    renderTodos();
    updateStats();
  }
}

// Event listeners
addTodoBtn.addEventListener('click', () => {
  addTodo(todoInput.value);
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo(todoInput.value);
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterTodos(btn.dataset.filter);
  });
});

clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    todoInput.blur();
  }
});

// Inicializar
renderTodos();
updateStats(); 