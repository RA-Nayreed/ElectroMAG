import { useState } from 'react'

import { Equation } from './Equation'

type LessonStage = 'understand' | 'example' | 'practice'

interface VectorProductsLessonProps {
  isComplete: boolean
  onPracticeAttempt: () => void
  onComplete: () => void
}

export function VectorProductsLesson({
  isComplete,
  onPracticeAttempt,
  onComplete
}: VectorProductsLessonProps) {
  const [stage, setStage] = useState<LessonStage>('understand')
  const [dotAnswer, setDotAnswer] = useState('')
  const [crossAnswer, setCrossAnswer] = useState('')
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [isHintVisible, setIsHintVisible] = useState(false)

  function checkAnswer() {
    onPracticeAttempt()

    const isCorrect = Number(dotAnswer) === 1 && Number(crossAnswer) === -7
    setFeedback(isCorrect ? 'correct' : 'incorrect')

    if (isCorrect) {
      onComplete()
    }
  }

  return (
    <main className="lesson-workspace">
      <header className="lesson-header">
        <div>
          <span className="eyebrow">L0 · Topic 2</span>
          <h1>Two products answer two different questions.</h1>
          <p>
            The dot product measures alignment. The cross product measures oriented perpendicular
            area. Choosing between them is a physical decision, not a memorization exercise.
          </p>
        </div>
        <div className="lesson-status">
          <span className={isComplete ? 'status-dot status-dot--complete' : 'status-dot'} />
          {isComplete ? 'Certified' : 'In progress'}
        </div>
      </header>

      <div className="stage-tabs" role="tablist" aria-label="Lesson stages">
        {(['understand', 'example', 'practice'] as LessonStage[]).map((lessonStage, index) => (
          <button
            aria-selected={stage === lessonStage}
            className={stage === lessonStage ? 'stage-tab stage-tab--active' : 'stage-tab'}
            key={lessonStage}
            onClick={() => setStage(lessonStage)}
            role="tab"
            type="button"
          >
            <span>0{index + 1}</span>
            {lessonStage}
          </button>
        ))}
      </div>

      {stage === 'understand' && (
        <section className="lesson-section">
          <div className="product-comparison">
            <article className="product-card product-card--dot">
              <span className="eyebrow">Dot product</span>
              <h2>How much do the vectors point together?</h2>
              <Equation display>
                {'\\vec A\\cdot\\vec B=A_xB_x+A_yB_y+A_zB_z=|\\vec A||\\vec B|\\cos\\theta'}
              </Equation>
              <ul>
                <li>The result is a scalar.</li>
                <li>Positive means generally aligned.</li>
                <li>Zero means perpendicular for nonzero vectors.</li>
                <li>Negative means generally opposed.</li>
              </ul>
              <p className="application-note">
                In electromagnetics, dot products select the component normal to a surface, which
                is why they appear in flux.
              </p>
            </article>

            <article className="product-card product-card--cross">
              <span className="eyebrow">Cross product</span>
              <h2>What vector is perpendicular to both?</h2>
              <Equation display>
                {'|\\vec A\\times\\vec B|=|\\vec A||\\vec B|\\sin\\theta'}
              </Equation>
              <ul>
                <li>The result is a vector.</li>
                <li>Its magnitude is the parallelogram area.</li>
                <li>Its direction follows the right-hand rule.</li>
                <li>Reversing the order reverses the direction.</li>
              </ul>
              <p className="application-note">
                Cross products encode orientation and later appear in magnetic force, torque and
                curl.
              </p>
            </article>
          </div>

          <div className="product-rule">
            <div>
              <span className="eyebrow">Decision rule</span>
              <h2>Ask what kind of answer physics requires.</h2>
            </div>
            <div className="decision-grid">
              <p><strong>Projection or flux?</strong> Use the dot product.</p>
              <p><strong>Perpendicular direction or circulation?</strong> Use the cross product.</p>
            </div>
          </div>
        </section>
      )}

      {stage === 'example' && (
        <section className="lesson-section">
          <span className="eyebrow">One pair, two results</span>
          <h2>Compare A = (2, −1, 2) and B = (1, 2, 0).</h2>
          <div className="worked-products">
            <article>
              <span className="worked-products__symbol">·</span>
              <div>
                <h3>Dot product</h3>
                <Equation display>
                  {'\\vec A\\cdot\\vec B=2(1)+(-1)(2)+2(0)=0'}
                </Equation>
                <p>The vectors are perpendicular even though neither vector lies along an axis.</p>
              </div>
            </article>
            <article>
              <span className="worked-products__symbol">×</span>
              <div>
                <h3>Cross product</h3>
                <Equation display>
                  {'\\vec A\\times\\vec B=(-4,2,5)'}
                </Equation>
                <p>
                  The result must be perpendicular to both vectors. Verify this by taking its dot
                  product with A and with B. Both results are zero.
                </p>
              </div>
            </article>
          </div>
          <div className="order-warning">
            <span className="eyebrow">Order matters</span>
            <Equation display>
              {'\\vec B\\times\\vec A=-(\\vec A\\times\\vec B)=(4,-2,-5)'}
            </Equation>
            <p>The dot product does not change when the order is reversed. The cross product does.</p>
          </div>
        </section>
      )}

      {stage === 'practice' && (
        <section className="lesson-section practice-section">
          <div className="practice-prompt">
            <span className="eyebrow">Your turn · choose and calculate</span>
            <h2>Let A = (1, 2, 0) and B = (3, −1, 0).</h2>
            <p>
              Calculate the dot product and the z component of A × B. Before calculating, predict
              whether the cross product points toward positive or negative z.
            </p>
            <div className="concept-callout">
              <strong>Independent check</strong>
              <p>
                Both vectors lie in the xy plane, so their cross product can only have a z
                component.
              </p>
            </div>
          </div>

          <div className="answer-card">
            <label className="product-answer">
              <span>Dot product A · B</span>
              <input
                inputMode="decimal"
                onChange={(event) => {
                  setDotAnswer(event.target.value)
                  setFeedback('idle')
                }}
                type="number"
                value={dotAnswer}
              />
            </label>
            <label className="product-answer">
              <span>z component of A × B</span>
              <input
                inputMode="decimal"
                onChange={(event) => {
                  setCrossAnswer(event.target.value)
                  setFeedback('idle')
                }}
                type="number"
                value={crossAnswer}
              />
            </label>
            <div className="answer-actions">
              <button className="button button--primary" onClick={checkAnswer} type="button">
                Check reasoning
              </button>
              <button
                className="button button--outline"
                onClick={() => setIsHintVisible((currentValue) => !currentValue)}
                type="button"
              >
                {isHintVisible ? 'Hide hint' : 'Request hint'}
              </button>
            </div>

            {isHintVisible && (
              <div className="feedback feedback--hint">
                For the z component, use AₓBᵧ − AᵧBₓ. Keep the order A × B unchanged.
              </div>
            )}
            {feedback === 'correct' && (
              <div className="feedback feedback--correct" role="status">
                Correct. A · B = 1 and A × B = (0, 0, −7), so the cross product points toward
                negative z.
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="feedback feedback--incorrect" role="alert">
                Not yet. Recheck component multiplication for the dot product and the subtraction
                order in AₓBᵧ − AᵧBₓ.
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
