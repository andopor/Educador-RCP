// Global functions must be accessible to HTML onclick attributes
window.navigateTo = function (id) {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    // Update Nav Active State
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === id) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Show Target Section
    sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === id) {
            sec.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

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

        if (!yesBtn || !noBtn) return;

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
    resultDiv.className = 'result-display';

    if (answered === 0) {
        resultDiv.textContent = "⚠️ Por favor, responde al menos una pregunta.";
        resultDiv.style.background = "#fff3cd";
        resultDiv.style.color = "#856404";
        return;
    }

    let score = ((totalCorrect / totalQuestions) * 10) - penalty;
    score = Math.max(0, score);

    resultDiv.textContent = `Nota Final: ${score.toFixed(2)} / 10`;

    if (score >= 5) {
        resultDiv.classList.add('pass');
        resultDiv.innerHTML += "<br>🎉 ¡Aprobado! ¡Buen trabajo!";
    } else {
        resultDiv.classList.add('fail');
        resultDiv.innerHTML += "<br>🚑 Necesitas repasar. ¡Inténtalo de nuevo!";
    }
};

// Interactive Algorithm Logic
window.nextStep = function (currentStepId, nextStepId) {
    document.getElementById(currentStepId).style.display = 'none';
    document.getElementById(nextStepId).style.display = 'block';
    document.getElementById(nextStepId).classList.add('fade-in');
};

window.resetAlgorithm = function () {
    // Hide all steps
    document.querySelectorAll('.algo-step').forEach(step => {
        step.style.display = 'none';
    });
    // Show first step
    document.getElementById('step-1').style.display = 'block';
};

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('nav a');
    const logoLink = document.querySelector('.logo');

    // Attach click events to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            navigateTo(id);
        });
    });

    // Logo click to home
    if (logoLink) {
        logoLink.addEventListener('click', () => {
            navigateTo('home');
        });
    }

    // --- Metronome Logic ---
    let metroInterval;
    let isPlaying = false;
    const bpm = 110;
    const heartIcon = document.getElementById('heart-icon');
    const metroBtn = document.getElementById('metro-btn');
    let audioCtx = null; // Initialize later

    function playTone() {
        if (!audioCtx) return;
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
                metroBtn.textContent = "▶️ Iniciar Metrónomo (110 BPM)";
                metroBtn.style.background = "var(--primary)";
                heartIcon.classList.remove('beating');
                isPlaying = false;
            } else {
                // Initialize AudioContext on user gesture
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }

                metroBtn.textContent = "⏹ Detener";
                metroBtn.style.background = "var(--danger)";
                heartIcon.classList.add('beating');
                heartIcon.style.animationDuration = `${60 / bpm}s`;

                playTone();
                metroInterval = setInterval(playTone, (60 / bpm) * 1000);
                isPlaying = true;
            }
        });
    }

    // --- Evaluation Logic (Toggle Buttons) ---
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
});

