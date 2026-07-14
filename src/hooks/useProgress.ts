import { useEffect, useState } from 'react'

import { availableTopicId } from '../data/curriculum'
import type { LearningProgress } from '../types/learning'

const STORAGE_KEY = 'electromag.progress.v1'

const initialProgress: LearningProgress = {
  completedTopicIds: [],
  currentTopicId: availableTopicId,
  practiceAttempts: 0
}

function loadProgress(): LearningProgress {
  try {
    const storedProgress = localStorage.getItem(STORAGE_KEY)
    return storedProgress
      ? { ...initialProgress, ...JSON.parse(storedProgress) }
      : initialProgress
  } catch {
    return initialProgress
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<LearningProgress>(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  function recordPracticeAttempt() {
    setProgress((currentProgress) => ({
      ...currentProgress,
      practiceAttempts: currentProgress.practiceAttempts + 1
    }))
  }

  function selectTopic(topicId: string) {
    setProgress((currentProgress) => ({
      ...currentProgress,
      currentTopicId: topicId
    }))
  }

  function completeTopic(topicId: string) {
    setProgress((currentProgress) => {
      if (currentProgress.completedTopicIds.includes(topicId)) {
        return currentProgress
      }

      return {
        ...currentProgress,
        completedTopicIds: [...currentProgress.completedTopicIds, topicId]
      }
    })
  }

  function resetProgress() {
    setProgress(initialProgress)
  }

  return {
    progress,
    selectTopic,
    recordPracticeAttempt,
    completeTopic,
    resetProgress
  }
}
