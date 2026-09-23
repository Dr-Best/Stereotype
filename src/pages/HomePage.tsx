import { href } from '../hooks/useHashRoute';
import { FlowChain } from '../components/FlowChain';
import { loadResult } from '../logic/quiz';
import { difficultyInfo } from '../data/quizQuestions';

const teasers = [
  { question: 'Was ist ein Stereotyp?', answer: 'Eine pauschale Zuschreibung über eine Gruppe.', target: href('begriffe', 'stereotyp') },
  { question: 'Wann wird daraus ein Vorurteil?', answer: 'Wenn aus der Zuschreibung eine Bewertung wird.', target: href('begriffe', 'vorurteil') },
  { question: 'Was bedeutet Bias?', answer: 'Eine Verzerrung in Wahrnehmung oder Entscheidung.', target: href('begriffe', 'bias') },
  { question: 'Wann sprechen wir von Diskriminierung?', answer: 'Wenn Menschen tatsächlich benachteiligt werden.', target: href('begriffe', 'diskriminierung') },
];

export function HomePage() {
  const lastResult = loadResult();

  return (
    <div className="home">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Lern-App</p>
        <h1 id="page-title" tabIndex={-1}>
          Stereotype, Vorurteile &amp; Bias verstehen
        </h1>
        <p className="hero__lead">Begriffe unterscheiden, Zusammenhänge erkennen und das eigene Wissen testen.</p>
        <div className="button-row">
          <a className="button button--primary" href={href('begriffe')}>
            Jetzt verstehen
          </a>
          <a className="button button--secondary" href={href('quiz')}>
            Wissen testen
          </a>
        </div>
        {lastResult && (
          <p className="hero__last-result">
            Dein letztes Ergebnis: <strong>{lastResult.percent} %</strong> ({lastResult.correct} von {lastResult.total},{' '}
            {difficultyInfo[lastResult.difficulty].label})
          </p>
        )}
      </section>

      <section aria-labelledby="teaser-title" className="section">
        <h2 id="teaser-title" className="visually-hidden">
          Die wichtigsten Fragen
        </h2>
        <ul className="card-grid card-grid--4">
          {teasers.map((t) => (
            <li key={t.question}>
              <a className="card card--link teaser" href={t.target}>
                <h3 className="teaser__question">{t.question}</h3>
                <p className="teaser__answer">{t.answer}</p>
                <span className="card__more" aria-hidden="true">
                  Mehr erfahren →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="overview-title" className="section card overview">
        <h2 id="overview-title">Auf einen Blick</h2>
        <FlowChain
          label="Möglicher Zusammenhang der Begriffe"
          orientation="horizontal"
          steps={[
            { title: 'Stereotyp' },
            { title: 'Vorurteil / Bias', tone: 'accent' },
            { title: 'Entscheidung' },
            { title: 'mögliche Diskriminierung', tone: 'warn' },
          ]}
        />
        <p className="overview__note">
          <strong>Diese Zusammenhänge sind möglich, aber nicht zwangsläufig.</strong>{' '}
          <a href={href('zusammenhaenge')}>Mehr zu den Zusammenhängen</a>
        </p>
      </section>
    </div>
  );
}
