export interface Topic {
  id: string
  title: string
  summary: string
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

export interface LessonSection {
  title: string
  paragraphs: string[]
  equations?: string[]
  bullets?: string[]
  note?: string
}

export interface WorkedExample {
  title: string
  prompt: string
  steps: Array<{ text: string; equation?: string }>
  check: string
}

export type PracticeQuestion =
  | {
      id: string
      type: 'choice'
      prompt: string
      options: string[]
      answer: string
      hint: string
      solution: string
    }
  | {
      id: string
      type: 'number'
      prompt: string
      answer: number
      tolerance: number
      suffix?: string
      hint: string
      solution: string
    }
  | {
      id: string
      type: 'explain'
      prompt: string
      criteria: string[]
      solution: string
    }

export interface LessonContent {
  id: string
  lecture: 'L0' | 'L1'
  title: string
  subtitle: string
  objectives: string[]
  sections: LessonSection[]
  examples: WorkedExample[]
  questions: PracticeQuestion[]
  keyResults: string[]
}
