/** Kennungen der zentralen Begriffe. */
export type TermId =
  | 'stereotyp'
  | 'vorurteil'
  | 'bias'
  | 'conscious-bias'
  | 'unconscious-bias'
  | 'diskriminierung';

/** Ein erläuternder Abschnitt innerhalb einer Begriffsdetailansicht. */
export interface TermSection {
  heading: string;
  /** Fließtext-Absätze */
  paragraphs?: string[];
  /** Aufzählungspunkte */
  bullets?: string[];
  /** Nummerierte Punkte mit Titel und Erklärung */
  items?: { title: string; text: string }[];
}

/** Gruppe von Beispielsätzen, optional mit Hinweis, dass es sich um Beispiele handelt. */
export interface ExampleGroup {
  heading: string;
  examples: string[];
  /** Hinweis, dass die Aussagen Beispiele und keine Tatsachen/Positionen der App sind. */
  disclaimer?: string;
}

/** Stereotyp → Vorurteil Veranschaulichung */
export interface Contrast {
  leftLabel: string;
  left: string;
  rightLabel: string;
  right: string;
}

export interface Term {
  id: TermId;
  name: string;
  /** Kurzer Untertitel, z. B. deutsche Übersetzung */
  subtitle: string;
  /** Kurzbeschreibung für Übersichtskarten */
  teaser: string;
  definition: string;
  /** Merkformel, z. B. „Stereotyp = pauschale Zuschreibung“ */
  formula: string;
  /** Leitfrage für die Vergleichstabelle */
  keyQuestion: string;
  /** Kurzes Beispiel für die Vergleichstabelle */
  tableExample: string;
  sections: TermSection[];
  contrast?: Contrast;
  exampleGroups: ExampleGroup[];
  /** Zusätzliche hervorgehobene Merksätze */
  keySentences?: string[];
  /** Weitere Suchbegriffe */
  keywords: string[];
}

export interface DiscriminationForm {
  id: string;
  name: string;
  definition: string;
  example: string;
  note?: string;
}

export interface ConceptCard {
  id: string;
  name: string;
  definition: string;
  example: string;
  clarification: string;
}

/** Kategorien, denen Beispiele zugeordnet werden. */
export type ExampleCategory =
  | 'stereotyp'
  | 'vorurteil'
  | 'conscious-bias'
  | 'unconscious-bias'
  | 'kognitiver-bias'
  | 'diskriminierung';

export interface EverydayExample {
  id: string;
  situation: string;
  category: ExampleCategory;
  /** Präzisere Bezeichnung, z. B. „Anchoring Bias“ */
  label: string;
  explanation: string;
  /** Hinweis auf weitere beteiligte Konzepte */
  overlap?: string;
}

/** Antwortkategorien im Quiz. */
export type QuizAnswer =
  | 'stereotyp'
  | 'vorurteil'
  | 'conscious-bias'
  | 'unconscious-bias'
  | 'kognitiver-bias';

export type Difficulty = 'leicht' | 'mittel' | 'schwer';

export interface QuizQuestion {
  id: string;
  difficulty: Difficulty;
  situation: string;
  /** Optionale Leitfrage, z. B. „Was steht im Mittelpunkt?“ */
  prompt?: string;
  correct: QuizAnswer;
  explanation: string;
  /** Ein Satz zur Abgrenzung vom ähnlichsten Begriff */
  distinction: string;
}

export interface AnswerRecord {
  questionId: string;
  given: QuizAnswer;
  correct: QuizAnswer;
  isCorrect: boolean;
}

export interface StoredResult {
  difficulty: Difficulty;
  correct: number;
  total: number;
  percent: number;
  date: string;
}
