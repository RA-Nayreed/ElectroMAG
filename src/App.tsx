import { CurriculumSidebar } from './components/CurriculumSidebar'
import { ProgressPanel } from './components/ProgressPanel'
import { VectorLesson } from './components/VectorLesson'
import { curriculum, availableTopicId } from './data/curriculum'
import { useProgress } from './hooks/useProgress'

export function App() {
  const { progress, recordPracticeAttempt, completeTopic, resetProgress } = useProgress()
  const totalTopics = curriculum.reduce((total, lecture) => total + lecture.topics.length, 0)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="ElectroMAG home">
          <span className="brand__mark">E</span>
          <span>ElectroMAG</span>
        </a>
        <div className="topbar__context">
          <span>Electromagnetics Engineering</span>
          <span className="topbar__divider" />
          <span>L0 + L1</span>
        </div>
        <button className="button button--primary topbar__action" type="button">
          Continue learning
        </button>
      </header>

      <div className="learning-layout" id="top">
        <CurriculumSidebar completedTopicIds={progress.completedTopicIds} />
        <VectorLesson
          isComplete={progress.completedTopicIds.includes(availableTopicId)}
          onComplete={() => completeTopic(availableTopicId)}
          onPracticeAttempt={recordPracticeAttempt}
        />
        <ProgressPanel
          completedTopics={progress.completedTopicIds.length}
          onReset={resetProgress}
          practiceAttempts={progress.practiceAttempts}
          totalTopics={totalTopics}
        />
      </div>
    </div>
  )
}
