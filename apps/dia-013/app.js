// Music Player App
const playlist = [
  {
    title: "Canción de Ejemplo 1",
    artist: "Artista 1",
    duration: "3:45"
  },
  {
    title: "Canción de Ejemplo 2", 
    artist: "Artista 2",
    duration: "4:20"
  },
  {
    title: "Canción de Ejemplo 3",
    artist: "Artista 3",
    duration: "3:15"
  }
];

let currentTrack = 0;
let isPlaying = false;
let currentTime = 0;
let totalTime = 0;

// Elements
const albumCover = document.getElementById('albumCover');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const progressFill = document.getElementById('progressFill');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const playlistEl = document.getElementById('playlist');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadPlaylist();
  updateTrackInfo();
  
  // Event listeners
  playPauseBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', previousTrack);
  nextBtn.addEventListener('click', nextTrack);
  volumeSlider.addEventListener('input', updateVolume);
  
  // Simulate audio progress
  setInterval(updateProgress, 1000);
});

function loadPlaylist() {
  playlistEl.innerHTML = '';
  
  playlist.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.innerHTML = `
      <h3>${track.title}</h3>
      <p>${track.artist} • ${track.duration}</p>
    `;
    
    item.addEventListener('click', () => {
      currentTrack = index;
      updateTrackInfo();
      if (isPlaying) {
        // Simulate playing
        console.log(`Playing: ${track.title}`);
      }
    });
    
    playlistEl.appendChild(item);
  });
}

function updateTrackInfo() {
  const track = playlist[currentTrack];
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  
  // Update playlist active state
  document.querySelectorAll('.playlist-item').forEach((item, index) => {
    item.classList.toggle('active', index === currentTrack);
  });
  
  // Simulate track duration
  totalTime = parseTime(track.duration);
  totalTimeEl.textContent = track.duration;
  currentTime = 0;
  updateProgressDisplay();
}

function togglePlay() {
  isPlaying = !isPlaying;
  playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
  
  if (isPlaying) {
    console.log('Playing track:', playlist[currentTrack].title);
  } else {
    console.log('Paused track:', playlist[currentTrack].title);
  }
}

function previousTrack() {
  currentTrack = currentTrack > 0 ? currentTrack - 1 : playlist.length - 1;
  updateTrackInfo();
  if (isPlaying) {
    console.log('Playing previous track');
  }
}

function nextTrack() {
  currentTrack = currentTrack < playlist.length - 1 ? currentTrack + 1 : 0;
  updateTrackInfo();
  if (isPlaying) {
    console.log('Playing next track');
  }
}

function updateVolume() {
  const volume = volumeSlider.value;
  console.log('Volume set to:', volume + '%');
}

function updateProgress() {
  if (isPlaying && currentTime < totalTime) {
    currentTime++;
    updateProgressDisplay();
  } else if (currentTime >= totalTime) {
    nextTrack();
  }
}

function updateProgressDisplay() {
  const progress = (currentTime / totalTime) * 100;
  progressFill.style.width = progress + '%';
  currentTimeEl.textContent = formatTime(currentTime);
}

function parseTime(timeStr) {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  return minutes * 60 + seconds;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
} 