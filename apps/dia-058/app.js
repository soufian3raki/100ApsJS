class BarcodeGenerator {
  constructor() {
    this.history = JSON.parse(localStorage.getItem('barcodeHistory')) || [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderHistory();
    this.updateTextSizeDisplay();
  }

  bindEvents() {
    document.getElementById('generateBarcode').addEventListener('click', () => {
      this.generateBarcode();
    });

    document.getElementById('textSize').addEventListener('input', () => {
      this.updateTextSizeDisplay();
    });

    document.getElementById('downloadSVG').addEventListener('click', () => {
      this.downloadSVG();
    });

    document.getElementById('downloadPNG').addEventListener('click', () => {
      this.downloadPNG();
    });

    document.getElementById('copyToClipboard').addEventListener('click', () => {
      this.copyToClipboard();
    });

    document.getElementById('printBarcode').addEventListener('click', () => {
      this.printBarcode();
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
      this.clearHistory();
    });

    document.getElementById('exportHistory').addEventListener('click', () => {
      this.exportHistory();
    });

    // Example buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('example-btn')) {
        const type = e.target.dataset.type;
        const text = e.target.dataset.text;
        this.loadExample(type, text);
      }
    });

    // History items
    document.addEventListener('click', (e) => {
      if (e.target.closest('.history-item')) {
        const item = e.target.closest('.history-item');
        const index = Array.from(item.parentNode.children).indexOf(item);
        this.loadFromHistory(index);
      }
    });
  }

  generateBarcode() {
    const type = document.getElementById('barcodeType').value;
    const text = document.getElementById('barcodeText').value.trim();
    const width = parseInt(document.getElementById('barcodeWidth').value);
    const height = parseInt(document.getElementById('barcodeHeight').value);
    const format = document.getElementById('barcodeFormat').value;
    const showText = document.getElementById('showText').checked;
    const textSize = parseInt(document.getElementById('textSize').value);
    const barcodeColor = document.getElementById('barcodeColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;

    if (!text) {
      alert('Por favor ingresa el texto para el código de barras');
      return;
    }

    if (!this.validateInput(type, text)) {
      return;
    }

    const barcodeData = this.generateBarcodeData(type, text);
    if (!barcodeData) {
      alert('No se pudo generar el código de barras con los datos proporcionados');
      return;
    }

    this.renderBarcode(barcodeData, {
      type,
      text,
      width,
      height,
      format,
      showText,
      textSize,
      barcodeColor,
      backgroundColor
    });

    this.saveToHistory({
      type,
      text,
      width,
      height,
      format,
      showText,
      textSize,
      barcodeColor,
      backgroundColor,
      barcodeData
    });
  }

  validateInput(type, text) {
    const validators = {
      'code128': (text) => text.length <= 80,
      'code39': (text) => /^[A-Z0-9\s\-\.\$\/\+\%]+$/.test(text) && text.length <= 43,
      'ean13': (text) => /^\d{13}$/.test(text),
      'ean8': (text) => /^\d{8}$/.test(text),
      'upc': (text) => /^\d{12}$/.test(text),
      'codabar': (text) => /^[A-D][0-9\-\$:\.\/\+]+[A-D]$/.test(text) && text.length <= 20,
      'itf14': (text) => /^\d{14}$/.test(text),
      'msi': (text) => /^\d+$/.test(text) && text.length <= 20
    };

    if (!validators[type]) {
      alert('Tipo de código de barras no soportado');
      return false;
    }

    if (!validators[type](text)) {
      alert(`Formato inválido para ${type}. Verifica los requisitos del tipo de código.`);
      return false;
    }

    return true;
  }

  generateBarcodeData(type, text) {
    // Simulación de generación de código de barras
    // En una implementación real, usarías una librería como JsBarcode
    const patterns = {
      'code128': this.generateCode128Pattern(text),
      'code39': this.generateCode39Pattern(text),
      'ean13': this.generateEAN13Pattern(text),
      'ean8': this.generateEAN8Pattern(text),
      'upc': this.generateUPCPattern(text),
      'codabar': this.generateCodabarPattern(text),
      'itf14': this.generateITF14Pattern(text),
      'msi': this.generateMSIPattern(text)
    };

    return patterns[type] || null;
  }

  generateCode128Pattern(text) {
    // Patrón simplificado para Code 128
    const pattern = [];
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      pattern.push('11010010000'); // Start A
      pattern.push('10100000000'); // Char pattern
    }
    pattern.push('11000101000'); // Stop
    return pattern.join('');
  }

  generateCode39Pattern(text) {
    const pattern = [];
    pattern.push('1000101110111010'); // Start
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charPattern = this.getCode39CharPattern(char);
      pattern.push(charPattern);
    }
    pattern.push('1000101110111010'); // Stop
    return pattern.join('');
  }

  getCode39CharPattern(char) {
    const patterns = {
      '0': '101001101101',
      '1': '110100101011',
      '2': '101100101011',
      '3': '110110010101',
      '4': '101001101011',
      '5': '110100110101',
      '6': '101100110101',
      '7': '101001011011',
      '8': '110100101101',
      '9': '101100101101',
      'A': '110101001011',
      'B': '101101001011',
      'C': '110110100101',
      'D': '101011001011',
      'E': '110101100101',
      'F': '101101100101',
      'G': '101010011011',
      'H': '110101001101',
      'I': '101101001101',
      'J': '101011001101',
      'K': '110101010011',
      'L': '101101010011',
      'M': '110110101001',
      'N': '101011010011',
      'O': '110101101001',
      'P': '101101101001',
      'Q': '101010110011',
      'R': '110101011001',
      'S': '101101011001',
      'T': '101011011001',
      'U': '110010101011',
      'V': '100110101011',
      'W': '110011010101',
      'X': '100101101011',
      'Y': '110010110101',
      'Z': '100110110101',
      ' ': '100110101101',
      '-': '100101011011',
      '.': '110010101101',
      '$': '100100100101',
      '/': '100100101001',
      '+': '100101001001',
      '%': '101001001001'
    };
    return patterns[char] || '100101101101';
  }

  generateEAN13Pattern(text) {
    // Patrón simplificado para EAN-13
    const pattern = [];
    pattern.push('101'); // Start
    pattern.push('0100111010000'); // Left guard
    for (let i = 0; i < 6; i++) {
      pattern.push('0001101000'); // Left pattern
    }
    pattern.push('01010'); // Center guard
    for (let i = 6; i < 12; i++) {
      pattern.push('1110010110'); // Right pattern
    }
    pattern.push('101'); // Stop
    return pattern.join('');
  }

  generateEAN8Pattern(text) {
    const pattern = [];
    pattern.push('101'); // Start
    for (let i = 0; i < 4; i++) {
      pattern.push('0001101000'); // Left pattern
    }
    pattern.push('01010'); // Center guard
    for (let i = 4; i < 8; i++) {
      pattern.push('1110010110'); // Right pattern
    }
    pattern.push('101'); // Stop
    return pattern.join('');
  }

  generateUPCPattern(text) {
    const pattern = [];
    pattern.push('101'); // Start
    for (let i = 0; i < 6; i++) {
      pattern.push('0001101000'); // Left pattern
    }
    pattern.push('01010'); // Center guard
    for (let i = 6; i < 12; i++) {
      pattern.push('1110010110'); // Right pattern
    }
    pattern.push('101'); // Stop
    return pattern.join('');
  }

  generateCodabarPattern(text) {
    const pattern = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charPattern = this.getCodabarCharPattern(char);
      pattern.push(charPattern);
    }
    return pattern.join('');
  }

  getCodabarCharPattern(char) {
    const patterns = {
      '0': '101010011',
      '1': '101011001',
      '2': '101001011',
      '3': '110010101',
      '4': '101101001',
      '5': '110101001',
      '6': '100101011',
      '7': '100101101',
      '8': '100110101',
      '9': '110101011',
      'A': '1011001001',
      'B': '1010010011',
      'C': '1001001011',
      'D': '1010011001',
      '-': '101001101',
      '$': '101100101',
      ':': '110100101',
      '/': '110101101',
      '.': '110110101',
      '+': '101101101'
    };
    return patterns[char] || '101010011';
  }

  generateITF14Pattern(text) {
    const pattern = [];
    pattern.push('1010'); // Start
    for (let i = 0; i < text.length; i += 2) {
      const pair = text.substr(i, 2);
      pattern.push(this.getITF14PairPattern(pair));
    }
    pattern.push('1101'); // Stop
    return pattern.join('');
  }

  getITF14PairPattern(pair) {
    // Patrón simplificado para pares de dígitos
    return '1100110011001100';
  }

  generateMSIPattern(text) {
    const pattern = [];
    pattern.push('1100'); // Start
    for (let i = 0; i < text.length; i++) {
      const digit = text[i];
      pattern.push(this.getMSIDigitPattern(digit));
    }
    pattern.push('1001'); // Stop
    return pattern.join('');
  }

  getMSIDigitPattern(digit) {
    const patterns = {
      '0': '100100100100',
      '1': '100100100110',
      '2': '100100110100',
      '3': '100100110110',
      '4': '100110100100',
      '5': '100110100110',
      '6': '100110110100',
      '7': '100110110110',
      '8': '110100100100',
      '9': '110100100110'
    };
    return patterns[digit] || '100100100100';
  }

  renderBarcode(barcodeData, options) {
    const container = document.getElementById('barcodeContainer');
    const { type, text, width, height, format, showText, textSize, barcodeColor, backgroundColor } = options;

    container.innerHTML = '';

    if (format === 'svg') {
      this.renderSVG(container, barcodeData, options);
    } else if (format === 'canvas') {
      this.renderCanvas(container, barcodeData, options);
    } else if (format === 'table') {
      this.renderTable(container, barcodeData, options);
    }

    this.updateBarcodeInfo(options);
    document.getElementById('barcodeInfo').style.display = 'block';
    document.getElementById('barcodeActions').style.display = 'flex';
  }

  renderSVG(container, barcodeData, options) {
    const { width, height, barcodeColor, backgroundColor, showText, textSize, text } = options;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.backgroundColor = backgroundColor;

    const barWidth = width / barcodeData.length;
    let x = 0;

    for (let i = 0; i < barcodeData.length; i++) {
      if (barcodeData[i] === '1') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', 0);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', height - (showText ? textSize + 10 : 0));
        rect.setAttribute('fill', barcodeColor);
        svg.appendChild(rect);
      }
      x += barWidth;
    }

    if (showText) {
      const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textElement.setAttribute('x', width / 2);
      textElement.setAttribute('y', height - 5);
      textElement.setAttribute('text-anchor', 'middle');
      textElement.setAttribute('font-family', 'monospace');
      textElement.setAttribute('font-size', textSize);
      textElement.setAttribute('fill', barcodeColor);
      textElement.textContent = text;
      svg.appendChild(textElement);
    }

    svg.classList.add('barcode-svg');
    container.appendChild(svg);
  }

  renderCanvas(container, barcodeData, options) {
    const { width, height, barcodeColor, backgroundColor, showText, textSize, text } = options;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const barWidth = width / barcodeData.length;
    let x = 0;

    for (let i = 0; i < barcodeData.length; i++) {
      if (barcodeData[i] === '1') {
        ctx.fillStyle = barcodeColor;
        ctx.fillRect(x, 0, barWidth, height - (showText ? textSize + 10 : 0));
      }
      x += barWidth;
    }

    if (showText) {
      ctx.fillStyle = barcodeColor;
      ctx.font = `${textSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(text, width / 2, height - 5);
    }

    canvas.classList.add('barcode-canvas');
    container.appendChild(canvas);
  }

  renderTable(container, barcodeData, options) {
    const { width, height, barcodeColor, backgroundColor, showText, textSize, text } = options;
    const table = document.createElement('table');
    table.classList.add('barcode-table');
    table.style.width = width + 'px';
    table.style.height = height + 'px';

    const row = document.createElement('tr');
    const barWidth = Math.max(1, Math.floor(width / barcodeData.length));

    for (let i = 0; i < barcodeData.length; i++) {
      const cell = document.createElement('td');
      cell.style.width = barWidth + 'px';
      cell.style.height = height + 'px';
      
      if (barcodeData[i] === '1') {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.backgroundColor = barcodeColor;
        cell.appendChild(bar);
      } else {
        const space = document.createElement('div');
        space.classList.add('space');
        space.style.backgroundColor = backgroundColor;
        cell.appendChild(space);
      }
      
      row.appendChild(cell);
    }

    table.appendChild(row);
    container.appendChild(table);

    if (showText) {
      const textDiv = document.createElement('div');
      textDiv.classList.add('barcode-text');
      textDiv.style.fontSize = textSize + 'px';
      textDiv.style.color = barcodeColor;
      textDiv.textContent = text;
      container.appendChild(textDiv);
    }
  }

  updateBarcodeInfo(options) {
    const { type, text, width, height, format } = options;
    document.getElementById('infoType').textContent = type.toUpperCase();
    document.getElementById('infoData').textContent = text;
    document.getElementById('infoDimensions').textContent = `${width}x${height}px`;
    document.getElementById('infoFormat').textContent = format.toUpperCase();
  }

  saveToHistory(barcode) {
    const historyItem = {
      id: Date.now(),
      ...barcode,
      timestamp: new Date().toISOString()
    };

    this.history.unshift(historyItem);
    this.history = this.history.slice(0, 50); // Keep only last 50 items
    localStorage.setItem('barcodeHistory', JSON.stringify(this.history));
    this.renderHistory();
  }

  renderHistory() {
    const historyList = document.getElementById('historyList');
    
    if (this.history.length === 0) {
      historyList.innerHTML = '<div class="empty-history">No hay códigos de barras generados</div>';
      return;
    }

    historyList.innerHTML = this.history.map(item => `
      <div class="history-item" data-index="${this.history.indexOf(item)}">
        <div class="history-header">
          <div class="history-type">${item.type.toUpperCase()}</div>
          <div class="history-date">${new Date(item.timestamp).toLocaleDateString()}</div>
        </div>
        <div class="history-data">${this.escapeHtml(item.text)}</div>
        <div class="history-dimensions">${item.width}x${item.height}px - ${item.format.toUpperCase()}</div>
      </div>
    `).join('');
  }

  loadFromHistory(index) {
    const item = this.history[index];
    if (!item) return;

    document.getElementById('barcodeType').value = item.type;
    document.getElementById('barcodeText').value = item.text;
    document.getElementById('barcodeWidth').value = item.width;
    document.getElementById('barcodeHeight').value = item.height;
    document.getElementById('barcodeFormat').value = item.format;
    document.getElementById('showText').checked = item.showText;
    document.getElementById('textSize').value = item.textSize;
    document.getElementById('barcodeColor').value = item.barcodeColor;
    document.getElementById('backgroundColor').value = item.backgroundColor;

    this.updateTextSizeDisplay();
    this.generateBarcode();
  }

  loadExample(type, text) {
    document.getElementById('barcodeType').value = type;
    document.getElementById('barcodeText').value = text;
    this.generateBarcode();
  }

  updateTextSizeDisplay() {
    const textSize = document.getElementById('textSize').value;
    document.getElementById('textSizeValue').textContent = textSize + 'px';
  }

  downloadSVG() {
    const svg = document.querySelector('.barcode-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'barcode.svg';
    a.click();
    
    URL.revokeObjectURL(url);
  }

  downloadPNG() {
    const canvas = document.querySelector('.barcode-canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'barcode.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  copyToClipboard() {
    const barcodeElement = document.querySelector('.barcode-svg, .barcode-canvas, .barcode-table');
    if (!barcodeElement) return;

    if (barcodeElement.tagName === 'CANVAS') {
      barcodeElement.toBlob(blob => {
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      });
    } else {
      navigator.clipboard.writeText(barcodeElement.outerHTML);
    }
  }

  printBarcode() {
    window.print();
  }

  clearHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial?')) {
      this.history = [];
      localStorage.removeItem('barcodeHistory');
      this.renderHistory();
    }
  }

  exportHistory() {
    const dataStr = JSON.stringify(this.history, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'barcode-history.json';
    a.click();
    
    URL.revokeObjectURL(url);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the barcode generator
const barcodeGenerator = new BarcodeGenerator();
