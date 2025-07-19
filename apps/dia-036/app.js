// Editor de Markdown en Vivo - Día 36
class MarkdownEditor {
  constructor() {
    this.currentDoc = null;
    this.savedDocs = JSON.parse(localStorage.getItem("savedDocs")) || [];
    
    this.initializeElements();
    this.setupEventListeners();
    this.updatePreview();
    this.updateStats();
  }

  initializeElements() {
    this.markdownInput = document.getElementById("markdownInput");
    this.markdownPreview = document.getElementById("markdownPreview");
    this.newDocBtn = document.getElementById("newDocBtn");
    this.saveDocBtn = document.getElementById("saveDocBtn");
    this.loadDocBtn = document.getElementById("loadDocBtn");
    this.exportBtn = document.getElementById("exportBtn");
    this.clearBtn = document.getElementById("clearBtn");
    this.fullscreenBtn = document.getElementById("fullscreenBtn");
    this.refreshBtn = document.getElementById("refreshBtn");
    this.copyBtn = document.getElementById("copyBtn");
    this.loadModal = document.getElementById("loadModal");
    this.closeLoadModal = document.getElementById("closeLoadModal");
    this.fileInput = document.getElementById("fileInput");
    this.savedDocsEl = document.getElementById("savedDocs");
    
    this.wordCount = document.getElementById("wordCount");
    this.charCount = document.getElementById("charCount");
    this.lineCount = document.getElementById("lineCount");
    this.readTime = document.getElementById("readTime");
  }

  setupEventListeners() {
    this.markdownInput.addEventListener("input", () => {
      this.updatePreview();
      this.updateStats();
    });
    
    this.newDocBtn.addEventListener("click", () => this.newDocument());
    this.saveDocBtn.addEventListener("click", () => this.saveDocument());
    this.loadDocBtn.addEventListener("click", () => this.openLoadModal());
    this.exportBtn.addEventListener("click", () => this.exportDocument());
    this.clearBtn.addEventListener("click", () => this.clearDocument());
    this.fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());
    this.refreshBtn.addEventListener("click", () => this.updatePreview());
    this.copyBtn.addEventListener("click", () => this.copyHTML());
    this.closeLoadModal.addEventListener("click", () => this.closeLoadModal());
    this.fileInput.addEventListener("change", (e) => this.loadFile(e));
    
