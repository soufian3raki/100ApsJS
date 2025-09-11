// Solo ejecutar en la página principal
if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
  let apps = []; // Array para almacenar las apps cargadas

  // Esperar a que el DOM esté listo
  document.addEventListener("DOMContentLoaded", function() {
    const appsList = document.getElementById("apps-list");
    const toggleMode = document.getElementById("toggle-mode");

    // Verificar que los elementos existan
    if (!appsList) {
      console.error("No se encontró el elemento apps-list");
      return;
    }

    // Función para cargar las apps desde JSON
    async function loadApps() {
      try {
        // Mostrar estado de carga
        appsList.innerHTML = '<div class="loading">Cargando aplicaciones...</div>';
        
        const response = await fetch('apps.json');
        if (!response.ok) {
          throw new Error('Error al cargar las apps');
        }
        apps = await response.json();
        renderApps();
      } catch (error) {
        console.error('Error cargando apps:', error);
        // Fallback: mostrar mensaje de error
        appsList.innerHTML = '<div class="error-message">Error al cargar las aplicaciones. Por favor, recarga la página.</div>';
      }
    }

    // Función para renderizar apps
    function renderApps(appsToRender = apps) {
      if (!appsList) return;
      
      appsList.innerHTML = appsToRender.map(app => `
        <div class="app-card">
          <div class="app-image" onclick="openApp('${app.path}')">
            <div class="app-number">#${app.id}</div>
            <div class="app-icon">${app.icon}</div>
            <img src="${app.image}" alt="${app.name}" loading="lazy">
          </div>
          <div class="app-content">
            <h3 class="app-title" onclick="openApp('${app.path}')">${app.name}</h3>
            <p class="app-description">${app.description}</p>
            <div class="app-tags">
              ${app.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="app-actions">
              <button class="action-btn demo-btn" onclick="openApp('${app.path}')" title="Ver Demo">
                🚀 Demo
              </button>
              <button class="action-btn code-btn" onclick="openCode('${app.path}')" title="Ver Código Fuente">
                💻 Código
              </button>
              <button class="action-btn readme-btn" onclick="openReadme('${app.path}')" title="Ver README">
                📖 README
              </button>
            </div>
          </div>
        </div>
      `).join("");
    }

    // Función para abrir una app
    window.openApp = function(path) {
      window.location.href = `apps/${path}/index.html`;
    };

    // Función para abrir el código fuente
    window.openCode = function(path) {
      window.open(`https://github.com/soufian3raki/100ApsJS/tree/main/apps/${path}`, '_blank');
    };

    // Función para abrir el README
    window.openReadme = function(path) {
      window.open(`https://github.com/soufian3raki/100ApsJS/blob/main/apps/${path}/README.md`, '_blank');
    };

    // Event listener para el botón de modo oscuro
    if (toggleMode) {
      toggleMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        toggleMode.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
    }

    // Cargar tema desde localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      if (toggleMode) {
        toggleMode.textContent = "☀️";
      }
    }

    // Cargar las apps desde JSON
    loadApps();
  });
}
