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
        summary: 'Components, magnitude, displacement and unit vectors.',
        status: 'available',
        estimatedMinutes: 35
      },
      {
        id: 'l0-vector-products',
        title: 'Dot and cross products',
        summary: 'Projection, orientation and the right-hand rule.',
        status: 'available',
        estimatedMinutes: 40
      },
      {
        id: 'l0-coordinate-systems',
        title: 'Coordinate systems',
        summary: 'Cartesian, cylindrical and spherical descriptions.',
        status: 'upcoming',
        estimatedMinutes: 50
      },
      {
        id: 'l0-elements-and-flux',
        title: 'Elements and flux',
        summary: 'Line, area and volume elements; oriented surface flux.',
        status: 'upcoming',
        estimatedMinutes: 55
      },
      {
        id: 'l0-field-operators',
        title: 'Gradient, divergence and curl',
        summary: 'Local change, sources, sinks and circulation.',
        status: 'upcoming',
        estimatedMinutes: 60
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
        summary: 'Charge signs, inverse-square scaling and vector force.',
        status: 'upcoming',
        estimatedMinutes: 50
      },
      {
        id: 'l1-superposition',
        title: 'Multiple charges',
        summary: 'Source-to-observation vectors and superposition.',
        status: 'upcoming',
        estimatedMinutes: 55
      },
      {
        id: 'l1-electric-field',
        title: 'Electric field',
        summary: 'Field versus force, point-charge fields and field lines.',
        status: 'upcoming',
        estimatedMinutes: 55
      },
      {
        id: 'l1-distributions',
        title: 'Charge distributions',
        summary: 'Line, surface and volume charge density integrals.',
        status: 'upcoming',
        estimatedMinutes: 70
      },
      {
        id: 'l1-ring-disc-plane',
        title: 'Ring, disc and plane',
        summary: 'Symmetry, component cancellation and limiting cases.',
        status: 'upcoming',
        estimatedMinutes: 75
      }
    ]
  }
]

export const availableTopicId = 'l0-vector-foundations'
