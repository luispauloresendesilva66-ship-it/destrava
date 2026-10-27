import { describe, it, expect } from 'vitest';
import { PASS_PERCENT, drawQuestions, scoreAttempt, nextAttemptAt } from './exam.js';

const bank = (n) => Array.from({ length: n }, (_, i) => ({ id: `q${i}` }));
const make = (total, correct, topic = 't') => {
  const questions = Array.from({ length: total }, (_, i) => ({ id: `q${i}`, topic }));
  const results = {};
  questions.forEach((q, i) => { results[q.id] = i < correct; });
  return { questions, results };
};

describe('drawQuestions', () => {
  it('draws unique ids from the bank', () => {
    const b = bank(60);
    const out = drawQuestions(b, 20);
    expect(out).toHaveLength(20);
    expect(new Set(out.map((q) => q.id)).size).toBe(20);
    const ids = new Set(b.map((q) => q.id));
    out.forEach((q) => expect(ids.has(q.id)).toBe(true));
  });
  it('is deterministic with injected random and does not mutate the bank', () => {
    const b = bank(60);
    const snapshot = b.map((q) => q.id);
    const a = drawQuestions(b, 20, () => 0).map((q) => q.id);
    const c = drawQuestions(b, 20, () => 0).map((q) => q.id);
    expect(a).toEqual(c);
    expect(b.map((q) => q.id)).toEqual(snapshot);
  });
  it('throws when bank too small', () => {
    expect(() => drawQuestions(bank(5), 20)).toThrow('Question bank too small');
  });
});

describe('scoreAttempt boundary', () => {
  it('PASS_PERCENT is 90', () => expect(PASS_PERCENT).toBe(90));
  it('27/30 passes', () => {
    expect(scoreAttempt(make(30, 27))).toMatchObject({ correct: 27, total: 30, percent: 90, passed: true });
  });
  it('26/30 fails', () => {
    expect(scoreAttempt(make(30, 26))).toMatchObject({ percent: 86, passed: false });
  });
  it('179/200 (89.5%) fails without rounding', () => {
    expect(scoreAttempt(make(200, 179))).toMatchObject({ percent: 89, passed: false });
  });
  it('20/20 passes', () => {
    expect(scoreAttempt(make(20, 20))).toMatchObject({ percent: 100, passed: true });
  });
  it('missing result counts as wrong', () => {
    const { questions } = make(10, 10);
    const r = scoreAttempt({ questions, results: {} });
    expect(r).toMatchObject({ correct: 0, passed: false });
  });
  it('wrongTopics are unique and sorted', () => {
    const questions = [
      { id: 'a', topic: 'css' }, { id: 'b', topic: 'html' }, { id: 'c', topic: 'css' }, { id: 'd', topic: 'js' },
    ];
    const r = scoreAttempt({ questions, results: { a: false, b: false, c: false, d: true } });
    expect(r.wrongTopics).toEqual(['css', 'html']);
  });
});

describe('nextAttemptAt', () => {
  const last = new Date('2026-10-27T10:00:00Z');
  it('free waits 24h', () => {
    expect(nextAttemptAt({ lastSubmittedAt: last, plan: 'free' }).toISOString()).toBe('2026-10-28T10:00:00.000Z');
  });
  it('gold waits 2h', () => {
    expect(nextAttemptAt({ lastSubmittedAt: last, plan: 'gold' }).toISOString()).toBe('2026-10-27T12:00:00.000Z');
  });
  it('platinum has no cooldown', () => {
    expect(nextAttemptAt({ lastSubmittedAt: last, plan: 'platinum' })).toBeNull();
  });
  it('no previous attempt', () => {
    expect(nextAttemptAt({ lastSubmittedAt: null, plan: 'free' })).toBeNull();
  });
});
