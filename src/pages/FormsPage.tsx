import { useId, useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { KeySentence } from '../components/KeySentence';
import { discriminationForms, intersectionality } from '../data/discriminationForms';

export function FormsPage() {
  const [query, setQuery] = useState('');
  const searchId = useId();
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('de');
    if (!q) return discriminationForms;
    return discriminationForms.filter((f) =>
      [f.name, f.definition, f.example, f.note ?? ''].join(' ').toLocaleLowerCase('de').includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Bereich 3"
        title="Diskriminierungsformen"
        intro={
          <p>
            Häufige Formen bzw. Dimensionen von Diskriminierung – jeweils mit kurzer Definition und einem neutral
            beschriebenen Beispiel.
          </p>
        }
      />

      <KeySentence>„Diskriminierung = Benachteiligung im Handeln oder in Strukturen“</KeySentence>

      <div className="search">
        <label htmlFor={searchId} className="search__label">
          Formen durchsuchen
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
            placeholder="z. B. Alter, Sprache, Aussehen …"
            autoComplete="off"
          />
        </div>
        <p className="search__status" role="status" aria-live="polite">
          {query.trim() ? `${filtered.length} ${filtered.length === 1 ? 'Form' : 'Formen'} gefunden` : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">Keine passende Form gefunden.</p>
      ) : (
        <ul className="card-grid card-grid--3">
          {filtered.map((form) => (
            <li key={form.id} className="card form-card">
              <h2 className="form-card__name">{form.name}</h2>
              <p className="form-card__definition">{form.definition}</p>
              <div className="form-card__example">
                <p className="form-card__example-label">Beispiel</p>
                <p>{form.example}</p>
              </div>
              {form.note && <p className="form-card__note">{form.note}</p>}
            </li>
          ))}
        </ul>
      )}

      <section className="section card concept-card" aria-labelledby="intersectionality-title">
        <p className="eyebrow">Konzept</p>
        <h2 id="intersectionality-title">{intersectionality.name}</h2>
        <p className="concept-card__definition">{intersectionality.definition}</p>
        <div className="form-card__example">
          <p className="form-card__example-label">Beispiel</p>
          <p>{intersectionality.example}</p>
        </div>
        <p className="concept-card__clarification">
          <strong>Wichtig:</strong> {intersectionality.clarification}
        </p>
      </section>
    </>
  );
}
