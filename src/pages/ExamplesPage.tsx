import { useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Disclaimer } from '../components/Disclaimer';
import { categoryLabels, examples } from '../data/examples';
import type { ExampleCategory } from '../types';

type Filter = ExampleCategory | 'alle';

const filterOrder: Filter[] = [
  'alle',
  'stereotyp',
  'vorurteil',
  'conscious-bias',
  'unconscious-bias',
  'kognitiver-bias',
  'diskriminierung',
];

export function ExamplesPage() {
  const [filter, setFilter] = useState<Filter>('alle');
  const [revealAll, setRevealAll] = useState(true);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['alle', examples.length]]);
    for (const ex of examples) map.set(ex.category, (map.get(ex.category) ?? 0) + 1);
    return map;
  }, []);

  const visible = filter === 'alle' ? examples : examples.filter((ex) => ex.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Bereich 4"
        title="Beispiele"
        intro={
          <p>
            {examples.length} kurze Alltagssituationen mit möglicher Kategorie und Erklärung. Oft sind mehrere Konzepte
            gleichzeitig beteiligt – die Kategorie zeigt, was im Mittelpunkt steht.
          </p>
        }
      />

      <Disclaimer>
        Alle Aussagen in Anführungszeichen sind Beispiele für Denkmuster – keine Tatsachen und keine Positionen dieser
        App.
      </Disclaimer>

      <div className="toolbar">
        <fieldset className="filter-group">
          <legend className="filter-group__legend">Nach Kategorie filtern</legend>
          <div className="filter-group__chips">
            {filterOrder.map((f) => (
              <label key={f} className={`chip${filter === f ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="example-filter"
                  value={f}
                  checked={filter === f}
                  onChange={() => setFilter(f)}
                  className="visually-hidden"
                />
                {f === 'alle' ? 'Alle' : categoryLabels[f]}
                <span className="chip__count" aria-label={`${counts.get(f) ?? 0} Beispiele`}>
                  {counts.get(f) ?? 0}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="switch">
          <input type="checkbox" checked={!revealAll} onChange={(e) => setRevealAll(!e.target.checked)} />
          <span className="switch__track" aria-hidden="true" />
          <span>Übungsmodus: Kategorie erst auf Klick zeigen</span>
        </label>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {visible.length} Beispiele angezeigt
      </p>

      <ul className="card-grid card-grid--2 examples">
        {visible.map((ex) => (
          <ExampleCard key={`${ex.id}-${revealAll}`} example={ex} revealed={revealAll} />
        ))}
      </ul>
    </>
  );
}

function ExampleCard({ example, revealed }: { example: (typeof examples)[number]; revealed: boolean }) {
  const [open, setOpen] = useState(revealed);
  const detailsId = `example-${example.id}-details`;

  return (
    <li className={`card example-card example-card--${example.category}`}>
      <p className="example-card__situation">{example.situation}</p>
      {!revealed && (
        <button
          type="button"
          className="button button--ghost button--small"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Auflösung verbergen' : 'Auflösung zeigen'}
        </button>
      )}
      <div id={detailsId} hidden={!open} className="example-card__details">
        <p className="example-card__category">
          <span className="visually-hidden">Mögliche Kategorie: </span>
          <span className={`badge badge--${example.category}`}>{example.label}</span>
        </p>
        <p className="example-card__explanation">{example.explanation}</p>
        {example.overlap && (
          <p className="example-card__overlap">
            <strong>Hinweis:</strong> {example.overlap}
          </p>
        )}
      </div>
    </li>
  );
}
