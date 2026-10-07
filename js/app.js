import { lessons, practicalChecklist, scenario } from './content.js';
import { createQuiz, submitAnswer, nextQuestion, quizResult } from './quiz.js';
import { createAudio } from './audio.js';

const pages = [...document.querySelectorAll('.page')];
const navigation = [...document.querySelectorAll('.site-header nav a')];
const lessonNav = document.getElementById('lesson-nav');
const lessonContent = document.getElementById('lesson-content');
const scenarioContent = document.getElementById('scenario-content');
const quizContent = document.getElementById('quiz-content');
let currentLesson = 0;
let currentScenario = 'start';
let quiz = createQuiz();
const audio = createAudio({
  button: document.getElementById('metronome'),
  heart: document.getElementById('beat-heart'),
  status: document.getElementById('audio-status'),
});

// Solo se insertan datos del módulo local; escapar textos mantiene el render seguro.
function escape(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function focusHeading(container) {
  const heading = container.querySelector('h1, h2');
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}

function navigate(focus = true) {
  const requested = location.hash.slice(1);
  if (requested === 'main' && focus) {
    document.getElementById('main').focus();
    return;
  }
  const legacyRoutes = { teoria: 'aprende', algoritmo: 'practica', evaluacion: 'retos', 'test-adulto': 'retos', 'test-nino': 'retos', 'test-tecnica': 'practica' };
  const route = legacyRoutes[requested] || requested;
  const active = pages.find(page => page.id === route) || pages[0];
  if (requested && requested !== active.id) history.replaceState(null, '', `#${active.id}`);
  audio.stopAll();
  for (const page of pages) page.hidden = page !== active;
  for (const link of navigation) {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  document.title = `${active.id === 'home' ? 'Educador RCP' : navigation.find(link => link.hash === `#${active.id}`).textContent} | IES María Soliño`;
  if (focus) {
    focusHeading(active);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function renderLesson(focus = false) {
  const lesson = lessons[currentLesson];
  lessonNav.innerHTML = lessons.map((item, index) => `<button type="button" data-lesson="${index}" aria-pressed="${index === currentLesson}"><span class="lesson-number">0${index + 1}</span><span>${escape(item.title)}<small>${escape(item.subtitle)}</small></span></button>`).join('');
  lessonContent.innerHTML = `
    <div class="lesson-top"><span class="eyebrow">LECCIÓN ${currentLesson + 1} DE ${lessons.length}</span><button type="button" class="listen" data-action="listen" aria-pressed="false">Escuchar</button></div>
    <div id="lesson-reading"><h2>${escape(lesson.title)}</h2><p class="lesson-lead">${escape(lesson.lead)}</p>
    ${lesson.facts ? `<div class="fact-grid">${lesson.facts.map(([value, label]) => `<div class="fact"><strong>${escape(value)}</strong><span>${escape(label)}</span></div>`).join('')}</div>` : ''}
    <ol class="lesson-steps">${lesson.steps.map(([title, text]) => `<li><strong>${escape(title)}</strong><p>${escape(text)}</p></li>`).join('')}</ol>
    <p class="notice"><strong>Recuerda.</strong> ${escape(lesson.note)}</p>
    ${lesson.extra ? `<p class="notice warning">${escape(lesson.extra)}</p>` : ''}</div>
    <div class="lesson-bottom"><p>Aprende aquí. Practica la técnica con tu docente.</p>${currentLesson < lessons.length - 1 ? '<button type="button" class="button primary" data-action="next-lesson">Siguiente lección →</button>' : '<a class="button primary" href="#practica">Ahora, practica →</a>'}</div>`;
  if (focus) focusHeading(lessonContent);
}

function renderScenario(focus = false) {
  const step = scenario[currentScenario];
  scenarioContent.innerHTML = `<h2>${escape(step.title)}</h2><p>${escape(step.text)}</p>
    <div class="choice-list">${step.options.map(([label, target]) => `<button type="button" class="choice" data-scenario="${escape(target)}">${escape(label)} <span aria-hidden="true">→</span></button>`).join('')}</div>
    ${currentScenario !== 'start' && currentScenario !== 'done' ? '<button type="button" class="button secondary" data-scenario="start">Reiniciar simulación</button>' : ''}
    <p class="scenario-progress">Caso ficticio para aprender. En una emergencia real, llama al 112.</p>`;
  if (focus) focusHeading(scenarioContent);
}

function renderQuiz(focus = false) {
  const result = quizResult(quiz);
  if (quiz.index >= quiz.questions.length) {
    const missed = quiz.questions.filter(question => quiz.answers.some(answer => answer.id === question.id && !answer.correct));
    quizContent.innerHTML = `<span class="eyebrow">RETO COMPLETADO · ${quiz.course}.º ESO</span><h2>${result.correct === result.total ? '¡Tienes las ideas claras!' : 'Cada intento te ayuda a aprender.'}</h2>
      <div class="result-score">${result.correct} / ${result.total}</div><p>Respuestas correctas · Nota de conocimientos: ${result.score.toFixed(1)} / 10.</p>
      ${missed.length ? `<h3>Repasa estas ideas</h3><ul class="review-list">${missed.map(question => `<li>${escape(question.explanation)}</li>`).join('')}</ul>` : '<p>Ahora practica con tu docente y un maniquí.</p>'}
      <div class="button-row"><button type="button" class="button primary" data-action="restart-quiz">Volver a intentarlo</button><a class="button secondary" href="#aprende">Repasar lecciones</a></div>`;
  } else {
    const question = quiz.questions[quiz.index];
    quizContent.innerHTML = `<span class="eyebrow">PREGUNTA ${quiz.index + 1} DE ${quiz.questions.length} · ${quiz.course}.º ESO</span>
      <div class="progress-track" role="progressbar" aria-label="Preguntas respondidas" aria-valuemin="0" aria-valuemax="${quiz.questions.length}" aria-valuenow="${quiz.answers.length}"><span style="width:${quiz.answers.length / quiz.questions.length * 100}%"></span></div>
      <h2>${escape(question.prompt)}</h2><div class="choice-list">${question.options.map((option, index) => {
        let status = '';
        let label = '';
        if (quiz.feedback) {
          if (index === question.answer) { status = 'correct'; label = 'Correcta: '; }
          else if (index === quiz.answers.at(-1).answer) { status = 'incorrect'; label = 'Tu respuesta: '; }
        }
        return `<button type="button" class="choice ${status}" data-answer="${index}" ${quiz.feedback ? 'disabled' : ''}>${label}${escape(option)}</button>`;
      }).join('')}</div>
      ${quiz.feedback ? `<div class="feedback ${quiz.feedback.correct ? 'good' : 'bad'}" role="status"><strong>${quiz.feedback.correct ? '¡Bien pensado!' : 'Vamos a repasarlo.'}</strong> ${escape(quiz.feedback.explanation)}</div><button type="button" class="button primary" data-action="next-question">${quiz.index === quiz.questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta →'}</button>` : '<p class="small">Elige una respuesta. Después verás la explicación.</p>'}`;
  }
  if (focus) focusHeading(quizContent);
}

function updateChecklist() {
  const boxes = [...document.querySelectorAll('#practice-checklist input')];
  const count = boxes.filter(box => box.checked).length;
  document.getElementById('checklist-status').textContent = `${count} de ${boxes.length} aspectos practicados. Revisa la calidad de la técnica con tu docente.`;
}

document.getElementById('practice-checklist').innerHTML = practicalChecklist.map((text, index) => `<label><input type="checkbox" name="practice-${index}"><span>${escape(text)}</span></label>`).join('');

// Una única delegación para los controles que se renderizan dinámicamente.
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.lesson !== undefined) {
    audio.stopSpeech();
    currentLesson = Number(button.dataset.lesson);
    renderLesson(true);
  } else if (button.dataset.scenario) {
    if (!Object.hasOwn(scenario, button.dataset.scenario)) return;
    currentScenario = button.dataset.scenario;
    renderScenario(true);
  } else if (button.dataset.course) {
    quiz = createQuiz(Number(button.dataset.course));
    for (const item of document.querySelectorAll('[data-course]')) item.setAttribute('aria-pressed', String(item === button));
    renderQuiz(true);
  } else if (button.dataset.answer !== undefined) {
    if (submitAnswer(quiz, Number(button.dataset.answer))) {
      renderQuiz();
      quizContent.querySelector('[data-action="next-question"]').focus({ preventScroll: true });
    }
  } else {
    switch (button.dataset.action) {
      case 'listen': audio.speak(document.getElementById('lesson-reading').innerText, button); break;
      case 'next-lesson': audio.stopSpeech(); currentLesson += 1; renderLesson(true); break;
      case 'next-question': if (nextQuestion(quiz)) renderQuiz(true); break;
      case 'restart-quiz': quiz = createQuiz(quiz.course); renderQuiz(true); break;
    }
  }
});
document.getElementById('metronome').addEventListener('click', audio.toggleRhythm);
document.getElementById('practice-checklist').addEventListener('change', updateChecklist);
window.addEventListener('hashchange', () => navigate());
window.addEventListener('pagehide', audio.stopAll);
document.addEventListener('visibilitychange', () => { if (document.hidden) audio.stopAll(); });
renderLesson();
renderScenario();
renderQuiz();
updateChecklist();
navigate(false);
