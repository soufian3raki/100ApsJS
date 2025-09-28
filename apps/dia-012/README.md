# 🌤️ Día 12: App de Clima

## 📋 Descripción
Aplicación del clima con información en tiempo real, pronóstico extendido y datos meteorológicos detallados.

## ✨ Características
- **Información del clima actual**
- **Pronóstico de 5 días**
- **Búsqueda por ciudad**
- **Datos de temperatura, humedad, viento**
- **Iconos meteorológicos**
- **Diseño responsive** y moderno
- **Geolocalización automática**

## 🚀 Cómo Funciona

### API del Clima
```javascript
const API_KEY = "tu_api_key_aqui";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeatherData(city) {
  try {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
    const data = await response.json();
    
    if (data.cod === 200) {
      displayCurrentWeather(data);
    } else {
      showError("Ciudad no encontrada");
    }
  } catch (error) {
    showError("Error al obtener datos del clima");
  }
}
```

### Geolocalización
```javascript
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      },
      error => {
        console.log("Error de geolocalización:", error);
        getWeatherData("Madrid"); // Ciudad por defecto
      }
    );
  } else {
    getWeatherData("Madrid");
  }
}
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **Fetch API**: Peticiones HTTP
- **Async/await**: Programación asíncrona
- **Geolocation API**: Ubicación del usuario
- **Error handling**: try/catch
- **JSON parsing**: Datos de API
- **Template literals**: Strings dinámicos

### CSS
- **Flexbox para layout**: Disposición de elementos
- **Grid para pronóstico**: Organización de datos
- **Responsive design**: Adaptación móvil
- **Iconos meteorológicos**: Visualización
- **Gradientes de fondo**: Efectos visuales

### APIs
- **OpenWeatherMap API**: Datos del clima
- **Geolocation API**: Ubicación
- **Fetch API**: Comunicación HTTP

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura y formularios
- **CSS3**: Flexbox, grid, responsive
- **JavaScript ES6+**: Async/await, fetch
- **OpenWeatherMap API**: Datos del clima

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Flexbox**: Layout adaptativo
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Datos claros

## 🎮 Controles
- **Mouse**: Clic en botones y búsqueda
- **Teclado**: 
  - `Enter`: Buscar ciudad
  - `G`: Usar geolocalización
  - `Tab`: Navegación

## 🔧 Estructura del Código
```
dia-012/
├── index.html          # Estructura HTML + formularios
├── app.css            # Estilos + responsive design
├── app.js             # Lógica + API calls
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Obtén una API key de OpenWeatherMap
2. Reemplaza "tu_api_key_aqui" en el código
3. Abre `index.html` en tu navegador
4. Busca una ciudad o usa tu ubicación actual

## 💡 Mejoras Futuras
- [ ] Pronóstico extendido (7-14 días)
- [ ] Mapas meteorológicos
- [ ] Alertas de clima
- [ ] Historial de búsquedas
- [ ] Favoritos de ciudades
- [ ] Modo offline

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~150 líneas
- **Tiempo de desarrollo**: ~2 horas
- **Complejidad**: Intermedia
- **Dependencias**: OpenWeatherMap API
- **APIs**: Weather, Geolocation

## 🌤️ Casos de Uso
- **Viajeros**: Información del clima
- **Agricultura**: Datos meteorológicos
- **Deportes**: Condiciones climáticas
- **Planificación**: Eventos al aire libre

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 12*
