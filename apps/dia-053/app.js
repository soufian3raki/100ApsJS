class VoiceToText {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.isPaused = false;
    this.recordingStartTime = null;
    this.timerInterval = null;
    this.transcriptions = JSON.parse(localStorage.getItem('voiceTranscriptions')) || [];
    this.init();
  }

  init() {
    this.initializeSpeechRecognition();
    this.bindEvents();
    this.renderHistory();
  }

  initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';
    this.recognition.maxAlternatives = 3;

    this.recognition.onstart = () => {
      this.isRecording = true;
      this.updateUI();
    };

    this.recognition.onresult = (event) => {
      this.handleRecognitionResult(event);
    };

    this.recognition.onerror = (event) => {
      this.handleRecognitionError(event);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      this.isPaused = false;
      this.updateUI();
      this.stopTimer();
    };
  }

  bindEvents() {
    document.getElementById('startRecording').addEventListener('click', () => {
      this.startRecording();
    });

    document.getElementById('stopRecording').addEventListener('click', () => {
      this.stopRecording();
    });

    document.getElementById('pauseRecording').addEventListener('click', () => {
      this.pauseRecording();
    });

    document.getElementById('clearResults').addEventListener('click', () => {
      this.clearResults();
    });

    document.getElementById('copyResults').addEventListener('click', () => {
      this.copyResults();
    });

    document.getElementById('downloadResults').addEventListener('click', () => {
      this.downloadResults();
    });

    document.getElementById('playResults').addEventListener('click', () => {
      this.playResults();
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
      this.clearHistory();
    });

    document.getElementById('exportHistory').addEventListener('click', () => {
      this.exportHistory();
    });

    document.getElementById('language').addEventListener('change', (e) => {
      if (this.recognition) {
        this.recognition.lang = e.target.value;
      }
    });

    document.getElementById('recognitionType').addEventListener('change', (e) => {
      if (this.recognition) {
        this.recognition.continuous = e.target.value === 'continuous';
      }
    });

    document.getElementById('confidence').addEventListener('input', (e) => {
      document.getElementById('confidenceValue').textContent = Math.round(e.target.value * 100) + '%';
    });

    document.getElementById('maxAlternatives').addEventListener('change', (e) => {
      if (this.recognition) {
        this.recognition.maxAlternatives = parseInt(e.target.value);
      }
    });
  }

  startRecording() {
    if (!this.recognition) {
      alert('Reconocimiento de voz no disponible');
      return;
    }

    try {
      this.recognition.start();
      this.recordingStartTime = Date.now();
      this.startTimer();
      this.updateStatus('Grabando...', 'recording');
    } catch (error) {
      console.error('Error al iniciar grabación:', error);
      alert('Error al iniciar la grabación');
    }
  }

  stopRecording() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.updateStatus('Procesando...', 'processing');
    }
  }

  pauseRecording() {
    if (this.isRecording) {
      if (this.isPaused) {
        this.recognition.start();
        this.isPaused = false;
        this.updateStatus('Grabando...', 'recording');
      } else {
        this.recognition.stop();
        this.isPaused = true;
        this.updateStatus('Pausado', '');
      }
    }
  }

  handleRecognitionResult(event) {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      const confidence = event.results[i][0].confidence;
      
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    this.updateTranscription(finalTranscript, interimTranscript);
    
    if (finalTranscript) {
      this.processVoiceCommands(finalTranscript);
    }
  }

  handleRecognitionError(event) {
    console.error('Error de reconocimiento:', event.error);
    
    let errorMessage = 'Error de reconocimiento: ';
    switch (event.error) {
      case 'no-speech':
        errorMessage += 'No se detectó voz';
        break;
      case 'audio-capture':
        errorMessage += 'Error de captura de audio';
        break;
      case 'not-allowed':
        errorMessage += 'Permisos de micrófono denegados';
        break;
      case 'network':
        errorMessage += 'Error de red';
        break;
      default:
        errorMessage += event.error;
    }
    
    alert(errorMessage);
    this.updateStatus('Error', '');
  }

  updateTranscription(final, interim) {
    const transcriptionText = document.getElementById('transcriptionText');
    const currentText = transcriptionText.textContent;
    
    if (final) {
      const newText = currentText + final;
      transcriptionText.textContent = newText;
      transcriptionText.classList.remove('placeholder');
    } else if (interim) {
      const displayText = currentText + interim;
      transcriptionText.textContent = displayText;
      transcriptionText.classList.remove('placeholder');
    }
  }

  processVoiceCommands(text) {
    const commands = {
      'nueva línea': '\n',
      'punto': '. ',
      'coma': ', ',
      'borrar': this.deleteLastWord.bind(this),
      'mayúscula': this.capitalizeNext.bind(this)
    };

    const lowerText = text.toLowerCase().trim();
    
    for (const [command, action] of Object.entries(commands)) {
      if (lowerText.includes(command)) {
        if (typeof action === 'function') {
          action();
        } else {
          this.insertText(action);
        }
        break;
      }
    }
  }

  deleteLastWord() {
    const transcriptionText = document.getElementById('transcriptionText');
    const text = transcriptionText.textContent;
    const words = text.split(' ');
    if (words.length > 1) {
      words.pop();
      transcriptionText.textContent = words.join(' ');
    }
  }

  capitalizeNext() {
    // Esta función se implementaría para capitalizar la siguiente palabra
    // Por simplicidad, solo mostramos un indicador
    this.showNotification('Próxima palabra será capitalizada');
  }

  insertText(text) {
    const transcriptionText = document.getElementById('transcriptionText');
    const currentText = transcriptionText.textContent;
    transcriptionText.textContent = currentText + text;
  }

  updateUI() {
    const startBtn = document.getElementById('startRecording');
    const stopBtn = document.getElementById('stopRecording');
    const pauseBtn = document.getElementById('pauseRecording');

    startBtn.disabled = this.isRecording;
    stopBtn.disabled = !this.isRecording;
    pauseBtn.disabled = !this.isRecording;
  }

  updateStatus(text, statusClass) {
    const statusText = document.getElementById('statusText');
    const statusIndicator = document.getElementById('statusIndicator');
    
    statusText.textContent = text;
    statusIndicator.className = 'status-indicator';
    if (statusClass) {
      statusIndicator.classList.add(statusClass);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.recordingStartTime) {
        const elapsed = Date.now() - this.recordingStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        document.getElementById('timerDisplay').textContent = 
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    document.getElementById('timerDisplay').textContent = '00:00';
  }

  clearResults() {
    document.getElementById('transcriptionText').textContent = 'Los resultados de la transcripción aparecerán aquí...';
    document.getElementById('transcriptionText').classList.add('placeholder');
    document.getElementById('alternatives').style.display = 'none';
  }

  copyResults() {
    const text = document.getElementById('transcriptionText').textContent;
    if (text && !text.includes('Los resultados de la transcripción aparecerán aquí...')) {
      navigator.clipboard.writeText(text).then(() => {
        this.showNotification('Texto copiado al portapapeles');
      });
    } else {
      alert('No hay texto para copiar');
    }
  }

  downloadResults() {
    const text = document.getElementById('transcriptionText').textContent;
    if (text && !text.includes('Los resultados de la transcripción aparecerán aquí...')) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcripcion_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('No hay texto para descargar');
    }
  }

  playResults() {
    const text = document.getElementById('transcriptionText').textContent;
    if (text && !text.includes('Los resultados de la transcripción aparecerán aquí...')) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = document.getElementById('language').value;
        speechSynthesis.speak(utterance);
      } else {
        alert('Tu navegador no soporta síntesis de voz');
      }
    } else {
      alert('No hay texto para reproducir');
    }
  }

  saveTranscription() {
    const text = document.getElementById('transcriptionText').textContent;
    if (text && !text.includes('Los resultados de la transcripción aparecerán aquí...')) {
      const transcription = {
        id: Date.now(),
        text: text,
        language: document.getElementById('language').value,
        timestamp: new Date().toISOString(),
        duration: this.getRecordingDuration()
      };

      this.transcriptions.unshift(transcription);
      this.saveTranscriptions();
      this.renderHistory();
      this.showNotification('Transcripción guardada');
    }
  }

  getRecordingDuration() {
    if (this.recordingStartTime) {
      return Math.floor((Date.now() - this.recordingStartTime) / 1000);
    }
    return 0;
  }

  renderHistory() {
    const historyList = document.getElementById('historyList');
    
    if (this.transcriptions.length === 0) {
      historyList.innerHTML = '<p class="no-history">No hay transcripciones guardadas</p>';
      return;
    }

    historyList.innerHTML = this.transcriptions.map(transcription => `
      <div class="history-item" onclick="voiceToText.loadTranscription(${transcription.id})">
        <div class="history-header">
          <div class="history-date">${new Date(transcription.timestamp).toLocaleString()}</div>
          <div class="history-actions">
            <button class="history-play" onclick="event.stopPropagation(); voiceToText.playTranscription(${transcription.id})">▶️</button>
            <button class="history-delete" onclick="event.stopPropagation(); voiceToText.deleteTranscription(${transcription.id})">🗑️</button>
          </div>
        </div>
        <div class="history-text">${this.escapeHtml(transcription.text.substring(0, 200))}${transcription.text.length > 200 ? '...' : ''}</div>
      </div>
    `).join('');
  }

  loadTranscription(id) {
    const transcription = this.transcriptions.find(t => t.id === id);
    if (transcription) {
      document.getElementById('transcriptionText').textContent = transcription.text;
      document.getElementById('transcriptionText').classList.remove('placeholder');
    }
  }

  playTranscription(id) {
    const transcription = this.transcriptions.find(t => t.id === id);
    if (transcription && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(transcription.text);
      utterance.lang = transcription.language;
      speechSynthesis.speak(utterance);
    }
  }

  deleteTranscription(id) {
    if (confirm('¿Eliminar esta transcripción?')) {
      this.transcriptions = this.transcriptions.filter(t => t.id !== id);
      this.saveTranscriptions();
      this.renderHistory();
    }
  }

  clearHistory() {
    if (confirm('¿Eliminar todo el historial?')) {
      this.transcriptions = [];
      this.saveTranscriptions();
      this.renderHistory();
    }
  }

  exportHistory() {
    const data = {
      transcriptions: this.transcriptions,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_voz_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  saveTranscriptions() {
    localStorage.setItem('voiceTranscriptions', JSON.stringify(this.transcriptions));
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the voice to text converter
const voiceToText = new VoiceToText();
