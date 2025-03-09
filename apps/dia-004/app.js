// Botón volver atrás
const backBtn = document.getElementById('back');
backBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

// Sincronizar modo de color
const modeBtn = document.getElementById('toggle-mode');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  modeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}
modeBtn.addEventListener('click', toggleTheme);
setTheme(localStorage.getItem('theme') || 'light');

// Tasas de cambio simuladas (en un proyecto real usarías una API)
const exchangeRates = {
  USD: {
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.25,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    MXN: 20.15,
    BRL: 5.25,
    MAD: 9.85
  },
  EUR: {
    USD: 1.18,
    GBP: 0.86,
    JPY: 129.70,
    CAD: 1.47,
    AUD: 1.59,
    CHF: 1.08,
    CNY: 7.59,
    MXN: 23.71,
    BRL: 6.18,
    MAD: 11.59
  },
  GBP: {
    USD: 1.37,
    EUR: 1.16,
    JPY: 151.03,
    CAD: 1.71,
    AUD: 1.85,
    CHF: 1.26,
    CNY: 8.84,
    MXN: 27.60,
    BRL: 7.19,
    MAD: 13.49
  },
  JPY: {
    USD: 0.0091,
    EUR: 0.0077,
    GBP: 0.0066,
    CAD: 0.0113,
    AUD: 0.0122,
    CHF: 0.0083,
    CNY: 0.0585,
    MXN: 0.1827,
    BRL: 0.0476,
    MAD: 0.0894
  },
  CAD: {
    USD: 0.80,
    EUR: 0.68,
    GBP: 0.58,
    JPY: 88.20,
    AUD: 1.08,
    CHF: 0.74,
    CNY: 5.16,
    MXN: 16.12,
    BRL: 4.20,
    MAD: 7.88
  },
  AUD: {
    USD: 0.74,
    EUR: 0.63,
    GBP: 0.54,
    JPY: 81.67,
    CAD: 0.93,
    CHF: 0.68,
    CNY: 4.78,
    MXN: 14.93,
    BRL: 3.89,
    MAD: 7.30
  },
  CHF: {
    USD: 1.09,
    EUR: 0.93,
    GBP: 0.79,
    JPY: 119.84,
    CAD: 1.36,
    AUD: 1.47,
    CNY: 7.01,
    MXN: 21.90,
    BRL: 5.71,
    MAD: 10.71
  },
  CNY: {
    USD: 0.155,
    EUR: 0.132,
    GBP: 0.113,
    JPY: 17.09,
    CAD: 0.194,
    AUD: 0.209,
    CHF: 0.143,
    MXN: 3.12,
    BRL: 0.814,
    MAD: 1.53
  },
  MXN: {
    USD: 0.0496,
    EUR: 0.0422,
    GBP: 0.0362,
    JPY: 5.47,
    CAD: 0.0620,
    AUD: 0.0670,
    CHF: 0.0457,
    CNY: 0.320,
    BRL: 0.261,
    MAD: 0.489
  },
  BRL: {
    USD: 0.190,
    EUR: 0.162,
    GBP: 0.139,
    JPY: 21.00,
    CAD: 0.238,
    AUD: 0.257,
    CHF: 0.175,
    CNY: 1.23,
    MXN: 3.84,
    MAD: 1.88
  },
  MAD: {
    USD: 0.1015,
    EUR: 0.0863,
    GBP: 0.0741,
    JPY: 11.18,
    CAD: 0.1269,
    AUD: 0.1370,
    CHF: 0.0934,
    CNY: 0.654,
    MXN: 2.04,
    BRL: 0.532
  }
};

// Elementos del DOM
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultAmount = document.getElementById('result-amount');
const resultRate = document.getElementById('result-rate');
const convertBtn = document.getElementById('convert-btn');
const refreshBtn = document.getElementById('refresh-btn');
const swapBtn = document.getElementById('swap-btn');
const popularConversions = document.getElementById('popular-conversions');

// Función para convertir monedas
function convertCurrency() {
  const amount = parseFloat(amountInput.value) || 0;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  
  if (from === to) {
    resultAmount.textContent = `${amount.toFixed(2)} ${from}`;
    resultRate.textContent = `1 ${from} = 1.00 ${to}`;
    return;
  }
  
  let rate;
  if (exchangeRates[from] && exchangeRates[from][to]) {
    rate = exchangeRates[from][to];
  } else if (exchangeRates[to] && exchangeRates[to][from]) {
    rate = 1 / exchangeRates[to][from];
  } else {
    rate = 1; // Fallback
  }
  
  const convertedAmount = amount * rate;
  resultAmount.textContent = `${convertedAmount.toFixed(2)} ${to}`;
  resultRate.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

// Función para intercambiar monedas
function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
}

// Función para mostrar conversiones populares
function showPopularConversions() {
  const popularPairs = [
    { from: 'USD', to: 'EUR', amount: 100 },
    { from: 'EUR', to: 'USD', amount: 100 },
    { from: 'USD', to: 'MAD', amount: 100 },
    { from: 'EUR', to: 'MAD', amount: 100 },
    { from: 'USD', to: 'JPY', amount: 1 },
    { from: 'MAD', to: 'EUR', amount: 100 }
  ];
  
  popularConversions.innerHTML = '';
  
  popularPairs.forEach(pair => {
    const rate = exchangeRates[pair.from]?.[pair.to] || 1;
    const converted = (pair.amount * rate).toFixed(2);
    
    const card = document.createElement('div');
    card.className = 'popular-card';
    card.innerHTML = `
      <div class="popular-amount">${pair.amount} ${pair.from}</div>
      <div class="popular-arrow">→</div>
      <div class="popular-result">${converted} ${pair.to}</div>
    `;
    
    card.addEventListener('click', () => {
      fromCurrency.value = pair.from;
      toCurrency.value = pair.to;
      amountInput.value = pair.amount;
      convertCurrency();
    });
    
    popularConversions.appendChild(card);
  });
}

// Event listeners
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);
convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);

refreshBtn.addEventListener('click', () => {
  // Simular actualización de tasas
  showNotification('Tasas actualizadas');
  convertCurrency();
});

// Soporte para teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    convertCurrency();
  } else if (e.key === 's' || e.key === 'S') {
    swapCurrencies();
  }
});

// Función para mostrar notificaciones
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Inicializar
convertCurrency();
showPopularConversions(); 