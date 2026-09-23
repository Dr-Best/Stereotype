import { useCallback, useReducer } from 'react';
import type { AnswerRecord, Difficulty, QuizAnswer, QuizQuestion } from '../types';
import { quizQuestions } from '../data/quizQuestions';
import { createRetryRound, createRound, evaluateAnswer, saveResult, scoreOf } from '../logic/quiz';

type Phase = 'start' | 'question' | 'result';

export interface QuizState {
  phase: Phase;
  difficulty: Difficulty;
  questions: QuizQuestion[];
  index: number;
  records: AnswerRecord[];
  /** Antwort auf die aktuelle Frage (falls schon gegeben) */
  current: AnswerRecord | null;
  isRetry: boolean;
}

type Action =
  | { type: 'start'; difficulty: Difficulty; questions: QuizQuestion[]; isRetry?: boolean }
  | { type: 'answer'; given: QuizAnswer }
  | { type: 'next' }
  | { type: 'reset' };

const initialState: QuizState = {
  phase: 'start',
  difficulty: 'leicht',
  questions: [],
  index: 0,
  records: [],
  current: null,
  isRetry: false,
};

export function quizReducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'start':
      if (action.questions.length === 0) return state;
      return {
        ...initialState,
        phase: 'question',
        difficulty: action.difficulty,
        questions: action.questions,
        isRetry: action.isRetry ?? false,
      };
    case 'answer': {
      if (state.phase !== 'question' || state.current) return state;
      const record = evaluateAnswer(state.questions[state.index], action.given);
      return { ...state, current: record, records: [...state.records, record] };
    }
    case 'next': {
      if (!state.current) return state;
      const isLast = state.index >= state.questions.length - 1;
      return isLast
        ? { ...state, phase: 'result', current: null }
        : { ...state, index: state.index + 1, current: null };
    }
    case 'reset':
      return { ...initialState, difficulty: state.difficulty };
    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const start = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'start', difficulty, questions: createRound(quizQuestions, difficulty) });
  }, []);

  const retryWrong = useCallback(() => {
    dispatch({
      type: 'start',
      difficulty: state.difficulty,
      questions: createRetryRound(quizQuestions, state.records),
      isRetry: true,
    });
  }, [state.difficulty, state.records]);

  const answer = useCallback((given: QuizAnswer) => dispatch({ type: 'answer', given }), []);

  const next = useCallback(() => {
    const isLast = state.index >= state.questions.length - 1;
    if (isLast && state.current && !state.isRetry) {
      const score = scoreOf(state.records);
      saveResult({ difficulty: state.difficulty, ...score, date: new Date().toISOString() });
    }
    dispatch({ type: 'next' });
  }, [state]);

  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  return { state, start, retryWrong, answer, next, reset };
}
