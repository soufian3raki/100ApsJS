// Lector de Código QR - Día 38
class QRReader {
  constructor() {
    this.video = null;
    this.canvas = null;
    this.ctx = null;
    this.isScanning = false;
    this.scanInterval = null;
    this.detectedCodes = [];
    
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.video = document.getElementById("video");
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.startScanBtn = document.getElementById("startScanBtn");
    this.stopScanBtn = document.getElementById("stopScanBtn");
    this.uploadBtn = document.getElementById("uploadBtn");
    this.scanResults = document.getElementById("scanResults");
    this.scanStatus = document.getElementById("scanStatus");
    this.detectedCount = document.getElementById("detectedCount");
    this.lastScan = document.getElementById("lastScan");
    this.uploadModal = document.getElementById("uploadModal");
    this.closeUploadModal = document.getElementById("closeUploadModal");
    this.fileInput = document.getElementById("fileInput");
    this.uploadPreview = document.getElementById("uploadPreview");
    this.scanImageBtn = document.getElementById("scanImageBtn");
    this.cancelUploadBtn = document.getElementById("cancelUploadBtn");
    this.cameraPlaceholder = document.getElementById("cameraPlaceholder");
  }

  setupEventListeners() {
    this.startScanBtn.addEventListener("click", () => this.startScanning());
    this.stopScanBtn.addEventListener("click", () => this.stopScanning());
    this.uploadBtn.addEventListener("click", () => this.openUploadModal());
    this.closeUploadModal.addEventListener("click", () => this.closeUploadModal());
    this.fileInput.addEventListener("change", (e) => this.handleFileUpload(e));
    this.scanImageBtn.addEventListener("click", () => this.scanUploadedImage());
    this.cancelUploadBtn.addEventListener("click", () => this.closeUploadModal());
  }

  async startScanning() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      this.video.srcObject = stream;
      this.video.style.display = "block";
      this.cameraPlaceholder.style.display = "none";
      
      this.video.addEventListener("loadedmetadata", () => {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.startScanningLoop();
      });
      
      this.startScanBtn.disabled = true;
      this.stopScanBtn.disabled = false;
      this.scanStatus.textContent = "Escaneando...";
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      this.updateStatus("Error: No se pudo acceder a la cámara", "error");
    }
  }

  startScanningLoop() {
    this.isScanning = true;
    this.scanInterval = setInterval(() => {
      this.scanFrame();
    }, 100);
  }

  stopScanning() {
    this.isScanning = false;
    
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
    }
    
    if (this.video.srcObject) {
      const tracks = this.video.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.video.srcObject = null;
    }
    
    this.video.style.display = "none";
    this.cameraPlaceholder.style.display = "flex";
    
    this.startScanBtn.disabled = false;
    this.stopScanBtn.disabled = true;
    this.scanStatus.textContent = "Inactivo";
  }

  scanFrame() {
    if (!this.isScanning) return;
    
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
    // Simular detección de QR (en una implementación real usarías una librería como jsQR)
    const qrCodes = this.detectQRCodes(imageData);
    
    if (qrCodes.length > 0) {
      qrCodes.forEach(qrCode => {
        this.addDetectedCode(qrCode);
      });
    }
  }

  detectQRCodes(imageData) {
    // Esta es una simulación - en una implementación real usarías jsQR o similar
    const qrCodes = [];
    
    // Simular detección aleatoria ocasional
    if (Math.random() < 0.01) {
      const mockQR = {
        data: "https://ejemplo.com/qr-" + Date.now(),
        type: "URL",
        timestamp: new Date().toISOString()
      };
      qrCodes.push(mockQR);
    }
    
    return qrCodes;
  }

  addDetectedCode(qrCode) {
    // Evitar duplicados
    const exists = this.detectedCodes.some(code => 
      code.data === qrCode.data && 
      Math.abs(new Date(code.timestamp) - new Date(qrCode.timestamp)) < 5000
    );
    
    if (!exists) {
      this.detectedCodes.unshift(qrCode);
      this.renderResults();
      this.updateStats();
    }
  }

  renderResults() {
    if (this.detectedCodes.length === 0) {
      this.scanResults.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <p>No se han detectado códigos QR</p>
          <p>Inicia el escaneo o sube una imagen</p>
        </div>
      `;
      return;
    }
    
    this.scanResults.innerHTML = this.detectedCodes.map((code, index) => `
      <div class="qr-result">
        <div class="qr-result-header">
          <span class="qr-result-type">${code.type}</span>
          <div class="qr-result-actions">
            <button class="qr-result-action" onclick="qrReader.copyCode(${index})">📋</button>
            <button class="qr-result-action" onclick="qrReader.openCode(${index})">🔗</button>
            <button class="qr-result-action" onclick="qrReader.deleteCode(${index})">🗑️</button>
          </div>
        </div>
        <div class="qr-result-content">${code.data}</div>
        <div class="qr-result-meta">
          Detectado: ${new Date(code.timestamp).toLocaleString()}
        </div>
      </div>
    `).join("");
  }

  copyCode(index) {
    const code = this.detectedCodes[index];
    navigator.clipboard.writeText(code.data).then(() => {
      this.updateStatus("Código copiado al portapapeles", "success");
    });
  }

  openCode(index) {
    const code = this.detectedCodes[index];
    if (code.type === "URL") {
      window.open(code.data, "_blank");
    } else {
      this.updateStatus("No se puede abrir este tipo de código", "warning");
    }
  }

  deleteCode(index) {
    this.detectedCodes.splice(index, 1);
    this.renderResults();
    this.updateStats();
  }

  openUploadModal() {
    this.uploadModal.classList.add("show");
  }

  closeUploadModal() {
    this.uploadModal.classList.remove("show");
    this.fileInput.value = "";
    this.uploadPreview.innerHTML = "<p>Selecciona una imagen para escanear</p>";
    this.scanImageBtn.disabled = true;
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Imagen subida">`;
        this.scanImageBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    }
  }

  scanUploadedImage() {
    const file = this.fileInput.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const qrCodes = this.detectQRCodes(imageData);
        
        if (qrCodes.length > 0) {
          qrCodes.forEach(qrCode => {
            this.addDetectedCode(qrCode);
          });
          this.updateStatus("Códigos QR detectados en la imagen", "success");
        } else {
          this.updateStatus("No se encontraron códigos QR en la imagen", "warning");
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    this.closeUploadModal();
  }

  updateStats() {
    this.detectedCount.textContent = this.detectedCodes.length;
    if (this.detectedCodes.length > 0) {
      this.lastScan.textContent = new Date(this.detectedCodes[0].timestamp).toLocaleTimeString();
    }
  }

  updateStatus(message, type = "") {
    // Crear notificación temporal
    const notification = document.createElement("div");
    notification.className = "notification " + type;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: var(--card-bg);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1001;
      color: var(--text-primary);
      border-left: 4px solid var(--accent-color);
    `;
    
    if (type === "error") {
      notification.style.borderLeftColor = "#ef4444";
    } else if (type === "warning") {
      notification.style.borderLeftColor = "#f59e0b";
    } else if (type === "success") {
      notification.style.borderLeftColor = "#10b981";
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

let qrReader;

document.addEventListener("DOMContentLoaded", () => {
  qrReader = new QRReader();
});
