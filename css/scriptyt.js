  function sendCommand(command) {
    const iframe = document.getElementById('ytPlayer');
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: []
      }),
      "*"
    );
  }

  function playAudio() {
    sendCommand("playVideo");
    document.getElementById('playBtn').classList.add('hidden');
    document.getElementById('pauseBtn').classList.remove('hidden');
    document.getElementById('status').textContent = "🎶 Sedang diputar";
  }

  function pauseAudio() {
    sendCommand("pauseVideo");
    document.getElementById('pauseBtn').classList.add('hidden');
    document.getElementById('playBtn').classList.remove('hidden');
    document.getElementById('status').textContent = "⏸️ Audio dijeda";
  }