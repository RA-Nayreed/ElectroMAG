import { curriculum } from '../data/curriculum'

interface CurriculumSidebarProps {
  completedTopicIds: string[]
  currentTopicId: string
  onSelectTopic: (topicId: string) => void
}

export function CurriculumSidebar({
  completedTopicIds,
  currentTopicId,
  onSelectTopic
}: CurriculumSidebarProps) {
  return (
    <aside className="curriculum" aria-label="Course curriculum">
      <div className="curriculum__heading">
        <span className="eyebrow">Course map</span>
      </div>
      <nav>
        {curriculum.map((lecture) => (
          <section className="lecture-group" key={lecture.id}>
            <div className="lecture-group__header">
              <span>{lecture.id}</span>
              <div>
                <h2>{lecture.title}</h2>
                <p>{lecture.description}</p>
              </div>
            </div>
            <ol className="topic-list">
              {lecture.topics.map((topic, topicIndex) => {
                const isComplete = completedTopicIds.includes(topic.id)
                const isCurrent = currentTopicId === topic.id

                return (
                  <li key={topic.id}>
                    <button
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`topic-link topic-link--available ${isCurrent ? 'topic-link--active' : ''}`}
                      onClick={() => onSelectTopic(topic.id)}
                      type="button"
                    >
                      <span className="topic-link__number">
                        {isComplete ? '✓' : topicIndex + 1}
                      </span>
                      <span>
                        <strong>{topic.title}</strong>
                        <small>{topic.summary}</small>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </nav>
    </aside>
  )
}
