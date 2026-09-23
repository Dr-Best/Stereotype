import { PageHeader } from '../components/PageHeader';
import { FlowChain } from '../components/FlowChain';
import { KeySentence } from '../components/KeySentence';
import { Tooltip } from '../components/Tooltip';
import { terms, keySentences } from '../data/terms';
import { href } from '../hooks/useHashRoute';

export function RelationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bereich 2"
        title="Zusammenhänge"
        intro={
          <p>
            Die Begriffe hängen zusammen – aber nicht als feste Kette von Ursache und Wirkung. Die Pfeile zeigen, was
            passieren <em>kann</em>, nicht was passieren <em>muss</em>.
          </p>
        }
      />

      <section className="section" aria-labelledby="paths-title">
        <h2 id="paths-title">Zwei mögliche Wege zu verzerrten Entscheidungen</h2>
        <div className="paths">
          <div className="card path">
            <h3 className="path__title">Sozialer Weg</h3>
            <p className="path__desc">Wenn es um Gruppen von Menschen geht.</p>
            <FlowChain
              label="Sozialer Weg: vom Stereotyp zur möglichen Diskriminierung"
              steps={[
                { title: 'Stereotyp', link: 'kann Wahrnehmung beeinflussen' },
                { title: 'Vorurteil / sozialer Bias', link: 'kann Entscheidungen beeinflussen', tone: 'accent' },
                { title: 'Verhalten oder Regeln', link: 'kann führen zu' },
                { title: 'mögliche Diskriminierung', tone: 'warn' },
              ]}
            />
          </div>
          <div className="card path path--cognitive">
            <h3 className="path__title">Kognitiver Weg</h3>
            <p className="path__desc">Ganz ohne Bezug zu sozialen Gruppen.</p>
            <FlowChain
              label="Kognitiver Weg: von kognitiven Biases zu verzerrten Entscheidungen"
              steps={[
                { title: 'Kognitive Biases', link: 'z. B. Ankereffekt, Bestätigungsfehler' },
                { title: 'verzerrte Wahrnehmung oder Entscheidung', tone: 'accent' },
              ]}
            />
            <p className="path__footnote">
              Hier ist kein Stereotyp und kein Vorurteil beteiligt – trotzdem ist es ein{' '}
              <Tooltip text="Bias = Verzerrung in Wahrnehmung oder Entscheidung">Bias</Tooltip>.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="not-every-title">
        <h2 id="not-every-title">Drei Sätze, die man sich merken sollte</h2>
        <div className="stack">
          <KeySentence variant="note">{keySentences.biasNotPrejudice}</KeySentence>
          <KeySentence variant="note">{keySentences.stereotypeNotPrejudice}</KeySentence>
          <KeySentence variant="note">{keySentences.prejudiceNotDiscrimination}</KeySentence>
        </div>
      </section>

      <section className="section" aria-labelledby="awareness-title">
        <h2 id="awareness-title">Bewusst oder unbewusst – eine zusätzliche Frage</h2>
        <p className="prose">
          <strong>Conscious Bias</strong> und <strong>Unconscious Bias</strong> sind keine weiteren Stufen neben Stereotyp
          und Vorurteil. Sie beschreiben vor allem, <em>wie</em> eine Verzerrung wirkt: ob sie der Person bewusst ist oder
          automatisch abläuft. Ein und dasselbe Stereotyp kann also bewusst oder unbewusst in eine Entscheidung einfließen.
        </p>
        <div className="awareness-grid" role="group" aria-label="Bewusst oder unbewusst: zwei Beispiele">
          <div className="card awareness-grid__cell">
            <p className="awareness-grid__label">Conscious Bias</p>
            <p>„Ich stelle lieber Jüngere ein, weil ich Ältere für unflexibel halte.“</p>
            <p className="awareness-grid__hint">Die Person weiß um ihre Präferenz.</p>
          </div>
          <div className="card awareness-grid__cell">
            <p className="awareness-grid__label">Unconscious Bias</p>
            <p>Eine Führungskraft hält sich für neutral, lädt aber systematisch häufiger Jüngere ein.</p>
            <p className="awareness-grid__hint">Die Verzerrung wirkt unbemerkt.</p>
          </div>
        </div>
        <p className="prose small">
          In beiden Fällen steckt dasselbe Stereotyp dahinter („Ältere sind unflexibel“). Wenn Ältere dadurch tatsächlich
          seltener eingestellt werden, liegt zusätzlich Diskriminierung vor.
        </p>
      </section>

      <section className="section" aria-labelledby="table-title">
        <h2 id="table-title">Vergleichstabelle</h2>
        <div className="table-wrap">
          <table className="compare-table">
            <caption className="visually-hidden">Begriffe mit Kernfrage und Beispiel im Vergleich</caption>
            <thead>
              <tr>
                <th scope="col">Begriff</th>
                <th scope="col">Kernfrage</th>
                <th scope="col">Beispiel</th>
              </tr>
            </thead>
            <tbody>
              {terms.map((term) => (
                <tr key={term.id}>
                  <th scope="row" data-label="Begriff">
                    <a href={href('begriffe', term.id)}>{term.name}</a>
                    <span className="compare-table__formula">{term.formula}</span>
                  </th>
                  <td data-label="Kernfrage">„{term.keyQuestion}“</td>
                  <td data-label="Beispiel">{term.tableExample}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small muted">Beispielsätze in Anführungszeichen sind Beispiele, keine Tatsachenbehauptungen.</p>
      </section>
    </>
  );
}
