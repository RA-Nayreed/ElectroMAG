import { CurriculumSidebar } from './components/CurriculumSidebar'
import { FullLesson } from './components/FullLesson'
import { ProgressPanel } from './components/ProgressPanel'
import { curriculum } from './data/curriculum'
import { lessons } from './data/lessons'
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

  const currentLesson = lessons[progress.currentTopicId] ?? lessons['l0-vector-foundations']

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="ElectroMAG home">
          <span>ElectroMAG</span>
        </a>
        <div className="topbar__context">
          <span>Electromagnetics Engineering</span>
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
        <div id="lesson">
          <FullLesson
            isComplete={progress.completedTopicIds.includes(currentLesson.id)}
            lesson={currentLesson}
            onComplete={() => completeTopic(currentLesson.id)}
            onPracticeAttempt={recordPracticeAttempt}
          />
        </div>
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
