// Lógica del conversor de divisas
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const swapBtn = document.getElementById('swap');
const convertBtn = document.getElementById('convert');
const resultDiv = document.getElementById('result');
const rateDiv = document.getElementById('rate');

let exchangeRates = {};

// Cargar tasas de cambio
async function loadExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    exchangeRates = data.rates;
    console.log('Tasas de cambio cargadas:', exchangeRates);
  } catch (error) {
    console.error('Error al cargar las tasas de cambio:', error);
    // Usar tasas de ejemplo en caso de error
    exchangeRates = {
      'USD': 1,
      'EUR': 0.85,
      'GBP': 0.73,
      'JPY': 110,
      'CAD': 1.25,
      'AUD': 1.35,
      'CHF': 0.92,
      'CNY': 6.45,
      'MXN': 20.5,
      'BRL': 5.2
    };
  }
}

// Convertir divisas
function convertCurrency() {
  const amount = parseFloat(amountInput.value) || 0;
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;
  
  if (amount <= 0) {
    resultDiv.textContent = '0.00';
    rateDiv.textContent = 'Tasa: 1.00';
    return;
  }
  
  // Convertir a USD primero, luego a la moneda destino
  const usdAmount = amount / exchangeRates[fromCurrency];
  const convertedAmount = usdAmount * exchangeRates[toCurrency];
  
  // Calcular tasa de cambio
  const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  
  resultDiv.textContent = convertedAmount.toFixed(2);
  rateDiv.textContent = `Tasa: ${rate.toFixed(4)}`;
}

// Intercambiar divisas
function swapCurrencies() {
  const fromValue = fromSelect.value;
  const toValue = toSelect.value;
  
  fromSelect.value = toValue;
  toSelect.value = fromValue;
  
  convertCurrency();
}

// Formatear número mientras se escribe
function formatAmount() {
  let value = amountInput.value;
  
  // Remover caracteres no numéricos excepto punto decimal
  value = value.replace(/[^0-9.]/g, '');
  
  // Asegurar solo un punto decimal
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limitar a 2 decimales
  if (parts[1] && parts[1].length > 2) {
    value = parts[0] + '.' + parts[1].substring(0, 2);
  }
  
  amountInput.value = value;
  convertCurrency();
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);

swapBtn.addEventListener('click', swapCurrencies);

amountInput.addEventListener('input', formatAmount);

fromSelect.addEventListener('change', convertCurrency);
toSelect.addEventListener('change', convertCurrency);

// Cargar tasas de cambio al iniciar
loadExchangeRates();

// Convertir automáticamente cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  convertCurrency();
});