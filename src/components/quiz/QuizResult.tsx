import { useEffect, useRef } from 'react';
import type { AnswerRecord, Difficulty } from '../../types';
import { answerLabels, difficultyInfo, quizQuestions } from '../../data/quizQuestions';
import { buildFeedback, scoreOf } from '../../logic/quiz';
import { href } from '../../hooks/useHashRoute';

interface QuizResultProps {
  records: AnswerRecord[];
  difficulty: Difficulty;
  isRetry: boolean;
  onReplay: () => void;
  onChangeDifficulty: () => void;
  onRetryWrong: () => void;
}

export function QuizResult({ records, difficulty, isRetry, onReplay, onChangeDifficulty, onRetryWrong }: QuizResultProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { correct, total, percent } = scoreOf(records);
  const feedback = buildFeedback(records);
  const wrong = records.filter((r) => !r.isCorrect);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="quiz-result">
      <header className="page-header">
        <p className="eyebrow">{isRetry ? 'Wiederholung abgeschlossen' : `Stufe ${difficultyInfo[difficulty].label}`}</p>
        <h1 id="page-title" tabIndex={-1} ref={headingRef}>
          Deine Auswertung
        </h1>
      </header>

      <section className="card result-card" aria-label="Ergebnis">
        <div className="result-card__score">
          <div
            className="score-ring"
            style={{ ['--percent' as string]: `${percent}` }}
            role="img"
            aria-label={`${percent} Prozent richtig`}
          >
            <span className="score-ring__value" aria-hidden="true">
              {percent} %
            </span>
          </div>
          <p className="result-card__count">
            <strong>{correct}</strong> von <strong>{total}</strong> Situationen richtig eingeordnet
          </p>
        </div>
        <div className="result-card__feedback">
          <h2>Kurze Auswertung</h2>
          {feedback.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <div className="button-row button-row--center">
        <button type="button" className="button button--primary" onClick={onReplay}>
          Noch einmal spielen
        </button>
        <button type="button" className="button button--secondary" onClick={onChangeDifficulty}>
          Schwierigkeitsgrad wechseln
        </button>
        {wrong.length > 0 && (
          <button type="button" className="button button--secondary" onClick={onRetryWrong}>
            Falsche Antworten wiederholen ({wrong.length})
          </button>
        )}
      </div>

      {wrong.length > 0 && (
        <section className="section" aria-labelledby="review-title">
          <h2 id="review-title">Diese Situationen lohnen einen zweiten Blick</h2>
          <ul className="review-list">
            {wrong.map((record) => {
              const question = quizQuestions.find((q) => q.id === record.questionId);
              if (!question) return null;
              return (
                <li key={record.questionId} className="card review-item">
                  <p className="review-item__situation">{question.situation}</p>
                  <p className="small">
                    Deine Antwort: {answerLabels[record.given]} · Richtig: <strong>{answerLabels[record.correct]}</strong>
                  </p>
                  <p className="small muted">{question.distinction}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <p className="small muted center">
        Zum Nachlesen: <a href={href('begriffe')}>Begriffe verstehen</a> · <a href={href('zusammenhaenge')}>Zusammenhänge</a>
      </p>
    </div>
  );
}
