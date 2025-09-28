// Weather Dashboard App
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const baseUrl = 'https://api.openweathermap.org/data/2.5';

let currentWeather = null;

// Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const forecastSection = document.getElementById('forecastSection');
const loading = document.getElementById('loading');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Load default city
  searchWeather('Madrid');
  
  // Event listeners
  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      searchWeather(city);
    }
  });
  
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const city = cityInput.value.trim();
      if (city) {
        searchWeather(city);
      }
    }
  });
});

async function searchWeather(city) {
  showLoading();
  
  try {
    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    
    displayWeather(weatherData);
    displayForecast(forecastData);
    
  } catch (error) {
    showError('Error al obtener datos del clima');
    console.error('Error:', error);
  }
}

async function fetchWeather(city) {
  const response = await fetch(
    `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
  );
  
  if (!response.ok) {
    throw new Error('Ciudad no encontrada');
  }
  
  return await response.json();
}

async function fetchForecast(city) {
  const response = await fetch(
    `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`
  );
  
  if (!response.ok) {
    throw new Error('Error al obtener pronóstico');
  }
  
  return await response.json();
}

function displayWeather(data) {
  const weatherHTML = `
    <div class="weather-info">
      <div>
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${new Date().toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>
      <div>
        <div class="temperature">${Math.round(data.main.temp)}°C</div>
        <div class="weather-desc">
          <span>${data.weather[0].description}</span>
        </div>
      </div>
    </div>
    <div class="weather-details">
      <div class="detail">
        <span>Humedad: ${data.main.humidity}%</span>
      </div>
      <div class="detail">
        <span>Viento: ${Math.round(data.wind.speed)} km/h</span>
      </div>
      <div class="detail">
        <span>Presión: ${data.main.pressure} hPa</span>
      </div>
    </div>
  `;
  
  weatherDisplay.innerHTML = weatherHTML;
  currentWeather = data;
}

function displayForecast(data) {
  const dailyData = data.list.filter((item, index) => index % 8 === 0);
  
  const forecastHTML = `
    <h3>Pronóstico 5 días</h3>
    <div class="forecast-grid">
      ${dailyData.map(day => `
        <div class="forecast-item">
          <div class="forecast-date">
            ${new Date(day.dt * 1000).toLocaleDateString('es-ES', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
          <div class="forecast-desc">${day.weather[0].description}</div>
        </div>
      `).join('')}
    </div>
  `;
  
  forecastSection.innerHTML = forecastHTML;
}

function showLoading() {
  loading.style.display = 'block';
  weatherDisplay.innerHTML = '';
  forecastSection.innerHTML = '';
}

function showError(message) {
  loading.style.display = 'none';
  weatherDisplay.innerHTML = `
    <div class="error">
      <p>${message}</p>
    </div>
  `;
  forecastSection.innerHTML = '';
} 