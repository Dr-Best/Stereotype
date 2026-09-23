import type { ReactNode } from 'react';

interface KeySentenceProps {
  children: ReactNode;
  /** "formula" für Merkformeln, "note" für „Nicht jeder …“-Merksätze */
  variant?: 'formula' | 'note';
}

/** Hervorgehobener didaktischer Merksatz. */
export function KeySentence({ children, variant = 'formula' }: KeySentenceProps) {
  return (
    <aside className={`key-sentence key-sentence--${variant}`} aria-label="Merksatz">
      <span className="key-sentence__label" aria-hidden="true">
        Merksatz
      </span>
      <p className="key-sentence__text">{children}</p>
    </aside>
  );
}
