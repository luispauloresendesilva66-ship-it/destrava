import { retakeCooldownMs } from './plans.js';

export const PASS_PERCENT = 90;

// Fisher-Yates over a copy; never mutates the bank. random() must return [0, 1).
export function drawQuestions(bank, count, random = Math.random) {
  if (bank.length < count) throw new Error('Question bank too small');
  const pool = bank.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function scoreAttempt({ questions, results }) {
  const total = questions.length;
  const wrong = questions.filter((q) => results[q.id] !== true);
  const correct = total - wrong.length;
  const percent = total === 0 ? 0 : Math.floor((correct * 100) / total);
  // Integer comparison, no rounding: 89.5% must not pass. An empty exam never passes.
  const passed = total > 0 && correct * 100 >= PASS_PERCENT * total;
  const wrongTopics = [...new Set(wrong.map((q) => q.topic))].sort();
  return { correct, total, percent, passed, wrongTopics };
}

export function nextAttemptAt({ lastSubmittedAt, plan }) {
  const cooldown = retakeCooldownMs(plan);
  if (lastSubmittedAt === null || lastSubmittedAt === undefined || cooldown === 0) return null;
  return new Date(lastSubmittedAt.getTime() + cooldown);
}
