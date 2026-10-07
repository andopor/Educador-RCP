// El audio solo se inicia mediante una acción del usuario y se detiene al salir.
export function createAudio({ button, heart, status }) {
  let context;
  let timer;
  let utterance;
  let speechButton;
  let nextBeat = 0;
  let starting = false;
  let generation = 0;
  const activeNodes = new Set();
  const originalStatus = status.textContent;
  const bpm = 110;

  function stopRhythm() {
    generation += 1;
    starting = false;
    clearInterval(timer);
    timer = undefined;
    for (const oscillator of activeNodes) {
      try { oscillator.stop(); } catch { /* Un oscilador terminado no necesita detenerse. */ }
    }
    activeNodes.clear();
    heart.classList.remove('beating');
    button.textContent = 'Iniciar ritmo';
    button.setAttribute('aria-pressed', 'false');
  }

  function schedule() {
    while (nextBeat < context.currentTime + 0.1) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.frequency.value = 700;
      gain.gain.setValueAtTime(0.0001, nextBeat);
      gain.gain.exponentialRampToValueAtTime(0.12, nextBeat + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, nextBeat + 0.065);
      oscillator.start(nextBeat);
      oscillator.stop(nextBeat + 0.07);
      activeNodes.add(oscillator);
      oscillator.onended = () => {
        activeNodes.delete(oscillator);
        oscillator.disconnect();
        gain.disconnect();
      };
      nextBeat += 60 / bpm;
    }
  }

  async function toggleRhythm() {
    if (timer !== undefined || starting) { stopRhythm(); return; }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) { status.textContent = 'Este navegador no permite reproducir el metrónomo.'; return; }
    stopSpeech();
    starting = true;
    const ticket = ++generation;
    try {
      context ||= new AudioContext();
      await context.resume();
      if (ticket !== generation) return;
      if (document.hidden || document.getElementById('practica').hidden) { stopRhythm(); return; }
      status.textContent = originalStatus;
      nextBeat = context.currentTime;
      schedule();
      timer = setInterval(schedule, 25);
      heart.classList.add('beating');
      button.textContent = 'Detener ritmo';
      button.setAttribute('aria-pressed', 'true');
    } catch {
      stopRhythm();
      status.textContent = 'No se ha podido iniciar el audio. Puedes practicar el ritmo con tu docente.';
    } finally {
      if (ticket === generation) starting = false;
    }
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (speechButton) {
      speechButton.textContent = 'Escuchar';
      speechButton.setAttribute('aria-pressed', 'false');
    }
    speechButton = undefined;
    utterance = undefined;
  }

  function speak(text, target) {
    if (!('speechSynthesis' in window)) {
      target.textContent = 'Audio no disponible';
      target.disabled = true;
      return;
    }
    const sameButton = speechButton === target;
    stopSpeech();
    if (sameButton) return;
    stopRhythm();
    const current = new SpeechSynthesisUtterance(text);
    utterance = current;
    speechButton = target;
    current.lang = 'es-ES';
    current.rate = 0.92;
    target.textContent = 'Detener lectura';
    target.setAttribute('aria-pressed', 'true');
    const finish = () => { if (utterance === current) stopSpeech(); };
    current.onend = finish;
    current.onerror = finish;
    window.speechSynthesis.speak(current);
  }

  function stopAll() { stopRhythm(); stopSpeech(); }
  return { toggleRhythm, speak, stopAll, stopSpeech };
}
