let player = null;

function initPlayer() {
  player = new YT.Player('yt-audio', {
    videoId: 'iPHZTLHxKAo',
    playerVars: { controls: 0, playsinline: 1, rel: 0 },
    events: {
      onReady: function () { console.log('[audio] reproductor listo'); },
      onError: function (e) { console.error('[audio] error del reproductor:', e.data); },
      onStateChange: onPlayerStateChange
    }
  });
}

if (window.YT && window.YT.Player) {
  initPlayer();
} else {
  window.onYouTubeIframeAPIReady = initPlayer;
}

if (location.protocol === 'file:') {
  console.warn('[audio] Estás abriendo index.html directo (file://). YouTube bloquea la reproducción embebida ahí. Serví la página con un servidor local, p. ej. "python3 -m http.server".');
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    document.getElementById('audio-btn').classList.add('playing');
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    document.getElementById('audio-btn').classList.remove('playing');
  }
}

document.getElementById('audio-btn').addEventListener('click', function () {
  if (!player) {
    console.warn('[audio] reproductor aún no está listo');
    return;
  }
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});
