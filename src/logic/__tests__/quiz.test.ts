import { describe, expect, it } from 'vitest';
import { answersForDifficulty, quizQuestions } from '../../data/quizQuestions';
import { examples } from '../../data/examples';
import { terms } from '../../data/terms';
import { discriminationForms } from '../../data/discriminationForms';
import { quizReducer, type QuizState } from '../../hooks/useQuiz';
import {
  buildFeedback,
  createRetryRound,
  createRound,
  evaluateAnswer,
  QUESTIONS_PER_ROUND,
  scoreOf,
  shuffle,
} from '../quiz';
import type { AnswerRecord, Difficulty } from '../../types';

/** Deterministischer Zufallsgenerator für reproduzierbare Tests */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

describe('Inhalte', () => {
  it('enthält mindestens 50 Quizfragen mit eindeutigen IDs', () => {
    expect(quizQuestions.length).toBeGreaterThanOrEqual(50);
    expect(new Set(quizQuestions.map((q) => q.id)).size).toBe(quizQuestions.length);
  });

  it('hat pro Schwierigkeitsgrad genug Fragen für eine volle Runde', () => {
    for (const d of ['leicht', 'mittel', 'schwer'] as Difficulty[]) {
      expect(quizQuestions.filter((q) => q.difficulty === d).length).toBeGreaterThanOrEqual(QUESTIONS_PER_ROUND);
    }
  });

  it('verwendet nur Antworten, die im jeweiligen Schwierigkeitsgrad angeboten werden', () => {
    for (const q of quizQuestions) {
      expect(answersForDifficulty[q.difficulty]).toContain(q.correct);
      expect(q.explanation.length).toBeGreaterThan(10);
      expect(q.distinction.length).toBeGreaterThan(10);
    }
  });

  it('nutzt jede primäre Kategorie in jedem Schwierigkeitsgrad', () => {
    for (const d of ['leicht', 'mittel', 'schwer'] as Difficulty[]) {
      const used = new Set(quizQuestions.filter((q) => q.difficulty === d).map((q) => q.correct));
      for (const a of ['stereotyp', 'vorurteil', 'conscious-bias', 'unconscious-bias'] as const) {
        expect(used.has(a)).toBe(true);
      }
    }
  });

  it('enthält mindestens 30 Beispiele, sechs Begriffe und alle Diskriminierungsformen', () => {
    expect(examples.length).toBeGreaterThanOrEqual(30);
    expect(new Set(examples.map((e) => e.id)).size).toBe(examples.length);
    expect(terms).toHaveLength(6);
    expect(discriminationForms.length).toBeGreaterThanOrEqual(16);
  });
});

describe('Quizlogik', () => {
  it('shuffle verändert die Eingabe nicht und behält alle Elemente', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input, seeded(1));
    expect(input).toEqual([1, 2, 3, 4, 5]);
    expect([...result].sort()).toEqual(input);
  });

  it('createRound liefert 10 verschiedene Fragen des gewählten Grads', () => {
    for (let seed = 0; seed < 20; seed++) {
      const round = createRound(quizQuestions, 'mittel', QUESTIONS_PER_ROUND, seeded(seed));
      expect(round).toHaveLength(QUESTIONS_PER_ROUND);
      expect(new Set(round.map((q) => q.id)).size).toBe(QUESTIONS_PER_ROUND);
      expect(round.every((q) => q.difficulty === 'mittel')).toBe(true);
    }
  });

  it('evaluateAnswer und scoreOf berechnen Punkte und Prozent', () => {
    const [a, b, c] = quizQuestions;
    const records = [
      evaluateAnswer(a, a.correct),
      evaluateAnswer(b, b.correct === 'stereotyp' ? 'vorurteil' : 'stereotyp'),
      evaluateAnswer(c, c.correct),
    ];
    expect(records.map((r) => r.isCorrect)).toEqual([true, false, true]);
    expect(scoreOf(records)).toEqual({ correct: 2, total: 3, percent: 67 });
    expect(scoreOf([])).toEqual({ correct: 0, total: 0, percent: 0 });
  });

  it('createRetryRound enthält genau die falsch beantworteten Fragen', () => {
    const round = createRound(quizQuestions, 'leicht', 10, seeded(3));
    const records: AnswerRecord[] = round.map((q, i) =>
      evaluateAnswer(q, i % 3 === 0 ? q.correct : q.correct === 'stereotyp' ? 'vorurteil' : 'stereotyp'),
    );
    const wrongIds = records.filter((r) => !r.isCorrect).map((r) => r.questionId).sort();
    const retry = createRetryRound(quizQuestions, records, seeded(4));
    expect(retry.map((q) => q.id).sort()).toEqual(wrongIds);
  });

  it('buildFeedback gibt gezielte Hinweise bei Verwechslung von Conscious und Unconscious Bias', () => {
    const conscious = quizQuestions.find((q) => q.correct === 'conscious-bias')!;
    const stereo = quizQuestions.find((q) => q.correct === 'stereotyp')!;
    const lines = buildFeedback([evaluateAnswer(conscious, 'unconscious-bias'), evaluateAnswer(stereo, 'stereotyp')]);
    expect(lines[0]).toContain('Stereotyp');
    expect(lines.join(' ')).toContain('bewusst');
  });
});

describe('Quiz-Reducer', () => {
  const base: QuizState = {
    phase: 'start',
    difficulty: 'leicht',
    questions: [],
    index: 0,
    records: [],
    current: null,
    isRetry: false,
  };

  it('durchläuft eine Runde bis zur Auswertung und ignoriert Doppelantworten', () => {
    const questions = createRound(quizQuestions, 'schwer', 3, seeded(9));
    let state = quizReducer(base, { type: 'start', difficulty: 'schwer', questions });
    expect(state.phase).toBe('question');

    for (let i = 0; i < 3; i++) {
      state = quizReducer(state, { type: 'answer', given: questions[i].correct });
      state = quizReducer(state, { type: 'answer', given: 'stereotyp' }); // zweite Antwort wird ignoriert
      expect(state.records).toHaveLength(i + 1);
      state = quizReducer(state, { type: 'next' });
    }
    expect(state.phase).toBe('result');
    expect(scoreOf(state.records).percent).toBe(100);
  });

  it('"next" ohne Antwort hat keine Wirkung, leere Runden starten nicht', () => {
    expect(quizReducer(base, { type: 'start', difficulty: 'leicht', questions: [] })).toBe(base);
    const started = quizReducer(base, { type: 'start', difficulty: 'leicht', questions: quizQuestions.slice(0, 2) });
    expect(quizReducer(started, { type: 'next' })).toBe(started);
  });
});
