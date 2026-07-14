import type { LectureModule } from '../types/learning'

export const curriculum: LectureModule[] = [
  {
    id: 'L0',
    title: 'Mathematical foundation',
    description: 'The vector language used throughout electromagnetics.',
    topics: [
      {
        id: 'l0-vector-foundations',
        title: 'Vector foundations',
        summary: 'Course context, components, magnitude, displacement, unit vectors and fields.'
      },
      {
        id: 'l0-vector-products',
        title: 'Dot and cross products',
        summary: 'Projection, orientation, area and the right-hand rule.'
      },
      {
        id: 'l0-coordinate-systems',
        title: 'Coordinate systems',
        summary: 'Cartesian, cylindrical and spherical descriptions.'
      },
      {
        id: 'l0-elements-and-flux',
        title: 'Elements and flux',
        summary: 'Line, area and volume elements; oriented surface flux.'
      },
      {
        id: 'l0-field-operators',
        title: 'Gradient, divergence and curl',
        summary: 'Nabla, local change, sources, sinks and circulation.'
      }
    ]
  },
  {
    id: 'L1',
    title: 'Coulomb force and electric field',
    description: 'Point charges, superposition and continuous distributions.',
    topics: [
      {
        id: 'l1-charge-coulomb',
        title: 'Charge and Coulomb’s law',
        summary: 'Charge signs, inverse-square scaling and vector force.'
      },
      {
        id: 'l1-superposition',
        title: 'Multiple charges',
        summary: 'Source-to-observation vectors and superposition.'
      },
      {
        id: 'l1-electric-field',
        title: 'Electric field',
        summary: 'Field versus force, point-charge fields and field lines.'
      },
      {
        id: 'l1-distributions',
        title: 'Charge distributions',
        summary: 'Line, surface and volume charge density integrals.'
      },
      {
        id: 'l1-ring-disc-plane',
        title: 'Ring, disc and plane',
        summary: 'Symmetry, component cancellation and limiting cases.'
      }
    ]
  }
]

export const availableTopicId = 'l0-vector-foundations'
