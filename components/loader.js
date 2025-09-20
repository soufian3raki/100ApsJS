document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
});

function loadHeader() {
  const headerPlaceholder = document.createElement('div');
  headerPlaceholder.id = 'header-placeholder';
  document.body.prepend(headerPlaceholder);

  fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
      headerPlaceholder.innerHTML = data;

      // Set app title
      const appTitle = document.getElementById('app-title');
      if (appTitle) {
        appTitle.textContent = document.title;
      }

      // Back button functionality
      const backBtn = document.getElementById('back');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          window.location.href = '../../index.html';
        });
      }

      // Theme toggle functionality
      const modeBtn = document.getElementById('toggle-mode');
      if (modeBtn) {
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
      }
    });
}

function loadFooter() {
  const footerPlaceholder = document.createElement('div');
  footerPlaceholder.id = 'footer-placeholder';
  document.body.append(footerPlaceholder);

  fetch('/components/footer.html')
    .then(response => response.text())
    .then(data => {
      footerPlaceholder.innerHTML = data;
    });
}