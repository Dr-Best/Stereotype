import type { AnswerRecord, Difficulty, QuizAnswer, QuizQuestion, StoredResult } from '../types';
import { answerLabels } from '../data/quizQuestions';

export const QUESTIONS_PER_ROUND = 10;

/** Fisher-Yates-Shuffle; gibt eine neue Liste zurück. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Wählt zufällig bis zu `count` verschiedene Fragen eines Schwierigkeitsgrads aus.
 * Innerhalb einer Runde gibt es keine Wiederholungen.
 */
export function createRound(
  pool: readonly QuizQuestion[],
  difficulty: Difficulty,
  count: number = QUESTIONS_PER_ROUND,
  random: () => number = Math.random,
): QuizQuestion[] {
  const candidates = pool.filter((question) => question.difficulty === difficulty);
  return shuffle(candidates, random).slice(0, count);
}

/** Erstellt eine Wiederholungsrunde aus den falsch beantworteten Fragen. */
export function createRetryRound(
  pool: readonly QuizQuestion[],
  records: readonly AnswerRecord[],
  random: () => number = Math.random,
): QuizQuestion[] {
  const wrongIds = new Set(records.filter((r) => !r.isCorrect).map((r) => r.questionId));
  return shuffle(
    pool.filter((question) => wrongIds.has(question.id)),
    random,
  );
}

export function evaluateAnswer(question: QuizQuestion, given: QuizAnswer): AnswerRecord {
  return {
    questionId: question.id,
    given,
    correct: question.correct,
    isCorrect: given === question.correct,
  };
}

export function scoreOf(records: readonly AnswerRecord[]): { correct: number; total: number; percent: number } {
  const correct = records.filter((r) => r.isCorrect).length;
  const total = records.length;
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percent };
}

interface CategoryStat {
  category: QuizAnswer;
  asked: number;
  correct: number;
}

/** Trefferquote je richtiger Kategorie. */
export function statsByCategory(records: readonly AnswerRecord[]): CategoryStat[] {
  const map = new Map<QuizAnswer, CategoryStat>();
  for (const record of records) {
    const stat = map.get(record.correct) ?? { category: record.correct, asked: 0, correct: 0 };
    stat.asked += 1;
    if (record.isCorrect) stat.correct += 1;
    map.set(record.correct, stat);
  }
  return [...map.values()];
}

/** Zählt, welche Verwechslungen (richtig → gegeben) am häufigsten vorkamen. */
function confusions(records: readonly AnswerRecord[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const record of records) {
    if (record.isCorrect) continue;
    const key = [record.correct, record.given].sort().join('|');
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

const pairAdvice: Record<string, string> = {
  'conscious-bias|unconscious-bias':
    'Bei Conscious und Unconscious Bias lohnt sich noch ein Blick auf die Frage, ob der handelnden Person ihre Voreingenommenheit bewusst ist.',
  'stereotyp|vorurteil':
    'Bei Stereotyp und Vorurteil hilft die Frage: Wird nur einer Gruppe etwas zugeschrieben – oder wird eine Person bzw. Gruppe bereits bewertet?',
  'conscious-bias|vorurteil':
    'Bei Vorurteil und Conscious Bias hilft die Frage: Geht es um die Bewertung selbst – oder darum, dass jemand seine Voreingenommenheit kennt und bewusst danach entscheidet?',
  'conscious-bias|stereotyp':
    'Bei Stereotyp und Conscious Bias hilft die Frage: Bleibt es bei einer Zuschreibung – oder wird daraus eine bewusste Präferenz in einer Entscheidung?',
  'stereotyp|unconscious-bias':
    'Bei Stereotyp und Unconscious Bias hilft die Frage: Wird nur etwas zugeschrieben – oder verzerrt etwas unbemerkt Wahrnehmung oder Entscheidung?',
  'unconscious-bias|vorurteil':
    'Bei Vorurteil und Unconscious Bias hilft die Frage: Wird eine Bewertung ausdrücklich formuliert – oder wirkt die Verzerrung automatisch und unbemerkt?',
  'kognitiver-bias|unconscious-bias':
    'Bei kognitiven Biases hilft die Frage: Geht es überhaupt um eine soziale Gruppe? Wenn nicht, ist kein Vorurteil beteiligt.',
  'conscious-bias|kognitiver-bias':
    'Bei kognitiven Biases hilft die Frage: Geht es überhaupt um eine soziale Gruppe? Wenn nicht, ist kein Vorurteil beteiligt.',
  'kognitiver-bias|stereotyp':
    'Kognitive Biases wie Ankereffekt oder Bestätigungsfehler beziehen sich nicht auf Gruppen – Stereotype schon.',
  'kognitiver-bias|vorurteil':
    'Kognitive Biases wie Ankereffekt oder Bestätigungsfehler beziehen sich nicht auf Gruppen – Vorurteile schon.',
};

/** Erzeugt eine kurze, nicht wertende individuelle Auswertung. */
export function buildFeedback(records: readonly AnswerRecord[]): string[] {
  if (records.length === 0) return [];
  const { percent } = scoreOf(records);
  const stats = statsByCategory(records);
  const lines: string[] = [];

  const strong = stats.filter((s) => s.asked >= 1 && s.correct === s.asked).map((s) => answerLabels[s.category]);
  const weak = stats.filter((s) => s.correct < s.asked);

  if (percent === 100) {
    lines.push('Du hast alle Situationen richtig eingeordnet und unterscheidest die Begriffe bereits sehr sicher.');
  } else if (strong.length > 0) {
    lines.push(`Du erkennst ${joinGerman(strong)} bereits sehr sicher.`);
  } else if (percent >= 50) {
    lines.push('Du hast schon ein gutes Gespür für die Begriffe entwickelt.');
  } else {
    lines.push('Die Begriffe liegen nah beieinander – mit etwas Übung werden die Unterschiede schnell klarer.');
  }

  const sortedConfusions = [...confusions(records).entries()].sort((a, b) => b[1] - a[1]);
  const advice = new Set<string>();
  for (const [key] of sortedConfusions) {
    const text = pairAdvice[key];
    if (text) advice.add(text);
    if (advice.size >= 2) break;
  }
  lines.push(...advice);

  if (advice.size === 0 && weak.length > 0) {
    lines.push(
      `Bei ${joinGerman(weak.map((w) => answerLabels[w.category]))} lohnt sich ein zweiter Blick in den Bereich „Begriffe verstehen“.`,
    );
  }
  return lines;
}

export function joinGerman(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`;
}

// ---------------------------------------------------------------------------
// Lokale Speicherung des letzten Ergebnisses
// ---------------------------------------------------------------------------
const STORAGE_KEY = 'stereotype-app:last-result';

export function saveResult(result: StoredResult): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // Speicher nicht verfügbar – Ergebnis wird dann einfach nicht gespeichert.
  }
}

export function loadResult(): StoredResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredResult;
    return typeof parsed.percent === 'number' ? parsed : null;
  } catch {
    return null;
  }
}
