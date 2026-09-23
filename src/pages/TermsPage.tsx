import { useId, useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { KeySentence } from '../components/KeySentence';
import { terms } from '../data/terms';
import { href } from '../hooks/useHashRoute';
import type { Term } from '../types';

function normalize(text: string): string {
  return text.toLocaleLowerCase('de').normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function matches(term: Term, query: string): boolean {
  const haystack = [
    term.name,
    term.subtitle,
    term.definition,
    term.formula,
    ...term.keywords,
    ...term.sections.flatMap((s) => [s.heading, ...(s.bullets ?? []), ...(s.items ?? []).map((i) => i.title)]),
  ].join(' ');
  return normalize(haystack).includes(normalize(query.trim()));
}

export function TermsPage() {
  const [query, setQuery] = useState('');
  const searchId = useId();
  const filtered = useMemo(() => (query.trim() ? terms.filter((t) => matches(t, query)) : terms), [query]);

  return (
    <>
      <PageHeader
        eyebrow="Bereich 1"
        title="Begriffe verstehen"
        intro={<p>Sechs Begriffe, die oft verwechselt werden. Wähle eine Karte, um Definition, Merkformel und Beispiele zu sehen.</p>}
      />

      <div className="search">
        <label htmlFor={searchId} className="search__label">
          Begriffe durchsuchen
        </label>
        <div className="search__field">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" className="search__icon">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="z. B. Ankereffekt, bewusst, Bewertung …"
            autoComplete="off"
          />
        </div>
        <p className="search__status" role="status" aria-live="polite">
          {query.trim() ? `${filtered.length} ${filtered.length === 1 ? 'Begriff' : 'Begriffe'} gefunden` : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">Kein Begriff gefunden. Versuche es mit einem anderen Suchwort.</p>
      ) : (
        <ul className="card-grid card-grid--3">
          {filtered.map((term) => (
            <li key={term.id}>
              <a className={`card card--link term-card term-card--${term.id}`} href={href('begriffe', term.id)}>
                <p className="term-card__subtitle">{term.subtitle}</p>
                <h2 className="term-card__name">{term.name}</h2>
                <p className="term-card__teaser">{term.teaser}</p>
                <p className="term-card__formula">„{term.formula}“</p>
                <span className="card__more" aria-hidden="true">
                  Details ansehen →
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="stack section">
        <KeySentence variant="note">Nicht jeder Bias ist ein Vorurteil.</KeySentence>
      </div>
    </>
  );
}
