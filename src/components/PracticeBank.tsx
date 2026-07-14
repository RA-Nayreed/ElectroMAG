import { useState } from 'react'

import type { PracticeQuestion } from '../types/learning'

interface PracticeBankProps {
  questions: PracticeQuestion[]
  onAttempt: () => void
  onComplete: () => void
}

type QuestionState = 'idle' | 'correct' | 'incorrect' | 'reviewed'

export function PracticeBank({ questions, onAttempt, onComplete }: PracticeBankProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [states, setStates] = useState<Record<string, QuestionState>>({})
  const [visibleHints, setVisibleHints] = useState<string[]>([])
  const [visibleSolutions, setVisibleSolutions] = useState<string[]>([])

  function recordState(questionId: string, nextState: QuestionState) {
    setStates((currentStates) => {
      const updatedStates = { ...currentStates, [questionId]: nextState }
      const completedCount = questions.filter((question) => {
        const state = updatedStates[question.id]
        return state === 'correct' || state === 'reviewed'
      }).length

      if (completedCount === questions.length) {
        onComplete()
      }

      return updatedStates
    })
  }

  function checkQuestion(question: PracticeQuestion) {
    onAttempt()

    if (question.type === 'choice') {
      recordState(question.id, answers[question.id] === question.answer ? 'correct' : 'incorrect')
      return
    }

    if (question.type === 'number') {
      const enteredValue = Number(answers[question.id])
      const isCorrect = Number.isFinite(enteredValue) && Math.abs(enteredValue - question.answer) <= question.tolerance
      recordState(question.id, isCorrect ? 'correct' : 'incorrect')
    }
  }

  function toggleListItem(items: string[], item: string, setItems: (items: string[]) => void) {
    setItems(items.includes(item) ? items.filter((value) => value !== item) : [...items, item])
  }

  const completedCount = questions.filter((question) => {
    const state = states[question.id]
    return state === 'correct' || state === 'reviewed'
  }).length

  return (
    <section className="practice-bank" aria-labelledby="practice-heading">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Independent practice</span>
          <h2 id="practice-heading">Prove each part of the topic.</h2>
        </div>
        <div className="practice-score" aria-label={`${completedCount} of ${questions.length} completed`}>
          {completedCount} / {questions.length}
        </div>
      </div>

      <div className="practice-list">
        {questions.map((question, index) => {
          const state = states[question.id] ?? 'idle'
          const isHintVisible = visibleHints.includes(question.id)
          const isSolutionVisible = visibleSolutions.includes(question.id)

          return (
            <article className={`practice-question practice-question--${state}`} key={question.id}>
              <div className="practice-question__number">{String(index + 1).padStart(2, '0')}</div>
              <div className="practice-question__body">
                <h3>{question.prompt}</h3>

                {question.type === 'choice' && (
                  <div className="choice-grid">
                    {question.options.map((option) => (
                      <label className="choice-option" key={option}>
                        <input
                          checked={answers[question.id] === option}
                          name={question.id}
                          onChange={() => {
                            setAnswers((currentAnswers) => ({ ...currentAnswers, [question.id]: option }))
                            recordState(question.id, 'idle')
                          }}
                          type="radio"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'number' && (
                  <label className="number-answer">
                    <span>Answer {question.suffix ? `(${question.suffix})` : ''}</span>
                    <input
                      inputMode="decimal"
                      onChange={(event) => {
                        setAnswers((currentAnswers) => ({ ...currentAnswers, [question.id]: event.target.value }))
                        recordState(question.id, 'idle')
                      }}
                      type="number"
                      value={answers[question.id] ?? ''}
                    />
                  </label>
                )}

                {question.type === 'explain' && (
                  <div className="explanation-task">
                    <p>Write or say your explanation before opening the model answer.</p>
                    <ul>
                      {question.criteria.map((criterion) => <li key={criterion}>{criterion}</li>)}
                    </ul>
                  </div>
                )}

                <div className="practice-actions">
                  {question.type !== 'explain' && (
                    <button className="button button--primary" onClick={() => checkQuestion(question)} type="button">
                      Check answer
                    </button>
                  )}
                  {question.type !== 'explain' && (
                    <button
                      className="text-button text-button--inline"
                      onClick={() => toggleListItem(visibleHints, question.id, setVisibleHints)}
                      type="button"
                    >
                      {isHintVisible ? 'Hide hint' : 'Show hint'}
                    </button>
                  )}
                  <button
                    className="text-button text-button--inline"
                    onClick={() => toggleListItem(visibleSolutions, question.id, setVisibleSolutions)}
                    type="button"
                  >
                    {isSolutionVisible ? 'Hide solution' : 'Show solution'}
                  </button>
                </div>

                {isHintVisible && question.type !== 'explain' && <p className="answer-note answer-note--hint">{question.hint}</p>}
                {isSolutionVisible && <p className="answer-note answer-note--solution">{question.solution}</p>}
                {state === 'correct' && <p className="answer-note answer-note--correct">Correct. Explain why it is correct before moving on.</p>}
                {state === 'incorrect' && <p className="answer-note answer-note--incorrect">Not yet. Use the hint or inspect your sign, direction, units and assumptions.</p>}

                {question.type === 'explain' && isSolutionVisible && state !== 'reviewed' && (
                  <button
                    className="button button--outline"
                    onClick={() => {
                      onAttempt()
                      recordState(question.id, 'reviewed')
                    }}
                    type="button"
                  >
                    I can explain this independently
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
