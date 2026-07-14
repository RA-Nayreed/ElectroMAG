import type { LessonContent } from '../types/learning'
import { Equation } from './Equation'
import { InteractiveLabs } from './InteractiveLabs'
import { PracticeBank } from './PracticeBank'

interface FullLessonProps {
  lesson: LessonContent
  isComplete: boolean
  onPracticeAttempt: () => void
  onComplete: () => void
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function FullLesson({ lesson, isComplete, onPracticeAttempt, onComplete }: FullLessonProps) {
  return (
    <main className="lesson-workspace">
      <header className="lesson-header">
        <div>
          <span className="eyebrow">Lecture {lesson.lecture}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.subtitle}</p>
        </div>
        <div className="lesson-status">
          <span className={`status-dot${isComplete ? ' status-dot--complete' : ''}`} />
          {isComplete ? 'Mastery recorded' : 'Mastery in progress'}
        </div>
      </header>

      <section className="lesson-objectives" aria-labelledby="objectives-heading">
        <div>
          <span className="eyebrow">Target capability</span>
          <h2 id="objectives-heading">What you must be able to do</h2>
        </div>
        <ol>
          {lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}
        </ol>
      </section>

      <nav className="lesson-contents" aria-label="Topic contents">
        <span>In this topic</span>
        {lesson.sections.map((section, index) => (
          <a href={`#${sectionId(section.title)}`} key={section.title}>
            {String(index + 1).padStart(2, '0')} {section.title}
          </a>
        ))}
        <a href="#worked-examples">Examples</a>
        <a href="#practice-heading">Practice</a>
      </nav>

      <div className="concept-sections">
        {lesson.sections.map((section, index) => (
          <section className="concept-section" id={sectionId(section.title)} key={section.title}>
            <div className="concept-section__index">{String(index + 1).padStart(2, '0')}</div>
            <div className="concept-section__content">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.equations?.map((equation) => (
                <div className="formula-panel" key={equation}>
                  <Equation display>{equation}</Equation>
                </div>
              ))}
              {section.bullets && (
                <ul className="concept-list">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {section.note && (
                <aside className="lecture-note">
                  <strong>Precision note</strong>
                  <p>{section.note}</p>
                </aside>
              )}
            </div>
          </section>
        ))}
      </div>

      <InteractiveLabs topicId={lesson.id} />

      <section className="worked-examples" id="worked-examples" aria-labelledby="examples-heading">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">Worked from first principles</span>
            <h2 id="examples-heading">Follow the reasoning, not only the arithmetic.</h2>
          </div>
          <span className="section-count">{lesson.examples.length} complete derivations</span>
        </div>
        <div className="example-grid">
          {lesson.examples.map((example, exampleIndex) => (
            <article className="worked-example" key={example.title}>
              <div className="worked-example__heading">
                <span>{String(exampleIndex + 1).padStart(2, '0')}</span>
                <h3>{example.title}</h3>
              </div>
              <p className="worked-example__prompt">{example.prompt}</p>
              <ol>
                {example.steps.map((step, stepIndex) => (
                  <li key={`${example.title}-${stepIndex}`}>
                    <span>{stepIndex + 1}</span>
                    <div>
                      <p>{step.text}</p>
                      {step.equation && <Equation display>{step.equation}</Equation>}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="reasoning-check">
                <strong>Verification</strong>
                <p>{example.check}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="key-results" aria-labelledby="results-heading">
        <div>
          <span className="eyebrow">Retrieval sheet</span>
          <h2 id="results-heading">Results to reconstruct from memory</h2>
        </div>
        <ul>
          {lesson.keyResults.map((result) => <li key={result}>{result}</li>)}
        </ul>
      </section>

      <PracticeBank
        key={lesson.id}
        onAttempt={onPracticeAttempt}
        onComplete={onComplete}
        questions={lesson.questions}
      />
    </main>
  )
}
