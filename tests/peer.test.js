import test from 'node:test';
import assert from 'node:assert/strict';
import { rubrics, peerResult } from '../js/peer.js';

for (const rubric of rubrics) {
  test(`${rubric.id}: todos Sí = 10, todos No = 0 y nota proporcional`, () => {
    const answers = value => Object.fromEntries(rubric.criteria.map((_, index) => [index, value]));
    assert.equal(peerResult(rubric.criteria, answers(true)).score, 10);
    assert.equal(peerResult(rubric.criteria, answers(false)).score, 0);
    const mixed = answers(false);
    mixed[0] = true;
    const result = peerResult(rubric.criteria, mixed);
    assert.ok(Math.abs(result.score - 10 / rubric.criteria.length) < 1e-10);
    assert.equal(result.improve.length, rubric.criteria.length - 1);
  });
}

test('no se calcula nota hasta responder todos; No cuenta como respuesta', () => {
  const criteria = ['A', 'B', 'C'];
  const result = peerResult(criteria, {0: false, 2: true});
  assert.equal(result.complete, false);
  assert.equal(result.score, null);
  assert.equal(result.answered, 2);
  assert.deepEqual(result.missing, [1]);
  assert.equal(peerResult(criteria, {}).score, null);
  assert.equal(peerResult([], {}).complete, false);
});
