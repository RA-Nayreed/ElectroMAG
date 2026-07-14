import type { Vector3 } from '../types/learning'

export function subtractVectors(end: Vector3, start: Vector3): Vector3 {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
    z: end.z - start.z
  }
}

export function calculateMagnitude(vector: Vector3): number {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2)
}

export function normalizeVector(vector: Vector3): Vector3 {
  const magnitude = calculateMagnitude(vector)

  if (magnitude === 0) {
    throw new Error('The zero vector has no unique direction')
  }

  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
    z: vector.z / magnitude
  }
}

export function areVectorsClose(
  actual: Vector3,
  expected: Vector3,
  tolerance = 1e-6
): boolean {
  return (
    Math.abs(actual.x - expected.x) <= tolerance &&
    Math.abs(actual.y - expected.y) <= tolerance &&
    Math.abs(actual.z - expected.z) <= tolerance
  )
}
