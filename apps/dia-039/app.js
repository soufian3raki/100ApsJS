// Generador de Memes - Día 39
class MemeGenerator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentImage = null;
    this.savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    
    this.initializeElements();
    this.setupEventListeners();
    this.loadDefaultImage();
    this.renderGallery();
  }

  initializeElements() {
    this.canvas = document.getElementById("memeCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.newMemeBtn = document.getElementById("newMemeBtn");
    this.downloadBtn = document.getElementById("downloadBtn");
    this.shareBtn = document.getElementById("shareBtn");
    this.imageUpload = document.getElementById("imageUpload");
    this.templateSelect = document.getElementById("templateSelect");
    this.topTextInput = document.getElementById("topTextInput");
    this.topTextSize = document.getElementById("topTextSize");
    this.topTextSizeValue = document.getElementById("topTextSizeValue");
    this.topTextColor = document.getElementById("topTextColor");
    this.topTextFont = document.getElementById("topTextFont");
    this.bottomTextInput = document.getElementById("bottomTextInput");
    this.bottomTextSize = document.getElementById("bottomTextSize");
    this.bottomTextSizeValue = document.getElementById("bottomTextSizeValue");
    this.bottomTextColor = document.getElementById("bottomTextColor");
    this.bottomTextFont = document.getElementById("bottomTextFont");
    this.memeGallery = document.getElementById("memeGallery");
    this.topTextOverlay = document.getElementById("topText");
    this.bottomTextOverlay = document.getElementById("bottomText");
  }

  setupEventListeners() {
    this.newMemeBtn.addEventListener("click", () => this.newMeme());
    this.downloadBtn.addEventListener("click", () => this.downloadMeme());
    this.shareBtn.addEventListener("click", () => this.shareMeme());
    this.imageUpload.addEventListener("change", (e) => this.handleImageUpload(e));
    this.templateSelect.addEventListener("change", (e) => this.loadTemplate(e.target.value));
    
    this.topTextInput.addEventListener("input", () => this.updateMeme());
    this.topTextSize.addEventListener("input", () => this.updateMeme());
    this.topTextColor.addEventListener("change", () => this.updateMeme());
    this.topTextFont.addEventListener("change", () => this.updateMeme());
    
    this.bottomTextInput.addEventListener("input", () => this.updateMeme());
    this.bottomTextSize.addEventListener("input", () => this.updateMeme());
    this.bottomTextColor.addEventListener("change", () => this.updateMeme());
    this.bottomTextFont.addEventListener("change", () => this.updateMeme());
    
    this.topTextSize.addEventListener("input", () => {
      this.topTextSizeValue.textContent = this.topTextSize.value + "px";
    });
    
    this.bottomTextSize.addEventListener("input", () => {
      this.bottomTextSizeValue.textContent = this.bottomTextSize.value + "px";
    });
  }

  loadDefaultImage() {
    this.ctx.fillStyle = "#f0f0f0";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#333";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Sube una imagen o selecciona una plantilla", this.canvas.width / 2, this.canvas.height / 2);
  }

  handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.loadImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  loadTemplate(templateName) {
    if (!templateName) return;
    
    const templates = {
      "distracted-boyfriend": "https://i.imgflip.com/1bij.jpg",
      "drake-pointing": "https://i.imgflip.com/30x1g.jpg",
      "woman-yelling-at-cat": "https://i.imgflip.com/345v97.jpg",
      "two-buttons": "https://i.imgflip.com/1g8my.jpg",
      "change-my-mind": "https://i.imgflip.com/24y43o.jpg",
      "this-is-fine": "https://i.imgflip.com/26am.jpg"
    };
    
    const imageUrl = templates[templateName];
    if (imageUrl) {
      this.loadImage(imageUrl);
    }
  }

  loadImage(imageUrl) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      this.currentImage = img;
      this.drawMeme();
    };
    img.onerror = () => {
      this.loadDefaultImage();
      this.updateStatus("Error al cargar la imagen", "error");
    };
    img.src = imageUrl;
  }

  drawMeme() {
    if (!this.currentImage) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.currentImage, 0, 0, this.canvas.width, this.canvas.height);
    
    this.drawText(
      this.topTextInput.value,
      this.canvas.width / 2,
      50,
      this.topTextSize.value,
      this.topTextColor.value,
      this.topTextFont.value
    );
    
    this.drawText(
      this.bottomTextInput.value,
      this.canvas.width / 2,
      this.canvas.height - 50,
      this.bottomTextSize.value,
      this.bottomTextColor.value,
      this.bottomTextFont.value
    );
    
    this.updateOverlays();
  }

  drawText(text, x, y, size, color, font) {
    if (!text) return;
    
    this.ctx.font = size + "px " + font;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 3;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    
    this.ctx.strokeText(text, x, y);
    this.ctx.fillText(text, x, y);
  }

  updateOverlays() {
    this.topTextOverlay.textContent = this.topTextInput.value;
    this.topTextOverlay.style.fontSize = this.topTextSize.value + "px";
    this.topTextOverlay.style.color = this.topTextColor.value;
    this.topTextOverlay.style.fontFamily = this.topTextFont.value;
    
    this.bottomTextOverlay.textContent = this.bottomTextInput.value;
    this.bottomTextOverlay.style.fontSize = this.bottomTextSize.value + "px";
    this.bottomTextOverlay.style.color = this.bottomTextColor.value;
    this.bottomTextOverlay.style.fontFamily = this.bottomTextFont.value;
  }

  updateMeme() {
    this.drawMeme();
  }

  newMeme() {
    this.topTextInput.value = "";
    this.bottomTextInput.value = "";
    this.topTextSize.value = 40;
    this.bottomTextSize.value = 40;
    this.topTextSizeValue.textContent = "40px";
    this.bottomTextSizeValue.textContent = "40px";
    this.topTextColor.value = "#ffffff";
    this.bottomTextColor.value = "#ffffff";
    this.topTextFont.value = "Impact";
    this.bottomTextFont.value = "Impact";
    this.templateSelect.value = "";
    this.imageUpload.value = "";
    
    this.loadDefaultImage();
    this.updateOverlays();
  }

  downloadMeme() {
    const link = document.createElement("a");
    link.download = "meme-" + Date.now() + ".png";
    link.href = this.canvas.toDataURL();
    link.click();
  }

  shareMeme() {
    if (navigator.share) {
      this.canvas.toBlob((blob) => {
        const file = new File([blob], "meme.png", { type: "image/png" });
        navigator.share({
          title: "Mi Meme",
          text: "Mira este meme que creé",
          files: [file]
        });
      });
    } else {
      this.canvas.toBlob((blob) => {
        navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]).then(() => {
          this.updateStatus("Meme copiado al portapapeles", "success");
        });
      });
    }
  }

  saveMeme() {
    const meme = {
      id: Date.now().toString(),
      topText: this.topTextInput.value,
      bottomText: this.bottomTextInput.value,
      topTextSize: this.topTextSize.value,
      bottomTextSize: this.bottomTextSize.value,
      topTextColor: this.topTextColor.value,
      bottomTextColor: this.bottomTextColor.value,
      topTextFont: this.topTextFont.value,
      bottomTextFont: this.bottomTextFont.value,
      imageData: this.canvas.toDataURL(),
      createdAt: new Date().toISOString()
    };
    
    this.savedMemes.unshift(meme);
    this.saveMemes();
    this.renderGallery();
    this.updateStatus("Meme guardado en la galería", "success");
  }

  loadMeme(memeId) {
    const meme = this.savedMemes.find(m => m.id === memeId);
    if (meme) {
      this.topTextInput.value = meme.topText;
      this.bottomTextInput.value = meme.bottomText;
      this.topTextSize.value = meme.topTextSize;
      this.bottomTextSize.value = meme.bottomTextSize;
      this.topTextSizeValue.textContent = meme.topTextSize + "px";
      this.bottomTextSizeValue.textContent = meme.bottomTextSize + "px";
      this.topTextColor.value = meme.topTextColor;
      this.bottomTextColor.value = meme.bottomTextColor;
      this.topTextFont.value = meme.topTextFont;
      this.bottomTextFont.value = meme.bottomTextFont;
      
      const img = new Image();
      img.onload = () => {
        this.currentImage = img;
        this.updateMeme();
      };
      img.src = meme.imageData;
    }
  }

  deleteMeme(memeId) {
    if (confirm("¿Estás seguro de que quieres eliminar este meme?")) {
      this.savedMemes = this.savedMemes.filter(m => m.id !== memeId);
      this.saveMemes();
      this.renderGallery();
    }
  }

  renderGallery() {
    if (this.savedMemes.length === 0) {
      this.memeGallery.innerHTML = "<div class=\"empty-gallery\"><div class=\"empty-gallery-icon\">🖼️</div><p>No hay memes guardados</p><p>Crea tu primer meme</p></div>";
      return;
    }
    
    this.memeGallery.innerHTML = this.savedMemes.map(meme => 
      "<div class=\"gallery-item\" onclick=\"memeGenerator.loadMeme(\
 + meme.id + 
\)\">" +
      "<img src=\"" + meme.imageData + "\" alt=\"Meme guardado\">" +
      "<div class=\"gallery-item-info\">" +
      "<div class=\"gallery-item-title\">" + (meme.topText || "Sin texto superior") + "</div>" +
      "<div class=\"gallery-item-date\">" + new Date(meme.createdAt).toLocaleDateString() + "</div>" +
      "</div>" +
      "<div class=\"gallery-item-actions\" onclick=\"event.stopPropagation()\">" +
      "<button class=\"gallery-item-action\" onclick=\"memeGenerator.deleteMeme(\ + meme.id + \)\" title=\"Eliminar\">🗑️</button>" +
      "</div>" +
      "</div>"
    ).join("");
  }

  saveMemes() {
    localStorage.setItem("savedMemes", JSON.stringify(this.savedMemes));
  }

  updateStatus(message, type = "") {
    const notification = document.createElement("div");
    notification.className = "notification " + type;
    notification.textContent = message;
    notification.style.cssText = "position: fixed; top: 20px; right: 20px; padding: 15px 20px; background: var(--card-bg); border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 1001; color: var(--text-primary); border-left: 4px solid var(--accent-color);";
    
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

let memeGenerator;

document.addEventListener("DOMContentLoaded", () => {
  memeGenerator = new MemeGenerator();
});