    document.querySelectorAll(".toolbar-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const command = e.target.dataset.command;
        this.executeCommand(command);
      });
    });
  }

  updatePreview() {
    const markdown = this.markdownInput.value;
    const html = this.parseMarkdown(markdown);
    this.markdownPreview.innerHTML = html;
  }

  parseMarkdown(markdown) {
    let html = markdown;
    
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
    
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");
    
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");
    html = html.replace(/```([\\s\\S]*?)```/g, "<pre><code>$1</code></pre>");
    
    html = html.replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, "<a href=\"$2\">$1</a>");
    
    html = html.replace(/!\\[([^\\]]*)\\]\\(([^)]+)\\)/g, "<img src=\"$2\" alt=\"$1\">");
    
    html = html.replace(/^\\* (.*$)/gim, "<li>$1</li>");
    html = html.replace(/^\\+ (.*$)/gim, "<li>$1</li>");
    html = html.replace(/^- (.*$)/gim, "<li>$1</li>");
    html = html.replace(/^\\d+\\. (.*$)/gim, "<li>$1</li>");
    
    html = html.replace(/(<li>.*<\\/li>)/gs, "<ul>$1</ul>");
    
    html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");
    
    html = html.replace(/^---$/gim, "<hr>");
    html = html.replace(/^\\*\\*\\*$/gim, "<hr>");
    
    html = html.replace(/\\|(.+)\\|/g, (match, content) => {
      const cells = content.split("|").map(cell => cell.trim());
      const row = cells.map(cell => "<td>" + cell + "</td>").join("");
      return "<tr>" + row + "</tr>";
    });
    
    html = html.replace(/(<tr>.*<\\/tr>)/gs, "<table>$1</table>");
    
    html = html.replace(/\\n/g, "<br>");
    
    return html;
  }

  executeCommand(command) {
    const textarea = this.markdownInput;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);
    
    let newText = "";
    
    switch (command) {
      case "bold":
        newText = "**" + (selectedText || "texto en negrita") + "**";
        break;
      case "italic":
        newText = "*" + (selectedText || "texto en cursiva") + "*";
        break;
      case "underline":
        newText = "<u>" + (selectedText || "texto subrayado") + "</u>";
        break;
      case "heading1":
        newText = "# " + (selectedText || "Título 1");
        break;
      case "heading2":
        newText = "## " + (selectedText || "Título 2");
        break;
      case "heading3":
        newText = "### " + (selectedText || "Título 3");
        break;
      case "link":
        newText = "[" + (selectedText || "texto del enlace") + "](https://ejemplo.com)";
        break;
      case "image":
        newText = "![" + (selectedText || "texto alternativo") + "](https://ejemplo.com/imagen.jpg)";
        break;
      case "code":
        newText = "`" + (selectedText || "código") + "`";
        break;
      case "list":
        newText = "- " + (selectedText || "elemento de lista");
        break;
      case "quote":
        newText = "> " + (selectedText || "cita");
        break;
      case "table":
        newText = "| Columna 1 | Columna 2 | Columna 3 |\\n|-----------|-----------|-----------|\\n| Dato 1    | Dato 2    | Dato 3    |";
        break;
    }
    
    textarea.value = before + newText + after;
    textarea.focus();
    textarea.setSelectionRange(start + newText.length, start + newText.length);
    
    this.updatePreview();
    this.updateStats();
  }

  updateStats() {
    const text = this.markdownInput.value;
    const words = text.trim().split(/\\s+/).filter(word => word.length > 0).length;
    const chars = text.length;
    const lines = text.split("\\n").length;
    const readTime = Math.ceil(words / 200);
    
    this.wordCount.textContent = words;
    this.charCount.textContent = chars;
    this.lineCount.textContent = lines;
    this.readTime.textContent = readTime + " min";
  }

  newDocument() {
    if (confirm("¿Estás seguro de que quieres crear un nuevo documento? Se perderán los cambios no guardados.")) {
      this.markdownInput.value = "";
      this.updatePreview();
      this.updateStats();
      this.currentDoc = null;
    }
  }

  saveDocument() {
    const title = prompt("Nombre del documento:", "Documento sin título");
    if (title) {
      const doc = {
        id: Date.now().toString(),
        title: title,
        content: this.markdownInput.value,
        createdAt: new Date().toISOString()
      };
      
      this.savedDocs.push(doc);
      this.saveDocs();
      this.currentDoc = doc.id;
      alert("Documento guardado exitosamente");
    }
  }

  openLoadModal() {
    this.loadModal.classList.add("show");
    this.renderSavedDocs();
  }

  closeLoadModal() {
    this.loadModal.classList.remove("show");
  }

  renderSavedDocs() {
    if (this.savedDocs.length === 0) {
      this.savedDocsEl.innerHTML = "<p>No hay documentos guardados</p>";
      return;
    }
    
    this.savedDocsEl.innerHTML = this.savedDocs.map(doc => 
      "<div class=\"saved-doc\" onclick=\"markdownEditor.loadDocument(\
 + doc.id + 
\)\">" +
      "<h4>" + doc.title + "</h4>" +
      "<p>Creado: " + new Date(doc.createdAt).toLocaleDateString() + "</p>" +
      "</div>"
    ).join("");
  }

  loadDocument(docId) {
    const doc = this.savedDocs.find(d => d.id === docId);
    if (doc) {
      this.markdownInput.value = doc.content;
      this.updatePreview();
      this.updateStats();
      this.currentDoc = docId;
      this.closeLoadModal();
    }
  }

  loadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.markdownInput.value = e.target.result;
        this.updatePreview();
        this.updateStats();
      };
      reader.readAsText(file);
    }
  }

  exportDocument() {
    const html = this.parseMarkdown(this.markdownInput.value);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "documento.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  clearDocument() {
    if (confirm("¿Estás seguro de que quieres limpiar el documento?")) {
      this.markdownInput.value = "";
      this.updatePreview();
      this.updateStats();
    }
  }

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  copyHTML() {
    const html = this.parseMarkdown(this.markdownInput.value);
    navigator.clipboard.writeText(html).then(() => {
      alert("HTML copiado al portapapeles");
    });
  }

  saveDocs() {
    localStorage.setItem("savedDocs", JSON.stringify(this.savedDocs));
  }
}

let markdownEditor;

document.addEventListener("DOMContentLoaded", () => {
  markdownEditor = new MarkdownEditor();
});
