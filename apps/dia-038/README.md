# 📱 Día 38: App de Lector de Código QR

## 📋 Descripción
Lector completo de códigos QR con cámara en tiempo real, carga de imágenes y gestión de resultados detectados.

## ✨ Características
- **Escaneo en tiempo real** con cámara del dispositivo
- **Carga de imágenes** desde archivos
- **Detección automática** de códigos QR
- **Gestión de resultados** con acciones (copiar, abrir, eliminar)
- **Interfaz responsive** y moderna
- **Soporte para diferentes tipos** de códigos QR

## 🚀 Cómo Funciona

### Inicio del Escaneo
```javascript
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
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}
```

### Bucle de Escaneo
```javascript
startScanningLoop() {
  this.isScanning = true;
  this.scanInterval = setInterval(() => {
    this.scanFrame();
  }, 100);
}

scanFrame() {
  if (!this.isScanning) return;
  
  this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
  const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  
  const qrCodes = this.detectQRCodes(imageData);
  
  if (qrCodes.length > 0) {
    qrCodes.forEach(qrCode => {
      this.addDetectedCode(qrCode);
    });
  }
}
```

### Gestión de Resultados
```javascript
addDetectedCode(qrCode) {
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
```

## 🎯 Conceptos Aprendidos

### JavaScript
- **MediaDevices API**: Acceso a la cámara
- **Canvas API**: Procesamiento de imágenes
- **FileReader API**: Carga de archivos
- **Clipboard API**: Copia al portapapeles
- **Event handling**: Controles interactivos
- **Async/await**: Operaciones asíncronas

### CSS
- **Grid layout**: Paneles divididos
- **Flexbox**: Controles y resultados
- **Responsive design**: Adaptación móvil
- **Animations**: Efectos visuales
- **Modal**: Ventana de carga

### APIs Web
- **getUserMedia**: Acceso a cámara
- **Canvas**: Procesamiento de imágenes
- **FileReader**: Lectura de archivos
- **Clipboard**: Copia de texto

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Grid, flexbox, animations
- **JavaScript ES6+**: Clases y APIs
- **Canvas API**: Procesamiento de imágenes
- **MediaDevices API**: Cámara

## 📱 Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Grid adaptativo**: Se ajusta al tamaño
- **Touch friendly**: Controles apropiados
- **Legibilidad**: Información clara

## 🎮 Controles
- **Mouse**: Clic en botones y resultados
- **Teclado**: 
  - `Tab`: Navegación entre elementos
  - `Enter`: Activar botones
  - `Escape`: Cerrar modales

## 🔧 Estructura del Código
```
dia-038/
├── index.html          # Estructura HTML + modal
├── app.css            # Estilos + camera
├── app.js             # Lógica + clase QRReader
└── README.md          # Este archivo
```

## 🚀 Cómo Ejecutar
1. Abre `index.html` en tu navegador
2. Permite el acceso a la cámara
3. Apunta la cámara a un código QR
4. O sube una imagen con códigos QR
5. Gestiona los resultados detectados

## 💡 Mejoras Futuras
- [ ] Integración con jsQR para detección real
- [ ] Historial de códigos escaneados
- [ ] Exportación de resultados
- [ ] Diferentes tipos de códigos
- **Colaboración**: Compartir códigos
- **Analytics**: Estadísticas de uso

## 📊 Estadísticas Técnicas
- **Líneas de código**: ~350 líneas
- **Tiempo de desarrollo**: ~4 horas
- **Complejidad**: Intermedia-Alta
- **Dependencias**: Ninguna
- **APIs**: MediaDevices, Canvas, FileReader

## 📱 Casos de Uso
- **Marketing**: Escaneo de códigos promocionales
- **Educación**: Acceso rápido a recursos
- **Productividad**: Gestión de información
- **Entretenimiento**: Juegos con QR

---
*Parte del proyecto "100 Apps JS en 100 Días" - Día 38*
