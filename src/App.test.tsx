import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from './App'
import { PracticeBank } from './components/PracticeBank'
import type { PracticeQuestion } from './types/learning'

describe('complete L0 and L1 course', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('makes all ten topics available without timing or the removed header mark', () => {
    const { container } = render(<App />)

    expect(screen.getAllByRole('button', { name: /Course context|Projection|Cartesian|Line, area|Nabla|Charge signs|Source-to-observation|Field versus force|Line, surface|Symmetry/ })).toHaveLength(10)
    expect(screen.queryByText('L0 + L1')).not.toBeInTheDocument()
    expect(container.querySelector('.brand__mark')).not.toBeInTheDocument()
    expect(container.textContent).not.toMatch(/\b\d+\s*(min|minutes)\b/i)
  })

  it('opens later L1 material and its matching interactive model', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Field versus force/ }))

    expect(screen.getByRole('heading', { name: 'Electric field, point charges and field lines' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Interactive point-charge field lines' })).toBeInTheDocument()
    expect(screen.getByText('3 complete derivations')).toBeInTheDocument()
  })
})

describe('practice evidence', () => {
  const questions: PracticeQuestion[] = [
    {
      id: 'number-test',
      type: 'number',
      prompt: 'What is 3 + 4?',
      answer: 7,
      tolerance: 0,
      hint: 'Add the values.',
      solution: 'The answer is 7.'
    }
  ]

  it('records a correct result and completes the bank', async () => {
    const onAttempt = vi.fn()
    const onComplete = vi.fn()
    render(<PracticeBank questions={questions} onAttempt={onAttempt} onComplete={onComplete} />)

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '7' } })
    fireEvent.click(screen.getByRole('button', { name: 'Check answer' }))

    await waitFor(() => expect(screen.getByText(/Correct. Explain why/)).toBeInTheDocument())
    expect(onAttempt).toHaveBeenCalledOnce()
    expect(onComplete).toHaveBeenCalledOnce()
  })
})
