# 🗺️ Día 19: Mapa Interactivo

## 📋 Descripción
Mapa interactivo con marcadores personalizables, búsqueda de ubicaciones y funcionalidades de geolocalización.

## ✨ Características
- **Mapa interactivo** con zoom y pan
- **Marcadores personalizables** con información
- **Búsqueda de ubicaciones** por nombre
- **Geolocalización** del usuario
- **Rutas entre puntos** de interés
- **Diseño responsive** y moderno
- **Integración con APIs** de mapas

## 🚀 Cómo Funciona

### Inicialización del Mapa
```javascript
let map;
let markers = [];
let currentLocation = null;

function initMap() {
  map = L.map("map").setView([40.7128, -74.0060], 13);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
  
  // Evento de clic en el mapa
  map.on("click", function(e) {
    addMarker(e.latlng, "Nuevo marcador");
  });
}

function addMarker(latlng, title) {
  const marker = L.marker(latlng).addTo(map);
  marker.bindPopup(title);
  markers.push(marker);
  return marker;
}
```

### Búsqueda de Ubicaciones
```javascript
async function searchLocation(query) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
    );
    const results = await response.json();
    
    if (results.length > 0) {
      const result = results[0];
      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);
      
      map.setView([lat, lon], 15);
      addMarker([lat, lon], result.display_name);
    } else {
      showError("Ubicación no encontrada");
    }
  } catch (error) {
    showError("Error en la búsqueda");
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Leaflet.js**: Biblioteca de mapas
- **Fetch API**: Búsqueda de ubicaciones
- **Geolocation API**: Ubicación del usuario
- **Event handling**: Interacciones del mapa
- **Async/await**: Programación asíncrona
- **Error handling**: Manejo de errores

### CSS
- **Flexbox para layout**: Disposición de controles
- **Grid para resultados**: Organización de búsquedas
- **Responsive design**: Adaptación móvil
- **Hover effects**: Interactividad visual
- **Custom modals**: Ventanas emergentes

### APIs
- **OpenStreetMap**: Datos de mapas
- **Nominatim API**: Búsqueda geocoding
- **Geolocation API**: Ubicación del usuario
- **Leaflet.js**: Interfaz de mapas

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura y geolocalización
- **CSS3**: Flexbox, responsive design
- **JavaScript ES6+**: Lógica del mapa
- **Leaflet.js**: Biblioteca de mapas
- **OpenStreetMap**: Datos de mapas

## �� Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Mapa escalable**: Se adapta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en mapa y controles
- **Teclado**: 
  - `Enter`: Buscar ubicación
  - `G`: Ir a mi ubicación
  - `+`/`-`: Zoom in/out

## 🔧 Estructura del Código
```
dia-019/
├── index.html          # Estructura HTML + mapa
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + mapas
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Haz clic en el mapa para agregar marcadores
3. Usa la búsqueda para encontrar ubicaciones
4. Haz clic en "Mi Ubicación" para geolocalización
5. Explora el mapa con zoom y pan

## 💡 Mejoras Futuras
- [ ] Rutas entre puntos
- [ ] Marcadores personalizados
- [ ] Capas de información
- [ ] Modo de pantalla completa
- [ ] Exportar mapas
- [ ] Colaboración en tiempo real

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~200 líneas
- **Tiempo de desarrollo**: ~3 horas
- **Complejidad**: Intermedia
- **Dependencias**: Leaflet.js
- **APIs**: OpenStreetMap, Nominatim

## 🗺️ Casos de Uso
- **Navegación**: Mapas de ubicaciones
- **Turismo**: Puntos de interés
- **Logística**: Seguimiento de rutas
- **Educación**: Geografía interactiva

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 19*
