class VideoPlayer {
  constructor() {
    this.videos = [];
    this.currentVideoIndex = 0;
    this.isPlaying = false;
    this.isDragging = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSettings();
  }

  bindEvents() {
    // File upload
    document.getElementById('videoFile').addEventListener('change', (e) => {
      this.handleFileUpload(e.target.files);
    });

    // Video controls
    document.getElementById('playPause').addEventListener('click', () => this.togglePlayPause());
    document.getElementById('mute').addEventListener('click', () => this.toggleMute());
    document.getElementById('fullscreen').addEventListener('click', () => this.toggleFullscreen());

    // Progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.addEventListener('click', (e) => this.seekTo(e));
    progressBar.addEventListener('mousedown', () => this.isDragging = true);
    progressBar.addEventListener('mouseup', () => this.isDragging = false);

    // Volume control
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
      this.setVolume(e.target.value);
    });

    // Settings
    document.getElementById('playbackSpeed').addEventListener('change', (e) => {
      this.setPlaybackSpeed(e.target.value);
    });
    document.getElementById('quality').addEventListener('change', (e) => {
      this.setQuality(e.target.value);
    });
    document.getElementById('autoplay').addEventListener('change', (e) => {
      this.setAutoplay(e.target.checked);
    });
    document.getElementById('loop').addEventListener('change', (e) => {
      this.setLoop(e.target.checked);
    });

    // Video events
    const video = document.getElementById('videoPlayer');
    video.addEventListener('loadedmetadata', () => this.updateDuration());
    video.addEventListener('timeupdate', () => this.updateProgress());
    video.addEventListener('play', () => this.updatePlayPauseButton(true));
    video.addEventListener('pause', () => this.updatePlayPauseButton(false));
    video.addEventListener('ended', () => this.onVideoEnded());
    video.addEventListener('volumechange', () => this.updateVolumeDisplay());
  }

  handleFileUpload(files) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        const video = {
          id: Date.now() + Math.random(),
          name: file.name,
          url: videoUrl,
          duration: 0
        };
        
        this.videos.push(video);
        this.updatePlaylist();
        this.updateFileInfo();
        
        // Load first video
        if (this.videos.length === 1) {
          this.loadVideo(0);
        }
      }
    });
  }

  loadVideo(index) {
    if (index < 0 || index >= this.videos.length) return;
    
    this.currentVideoIndex = index;
    const video = this.videos[index];
    const videoElement = document.getElementById('videoPlayer');
    
    videoElement.src = video.url;
    videoElement.load();
    
    this.updatePlaylist();
    this.updateFileInfo();
  }

  togglePlayPause() {
    const video = document.getElementById('videoPlayer');
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  updatePlayPauseButton(playing) {
    this.isPlaying = playing;
    const button = document.getElementById('playPause');
    button.textContent = playing ? '⏸️' : '▶️';
  }

  seekTo(e) {
    if (this.isDragging) return;
    
    const progressBar = document.getElementById('progressBar');
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    
    const video = document.getElementById('videoPlayer');
    video.currentTime = percentage * video.duration;
  }

  updateProgress() {
    if (this.isDragging) return;
    
    const video = document.getElementById('videoPlayer');
    const progressFill = document.getElementById('progressFill');
    const progressHandle = document.getElementById('progressHandle');
    
    if (video.duration) {
      const percentage = (video.currentTime / video.duration) * 100;
      progressFill.style.width = percentage + '%';
      progressHandle.style.left = percentage + '%';
    }
  }

  updateDuration() {
    const video = document.getElementById('videoPlayer');
    const duration = this.formatTime(video.duration);
    document.getElementById('duration').textContent = duration;
    
    // Update video duration in playlist
    if (this.videos[this.currentVideoIndex]) {
      this.videos[this.currentVideoIndex].duration = video.duration;
      this.updatePlaylist();
    }
  }

  updateTimeDisplay() {
    const video = document.getElementById('videoPlayer');
    const currentTime = this.formatTime(video.currentTime);
    document.getElementById('currentTime').textContent = currentTime;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  toggleMute() {
    const video = document.getElementById('videoPlayer');
    video.muted = !video.muted;
    this.updateVolumeDisplay();
  }

  setVolume(value) {
    const video = document.getElementById('videoPlayer');
    video.volume = value / 100;
    video.muted = value === 0;
    this.updateVolumeDisplay();
  }

  updateVolumeDisplay() {
    const video = document.getElementById('videoPlayer');
    const muteButton = document.getElementById('mute');
    const volumeSlider = document.getElementById('volumeSlider');
    
    muteButton.textContent = video.muted || video.volume === 0 ? '🔇' : '🔊';
    volumeSlider.value = video.muted ? 0 : video.volume * 100;
  }

  toggleFullscreen() {
    const video = document.getElementById('videoPlayer');
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  setPlaybackSpeed(speed) {
    const video = document.getElementById('videoPlayer');
    video.playbackRate = parseFloat(speed);
    this.saveSettings();
  }

  setQuality(quality) {
    // This is a simplified implementation
    // In a real app, you'd handle different quality sources
    console.log('Quality set to:', quality);
    this.saveSettings();
  }

  setAutoplay(enabled) {
    const video = document.getElementById('videoPlayer');
    video.autoplay = enabled;
    this.saveSettings();
  }

  setLoop(enabled) {
    const video = document.getElementById('videoPlayer');
    video.loop = enabled;
    this.saveSettings();
  }

  onVideoEnded() {
    // Auto-play next video if not looping
    const video = document.getElementById('videoPlayer');
    if (!video.loop && this.currentVideoIndex < this.videos.length - 1) {
      this.loadVideo(this.currentVideoIndex + 1);
    }
  }

  updatePlaylist() {
    const playlistItems = document.getElementById('playlistItems');
    
    if (this.videos.length === 0) {
      playlistItems.innerHTML = '<p class="no-videos">No hay videos cargados</p>';
      return;
    }
    
    playlistItems.innerHTML = this.videos.map((video, index) => `
      <div class="playlist-item ${index === this.currentVideoIndex ? 'active' : ''}" 
           onclick="videoPlayer.loadVideo(${index})">
        <div class="video-info">
          <div class="video-name">${this.escapeHtml(video.name)}</div>
          <div class="video-duration">${this.formatTime(video.duration)}</div>
        </div>
        <div class="video-actions">
          <button class="remove-video" onclick="event.stopPropagation(); videoPlayer.removeVideo(${index})">
            Eliminar
          </button>
        </div>
      </div>
    `).join('');
  }

  removeVideo(index) {
    if (confirm('¿Eliminar este video de la lista?')) {
      this.videos.splice(index, 1);
      
      if (this.currentVideoIndex >= this.videos.length) {
        this.currentVideoIndex = Math.max(0, this.videos.length - 1);
      }
      
      if (this.videos.length === 0) {
        document.getElementById('videoPlayer').src = '';
        this.updateFileInfo();
      } else {
        this.loadVideo(this.currentVideoIndex);
      }
      
      this.updatePlaylist();
    }
  }

  updateFileInfo() {
    const fileInfo = document.getElementById('fileInfo');
    if (this.videos.length === 0) {
      fileInfo.textContent = 'No hay videos cargados';
    } else {
      fileInfo.textContent = `${this.videos.length} video(s) cargado(s)`;
    }
  }

  loadSettings() {
    const settings = JSON.parse(localStorage.getItem('videoPlayerSettings')) || {};
    
    if (settings.playbackSpeed) {
      document.getElementById('playbackSpeed').value = settings.playbackSpeed;
      this.setPlaybackSpeed(settings.playbackSpeed);
    }
    if (settings.quality) {
      document.getElementById('quality').value = settings.quality;
    }
    if (settings.autoplay !== undefined) {
      document.getElementById('autoplay').checked = settings.autoplay;
      this.setAutoplay(settings.autoplay);
    }
    if (settings.loop !== undefined) {
      document.getElementById('loop').checked = settings.loop;
      this.setLoop(settings.loop);
    }
  }

  saveSettings() {
    const settings = {
      playbackSpeed: document.getElementById('playbackSpeed').value,
      quality: document.getElementById('quality').value,
      autoplay: document.getElementById('autoplay').checked,
      loop: document.getElementById('loop').checked
    };
    
    localStorage.setItem('videoPlayerSettings', JSON.stringify(settings));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the video player
const videoPlayer = new VideoPlayer();

// Update time display periodically
setInterval(() => {
  videoPlayer.updateTimeDisplay();
}, 1000);
