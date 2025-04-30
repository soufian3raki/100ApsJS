class CSVReader {
  constructor() {
    this.csvData = [];
    this.headers = [];
    this.currentChart = null;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('csvFile').addEventListener('change', (e) => {
      this.handleFileUpload(e.target.files);
    });

    document.getElementById('parseCsv').addEventListener('click', () => {
      this.parseCSV();
    });

    document.getElementById('showAllData').addEventListener('click', () => {
      this.showAllData();
    });

    document.getElementById('exportData').addEventListener('click', () => {
      this.exportToJSON();
    });

    document.getElementById('clearData').addEventListener('click', () => {
      this.clearData();
    });

    document.getElementById('generateChart').addEventListener('click', () => {
      this.generateChart();
    });

    document.getElementById('downloadChart').addEventListener('click', () => {
      this.downloadChart();
    });

    document.getElementById('fullscreenChart').addEventListener('click', () => {
      this.fullscreenChart();
    });

    // Drag and drop
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--accent)';
      uploadArea.style.background = 'rgba(59, 130, 246, 0.1)';
    });

    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--border)';
      uploadArea.style.background = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--border)';
      uploadArea.style.background = 'transparent';
      this.handleFileUpload(e.dataTransfer.files);
    });
  }

  handleFileUpload(files) {
    if (files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Por favor selecciona un archivo CSV válido');
      return;
    }

    this.currentFile = file;
    this.updateFileInfo(file);
    document.getElementById('csvControls').style.display = 'block';
  }

  updateFileInfo(file) {
    const fileInfo = document.getElementById('fileInfo');
    fileInfo.innerHTML = `
      <strong>Archivo:</strong> ${this.escapeHtml(file.name)}<br>
      <strong>Tamaño:</strong> ${this.formatFileSize(file.size)}<br>
      <strong>Última modificación:</strong> ${new Date(file.lastModified).toLocaleString()}
    `;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async parseCSV() {
    if (!this.currentFile) return;

    const delimiter = document.getElementById('delimiter').value;
    const hasHeaders = document.getElementById('hasHeaders').checked;
    const encoding = document.getElementById('encoding').value;

    try {
      this.showLoading();
      const text = await this.readFileAsText(this.currentFile, encoding);
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        throw new Error('El archivo CSV está vacío');
      }

      this.csvData = lines.map(line => this.parseCSVLine(line, delimiter));
      
      if (hasHeaders) {
        this.headers = this.csvData[0];
        this.csvData = this.csvData.slice(1);
      } else {
        this.headers = this.csvData[0].map((_, index) => `Columna ${index + 1}`);
      }

      this.displayData();
      this.populateChartControls();
      this.calculateStatistics();
      this.hideLoading();

    } catch (error) {
      this.hideLoading();
      alert('Error al procesar el archivo CSV: ' + error.message);
    }
  }

  readFileAsText(file, encoding) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
      reader.readAsText(file, encoding);
    });
  }

  parseCSVLine(line, delimiter) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  displayData(limit = 100) {
    const table = document.getElementById('dataTable');
    const showAll = limit === null;
    const dataToShow = showAll ? this.csvData : this.csvData.slice(0, limit);

    let tableHTML = `
      <thead>
        <tr>
          ${this.headers.map(header => `<th>${this.escapeHtml(header)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
    `;

    dataToShow.forEach((row, index) => {
      tableHTML += '<tr>';
      row.forEach(cell => {
        tableHTML += `<td title="${this.escapeHtml(cell)}">${this.escapeHtml(cell)}</td>`;
      });
      tableHTML += '</tr>';
    });

    if (!showAll && this.csvData.length > limit) {
      tableHTML += `
        <tr>
          <td colspan="${this.headers.length}" style="text-align: center; font-style: italic; color: var(--text-secondary);">
            Mostrando ${limit} de ${this.csvData.length} filas. Haz clic en "Mostrar Todos" para ver todo.
          </td>
        </tr>
      `;
    }

    tableHTML += '</tbody>';
    table.innerHTML = tableHTML;

    document.getElementById('csvPreview').style.display = 'block';
    document.getElementById('chartSection').style.display = 'block';
    document.getElementById('statistics').style.display = 'block';
  }

  showAllData() {
    this.displayData(null);
  }

  populateChartControls() {
    const xAxis = document.getElementById('xAxis');
    const yAxis = document.getElementById('yAxis');
    const groupBy = document.getElementById('groupBy');

    const options = this.headers.map(header => 
      `<option value="${this.escapeHtml(header)}">${this.escapeHtml(header)}</option>`
    ).join('');

    xAxis.innerHTML = options;
    yAxis.innerHTML = options;
    groupBy.innerHTML = '<option value="">Sin agrupación</option>' + options;
  }

  generateChart() {
    const chartType = document.getElementById('chartType').value;
    const xAxis = document.getElementById('xAxis').value;
    const yAxis = document.getElementById('yAxis').value;
    const groupBy = document.getElementById('groupBy').value;

    if (!xAxis || !yAxis) {
      alert('Por favor selecciona los ejes X e Y');
      return;
    }

    const ctx = document.getElementById('dataChart').getContext('2d');
    
    if (this.currentChart) {
      this.currentChart.destroy();
    }

    const chartData = this.prepareChartData(xAxis, yAxis, groupBy, chartType);
    
    this.currentChart = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${xAxis} vs ${yAxis}`
          },
          legend: {
            display: chartType === 'pie'
          }
        },
        scales: chartType !== 'pie' ? {
          x: {
            title: {
              display: true,
              text: xAxis
            }
          },
          y: {
            title: {
              display: true,
              text: yAxis
            }
          }
        } : {}
      }
    });
  }

  prepareChartData(xAxis, yAxis, groupBy, chartType) {
    const xIndex = this.headers.indexOf(xAxis);
    const yIndex = this.headers.indexOf(yAxis);
    const groupIndex = groupBy ? this.headers.indexOf(groupBy) : -1;

    if (chartType === 'pie') {
      const grouped = this.groupData(xIndex, yIndex, groupIndex);
      return {
        labels: grouped.labels,
        datasets: [{
          data: grouped.data,
          backgroundColor: this.generateColors(grouped.labels.length)
        }]
      };
    } else {
      const grouped = this.groupData(xIndex, yIndex, groupIndex);
      return {
        labels: grouped.labels,
        datasets: grouped.datasets
      };
    }
  }

  groupData(xIndex, yIndex, groupIndex) {
    const groups = new Map();
    
    this.csvData.forEach(row => {
      const xValue = row[xIndex];
      const yValue = parseFloat(row[yIndex]) || 0;
      const groupValue = groupIndex >= 0 ? row[groupIndex] : 'default';

      if (!groups.has(groupValue)) {
        groups.set(groupValue, new Map());
      }

      const group = groups.get(groupValue);
      group.set(xValue, (group.get(xValue) || 0) + yValue);
    });

    const labels = Array.from(groups.values())[0] ? Array.from(groups.values())[0].keys() : [];
    const datasets = Array.from(groups.entries()).map(([groupName, data], index) => ({
      label: groupName,
      data: Array.from(labels).map(label => data.get(label) || 0),
      backgroundColor: this.generateColors(1)[0],
      borderColor: this.generateColors(1)[0],
      borderWidth: 1
    }));

    return { labels: Array.from(labels), datasets };
  }

  generateColors(count) {
    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(6, 182, 212, 0.8)',
      'rgba(34, 197, 94, 0.8)'
    ];

    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  }

  calculateStatistics() {
    const statsGrid = document.getElementById('statsGrid');
    const stats = [];

    this.headers.forEach((header, index) => {
      const column = this.csvData.map(row => row[index]);
      const numericValues = column.filter(val => !isNaN(parseFloat(val))).map(val => parseFloat(val));
      
      if (numericValues.length > 0) {
        const sorted = numericValues.sort((a, b) => a - b);
        const sum = numericValues.reduce((a, b) => a + b, 0);
        const mean = sum / numericValues.length;
        const median = sorted.length % 2 === 0 
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)];
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);

        stats.push({
          title: header,
          value: mean.toFixed(2),
          description: `Promedio (Min: ${min}, Max: ${max})`
        });
      } else {
        const uniqueValues = [...new Set(column)].length;
        stats.push({
          title: header,
          value: uniqueValues,
          description: 'Valores únicos'
        });
      }
    });

    statsGrid.innerHTML = stats.map(stat => `
      <div class="stat-card">
        <div class="stat-title">${this.escapeHtml(stat.title)}</div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-description">${this.escapeHtml(stat.description)}</div>
      </div>
    `).join('');
  }

  exportToJSON() {
    const data = {
      headers: this.headers,
      data: this.csvData,
      metadata: {
        totalRows: this.csvData.length,
        totalColumns: this.headers.length,
        exportedAt: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadChart() {
    if (!this.currentChart) {
      alert('No hay gráfico para descargar');
      return;
    }

    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = this.currentChart.toBase64Image();
    link.click();
  }

  fullscreenChart() {
    if (!this.currentChart) {
      alert('No hay gráfico para mostrar');
      return;
    }

    const canvas = document.getElementById('dataChart');
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    }
  }

  clearData() {
    if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
      this.csvData = [];
      this.headers = [];
      this.currentFile = null;
      
      document.getElementById('csvPreview').style.display = 'none';
      document.getElementById('chartSection').style.display = 'none';
      document.getElementById('statistics').style.display = 'none';
      document.getElementById('csvControls').style.display = 'none';
      document.getElementById('fileInfo').innerHTML = '';
      
      if (this.currentChart) {
        this.currentChart.destroy();
        this.currentChart = null;
      }
    }
  }

  showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.textContent = 'Procesando archivo CSV';
    document.querySelector('.app-content').appendChild(loading);
  }

  hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
      loading.remove();
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the CSV reader
const csvReader = new CSVReader();
