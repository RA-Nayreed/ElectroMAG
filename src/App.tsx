import { CurriculumSidebar } from './components/CurriculumSidebar'
import { ProgressPanel } from './components/ProgressPanel'
import { VectorLesson } from './components/VectorLesson'
import { VectorProductsLesson } from './components/VectorProductsLesson'
import { curriculum } from './data/curriculum'
import { useProgress } from './hooks/useProgress'

export function App() {
  const {
    progress,
    selectTopic,
    recordPracticeAttempt,
    completeTopic,
    resetProgress
  } = useProgress()
  const totalTopics = curriculum.reduce((total, lecture) => total + lecture.topics.length, 0)

  function renderCurrentLesson() {
    if (progress.currentTopicId === 'l0-vector-products') {
      return (
        <VectorProductsLesson
          isComplete={progress.completedTopicIds.includes('l0-vector-products')}
          onComplete={() => completeTopic('l0-vector-products')}
          onPracticeAttempt={recordPracticeAttempt}
        />
      )
    }

    return (
      <VectorLesson
        isComplete={progress.completedTopicIds.includes('l0-vector-foundations')}
        onComplete={() => completeTopic('l0-vector-foundations')}
        onPracticeAttempt={recordPracticeAttempt}
      />
    )
  }

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
        <button
          className="button button--primary topbar__action"
          onClick={() => document.getElementById('lesson')?.scrollIntoView()}
          type="button"
        >
          Resume topic
        </button>
      </header>

      <div className="learning-layout" id="top">
        <CurriculumSidebar
          completedTopicIds={progress.completedTopicIds}
          currentTopicId={progress.currentTopicId}
          onSelectTopic={selectTopic}
        />
        <div id="lesson">{renderCurrentLesson()}</div>
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
