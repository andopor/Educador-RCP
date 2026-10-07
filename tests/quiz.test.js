import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuiz, submitAnswer, nextQuestion, quizResult } from '../js/quiz.js';
import { lessons, scenario, questions } from '../js/content.js';

function completeQuiz(course, choose) {
  const state = createQuiz(course);
  while (state.index < state.questions.length) {
    const question = state.questions[state.index];
    assert.equal(submitAnswer(state, choose(question)), true);
    assert.equal(nextQuestion(state), true);
  }
  return state;
}

test('todas las respuestas incorrectas dan 0, en ambos cursos', () => {
  for (const course of [1, 2]) {
    const result = quizResult(completeQuiz(course, question => (question.answer + 1) % question.options.length));
    assert.equal(result.score, 0);
    assert.equal(result.correct, 0);
    assert.equal(result.complete, true);
  }
});

test('todas las respuestas correctas dan 10 y la nota parcial es proporcional', () => {
  const state = completeQuiz(1, question => question.answer);
  assert.equal(quizResult(state).score, 10);
  const partial = createQuiz(1);
  submitAnswer(partial, partial.questions[0].answer);
  assert.equal(quizResult(partial).complete, false);
  assert.ok(Math.abs(quizResult(partial).score - 10 / partial.questions.length) < 1e-10);
});

test('no se puede avanzar sin responder ni contar dos veces una respuesta', () => {
  const state = createQuiz();
  assert.equal(nextQuestion(state), false);
  assert.equal(submitAnswer(state, -1), false);
  assert.equal(submitAnswer(state, 100), false);
  assert.equal(submitAnswer(state, 0.5), false);
  assert.equal(submitAnswer(state, state.questions[0].answer), true);
  assert.equal(submitAnswer(state, state.questions[0].answer), false);
  assert.equal(state.answers.length, 1);
});

test('2.º incorpora decisiones pediátricas; cambiar de curso reinicia el intento', () => {
  const first = createQuiz(1);
  assert.ok(first.questions.every(question => question.level === 1));
  const second = createQuiz(2);
  assert.ok(second.questions.some(question => question.id === 'child-call'));
  assert.ok(second.questions.some(question => question.id === 'child-depth'));
  submitAnswer(second, 0);
  assert.equal(createQuiz(2).answers.length, 0);
  assert.equal(first.answers.length, 0);
});

test('el recorrido a RCP siempre pasa por llamada temprana al 112', () => {
  const visited = new Set();
  function visit(id, called) {
    if (id === 'cpr') assert.equal(called, true);
    const key = `${id}:${called}`;
    if (visited.has(key)) return;
    visited.add(key);
    for (const [, target] of scenario[id].options) {
      assert.ok(scenario[target], `Destino inexistente: ${target}`);
      visit(target, called || id === 'call');
    }
  }
  visit('start', false);
  assert.ok(visited.has('cpr:true'));
});

test('lecciones y preguntas tienen identificadores únicos y respuestas válidas', () => {
  assert.equal(new Set(lessons.map(lesson => lesson.id)).size, lessons.length);
  assert.equal(new Set(questions.map(question => question.id)).size, questions.length);
  for (const question of questions) {
    assert.ok(question.options[question.answer]);
    assert.ok(question.explanation);
  }
});
