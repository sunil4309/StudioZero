/* ==========================================
   MUSIC SPECIFIC JAVASCRIPT - SUNIL PORTFOLIO
   HTML5 Audio Engine, Playlist, Seeking, Bouncing Equalizer
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audioPlayer');
  const playlist = document.getElementById('playlist');
  if (!audio || !playlist) return;

  const playPauseBtn = document.getElementById('playPause');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const seekBar = document.getElementById('seekBar');
  const seekProgress = document.getElementById('seekProgress');
  const volumeBar = document.getElementById('volumeBar');
  const volumeProgress = document.getElementById('volumeProgress');
  const volIcon = document.getElementById('volIcon');
  
  const cover = document.getElementById('albumCover');
  const title = document.getElementById('trackTitle');
  const artist = document.getElementById('trackArtist');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  
  const playerDeck = document.querySelector('.player-deck');
  const visualizerBars = document.querySelectorAll('.audio-visualizer .bar');
  
  let filteredTracksData = [...myTracks];
  let tracks = [];
  let currentIdx = 0;

  // Render playlist dynamically based on selected playlist filter
  const renderPlaylist = (playlistFilter = 'all') => {
    playlist.innerHTML = '';
    
    // Filter tracks data array
    filteredTracksData = myTracks.filter(t => playlistFilter === 'all' || t.playlist === playlistFilter);
    
    filteredTracksData.forEach((track, index) => {
      const li = document.createElement('li');
      if (index === 0) li.classList.add('active');
      
      li.setAttribute('data-src', track.src);
      li.setAttribute('data-cover', track.cover || 'images/default.jpg');
      li.setAttribute('data-artist', track.artist || 'Independent Artist');
      
      const displayIndex = (index + 1).toString().padStart(2, '0');
      li.innerHTML = `
        <span class="index">${displayIndex}</span>
        <div class="song-meta">
          <span class="song-title">${track.title}</span>
          <span class="song-artist">${track.artist || 'Independent Artist'}</span>
        </div>
        <span class="play-indicator"></span>
      `;
      playlist.appendChild(li);
    });

    const trackCountEl = document.getElementById('trackCount');
    if (trackCountEl) {
      trackCountEl.textContent = `${filteredTracksData.length} TRACKS`;
    }

    // Refresh elements reference
    tracks = Array.from(playlist.querySelectorAll('li'));
    
    // Bind click events to list items
    tracks.forEach((track, index) => {
      track.addEventListener('click', () => {
        loadTrack(index);
        playTrack();
      });
    });
  };

  // Render initial ALL tracks list
  renderPlaylist('all');

  // Web Audio Analyser + Procedural Wave Dual Engine
  let audioCtx = null;
  let analyser = null;
  let source = null;
  let dataArray = null;
  let animationFrameId = null;
  let waveTime = 0;

  // Initialize Web Audio API safely on user interaction
  const initWebAudio = () => {
    if (audioCtx) return;
    
    // Bypass Web Audio API if running locally on file:// to prevent browser CORS muting of local media elements
    if (window.location.protocol === 'file:') {
      console.log("Local file protocol detected. Web Audio API bypassed to prevent browser CORS muting. Procedural Wave active.");
      return;
    }
    
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64; // 32 frequency bins
      
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.warn("Web Audio API blocked or unsupported. Falling back to Procedural Wave engine.", e);
    }
  };

  // 1. Load Track Details
  const loadTrack = (idx) => {
    if (tracks.length === 0) return;
    
    // Keep index within boundaries of current active playlist array
    currentIdx = (idx + tracks.length) % tracks.length;
    const track = tracks[currentIdx];
    
    // Set Audio URL
    audio.src = track.getAttribute('data-src');
    
    // Set text and cover meta
    title.textContent = track.querySelector('.song-title').textContent;
    artist.textContent = track.querySelector('.song-artist').textContent;
    cover.src = track.getAttribute('data-cover');

    // Highlight current active track in playlist
    tracks.forEach((t, i) => {
      t.classList.toggle('active', i === currentIdx);
    });

    // Reset seeker
    seekBar.value = 0;
    seekProgress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
  };

  // 2. Playback State Control
  const playTrack = () => {
    initWebAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    audio.play().then(() => {
      playerDeck.classList.add('playing');
      playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`; // Pause SVG
      startMockVisualizer();
    }).catch(err => {
      console.log("Audio play error (requires click interaction):", err);
    });
  };

  const pauseTrack = () => {
    audio.pause();
    playerDeck.classList.remove('playing');
    playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`; // Play SVG
    stopMockVisualizer();
  };

  const togglePlay = () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  };

  // 3. Realtime Equalizer Render Frame
  const updateVisualizerFrame = () => {
    if (!audio.paused) {
      animationFrameId = requestAnimationFrame(updateVisualizerFrame);
    }
    
    let useSimulated = true;
    
    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((acc, val) => acc + val, 0);
      if (sum > 0) {
        useSimulated = false;
        
        visualizerBars.forEach((bar, idx) => {
          const dataIdx = Math.floor((idx / visualizerBars.length) * 20); 
          const freqVal = dataArray[dataIdx]; 
          const percent = freqVal / 255;
          const height = (percent * 34) * audio.volume + 4; // Scale dynamic offset by volume
          bar.style.height = `${height}px`;
        });
      }
    }
    
    if (useSimulated) {
      waveTime += 0.15;
      
      visualizerBars.forEach((bar, idx) => {
        const waveIndex = idx - (visualizerBars.length / 2);
        const distance = Math.abs(waveIndex) / (visualizerBars.length / 2); // 0 center, 1 edges
        
        let amplitude = 18 * (1 - distance * 0.3); // higher in center
        let frequency = 0.5;
        
        const sinVal = Math.sin(waveTime + idx * frequency);
        const cosVal = Math.cos(waveTime * 0.7 - idx * 0.3);
        
        let heightFactor = (sinVal * 0.6 + cosVal * 0.4); 
        heightFactor = (heightFactor + 1) / 2; // map to 0 to 1
        
        const microNoise = Math.random() * 0.1 + 0.95;
        let height = (heightFactor * amplitude * microNoise) * audio.volume + 4; // Scale dynamic offset by volume
        
        bar.style.height = `${Math.max(4, Math.min(38, height))}px`;
      });
    }
  };

  const startMockVisualizer = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(updateVisualizerFrame);
  };

  const stopMockVisualizer = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    visualizerBars.forEach(bar => {
      bar.style.height = '4px';
    });
  };

  // 4. Time Formatting helper
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // 5. Seeker Progress and Audio Bindings
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      seekBar.value = pct;
      seekProgress.style.width = `${pct}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  seekBar.addEventListener('input', () => {
    if (audio.duration) {
      const seekTo = (seekBar.value / 100) * audio.duration;
      audio.currentTime = seekTo;
      seekProgress.style.width = `${seekBar.value}%`;
    }
  });

  // 6. Volume Control
  const setVolume = (val) => {
    audio.volume = val;
    volumeProgress.style.width = `${val * 100}%`;
    
    if (val === 0) {
      volIcon.textContent = '🔇';
    } else if (val < 0.4) {
      volIcon.textContent = '🔈';
    } else if (val < 0.7) {
      volIcon.textContent = '🔉';
    } else {
      volIcon.textContent = '🔊';
    }
  };

  volumeBar.addEventListener('input', () => {
    setVolume(volumeBar.value);
  });

  // 7. Playlist Filter Binding
  const filterBtns = document.querySelectorAll('.playlist-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const selectedPlaylist = btn.getAttribute('data-playlist');
      
      // Store currently playing song source
      const currentPlayingSrc = audio.src ? audio.src.substring(audio.src.indexOf('audios/')) : '';
      
      // Re-render playlist
      renderPlaylist(selectedPlaylist);
      
      // Find if currently playing track is in the new playlist
      const matchedIndex = filteredTracksData.findIndex(t => t.src === currentPlayingSrc);
      if (matchedIndex !== -1) {
        currentIdx = matchedIndex;
        tracks.forEach((t, i) => {
          t.classList.toggle('active', i === currentIdx);
        });
      } else {
        // Current track is not in the new playlist. Keep it playing,
        // but set currentIdx = -1 so skipping loads index 0 of the new list.
        currentIdx = -1;
        tracks.forEach(t => t.classList.remove('active'));
      }
    });
  });

  // 8. Control Buttons Event Binding
  playPauseBtn.addEventListener('click', togglePlay);
  
  nextBtn.addEventListener('click', () => {
    if (tracks.length === 0) return;
    loadTrack(currentIdx + 1);
    playTrack();
  });
  
  prevBtn.addEventListener('click', () => {
    if (tracks.length === 0) return;
    loadTrack(currentIdx - 1);
    playTrack();
  });

  // Auto skip to next when finished
  audio.addEventListener('ended', () => {
    if (tracks.length === 0) return;
    loadTrack(currentIdx + 1);
    playTrack();
  });

  // 9. Load first track initial state
  loadTrack(0);
  setVolume(volumeBar.value);
});
