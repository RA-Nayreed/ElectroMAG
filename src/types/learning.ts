export type TopicStatus = 'available' | 'upcoming'

export interface Topic {
  id: string
  title: string
  summary: string
  status: TopicStatus
  estimatedMinutes: number
}

export interface LectureModule {
  id: 'L0' | 'L1'
  title: string
  description: string
  topics: Topic[]
}

export interface LearningProgress {
  completedTopicIds: string[]
  currentTopicId: string
  practiceAttempts: number
}

export interface Vector3 {
  x: number
  y: number
  z: number
}
