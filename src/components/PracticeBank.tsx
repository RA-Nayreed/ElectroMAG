import { useState } from 'react'

import { gradeLocally, gradeWithStack } from '../lib/stack'
import type { PracticeQuestion } from '../types/learning'

interface PracticeBankProps {
  questions: PracticeQuestion[]
  onAttempt: () => void
  onComplete: () => void
}

type QuestionState = 'idle' | 'correct' | 'incorrect' | 'reviewed'
type GradingSource = 'stack' | 'local'

export function PracticeBank({ questions, onAttempt, onComplete }: PracticeBankProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [states, setStates] = useState<Record<string, QuestionState>>({})
  const [visibleHints, setVisibleHints] = useState<string[]>([])
  const [visibleSolutions, setVisibleSolutions] = useState<string[]>([])
  const [gradingIds, setGradingIds] = useState<string[]>([])
  const [gradingSources, setGradingSources] = useState<Record<string, GradingSource>>({})
  const [gradingMessages, setGradingMessages] = useState<Record<string, string>>({})

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

  async function checkQuestion(question: PracticeQuestion) {
    onAttempt()

    if (question.type === 'explain') {
      return
    }

    const answer = answers[question.id] ?? ''
    setGradingIds((currentIds) => [...currentIds, question.id])
    setGradingMessages((currentMessages) => ({ ...currentMessages, [question.id]: '' }))

    try {
      const result = await gradeWithStack(question, answer)
      setGradingSources((currentSources) => ({ ...currentSources, [question.id]: 'stack' }))

      if (!result.isGradable) {
        setGradingMessages((currentMessages) => ({
          ...currentMessages,
          [question.id]: 'The response could not be interpreted. Check its form and try again.'
        }))
      }

      recordState(question.id, result.isCorrect ? 'correct' : 'incorrect')
    } catch {
      const isCorrect = gradeLocally(question, answer)
      setGradingSources((currentSources) => ({ ...currentSources, [question.id]: 'local' }))
      recordState(question.id, isCorrect ? 'correct' : 'incorrect')
    } finally {
      setGradingIds((currentIds) => currentIds.filter((id) => id !== question.id))
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
          const isGrading = gradingIds.includes(question.id)
          const gradingSource = gradingSources[question.id]
          const gradingMessage = gradingMessages[question.id]

          return (
            <article className={`practice-question practice-question--${state}`} key={question.id}>
              <div className="practice-question__number">{String(index + 1).padStart(2, '0')}</div>
              <div className="practice-question__body">
                <div className="practice-question__heading">
                  <h3>{question.prompt}</h3>
                  {gradingSource === 'stack' && <span className="stack-badge">STACK assessed</span>}
                </div>

                {question.type === 'choice' && (
                  <div className="choice-grid">
                    {question.options.map((option) => (
                      <label className="choice-option" key={option}>
                        <input
                          checked={answers[question.id] === option}
                          name={question.id}
                          onChange={() => {
                            setAnswers((currentAnswers) => ({ ...currentAnswers, [question.id]: option }))
                            setGradingSources((currentSources) => ({ ...currentSources, [question.id]: 'local' }))
                            setGradingMessages((currentMessages) => ({ ...currentMessages, [question.id]: '' }))
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
                        setGradingSources((currentSources) => ({ ...currentSources, [question.id]: 'local' }))
                        setGradingMessages((currentMessages) => ({ ...currentMessages, [question.id]: '' }))
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
                    <button className="button button--primary" disabled={isGrading} onClick={() => void checkQuestion(question)} type="button">
                      {isGrading ? 'Assessing response' : 'Check answer'}
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
                {gradingMessage && <p className="answer-note answer-note--incorrect">{gradingMessage}</p>}
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
