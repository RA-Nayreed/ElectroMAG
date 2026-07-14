interface ProgressPanelProps {
  completedTopics: number
  totalTopics: number
  practiceAttempts: number
  onReset: () => void
}

export function ProgressPanel({
  completedTopics,
  totalTopics,
  practiceAttempts,
  onReset
}: ProgressPanelProps) {
  const completionPercentage = Math.round((completedTopics / totalTopics) * 100)

  return (
    <aside className="progress-panel" aria-label="Learning progress">
      <span className="eyebrow">Your evidence</span>
      <h2>Mastery record</h2>
      <div className="progress-ring" style={{ '--progress': `${completionPercentage}%` } as React.CSSProperties}>
        <span>{completionPercentage}%</span>
        <small>course mapped</small>
      </div>
      <dl className="progress-stats">
        <div>
          <dt>Topics certified</dt>
          <dd>{completedTopics} / {totalTopics}</dd>
        </div>
        <div>
          <dt>Practice attempts</dt>
          <dd>{practiceAttempts}</dd>
        </div>
      </dl>
      <div className="standard-card">
        <span className="eyebrow">Current standard</span>
        <p>
          Predict the direction, construct the model, calculate, then defend the result.
        </p>
      </div>
      <button className="text-button" onClick={onReset} type="button">
        Reset local progress
      </button>
    </aside>
  )
}
