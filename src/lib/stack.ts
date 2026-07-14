import type { PracticeQuestion } from '../types/learning'

type MachineQuestion = Exclude<PracticeQuestion, { type: 'explain' }>

interface StackGradeResponse {
  isgradable: boolean
  score: number
  scores?: Record<string, number>
}

export interface StackGradeResult {
  isCorrect: boolean
  isGradable: boolean
  score: number
}

const configuredApiUrl = (import.meta.env.VITE_STACK_API_URL ?? '').trim().replace(/\/$/, '')

function maximaNumber(value: number) {
  return String(value).replace(/e\+?(-?\d+)/i, '*10^$1')
}

function modelAnswer(question: MachineQuestion) {
  if (question.type === 'choice') {
    return String(question.options.indexOf(question.answer) + 1)
  }

  return maximaNumber(question.answer)
}

function submittedAnswer(question: MachineQuestion, answer: string) {
  if (question.type === 'choice') {
    const selectedIndex = question.options.indexOf(answer)
    return selectedIndex < 0 ? '' : String(selectedIndex + 1)
  }

  return answer
}

export function buildStackQuestionDefinition(question: MachineQuestion) {
  const answer = modelAnswer(question)
  const tolerance = question.type === 'number' ? question.tolerance : 0

  return JSON.stringify({
    name: question.id,
    questiontext: question.prompt,
    questiontextformat: 'html',
    generalfeedback: question.solution,
    generalfeedbackformat: 'html',
    questionsimplify: '1',
    input: [
      {
        name: 'ans1',
        type: 'algebraic',
        tans: answer,
        forbidfloat: '0',
        requirelowestterms: '0',
        checkanswertype: '0',
        mustverify: '0',
        showvalidation: '1'
      }
    ],
    prt: [
      {
        name: 'prt1',
        autosimplify: '1',
        feedbackstyle: '1',
        node: [
          {
            name: '0',
            answertest: 'NumAbsolute',
            sans: 'ans1',
            tans: answer,
            testoptions: maximaNumber(tolerance),
            quiet: '0'
          }
        ]
      }
    ]
  })
}

export async function gradeWithStack(
  question: MachineQuestion,
  answer: string,
  options: { apiUrl?: string; fetcher?: typeof fetch } = {}
): Promise<StackGradeResult> {
  const apiUrl = (options.apiUrl ?? configuredApiUrl).replace(/\/$/, '')
  const fetcher = options.fetcher ?? fetch

  if (!apiUrl) {
    throw new Error('STACK API is not configured')
  }

  const response = await fetcher(`${apiUrl}/grade`, {
    method: 'POST',
    headers: {
      'Accept-Language': 'en',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      questionDefinition: buildStackQuestionDefinition(question),
      answers: { ans1: submittedAnswer(question, answer) }
    })
  })

  if (!response.ok) {
    throw new Error(`STACK returned ${response.status}`)
  }

  const result = await response.json() as StackGradeResponse
  const score = result.scores?.total ?? result.score ?? 0

  return {
    isCorrect: result.isgradable && score >= 0.999999,
    isGradable: result.isgradable,
    score
  }
}

export function gradeLocally(question: MachineQuestion, answer: string) {
  if (question.type === 'choice') {
    return answer === question.answer
  }

  if (!answer.trim()) {
    return false
  }

  const enteredValue = Number(answer)
  return Number.isFinite(enteredValue) && Math.abs(enteredValue - question.answer) <= question.tolerance
}
