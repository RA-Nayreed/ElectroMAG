import { describe, expect, it } from 'vitest'

import { areVectorsClose, calculateMagnitude, normalizeVector, subtractVectors } from './vector'

describe('vector utilities', () => {
  it('constructs displacement as endpoint minus starting point', () => {
    expect(
      subtractVectors(
        { x: -3, y: 2, z: 3 },
        { x: -5, y: 3, z: 1 }
      )
    ).toEqual({ x: 2, y: -1, z: 2 })
  })

  it('calculates a three-dimensional magnitude', () => {
    expect(calculateMagnitude({ x: 2, y: -1, z: 2 })).toBe(3)
  })

  it('normalizes a nonzero vector', () => {
    expect(normalizeVector({ x: 2, y: -1, z: 2 })).toEqual({
      x: 2 / 3,
      y: -1 / 3,
      z: 2 / 3
    })
  })

  it('rejects normalization of the zero vector', () => {
    expect(() => normalizeVector({ x: 0, y: 0, z: 0 })).toThrow(
      'The zero vector has no unique direction'
    )
  })

  it('compares vector components within tolerance', () => {
    expect(
      areVectorsClose(
        { x: 3.0000001, y: 4, z: 0 },
        { x: 3, y: 4, z: 0 }
      )
    ).toBe(true)
  })
})
