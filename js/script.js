document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const logoLink = document.querySelector('.logo');

    function navigateTo(id) {
        // Update Nav
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Show Section
        sections.forEach(sec => {
            sec.classList.remove('active');
            if (sec.id === id) {
                sec.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            navigateTo(id);
        });
    });

    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }

    // Initialize to Home
    navigateTo('home');

    // --- Metronome Logic ---
    let metroInterval;
    let isPlaying = false;
    const bpm = 110; // Average of 100-120
    const heartIcon = document.getElementById('heart-icon');
    const metroBtn = document.getElementById('metro-btn');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playTone() {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 1000;
        gain.gain.value = 0.1;
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }

    if (metroBtn) {
        metroBtn.addEventListener('click', () => {
            if (isPlaying) {
                clearInterval(metroInterval);
                metroBtn.textContent = "▶️ Iniciar Ritmo (110 BPM)";
                metroBtn.style.background = "var(--primary)";
                heartIcon.classList.remove('beating');
                isPlaying = false;
            } else {
                // Unlock audio context on user gesture
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }

                metroBtn.textContent = "⏹ Detener";
                metroBtn.style.background = "var(--danger)";
                heartIcon.classList.add('beating');
                // Set animation duration to match BPM
                heartIcon.style.animationDuration = `${60 / bpm}s`;

                playTone(); // First beat
                metroInterval = setInterval(playTone, (60 / bpm) * 1000);
                isPlaying = true;
            }
        });
    }

    // --- Evaluation Logic ---

    // Handle Toggle Buttons
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const row = this.closest('tr');
            const buttons = row.querySelectorAll('.btn-toggle');

            // Reset siblings
            buttons.forEach(b => b.classList.remove('selected'));

            // Select clicked
            this.classList.add('selected');
        });
    });

    // Calculate Functions
    window.calculateScore = function (tableId, resultId) {
        const rows = document.querySelectorAll(`#${tableId} tbody tr`);
        let totalCorrect = 0;
        let totalQuestions = 0;
        let penalty = 0;
        let answered = 0;

        rows.forEach(row => {
            // Skip subheaders
            if (row.querySelector('.subheader')) return;

            const yesBtn = row.querySelector('.btn-toggle.yes');
            const noBtn = row.querySelector('.btn-toggle.no');

            if (!yesBtn || !noBtn) return; // Safety check

            if (yesBtn.classList.contains('selected')) {
                answered++;
                totalQuestions++;
                totalCorrect++;
            } else if (noBtn.classList.contains('selected')) {
                answered++;
                totalQuestions++;
                penalty += 0.5;
            }
        });

        const resultDiv = document.getElementById(resultId);
        resultDiv.style.display = 'block';
        resultDiv.className = 'result-display'; // Reset classes

        if (answered === 0) {
            resultDiv.textContent = "⚠️ Por favor, responde al menos una pregunta.";
            resultDiv.style.background = "#fff3cd";
            resultDiv.style.color = "#856404";
            return;
        }

        let score = ((totalCorrect / totalQuestions) * 10) - penalty;
        score = Math.max(0, score); // No negative scores

        resultDiv.textContent = `Nota Final: ${score.toFixed(2)} / 10`;

        if (score >= 5) {
            resultDiv.classList.add('pass');
            resultDiv.innerHTML += "<br>🎉 ¡Aprobado! ¡Buen trabajo salvando vidas!";
        } else {
            resultDiv.classList.add('fail');
            resultDiv.innerHTML += "<br>🚑 Necesitas practicar más. ¡Inténtalo de nuevo!";
        }
    };
});
