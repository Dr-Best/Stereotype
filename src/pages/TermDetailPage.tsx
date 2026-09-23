import { PageHeader } from '../components/PageHeader';
import { KeySentence } from '../components/KeySentence';
import { Disclaimer } from '../components/Disclaimer';
import { terms } from '../data/terms';
import { href } from '../hooks/useHashRoute';
import { NotFoundPage } from './NotFoundPage';

export function TermDetailPage({ termId }: { termId: string }) {
  const index = terms.findIndex((t) => t.id === termId);
  if (index === -1) return <NotFoundPage />;

  const term = terms[index];
  const prev = terms[index - 1];
  const next = terms[index + 1];

  return (
    <article className={`term-detail term-detail--${term.id}`}>
      <nav aria-label="Brotkrumen" className="breadcrumb">
        <a href={href('begriffe')}>Begriffe verstehen</a>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{term.name}</span>
      </nav>

      <PageHeader eyebrow={term.subtitle} title={term.name} />

      <section className="card definition" aria-labelledby="definition-title">
        <h2 id="definition-title" className="definition__label">
          Definition
        </h2>
        <p className="definition__text">{term.definition}</p>
      </section>

      <KeySentence>„{term.formula}“</KeySentence>

      {term.contrast && (
        <section className="section" aria-labelledby="contrast-title">
          <h2 id="contrast-title">Veranschaulichung</h2>
          <div className="contrast">
            <div className="contrast__side card">
              <p className="contrast__label">{term.contrast.leftLabel}</p>
              <p className="contrast__quote">{term.contrast.left}</p>
            </div>
            <span className="contrast__arrow" aria-label="wird zu">
              →
            </span>
            <div className="contrast__side card contrast__side--accent">
              <p className="contrast__label">{term.contrast.rightLabel}</p>
              <p className="contrast__quote">{term.contrast.right}</p>
            </div>
          </div>
          <Disclaimer>Beide Sätze sind Beispiele und keine Tatsachenbehauptungen.</Disclaimer>
        </section>
      )}

      {term.sections.map((section) => (
        <section key={section.heading} className="section">
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((p) => (
            <p key={p} className="prose">
              {p}
            </p>
          ))}
          {section.bullets && (
            <ul className="bullet-list">
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {section.items && (
            <ol className="item-list">
              {section.items.map((item) => (
                <li key={item.title} className="card item-list__item">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}

      {term.exampleGroups.map((group) => (
        <section key={group.heading} className="section">
          <h2>{group.heading}</h2>
          <ul className="example-quotes">
            {group.examples.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
          {group.disclaimer && <Disclaimer>{group.disclaimer}</Disclaimer>}
        </section>
      ))}

      {term.keySentences?.map((s) => (
        <KeySentence key={s} variant="note">
          {s}
        </KeySentence>
      ))}

      <nav className="pager" aria-label="Weitere Begriffe">
        {prev ? (
          <a className="pager__link" href={href('begriffe', prev.id)}>
            <span className="pager__dir">← Vorheriger Begriff</span>
            <span className="pager__name">{prev.name}</span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="pager__link pager__link--next" href={href('begriffe', next.id)}>
            <span className="pager__dir">Nächster Begriff →</span>
            <span className="pager__name">{next.name}</span>
          </a>
        ) : (
          <a className="pager__link pager__link--next" href={href('zusammenhaenge')}>
            <span className="pager__dir">Weiter →</span>
            <span className="pager__name">Zusammenhänge</span>
          </a>
        )}
      </nav>
    </article>
  );
}
