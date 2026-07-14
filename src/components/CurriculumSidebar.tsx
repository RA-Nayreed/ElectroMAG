import { curriculum } from '../data/curriculum'

interface CurriculumSidebarProps {
  completedTopicIds: string[]
}

export function CurriculumSidebar({ completedTopicIds }: CurriculumSidebarProps) {
  return (
    <aside className="curriculum" aria-label="Course curriculum">
      <div className="curriculum__heading">
        <span className="eyebrow">Course map</span>
        <strong>L0 + L1</strong>
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
                const isAvailable = topic.status === 'available'

                return (
                  <li key={topic.id}>
                    <button
                      className={`topic-link ${isAvailable ? 'topic-link--active' : ''}`}
                      disabled={!isAvailable}
                      type="button"
                    >
                      <span className="topic-link__number">
                        {isComplete ? '✓' : topicIndex + 1}
                      </span>
                      <span>
                        <strong>{topic.title}</strong>
                        <small>
                          {isAvailable ? `${topic.estimatedMinutes} min` : 'Planned'}
                        </small>
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
