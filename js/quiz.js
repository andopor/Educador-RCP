import { questions } from './content.js';

export function createQuiz(course = 1) {
  const selected = course === 2 ? questions : questions.filter(question => question.level === 1);
  return { course, questions: selected, index: 0, answers: [], feedback: null };
}

export function submitAnswer(state, answer) {
  if (state.feedback || state.index >= state.questions.length) return false;
  const question = state.questions[state.index];
  if (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length) return false;
  const correct = answer === question.answer;
  state.answers.push({ id: question.id, answer, correct });
  state.feedback = { correct, explanation: question.explanation };
  return true;
}

export function nextQuestion(state) {
  if (!state.feedback) return false;
  state.index += 1;
  state.feedback = null;
  return true;
}

export function quizResult(state) {
  const correct = state.answers.filter(answer => answer.correct).length;
  const total = state.questions.length;
  return { correct, total, score: total ? correct / total * 10 : 0, complete: state.answers.length === total };
}
