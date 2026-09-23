import { useState } from 'react';
import type { Difficulty, StoredResult } from '../../types';
import { answerHints, answerLabels, answersForDifficulty, difficultyInfo, quizQuestions } from '../../data/quizQuestions';
import { QUESTIONS_PER_ROUND } from '../../logic/quiz';

interface QuizStartProps {
  initialDifficulty: Difficulty;
  lastResult: StoredResult | null;
  onStart: (difficulty: Difficulty) => void;
}

const difficulties: Difficulty[] = ['leicht', 'mittel', 'schwer'];

export function QuizStart({ initialDifficulty, lastResult, onStart }: QuizStartProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);

  return (
    <div className="quiz-start">
      <header className="page-header">
        <p className="eyebrow">Bereich 5</p>
        <h1 id="page-title" tabIndex={-1}>
          Teste dein Wissen
        </h1>
        <p className="page-header__intro">Kannst du Stereotyp, Vorurteil und Bias unterscheiden?</p>
      </header>

      <form
        className="card quiz-start__form"
        onSubmit={(e) => {
          e.preventDefault();
          onStart(difficulty);
        }}
      >
        <fieldset className="difficulty-picker">
          <legend>Schwierigkeitsgrad wählen</legend>
          <div className="difficulty-picker__options">
            {difficulties.map((d) => {
              const count = quizQuestions.filter((q) => q.difficulty === d).length;
              return (
                <label key={d} className={`difficulty-option${difficulty === d ? ' is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={d}
                    checked={difficulty === d}
                    onChange={() => setDifficulty(d)}
                  />
                  <span className="difficulty-option__label">{difficultyInfo[d].label}</span>
                  <span className="difficulty-option__desc">{difficultyInfo[d].description}</span>
                  <span className="difficulty-option__meta">{count} Fragen im Pool</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="quiz-start__info">
          <p>
            Pro Runde: <strong>{QUESTIONS_PER_ROUND} zufällige Fragen</strong> ohne Wiederholung. Nach jeder Antwort
            bekommst du sofort eine Erklärung.
          </p>
          <p className="small">Antwortmöglichkeiten in dieser Stufe:</p>
          <ul className="answer-preview">
            {answersForDifficulty[difficulty].map((a) => (
              <li key={a}>
                <strong>{answerLabels[a]}</strong> <span className="muted">– {answerHints[a]}</span>
              </li>
            ))}
          </ul>
          {difficulty === 'schwer' && (
            <p className="small quiz-start__hint">
              Tipp: Viele Situationen enthalten mehrere Ebenen. Achte darauf, welcher Begriff im Mittelpunkt der Frage
              steht – und ob der Person ihre Voreingenommenheit bewusst ist.
            </p>
          )}
        </div>

        <button type="submit" className="button button--primary button--large">
          Quiz starten
        </button>
      </form>

      {lastResult && (
        <p className="quiz-start__last" aria-label="Letztes gespeichertes Ergebnis">
          Letztes Ergebnis: <strong>{lastResult.percent} %</strong> ({lastResult.correct} von {lastResult.total} richtig,
          Stufe {difficultyInfo[lastResult.difficulty].label},{' '}
          {new Date(lastResult.date).toLocaleDateString('de-DE')})
        </p>
      )}
    </div>
  );
}
