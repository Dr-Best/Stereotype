import { useEffect, useRef } from 'react';
import type { AnswerRecord, Difficulty, QuizAnswer, QuizQuestion } from '../../types';
import { answerHints, answerLabels, answersForDifficulty, difficultyInfo } from '../../data/quizQuestions';
import { ProgressBar } from './ProgressBar';

interface QuizQuestionViewProps {
  question: QuizQuestion;
  index: number;
  total: number;
  score: number;
  difficulty: Difficulty;
  current: AnswerRecord | null;
  isRetry: boolean;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onQuit: () => void;
}

export function QuizQuestionView({
  question,
  index,
  total,
  score,
  difficulty,
  current,
  isRetry,
  onAnswer,
  onNext,
  onQuit,
}: QuizQuestionViewProps) {
  const questionRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;

  // Neue Frage → Fokus auf die Situation, damit Screenreader sie vorlesen
  useEffect(() => {
    questionRef.current?.focus();
  }, [question.id]);

  // Nach der Antwort → Fokus auf das Feedback
  useEffect(() => {
    if (current) feedbackRef.current?.focus();
  }, [current]);

  const options = answersForDifficulty[difficulty];

  return (
    <div className="quiz">
      <div className="quiz__topbar">
        <p className="quiz__meta">
          {isRetry ? 'Wiederholung' : `Stufe ${difficultyInfo[difficulty].label}`}
        </p>
        <p className="quiz__score" aria-label={`Punktestand: ${score} richtig`}>
          <span aria-hidden="true">✓</span> {score} richtig
        </p>
      </div>
      <ProgressBar value={index + (current ? 1 : 0)} max={total} label={`Frage ${index + 1} von ${total}`} />

      <section className="card quiz__card" aria-labelledby="quiz-situation">
        <p className="quiz__counter">
          Frage {index + 1} von {total}
        </p>
        <h1 id="page-title" className="visually-hidden">
          Teste dein Wissen
        </h1>
        <h2 id="quiz-situation" className="quiz__situation" tabIndex={-1} ref={questionRef}>
          {question.situation}
        </h2>
        <p className="quiz__prompt">{question.prompt ?? 'Welcher Begriff passt am besten?'}</p>

        <div className={`answer-grid answer-grid--${options.length}`} role="group" aria-label="Antwortmöglichkeiten">
          {options.map((option) => {
            const isChosen = current?.given === option;
            const isRight = current && option === question.correct;
            const state = !current ? '' : isRight ? ' is-correct' : isChosen ? ' is-wrong' : ' is-dimmed';
            return (
              <button
                key={option}
                type="button"
                className={`answer-button${state}`}
                onClick={() => onAnswer(option)}
                disabled={Boolean(current)}
                aria-pressed={isChosen}
              >
                <span className="answer-button__label">{answerLabels[option]}</span>
                <span className="answer-button__hint">{answerHints[option]}</span>
                {current && isRight && <span className="visually-hidden"> (richtige Antwort)</span>}
                {current && isChosen && !isRight && <span className="visually-hidden"> (deine Antwort, falsch)</span>}
              </button>
            );
          })}
        </div>

        <div>
          {current && (
            <div
              className={`feedback ${current.isCorrect ? 'feedback--correct' : 'feedback--wrong'}`}
              tabIndex={-1}
              ref={feedbackRef}
            >
              <p className="feedback__verdict">
                <span aria-hidden="true" className="feedback__icon">
                  {current.isCorrect ? '✓' : '✕'}
                </span>
                {current.isCorrect ? 'Richtig!' : 'Nicht ganz.'}
              </p>
              <p className="feedback__answer">
                Richtige Kategorie: <strong>{answerLabels[question.correct]}</strong>
                {!current.isCorrect && (
                  <>
                    {' '}
                    <span className="muted">(deine Antwort: {answerLabels[current.given]})</span>
                  </>
                )}
              </p>
              <p className="feedback__text">
                <strong>Erklärung:</strong> {question.explanation}
              </p>
              <p className="feedback__text">
                <strong>Abgrenzung:</strong> {question.distinction}
              </p>
            </div>
          )}
        </div>

        <div className="quiz__actions">
          <button type="button" className="button button--ghost" onClick={onQuit}>
            Quiz beenden
          </button>
          {current && (
            <button type="button" className="button button--primary" onClick={onNext}>
              {isLast ? 'Zur Auswertung' : 'Nächste Frage'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
