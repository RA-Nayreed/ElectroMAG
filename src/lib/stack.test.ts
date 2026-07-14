import { describe, expect, it, vi } from 'vitest'

import { buildStackQuestionDefinition, gradeLocally, gradeWithStack } from './stack'

const question = {
  id: 'stack-number',
  type: 'number' as const,
  prompt: 'Calculate the magnitude.',
  answer: 5,
  tolerance: 0.001,
  suffix: 'N',
  hint: 'Use Pythagoras.',
  solution: 'The magnitude is 5 N.'
}

describe('STACK assessment adapter', () => {
  it('builds a public STACK definition with an absolute numerical answer test', () => {
    const definition = JSON.parse(buildStackQuestionDefinition(question))

    expect(definition.input[0]).toMatchObject({ name: 'ans1', type: 'algebraic', tans: '5' })
    expect(definition.prt[0].node[0]).toMatchObject({
      answertest: 'NumAbsolute',
      sans: 'ans1',
      tans: '5',
      testoptions: '0.001'
    })
  })

  it('sends the question and response to the STACK grade route', async () => {
    const fetcher = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ isgradable: true, score: 1, scores: { total: 1 } })
    })) as unknown as typeof fetch

    const result = await gradeWithStack(question, '5', {
      apiUrl: 'http://localhost:3080/',
      fetcher
    })

    expect(fetcher).toHaveBeenCalledWith(
      'http://localhost:3080/grade',
      expect.objectContaining({ method: 'POST' })
    )
    expect(result).toEqual({ isCorrect: true, isGradable: true, score: 1 })
  })

  it('encodes a selected choice as a numerical STACK response', async () => {
    const choiceQuestion = {
      id: 'stack-choice',
      type: 'choice' as const,
      prompt: 'Choose the vector quantity.',
      options: ['Charge', 'Electric field', 'Energy'],
      answer: 'Electric field',
      hint: 'It has direction.',
      solution: 'Electric field is a vector.'
    }
    const fetcher = vi.fn(async (_url: string, init?: RequestInit) => {
      const request = JSON.parse(String(init?.body))
      expect(request.answers).toEqual({ ans1: '2' })

      return {
        ok: true,
        status: 200,
        json: async () => ({ isgradable: true, score: 1 })
      }
    }) as unknown as typeof fetch

    const result = await gradeWithStack(choiceQuestion, 'Electric field', {
      apiUrl: 'http://localhost:3080',
      fetcher
    })

    expect(result.isCorrect).toBe(true)
  })

  it('does not accept an empty response for a zero-valued answer', () => {
    expect(gradeLocally({ ...question, answer: 0 }, '')).toBe(false)
  })
})
