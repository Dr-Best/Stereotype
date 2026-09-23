import { useQuiz } from '../hooks/useQuiz';
import { loadResult, scoreOf } from '../logic/quiz';
import { QuizStart } from '../components/quiz/QuizStart';
import { QuizQuestionView } from '../components/quiz/QuizQuestionView';
import { QuizResult } from '../components/quiz/QuizResult';

export function QuizPage() {
  const { state, start, retryWrong, answer, next, reset } = useQuiz();

  if (state.phase === 'question') {
    return (
      <QuizQuestionView
        question={state.questions[state.index]}
        index={state.index}
        total={state.questions.length}
        score={scoreOf(state.records).correct}
        difficulty={state.difficulty}
        current={state.current}
        isRetry={state.isRetry}
        onAnswer={answer}
        onNext={next}
        onQuit={reset}
      />
    );
  }

  if (state.phase === 'result') {
    return (
      <QuizResult
        records={state.records}
        difficulty={state.difficulty}
        isRetry={state.isRetry}
        onReplay={() => start(state.difficulty)}
        onChangeDifficulty={reset}
        onRetryWrong={retryWrong}
      />
    );
  }

  return <QuizStart initialDifficulty={state.difficulty} lastResult={loadResult()} onStart={start} />;
}
