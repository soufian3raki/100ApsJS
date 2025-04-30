class AdvancedImageEditor {
  constructor() {
    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.overlay = document.getElementById("canvasOverlay");
    
    this.currentTool = "select";
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    
    this.layers = [];
    this.activeLayerIndex = 0;
    this.history = [];
    this.historyIndex = -1;
    
    this.primaryColor = "#000000";
    this.secondaryColor = "#ffffff";
    this.brushSize = 10;
    this.brushOpacity = 100;
    this.brushHardness = 100;
    
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.positionX = 0;
    this.positionY = 0;
    
    this.filters = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      blur: 0,
      sharpen: 0
    };
    
    this.selection = null;
    this.selectionStart = null;
    this.selectionEnd = null;
    
    this.init();
  }

  init() {
    this.setupCanvas();
    this.bindEvents();
    this.createDefaultLayer();
    this.updateUI();
  }

  setupCanvas() {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  bindEvents() {
    document.getElementById("openFile").addEventListener("click", () => {
      document.getElementById("imageFile").click();
    });

    document.getElementById("imageFile").addEventListener("change", (e) => {
      this.loadImage(e.target.files[0]);
    });

    document.getElementById("saveImage").addEventListener("click", () => {
      this.saveImage();
    });

    document.getElementById("newImage").addEventListener("click", () => {
      this.newImage();
    });

    document.getElementById("undo").addEventListener("click", () => {
      this.undo();
    });

    document.getElementById("redo").addEventListener("click", () => {
      this.redo();
    });

    document.getElementById("cropTool").addEventListener("click", () => {
      this.setTool("crop");
    });

    document.getElementById("selectTool").addEventListener("click", () => {
      this.setTool("select");
    });

    document.getElementById("brushTool").addEventListener("click", () => {
      this.setTool("brush");
    });

    document.getElementById("textTool").addEventListener("click", () => {
      this.setTool("text");
    });

    document.getElementById("shapesTool").addEventListener("click", () => {
      this.setTool("shapes");
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.handleMouseDown(e);
    });

    this.canvas.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e);
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.handleMouseUp(e);
    });

    this.canvas.addEventListener("wheel", (e) => {
      this.handleWheel(e);
    });

    document.getElementById("zoomIn").addEventListener("click", () => {
      this.zoomIn();
    });

    document.getElementById("zoomOut").addEventListener("click", () => {
      this.zoomOut();
    });

    document.getElementById("fitToScreen").addEventListener("click", () => {
      this.fitToScreen();
    });

    document.getElementById("primaryColor").addEventListener("change", (e) => {
      this.primaryColor = e.target.value;
    });

    document.getElementById("secondaryColor").addEventListener("change", (e) => {
      this.secondaryColor = e.target.value;
    });

    document.getElementById("swapColors").addEventListener("click", () => {
      const temp = this.primaryColor;
      this.primaryColor = this.secondaryColor;
      this.secondaryColor = temp;
      document.getElementById("primaryColor").value = this.primaryColor;
      document.getElementById("secondaryColor").value = this.secondaryColor;
    });

    document.getElementById("brushSize").addEventListener("input", (e) => {
      this.brushSize = parseInt(e.target.value);
      document.getElementById("brushSizeValue").textContent = this.brushSize + "px";
    });

    document.getElementById("brushOpacity").addEventListener("input", (e) => {
      this.brushOpacity = parseInt(e.target.value);
      document.getElementById("brushOpacityValue").textContent = this.brushOpacity + "%";
    });

    document.getElementById("brushHardness").addEventListener("input", (e) => {
      this.brushHardness = parseInt(e.target.value);
      document.getElementById("brushHardnessValue").textContent = this.brushHardness + "%";
    });

    this.bindFilterEvents();
    this.bindTransformEvents();

    document.querySelectorAll(".effect-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.applyEffect(e.target.dataset.effect);
      });
    });

    document.getElementById("addText").addEventListener("click", () => {
      this.addText();
    });

    document.getElementById("addLayer").addEventListener("click", () => {
      this.addLayer();
    });

    document.addEventListener("keydown", (e) => {
      this.handleKeyboard(e);
    });
  }

  bindFilterEvents() {
    const filters = ["brightness", "contrast", "saturation", "hue", "blur", "sharpen"];
    
    filters.forEach(filter => {
      const slider = document.getElementById(filter + "Slider");
      const value = document.getElementById(filter + "Value");
      
      slider.addEventListener("input", (e) => {
        this.filters[filter] = parseInt(e.target.value);
        value.textContent = filter === "hue" ? e.target.value + "°" : 
                           filter === "blur" ? e.target.value + "px" : 
                           e.target.value + "%";
      });
    });

    document.getElementById("applyFilters").addEventListener("click", () => {
      this.applyFilters();
    });

    document.getElementById("resetFilters").addEventListener("click", () => {
      this.resetFilters();
    });
  }

  bindTransformEvents() {
    const transforms = ["rotation", "scaleX", "scaleY", "positionX", "positionY"];
    
    transforms.forEach(transform => {
      const slider = document.getElementById(transform + "Slider");
      const value = document.getElementById(transform + "Value");
      
      slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        this[transform] = transform.includes("scale") ? val / 100 : val;
        
        value.textContent = transform.includes("scale") ? val + "%" : val + "px";
        this.updateTransform();
      });
    });

    document.getElementById("resetTransform").addEventListener("click", () => {
      this.resetTransform();
    });

    document.getElementById("flipHorizontal").addEventListener("click", () => {
      this.flipHorizontal();
    });

    document.getElementById("flipVertical").addEventListener("click", () => {
      this.flipVertical();
    });
  }

  setTool(tool) {
    this.currentTool = tool;
    this.updateToolUI();
    this.updateCanvasCursor();
  }

  updateToolUI() {
    document.querySelectorAll(".tool-option").forEach(option => {
      option.classList.remove("active");
    });
    
    const activeOption = document.querySelector(`[data-tool="${this.currentTool}"]`);
    if (activeOption) {
      activeOption.classList.add("active");
    }
  }

  updateCanvasCursor() {
    this.canvas.className = `canvas-${this.currentTool}`;
  }

  handleMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
    this.isDrawing = true;

    switch (this.currentTool) {
      case "brush":
        this.startDrawing();
        break;
      case "select":
        this.startSelection();
        break;
      case "crop":
        this.startCrop();
        break;
      case "text":
        this.addTextAtPosition(this.startX, this.startY);
        break;
      case "shapes":
        this.startShape();
        break;
    }
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.currentX = e.clientX - rect.left;
    this.currentY = e.clientY - rect.top;

    this.updateMousePosition();

    if (!this.isDrawing) return;

    switch (this.currentTool) {
      case "brush":
        this.draw();
        break;
      case "select":
        this.updateSelection();
        break;
      case "crop":
        this.updateCrop();
        break;
      case "shapes":
        this.updateShape();
        break;
    }
  }

  handleMouseUp(e) {
    this.isDrawing = false;

    switch (this.currentTool) {
      case "brush":
        this.finishDrawing();
        break;
      case "select":
        this.finishSelection();
        break;
      case "crop":
        this.finishCrop();
        break;
      case "shapes":
        this.finishShape();
        break;
    }
  }

  handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    this.zoom(delta);
  }

  handleKeyboard(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "z":
          e.preventDefault();
          if (e.shiftKey) {
            this.redo();
          } else {
            this.undo();
          }
          break;
        case "s":
          e.preventDefault();
          this.saveImage();
          break;
        case "o":
          e.preventDefault();
          document.getElementById("imageFile").click();
          break;
        case "n":
          e.preventDefault();
          this.newImage();
          break;
      }
    }

    switch (e.key) {
      case "Delete":
        if (this.selection) {
          this.deleteSelection();
        }
        break;
      case "Escape":
        this.clearSelection();
        break;
    }
  }

  startDrawing() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.strokeStyle = this.primaryColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.globalAlpha = this.brushOpacity / 100;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }

  draw() {
    this.ctx.lineTo(this.currentX, this.currentY);
    this.ctx.stroke();
  }

  finishDrawing() {
    this.ctx.closePath();
    this.saveState();
  }

  startSelection() {
    this.selectionStart = { x: this.startX, y: this.startY };
    this.selectionEnd = { x: this.currentX, y: this.currentY };
  }

  updateSelection() {
    this.selectionEnd = { x: this.currentX, y: this.currentY };
    this.drawSelection();
  }

  finishSelection() {
    if (this.selectionStart && this.selectionEnd) {
      this.selection = {
        x: Math.min(this.selectionStart.x, this.selectionEnd.x),
        y: Math.min(this.selectionStart.y, this.selectionEnd.y),
        width: Math.abs(this.selectionEnd.x - this.selectionStart.x),
        height: Math.abs(this.selectionEnd.y - this.selectionStart.y)
      };
    }
  }

  drawSelection() {
    if (!this.selectionStart || !this.selectionEnd) return;

    const x = Math.min(this.selectionStart.x, this.selectionEnd.x);
    const y = Math.min(this.selectionStart.y, this.selectionEnd.y);
    const width = Math.abs(this.selectionEnd.x - this.selectionStart.x);
    const height = Math.abs(this.selectionEnd.y - this.selectionStart.y);

    this.overlay.innerHTML = `
      <div class="selection-overlay" style="left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px;"></div>
    `;
  }

  startCrop() {
    this.startSelection();
  }

  updateCrop() {
    this.updateSelection();
  }

  finishCrop() {
    this.finishSelection();
    if (this.selection) {
      this.cropImage();
    }
  }

  cropImage() {
    if (!this.selection) return;

    const imageData = this.ctx.getImageData(
      this.selection.x,
      this.selection.y,
      this.selection.width,
      this.selection.height
    );

    this.canvas.width = this.selection.width;
    this.canvas.height = this.selection.height;
    this.ctx.putImageData(imageData, 0, 0);
    
    this.clearSelection();
    this.saveState();
  }

  startShape() {
    this.shapeStart = { x: this.startX, y: this.startY };
  }

  updateShape() {
    this.shapeEnd = { x: this.currentX, y: this.currentY };
    this.drawShape();
  }

  finishShape() {
    if (this.shapeStart && this.shapeEnd) {
      this.finalizeShape();
      this.saveState();
    }
  }

  drawShape() {
    if (!this.shapeStart || !this.shapeEnd) return;

    this.ctx.strokeStyle = this.primaryColor;
    this.ctx.fillStyle = this.secondaryColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.globalAlpha = this.brushOpacity / 100;

    const x = Math.min(this.shapeStart.x, this.shapeEnd.x);
    const y = Math.min(this.shapeStart.y, this.shapeEnd.y);
    const width = Math.abs(this.shapeEnd.x - this.shapeStart.x);
    const height = Math.abs(this.shapeEnd.y - this.shapeStart.y);

    this.ctx.strokeRect(x, y, width, height);
  }

  finalizeShape() {
    this.shapeStart = null;
    this.shapeEnd = null;
  }

  addTextAtPosition(x, y) {
    const text = document.getElementById("textInput").value;
    if (!text) return;

    const fontSize = parseInt(document.getElementById("fontSize").value) || 24;
    const fontFamily = document.getElementById("fontFamily").value;

    this.ctx.font = `${fontSize}px ${fontFamily}`;
    this.ctx.fillStyle = this.primaryColor;
    this.ctx.fillText(text, x, y);
    
    this.saveState();
  }

  addText() {
    const text = document.getElementById("textInput").value;
    if (!text) return;

    const fontSize = parseInt(document.getElementById("fontSize").value) || 24;
    const fontFamily = document.getElementById("fontFamily").value;

    this.ctx.font = `${fontSize}px ${fontFamily}`;
    this.ctx.fillStyle = this.primaryColor;
    this.ctx.fillText(text, 50, 50);
    
    this.saveState();
  }

  loadImage(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        this.saveState();
        this.updateCanvasSize();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  saveImage() {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }

  newImage() {
    if (confirm("¿Estás seguro de que quieres crear una nueva imagen? Se perderán los cambios no guardados.")) {
      this.canvas.width = 800;
      this.canvas.height = 600;
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.saveState();
      this.updateCanvasSize();
    }
  }

  zoom(delta) {
    const scale = 1 + delta;
    this.canvas.style.transform = `scale(${scale})`;
    this.updateZoomLevel();
  }

  zoomIn() {
    this.zoom(0.1);
  }

  zoomOut() {
    this.zoom(-0.1);
  }

  fitToScreen() {
    this.canvas.style.transform = "scale(1)";
    this.updateZoomLevel();
  }

  updateZoomLevel() {
    const transform = this.canvas.style.transform;
    const scale = transform.match(/scale\(([^)]+)\)/);
    const level = scale ? Math.round(parseFloat(scale[1]) * 100) : 100;
    document.getElementById("zoomLevel").textContent = level + "%";
  }

  updateMousePosition() {
    document.getElementById("mousePosition").textContent = 
      `${Math.round(this.currentX)}, ${Math.round(this.currentY)}`;
  }

  updateCanvasSize() {
    document.getElementById("canvasSize").textContent = 
      `${this.canvas.width} x ${this.canvas.height}`;
  }

  applyFilters() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      r = (r * this.filters.brightness) / 100;
      g = (g * this.filters.brightness) / 100;
      b = (b * this.filters.brightness) / 100;

      r = ((r - 128) * this.filters.contrast) / 100 + 128;
      g = ((g - 128) * this.filters.contrast) / 100 + 128;
      b = ((b - 128) * this.filters.contrast) / 100 + 128;

      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + (r - gray) * (this.filters.saturation / 100);
      g = gray + (g - gray) * (this.filters.saturation / 100);
      b = gray + (b - gray) * (this.filters.saturation / 100);

      const hue = this.filters.hue * Math.PI / 180;
      const cos = Math.cos(hue);
      const sin = Math.sin(hue);
      const newR = r * cos - g * sin;
      const newG = r * sin + g * cos;
      r = newR;
      g = newG;

      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }

    this.ctx.putImageData(imageData, 0, 0);
    this.saveState();
  }

  resetFilters() {
    this.filters = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      blur: 0,
      sharpen: 0
    };

    Object.keys(this.filters).forEach(filter => {
      const slider = document.getElementById(filter + "Slider");
      const value = document.getElementById(filter + "Value");
      slider.value = this.filters[filter];
      value.textContent = filter === "hue" ? "0°" : 
                         filter === "blur" ? "0px" : 
                         "100%";
    });
  }

  applyEffect(effect) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      switch (effect) {
        case "grayscale":
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          r = g = b = gray;
          break;
        case "sepia":
          r = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          g = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          b = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          break;
        case "invert":
          r = 255 - r;
          g = 255 - g;
          b = 255 - b;
          break;
        case "vintage":
          r = Math.min(255, r * 1.1);
          g = Math.min(255, g * 0.9);
          b = Math.min(255, b * 0.8);
          break;
        case "dramatic":
          r = Math.min(255, r * 1.3);
          g = Math.min(255, g * 0.7);
          b = Math.min(255, b * 0.7);
          break;
        case "warm":
          r = Math.min(255, r * 1.2);
          g = Math.min(255, g * 1.1);
          b = Math.min(255, b * 0.9);
          break;
        case "cool":
          r = Math.min(255, r * 0.9);
          g = Math.min(255, g * 1.1);
          b = Math.min(255, b * 1.2);
          break;
        case "blackwhite":
          const bw = (r + g + b) / 3;
          r = g = b = bw > 128 ? 255 : 0;
          break;
      }

      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }

    this.ctx.putImageData(imageData, 0, 0);
    this.saveState();
  }

  updateTransform() {
    this.ctx.setTransform(
      this.scaleX, 0, 0, this.scaleY,
      this.positionX, this.positionY
    );
  }

  resetTransform() {
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.positionX = 0;
    this.positionY = 0;
    
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.updateTransformUI();
  }

  updateTransformUI() {
    document.getElementById("rotationSlider").value = this.rotation;
    document.getElementById("rotationValue").textContent = this.rotation + "°";
    document.getElementById("scaleXSlider").value = this.scaleX * 100;
    document.getElementById("scaleXValue").textContent = Math.round(this.scaleX * 100) + "%";
    document.getElementById("scaleYSlider").value = this.scaleY * 100;
    document.getElementById("scaleYValue").textContent = Math.round(this.scaleY * 100) + "%";
    document.getElementById("positionXSlider").value = this.positionX;
    document.getElementById("positionXValue").textContent = this.positionX + "px";
    document.getElementById("positionYSlider").value = this.positionY;
    document.getElementById("positionYValue").textContent = this.positionY + "px";
  }

  flipHorizontal() {
    this.ctx.scale(-1, 1);
    this.ctx.translate(-this.canvas.width, 0);
    this.saveState();
  }

  flipVertical() {
    this.ctx.scale(1, -1);
    this.ctx.translate(0, -this.canvas.height);
    this.saveState();
  }

  createDefaultLayer() {
    this.layers = [{
      name: "Fondo",
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: "normal"
    }];
    this.activeLayerIndex = 0;
    this.updateLayersUI();
  }

  addLayer() {
    const layerName = prompt("Nombre de la capa:", `Capa ${this.layers.length + 1}`);
    if (layerName) {
      this.layers.push({
        name: layerName,
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: "normal"
      });
      this.activeLayerIndex = this.layers.length - 1;
      this.updateLayersUI();
    }
  }

  updateLayersUI() {
    const container = document.getElementById("layersPanel");
    container.innerHTML = "";

    this.layers.forEach((layer, index) => {
      const layerElement = document.createElement("div");
      layerElement.className = `layer-item ${index === this.activeLayerIndex ? "active" : ""}`;
      layerElement.innerHTML = `
        <span class="layer-name">${layer.name}</span>
        <div class="layer-controls">
          <button class="layer-visibility" onclick="imageEditor.toggleLayerVisibility(${index})">
            ${layer.visible ? "👁️" : "🙈"}
          </button>
          <button class="layer-lock" onclick="imageEditor.toggleLayerLock(${index})">
            ${layer.locked ? "🔒" : "🔓"}
          </button>
        </div>
      `;
      layerElement.addEventListener("click", () => {
        this.setActiveLayer(index);
      });
      container.appendChild(layerElement);
    });
  }

  setActiveLayer(index) {
    this.activeLayerIndex = index;
    this.updateLayersUI();
  }

  toggleLayerVisibility(index) {
    this.layers[index].visible = !this.layers[index].visible;
    this.updateLayersUI();
  }

  toggleLayerLock(index) {
    this.layers[index].locked = !this.layers[index].locked;
    this.updateLayersUI();
  }

  saveState() {
    const state = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(state);
    this.historyIndex++;
    
    if (this.history.length > 50) {
      this.history.shift();
      this.historyIndex--;
    }
    
    this.updateHistoryUI();
    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const state = this.history[this.historyIndex];
      this.ctx.putImageData(state, 0, 0);
      this.updateHistoryUI();
      this.updateUndoRedoButtons();
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const state = this.history[this.historyIndex];
      this.ctx.putImageData(state, 0, 0);
      this.updateHistoryUI();
      this.updateUndoRedoButtons();
    }
  }

  updateHistoryUI() {
    const container = document.getElementById("historyPanel");
    container.innerHTML = "";

    this.history.forEach((state, index) => {
      const historyElement = document.createElement("div");
      historyElement.className = `history-item ${index === this.historyIndex ? "active" : ""}`;
      historyElement.textContent = `Estado ${index + 1}`;
      historyElement.addEventListener("click", () => {
        this.historyIndex = index;
        this.ctx.putImageData(state, 0, 0);
        this.updateHistoryUI();
        this.updateUndoRedoButtons();
      });
      container.appendChild(historyElement);
    });
  }

  updateUndoRedoButtons() {
    document.getElementById("undo").disabled = this.historyIndex <= 0;
    document.getElementById("redo").disabled = this.historyIndex >= this.history.length - 1;
  }

  clearSelection() {
    this.selection = null;
    this.selectionStart = null;
    this.selectionEnd = null;
    this.overlay.innerHTML = "";
  }

  deleteSelection() {
    if (this.selection) {
      this.ctx.clearRect(
        this.selection.x,
        this.selection.y,
        this.selection.width,
        this.selection.height
      );
      this.clearSelection();
      this.saveState();
    }
  }

  updateUI() {
    this.updateCanvasSize();
    this.updateZoomLevel();
    this.updateMousePosition();
    this.updateTransformUI();
    this.updateUndoRedoButtons();
  }
}

const imageEditor = new AdvancedImageEditor();
