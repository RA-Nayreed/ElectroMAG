import { useMemo, useState } from 'react'

import { areVectorsClose, calculateMagnitude } from '../lib/vector'
import type { Vector3 } from '../types/learning'
import { Equation } from './Equation'
import { VectorDiagram } from './VectorDiagram'

type LessonStage = 'understand' | 'example' | 'practice'

interface VectorLessonProps {
  isComplete: boolean
  onPracticeAttempt: () => void
  onComplete: () => void
}

const expectedDisplacement: Vector3 = { x: 3, y: 4, z: 0 }
const expectedMagnitude = 5

export function VectorLesson({
  isComplete,
  onPracticeAttempt,
  onComplete
}: VectorLessonProps) {
  const [stage, setStage] = useState<LessonStage>('understand')
  const [answer, setAnswer] = useState({ x: '', y: '', z: '', magnitude: '' })
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [isHintVisible, setIsHintVisible] = useState(false)

  const parsedAnswer = useMemo<Vector3>(
    () => ({
      x: Number(answer.x),
      y: Number(answer.y),
      z: Number(answer.z)
    }),
    [answer]
  )

  function updateAnswer(field: keyof typeof answer, value: string) {
    setAnswer((currentAnswer) => ({ ...currentAnswer, [field]: value }))
    setFeedback('idle')
  }

  function checkAnswer() {
    onPracticeAttempt()

    const hasBlankField = Object.values(answer).some((value) => value.trim() === '')
    const isVectorCorrect = areVectorsClose(parsedAnswer, expectedDisplacement)
    const isMagnitudeCorrect = Math.abs(Number(answer.magnitude) - expectedMagnitude) <= 1e-6
    const isCorrect = !hasBlankField && isVectorCorrect && isMagnitudeCorrect

    setFeedback(isCorrect ? 'correct' : 'incorrect')

    if (isCorrect) {
      onComplete()
    }
  }

  return (
    <main className="lesson-workspace">
      <header className="lesson-header">
        <div>
          <span className="eyebrow">L0 · Topic 1</span>
          <h1>Vectors describe magnitude <em>and</em> direction.</h1>
          <p>
            Build the geometric language that every force and field calculation depends on.
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
        <section className="lesson-section lesson-section--split">
          <div className="prose">
            <span className="eyebrow">Meaning first</span>
            <h2>A vector is not merely three numbers.</h2>
            <p>
              The components tell us how much of the vector lies along each coordinate axis.
              Together, they determine one magnitude and one direction.
            </p>
            <Equation display>
              {'\\vec{A}=A_x\\hat{u}_x+A_y\\hat{u}_y+A_z\\hat{u}_z'}
            </Equation>
            <Equation display>
              {'|\\vec{A}|=\\sqrt{A_x^2+A_y^2+A_z^2}'}
            </Equation>
            <div className="concept-callout">
              <strong>Source-to-observation rule</strong>
              <p>
                A vector from point A to point B is always <Equation>{'\\vec{B}-\\vec{A}'}</Equation>.
                This ordering later controls the direction of Coulomb force and electric field.
              </p>
            </div>
          </div>
          <div className="diagram-card">
            <VectorDiagram />
            <p>The endpoint minus the starting point gives the displacement direction.</p>
          </div>
        </section>
      )}

      {stage === 'example' && (
        <section className="lesson-section">
          <span className="eyebrow">Worked example from L0</span>
          <h2>Construct a wind-velocity vector.</h2>
          <p className="lead">
            Wind speed is 9 m/s at A = (−5, 3, 1), directed toward B = (−3, 2, 3).
          </p>
          <ol className="reasoning-steps">
            <li>
              <span>1</span>
              <div>
                <strong>Construct the direction vector.</strong>
                <Equation display>
                  {'\\overrightarrow{AB}=\\vec{B}-\\vec{A}=(2,-1,2)'}
                </Equation>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Convert it to a unit vector.</strong>
                <Equation display>
                  {'|\\overrightarrow{AB}|=3,\\qquad \\hat{u}_{AB}=\\left(\\frac23,-\\frac13,\\frac23\\right)'}
                </Equation>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Apply the physical magnitude.</strong>
                <Equation display>
                  {'\\vec{v}=9\\hat{u}_{AB}=(6,-3,6)\\;\\mathrm{m/s}'}
                </Equation>
              </div>
            </li>
          </ol>
          <div className="sanity-check">
            <span className="eyebrow">Sanity check</span>
            <p>
              <Equation>{'\\sqrt{6^2+(-3)^2+6^2}=9\\;\\mathrm{m/s}'}</Equation>, so the final vector
              preserves the given wind speed.
            </p>
          </div>
        </section>
      )}

      {stage === 'practice' && (
        <section className="lesson-section practice-section">
          <div className="practice-prompt">
            <span className="eyebrow">Your turn · independent construction</span>
            <h2>From P to Q</h2>
            <p>
              Let P = (1, −2, 0) and Q = (4, 2, 0). Construct the displacement vector
              from P to Q and calculate its magnitude.
            </p>
            <p className="prediction-prompt">
              Before calculating: should the vector point toward positive or negative x and y?
            </p>
          </div>
          <div className="answer-card">
            <fieldset>
              <legend>Displacement components</legend>
              <div className="vector-inputs">
                {(['x', 'y', 'z'] as const).map((component) => (
                  <label key={component}>
                    <span>{component}</span>
                    <input
                      aria-label={`${component} component`}
                      inputMode="decimal"
                      onChange={(event) => updateAnswer(component, event.target.value)}
                      type="number"
                      value={answer[component]}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="magnitude-input">
              <span>Magnitude</span>
              <input
                inputMode="decimal"
                onChange={(event) => updateAnswer('magnitude', event.target.value)}
                type="number"
                value={answer.magnitude}
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
                Start with Q − P. Subtract corresponding components before calculating the magnitude.
              </div>
            )}
            {feedback === 'correct' && (
              <div className="feedback feedback--correct" role="status">
                Correct. The vector is (3, 4, 0), its magnitude is 5, and both nonzero components
                agree with the predicted positive directions.
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="feedback feedback--incorrect" role="alert">
                Not yet. Check the order of subtraction and then verify the magnitude from your own
                components. Current magnitude from your vector: {calculateMagnitude(parsedAnswer).toFixed(2)}.
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
