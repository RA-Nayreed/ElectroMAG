import type { LessonContent } from '../types/learning'

export const lessons: Record<string, LessonContent> = {
  'l0-vector-foundations': {
    id: 'l0-vector-foundations',
    lecture: 'L0',
    title: 'Vector foundations and the language of fields',
    subtitle:
      'Electromagnetism begins with quantities that have magnitude, direction and a value at every point in space.',
    objectives: [
      'Explain why Maxwell equations are the destination of the course',
      'Distinguish scalars, vectors and fields',
      'Construct position, displacement and unit vectors',
      'Convert a physical magnitude and direction into component form',
      'Interpret area vectors and their two possible normal directions'
    ],
    sections: [
      {
        title: 'Why this mathematical language matters',
        paragraphs: [
          'Maxwell equations describe how charges, currents and changing fields create electric and magnetic fields. Electrostatics studies time-independent electric fields produced by static charges.',
          'The historical link between electricity and magnetism became clear when Hans Christian Oersted observed a current-carrying wire deflecting a compass in 1819. Michael Faraday demonstrated the converse induction effect in 1831. Modern motors, current clamps, simulations, communication systems and antennas all rely on the same field laws.'
        ],
        bullets: [
          'Electrostatics and magnetostatics describe static fields.',
          'Electrodynamics includes induction and electromagnetic waves.',
          'A field assigns a physical quantity to every point in space.',
          'The wider course applies these ideas to conductors, dielectrics, magnetic materials, induction, waves and antennas.'
        ],
        equations: [
          '\\nabla\\cdot\\vec E=\\rho/\\epsilon_0,\\qquad \\nabla\\cdot\\vec B=0',
          '\\nabla\\times\\vec E=-\\partial_t\\vec B,\\qquad \\nabla\\times\\vec B=\\mu_0\\vec J+\\mu_0\\epsilon_0\\partial_t\\vec E'
        ],
        note: 'These four Maxwell equations are the destination of the course. L0 supplies their mathematical language; L1 begins the electrostatic source model.'
      },
      {
        title: 'Components determine one vector',
        paragraphs: [
          'A vector has magnitude and direction. Cartesian components tell how much of the vector lies along each fixed perpendicular axis.',
          'The magnitude follows from the three-dimensional Pythagorean theorem.'
        ],
        equations: [
          '\\vec A=A_x\\hat u_x+A_y\\hat u_y+A_z\\hat u_z',
          '|\\vec A|=\\sqrt{A_x^2+A_y^2+A_z^2}'
        ],
        note: 'A scalar such as temperature has magnitude only. Wind velocity and electric field are vectors.'
      },
      {
        title: 'Position, separation and direction',
        paragraphs: [
          'A position vector starts at the origin. A separation vector starts at a source point and ends at an observation point.',
          'The endpoint minus the starting point rule is essential. It later determines the direction in Coulomb force and electric-field integrals.'
        ],
        equations: [
          '\\vec r=x\\hat u_x+y\\hat u_y+z\\hat u_z',
          '\\vec r-\\vec r\u0027=(x-x\u0027)\\hat u_x+(y-y\u0027)\\hat u_y+(z-z\u0027)\\hat u_z',
          '\\hat r=\\frac{\\vec r}{|\\vec r|}'
        ]
      },
      {
        title: 'Area vectors and fields',
        paragraphs: [
          'A flat surface of area S is represented by an area vector whose magnitude is S and whose direction is normal to the surface. Every open surface has two possible normal directions, so orientation must be stated.',
          'A scalar field gives one number at every point. A vector field gives a magnitude and direction at every point. Arrow length can show magnitude, while field lines use line density for magnitude and the tangent for direction.'
        ],
        equations: ['\\vec S=S\\hat n', 'd\\vec S=\\hat n\\,dS']
      },
      {
        title: 'Historical bridge from separate effects to one theory',
        paragraphs: [
          'The word electricity is connected to the Greek word elektron, meaning amber, whose rubbing can transfer charge. Natural magnetic effects were associated with magnetite and Magnesia. These effects were treated separately for centuries.',
          'Oersted connected them by showing that current affects a compass. Faraday then demonstrated electromagnetic induction. Their experiments motivate a unified field description rather than separate lists of electrical and magnetic effects.'
        ]
      }
    ],
    examples: [
      {
        title: 'Wind vector from two coordinate points',
        prompt: 'At A = (-5, 3, 1), wind speed is 9 m/s and points toward B = (-3, 2, 3). Find the velocity vector.',
        steps: [
          { text: 'Construct the direction from A to B.', equation: '\\overrightarrow{AB}=\\vec B-\\vec A=(2,-1,2)' },
          { text: 'Find its magnitude.', equation: '|\\overrightarrow{AB}|=\\sqrt{2^2+(-1)^2+2^2}=3' },
          { text: 'Normalize and apply the speed.', equation: '\\vec v=9\\frac{(2,-1,2)}{3}=(6,-3,6)\\;\\mathrm{m/s}' }
        ],
        check: 'The magnitude of (6, -3, 6) is 9 m/s, so the physical speed is preserved.'
      },
      {
        title: 'Build a unit vector',
        prompt: 'Find the unit vector in the direction A = (3, 4, 0).',
        steps: [
          { text: 'Calculate the magnitude.', equation: '|\\vec A|=5' },
          { text: 'Divide every component by the same magnitude.', equation: '\\hat u_A=(3/5,4/5,0)' }
        ],
        check: 'A unit vector must have magnitude one.'
      },
      {
        title: 'Choose an oriented area vector',
        prompt: 'A 3 m by 4 m rectangle lies in the xy plane. Write both possible area vectors.',
        steps: [
          { text: 'Calculate the scalar area.', equation: 'S=3(4)=12\\;\\mathrm{m^2}' },
          { text: 'The two unit normals are opposite.', equation: '\\vec S_+=12\\hat u_z,\\qquad\\vec S_-=-12\\hat u_z' }
        ],
        check: 'Both describe the same geometric surface. Orientation determines which one a flux calculation uses.'
      }
    ],
    questions: [
      { id: 'vf1', type: 'choice', prompt: 'Which quantity is a vector?', options: ['Electric charge', 'Temperature', 'Electric field', 'Energy'], answer: 'Electric field', hint: 'Look for a quantity that requires direction.', solution: 'Electric field has both magnitude and direction at every point.' },
      { id: 'vf2', type: 'number', prompt: 'What is the magnitude of the vector (3, 4, 0)?', answer: 5, tolerance: 0.0001, hint: 'Use the three-dimensional Pythagorean theorem.', solution: 'sqrt(3² + 4²) = 5.' },
      { id: 'vf3', type: 'choice', prompt: 'The vector from source r\u0027 to observation point r is:', options: ['r\u0027 - r', 'r - r\u0027', 'r + r\u0027', '|r| - |r\u0027|'], answer: 'r - r\u0027', hint: 'Endpoint minus starting point.', solution: 'The vector must begin at r\u0027 and end at r, so it is r - r\u0027.' },
      { id: 'vf4', type: 'explain', prompt: 'Explain why a surface normal cannot be inferred from the surface alone.', criteria: ['An open surface has two sides', 'The chosen orientation determines the sign of flux', 'The normal must be declared'], solution: 'A surface has two opposite perpendicular directions. Choosing one fixes the area-vector orientation and therefore the sign of any flux through it.' },
      { id: 'vf5', type: 'number', prompt: 'What is the distance from P = (1, -2, 2) to Q = (4, 2, 2)?', answer: 5, tolerance: 0.0001, hint: 'First construct Q - P.', solution: 'Q - P = (3, 4, 0), whose magnitude is 5.' },
      { id: 'vf6', type: 'choice', prompt: 'Which statement describes a scalar field?', options: ['One number at every point', 'One direction only at every point', 'A single constant vector', 'A surface normal'], answer: 'One number at every point', hint: 'Temperature is the standard example.', solution: 'A scalar field assigns one scalar value to every spatial point.' }
    ],
    keyResults: ['Vector = magnitude times unit vector', 'Displacement = endpoint minus start', 'Unit vectors have magnitude one', 'Area vectors encode both area and orientation']
  },

  'l0-vector-products': {
    id: 'l0-vector-products',
    lecture: 'L0',
    title: 'Dot and cross products',
    subtitle: 'One product measures projection. The other creates an oriented perpendicular vector.',
    objectives: ['Calculate both products from components', 'Interpret angle dependence', 'Use the right-hand rule', 'Select the correct product from the physical question', 'Check cross-product order'],
    sections: [
      {
        title: 'Dot product gives a scalar',
        paragraphs: ['The dot product measures how strongly two vectors point in the same direction. It is zero for perpendicular nonzero vectors.', 'Projection and flux use the dot product because only the component parallel to a selected direction contributes.'],
        equations: ['\\vec A\\cdot\\vec B=A_xB_x+A_yB_y+A_zB_z', '\\vec A\\cdot\\vec B=|\\vec A||\\vec B|\\cos\\theta'],
        bullets: ['Positive: angle less than 90 degrees', 'Zero: perpendicular', 'Negative: angle greater than 90 degrees']
      },
      {
        title: 'Cross product gives a vector',
        paragraphs: ['The cross product is perpendicular to both input vectors. Its magnitude equals the area of the parallelogram spanned by them.', 'Curl, torque and magnetic force later use this orientation information.'],
        equations: ['|\\vec A\\times\\vec B|=|\\vec A||\\vec B|\\sin\\theta', '\\vec B\\times\\vec A=-(\\vec A\\times\\vec B)'],
        note: 'Curl the fingers of the right hand from A toward B. The thumb gives A cross B.'
      },
      {
        title: 'Component determinant',
        paragraphs: ['The determinant is a compact way to preserve all signs and component order.'],
        equations: ['\\vec A\\times\\vec B=(A_yB_z-A_zB_y)\\hat u_x+(A_zB_x-A_xB_z)\\hat u_y+(A_xB_y-A_yB_x)\\hat u_z']
      }
    ],
    examples: [
      {
        title: 'Perpendicular without axis alignment',
        prompt: 'Let A = (2, -1, 2) and B = (1, 2, 0).',
        steps: [
          { text: 'Compute the dot product.', equation: '\\vec A\\cdot\\vec B=2-2+0=0' },
          { text: 'Compute the cross product.', equation: '\\vec A\\times\\vec B=(-4,2,5)' },
          { text: 'Verify perpendicularity.', equation: '(-4,2,5)\\cdot\\vec A=0,\\quad(-4,2,5)\\cdot\\vec B=0' }
        ],
        check: 'Both dot checks are zero, so the cross product is perpendicular to both inputs.'
      },
      {
        title: 'Projection on a normal',
        prompt: 'A vector of magnitude 8 makes 60 degrees with a unit normal. Find its normal component.',
        steps: [{ text: 'Use the dot product with the normal.', equation: 'A_\\perp=\\vec A\\cdot\\hat n=8\\cos60^\\circ=4' }],
        check: 'The projection cannot exceed the original magnitude.'
      },
      {
        title: 'Right-hand-rule basis check',
        prompt: 'Let A = 2 u_x and B = 3 u_y. Find both products.',
        steps: [
          { text: 'The vectors are perpendicular, so their dot product is zero.', equation: '\\vec A\\cdot\\vec B=0' },
          { text: 'Use u_x cross u_y = u_z.', equation: '\\vec A\\times\\vec B=6\\hat u_z' }
        ],
        check: 'Reversing the order would produce -6 u_z.'
      }
    ],
    questions: [
      { id: 'vp1', type: 'number', prompt: 'For A = (1, 2, 0) and B = (3, -1, 0), calculate A · B.', answer: 1, tolerance: 0.0001, hint: 'Multiply corresponding components and add.', solution: '1(3) + 2(-1) + 0 = 1.' },
      { id: 'vp2', type: 'number', prompt: 'For the same vectors, calculate the z component of A × B.', answer: -7, tolerance: 0.0001, hint: 'Use AₓBᵧ - AᵧBₓ.', solution: '1(-1) - 2(3) = -7.' },
      { id: 'vp3', type: 'choice', prompt: 'Which operation directly produces the component of F normal to a surface?', options: ['F × n', 'F · n', '|F| + |n|', '∇ × F'], answer: 'F · n', hint: 'A projection uses cosine.', solution: 'The dot product projects F along the normal.' },
      { id: 'vp4', type: 'explain', prompt: 'Explain what changes when A × B is replaced by B × A.', criteria: ['Magnitude is unchanged', 'Direction reverses', 'The result gains a minus sign'], solution: 'Reversing cross-product order keeps the perpendicular magnitude but reverses orientation: B × A = -(A × B).' },
      { id: 'vp5', type: 'number', prompt: 'In degrees, what is the angle between two nonzero vectors whose dot product is zero?', answer: 90, tolerance: 0.0001, hint: 'Set cos(theta) to zero.', solution: 'The angle is 90 degrees.' },
      { id: 'vp6', type: 'choice', prompt: 'What is A × B when nonzero A and B are parallel?', options: ['A scalar one', 'A zero vector', 'Always u_z', 'Undefined'], answer: 'A zero vector', hint: 'Use sin(theta).', solution: 'Parallel vectors have theta equal to 0 or 180 degrees, so the cross-product magnitude is zero.' }
    ],
    keyResults: ['Dot product produces a scalar', 'Cross product produces a perpendicular vector', 'A · B = 0 for perpendicular nonzero vectors', 'Cross-product order controls direction']
  },

  'l0-coordinate-systems': {
    id: 'l0-coordinate-systems', lecture: 'L0', title: 'Cartesian, cylindrical and spherical coordinates', subtitle: 'Choose coordinates that make the geometry and symmetry visible.',
    objectives: ['Convert a point between coordinate systems', 'Distinguish r from rho', 'Interpret theta and phi', 'Construct position vectors in each system', 'Recognize position-dependent unit vectors'],
    sections: [
      { title: 'Cartesian coordinates', paragraphs: ['Cartesian coordinates use three fixed perpendicular directions. Their unit vectors do not change with position.'], equations: ['\\vec A=A_x\\hat u_x+A_y\\hat u_y+A_z\\hat u_z'] },
      { title: 'Spherical coordinates', paragraphs: ['Spherical coordinates fit point sources because all radial directions are equivalent. The radial unit vector points away from the origin and changes direction from point to point.'], equations: ['r=\\sqrt{x^2+y^2+z^2}', '\\theta=\\cos^{-1}(z/r)', '\\phi=\\operatorname{atan2}(y,x)', '\\vec r=r\\hat u_r'], note: 'In these slides theta is the polar angle from +z, while phi is the azimuth in the xy plane.' },
      { title: 'Cylindrical coordinates', paragraphs: ['Cylindrical coordinates fit wires, rings and discs. Rho is distance from the z axis, not distance from the origin.'], equations: ['\\rho=\\sqrt{x^2+y^2}', '\\phi=\\operatorname{atan2}(y,x)', '\\vec r=\\rho\\hat u_\\rho+z\\hat u_z'], bullets: ['u_rho and u_phi depend on position', 'u_z is the same fixed direction as Cartesian u_z'] },
      { title: 'Choosing coordinates', paragraphs: ['Use Cartesian coordinates for box-like geometry, cylindrical coordinates for axial symmetry, and spherical coordinates for full radial symmetry. A coordinate choice does not change physics, only the description.'] }
    ],
    examples: [
      { title: 'One point in three systems', prompt: 'Express the position vector of (1, sqrt(3), -2).', steps: [
        { text: 'Cartesian form.', equation: '\\vec r=\\hat u_x+\\sqrt3\\hat u_y-2\\hat u_z' },
        { text: 'Spherical radial distance.', equation: 'r=\\sqrt{1+3+4}=2\\sqrt2,\\quad\\vec r=2\\sqrt2\\hat u_r' },
        { text: 'Cylindrical radius.', equation: '\\rho=\\sqrt{1+3}=2,\\quad\\vec r=2\\hat u_\\rho-2\\hat u_z' }
      ], check: 'Spherical position needs only u_r. Cylindrical position generally needs u_rho and u_z.' },
      { title: 'Read the angles', prompt: 'For (1, sqrt(3), -2), find phi and theta.', steps: [
        { text: 'Azimuth.', equation: '\\phi=\\tan^{-1}(\\sqrt3/1)=60^\\circ' },
        { text: 'Polar angle.', equation: '\\theta=\\cos^{-1}(-2/(2\\sqrt2))=135^\\circ' }
      ], check: 'Negative z requires theta greater than 90 degrees.' },
      { title: 'Cylindrical to Cartesian', prompt: 'Convert rho = 4, phi = 30 degrees and z = -1 to Cartesian coordinates.', steps: [
        { text: 'Project rho onto x.', equation: 'x=\\rho\\cos\\phi=4\\cos30^\\circ=2\\sqrt3' },
        { text: 'Project rho onto y.', equation: 'y=\\rho\\sin\\phi=4\\sin30^\\circ=2' },
        { text: 'The axial coordinate is unchanged.', equation: '(x,y,z)=(2\\sqrt3,2,-1)' }
      ], check: 'sqrt(x² + y²) returns rho = 4.' }
    ],
    questions: [
      { id: 'co1', type: 'number', prompt: 'For (3, 4, 12), what is spherical r?', answer: 13, tolerance: 0.0001, hint: 'Use all three Cartesian components.', solution: 'sqrt(9 + 16 + 144) = 13.' },
      { id: 'co2', type: 'number', prompt: 'For (3, 4, 12), what is cylindrical rho?', answer: 5, tolerance: 0.0001, hint: 'Rho uses only x and y.', solution: 'sqrt(9 + 16) = 5.' },
      { id: 'co3', type: 'choice', prompt: 'Which coordinate system naturally fits a point charge at the origin?', options: ['Cartesian', 'Spherical', 'Cylindrical only', 'Any system is impossible'], answer: 'Spherical', hint: 'Every direction from the source is equivalent.', solution: 'A point charge has spherical symmetry.' },
      { id: 'co4', type: 'explain', prompt: 'Explain why u_r is not a fixed vector.', criteria: ['It always points away from the origin', 'Its Cartesian components depend on theta and phi', 'Different points have different radial directions'], solution: 'The radial direction is defined locally. Moving around the origin changes which Cartesian direction points outward.' },
      { id: 'co5', type: 'number', prompt: 'What is the azimuth phi in degrees for the point (-1, 1, 0)?', answer: 135, tolerance: 0.001, hint: 'Identify the quadrant before using the tangent ratio.', solution: 'The point lies in quadrant II, so phi = 135 degrees.' },
      { id: 'co6', type: 'choice', prompt: 'Which cylindrical unit vector is fixed everywhere?', options: ['u_rho', 'u_phi', 'u_z', 'All three'], answer: 'u_z', hint: 'Rotation around the z axis changes two local directions.', solution: 'Cylindrical u_z is identical to the fixed Cartesian u_z.' }
    ],
    keyResults: ['r measures distance from the origin', 'rho measures distance from the z axis', 'theta is polar and phi is azimuthal', 'Symmetry should guide coordinate choice']
  },

  'l0-elements-and-flux': {
    id: 'l0-elements-and-flux', lecture: 'L0', title: 'Line, surface and volume elements with flux', subtitle: 'Integrals become physical only after the correct geometric element and orientation are chosen.',
    objectives: ['Write differential elements in three coordinate systems', 'Choose the correct surface normal', 'Interpret flux as projected passage', 'Set up a surface integral', 'Check flux units and sign'],
    sections: [
      { title: 'Cartesian differential elements', paragraphs: ['A differential line vector records directed changes in x, y and z. Surface elements are products of the two tangent lengths and point along the remaining normal direction.'], equations: ['d\\vec l=dx\\hat u_x+dy\\hat u_y+dz\\hat u_z', 'd\\vec S_x=dy\\,dz\\hat u_x,\\quad d\\vec S_y=dx\\,dz\\hat u_y,\\quad d\\vec S_z=dx\\,dy\\hat u_z', 'dV=dx\\,dy\\,dz'], note: 'The L0 slide showing a spherical dV beside the Cartesian cube is a slide error. Cartesian volume is dx dy dz. Also distinguish the directed vector d l from the scalar path length |d l|.' },
      { title: 'Spherical elements', paragraphs: ['Physical arc lengths include scale factors because changing an angle moves farther at larger radius.'], equations: ['d\\vec l=dr\\hat u_r+r\\,d\\theta\\hat u_\\theta+r\\sin\\theta\\,d\\phi\\hat u_\\phi', 'dV=r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\phi', 'dS_r=r^2\\sin\\theta\\,d\\theta\\,d\\phi', 'dS_\\theta=r\\sin\\theta\\,dr\\,d\\phi', 'dS_\\phi=r\\,dr\\,d\\theta'] },
      { title: 'Cylindrical elements', paragraphs: ['The azimuthal arc length is rho dphi. This factor appears in cylindrical area and volume elements.'], equations: ['d\\vec l=d\\rho\\hat u_\\rho+\\rho\\,d\\phi\\hat u_\\phi+dz\\hat u_z', 'dV=\\rho\\,d\\rho\\,d\\phi\\,dz', 'dS_\\rho=\\rho\\,d\\phi\\,dz', 'dS_\\phi=d\\rho\\,dz', 'dS_z=\\rho\\,d\\rho\\,d\\phi'] },
      { title: 'Flux is a surface projection', paragraphs: ['For a constant vector field and flat area, flux is the normal component times area. A parallel flow gives zero flux because nothing crosses the surface.', 'For a varying field or curved surface, sum the local dot products over differential area vectors.'], equations: ['\\Phi_F=\\vec F\\cdot\\vec S=FS\\cos\\theta', '\\Phi_F=\\iint_S\\vec F\\cdot d\\vec S'], bullets: ['Positive flux follows the chosen normal', 'Negative flux crosses opposite the chosen normal', 'Zero flux can mean tangential flow or cancellation'] }
    ],
    examples: [
      { title: 'Water flow through a tilted section', prompt: 'Uniform water velocity is 5 m/s through area 3 m² at 60 degrees to the chosen normal.', steps: [{ text: 'Project velocity onto the normal.', equation: 'v_\\perp=5\\cos60^\\circ=2.5\\;\\mathrm{m/s}' }, { text: 'Multiply by area.', equation: '\\Phi_v=2.5(3)=7.5\\;\\mathrm{m^3/s}' }], check: 'Velocity times area gives volume per time.' },
      { title: 'Flux through the rooftop in L0', prompt: 'For v = 2xz u_x + (x+2)u_y + y(z²-3)u_z, find upward flux through z = 2 over 0 ≤ x,y ≤ 2.', steps: [
        { text: 'The upward area vector is dx dy u_z, so only v_z contributes.', equation: '\\vec v\\cdot d\\vec S=y(2^2-3)\\,dx\\,dy=y\\,dx\\,dy' },
        { text: 'Integrate over the square.', equation: '\\Phi_v=\\int_0^2\\int_0^2y\\,dx\\,dy=4\\;\\mathrm{m^3/s}' }
      ], check: 'Tangential x and y components contribute nothing through the rooftop.' },
      { title: 'Recover the area of a sphere', prompt: 'Integrate the outward radial area element over a sphere of radius R.', steps: [
        { text: 'At constant r = R, use the radial surface element.', equation: 'dS_r=R^2\\sin\\theta\\,d\\theta\\,d\\phi' },
        { text: 'Integrate both angular coordinates.', equation: 'S=\\int_0^{2\\pi}\\int_0^\\pi R^2\\sin\\theta\\,d\\theta\\,d\\phi=4\\pi R^2' }
      ], check: 'The result has area units and matches the known sphere area.' }
    ],
    questions: [
      { id: 'fl1', type: 'number', prompt: 'A field of magnitude 8 crosses area 2 at 60 degrees to the normal. What is the flux?', answer: 8, tolerance: 0.0001, hint: 'Use F S cos(theta).', solution: '8 × 2 × cos60° = 8.' },
      { id: 'fl2', type: 'choice', prompt: 'What is dV in cylindrical coordinates?', options: ['dr dtheta dphi', 'rho drho dphi dz', 'r² sin(theta) dr dtheta dphi', 'dx dy'], answer: 'rho drho dphi dz', hint: 'An azimuthal arc has length rho dphi.', solution: 'dV = rho drho dphi dz.' },
      { id: 'fl3', type: 'choice', prompt: 'A vector field is exactly tangent to a surface. Its local flux is:', options: ['Maximum', 'Zero', 'Always negative', 'Undefined'], answer: 'Zero', hint: 'Compare the field with the normal.', solution: 'A tangent vector is perpendicular to the normal, so their dot product is zero.' },
      { id: 'fl4', type: 'explain', prompt: 'Explain why reversing a surface normal changes flux sign but not physical flow.', criteria: ['The area magnitude is unchanged', 'The dot product changes sign', 'Orientation is a mathematical convention'], solution: 'Changing n to -n reverses dS. The same physical crossing is then counted with the opposite sign.' },
      { id: 'fl5', type: 'choice', prompt: 'Which factor belongs in a spherical volume element?', options: ['rho only', 'r² sin(theta)', 'cos(phi)', 'No scale factor'], answer: 'r² sin(theta)', hint: 'Combine the two angular arc scale factors.', solution: 'dV = r² sin(theta) dr dtheta dphi.' },
      { id: 'fl6', type: 'number', prompt: 'The lecture rooftop flux is +4 m³/s for an upward normal. What is it for the downward normal?', answer: -4, tolerance: 0.0001, suffix: 'm³/s', hint: 'Reverse the area vector.', solution: 'Reversing the normal multiplies the flux by -1, giving -4 m³/s.' }
    ],
    keyResults: ['Geometry determines the differential element', 'Flux uses the normal component', 'Surface orientation fixes the sign', 'Units provide a strong correctness check']
  },

  'l0-field-operators': {
    id: 'l0-field-operators', lecture: 'L0', title: 'Nabla, gradient, divergence and curl', subtitle: 'Local derivatives reveal steepest change, sources, sinks and circulation.',
    objectives: ['Use nabla only on a field', 'Calculate Cartesian gradient', 'Calculate divergence and curl', 'Interpret operator output type', 'Read vector-field plots physically'],
    sections: [
      { title: 'Nabla is an operator', paragraphs: ['Nabla has vector form but becomes meaningful only when it operates on a scalar or vector field.'], equations: ['\\nabla=\\hat u_x\\frac{\\partial}{\\partial x}+\\hat u_y\\frac{\\partial}{\\partial y}+\\hat u_z\\frac{\\partial}{\\partial z}'], bullets: ['Gradient: scalar to vector', 'Divergence: vector to scalar', 'Curl: vector to vector'] },
      { title: 'Gradient gives steepest increase', paragraphs: ['The gradient direction is the direction of maximum increase. Its magnitude is the maximum rate of change. At a smooth hilltop the gradient is zero.'], equations: ['\\nabla f=\\frac{\\partial f}{\\partial x}\\hat u_x+\\frac{\\partial f}{\\partial y}\\hat u_y+\\frac{\\partial f}{\\partial z}\\hat u_z', 'h(x,y)=\\frac{10}{3}(2xy-3x^2-4y^2-18x+28y+12)', '\\nabla h=\\frac{10}{3}[(2y-6x-18)\\hat u_x+(2x-8y+28)\\hat u_y]'] },
      { title: 'Divergence measures local outgoingness', paragraphs: ['Positive divergence means more field leaves a tiny volume than enters. Negative divergence means convergence. Zero divergence does not mean the field itself is zero.'], equations: ['\\nabla\\cdot\\vec F=\\frac{\\partial F_x}{\\partial x}+\\frac{\\partial F_y}{\\partial y}+\\frac{\\partial F_z}{\\partial z}'], note: 'Divergence is used to describe local sources and sinks.' },
      { title: 'Curl measures local circulation', paragraphs: ['Curl magnitude measures circulation strength and its direction gives the circulation axis by the right-hand rule. A small paddle wheel spinning in a flow indicates nonzero curl.'], equations: ['\\nabla\\times\\vec F=(\\partial_yF_z-\\partial_zF_y)\\hat u_x+(\\partial_zF_x-\\partial_xF_z)\\hat u_y+(\\partial_xF_y-\\partial_yF_x)\\hat u_z'] }
    ],
    examples: [
      { title: 'Four fields, only one with divergence', prompt: 'Compare F = (y/4,0), F = (y/4,-x/4), F = (x/4,y/4), and constant F.', steps: [
        { text: 'The first depends on y but divergence differentiates F_x with respect to x.', equation: '\\nabla\\cdot(y/4,0)=0' },
        { text: 'Rotation can have zero divergence.', equation: '\\nabla\\cdot(y/4,-x/4)=0' },
        { text: 'The radial field has positive constant divergence.', equation: '\\nabla\\cdot(x/4,y/4)=1/4+1/4=1/2' },
        { text: 'A constant field has zero derivatives.', equation: '\\nabla\\cdot\\vec F_0=0' }
      ], check: 'Only the radial field has nonzero divergence in this group.' },
      { title: 'Curl of the shear field', prompt: 'For F = (y/4, 0, 0), find curl.', steps: [{ text: 'Only the z component survives.', equation: '(\\nabla\\times\\vec F)_z=\\partial_xF_y-\\partial_yF_x=0-1/4=-1/4' }], check: 'Negative z gives clockwise circulation when viewed from +z.' },
      { title: 'Find the stationary point of the lecture hill', prompt: 'Find where the gradient of the L0 height field is zero.', steps: [
        { text: 'Set both gradient components to zero.', equation: '2y-6x-18=0,\\qquad2x-8y+28=0' },
        { text: 'Solve the simultaneous equations.', equation: 'x=-2,\\qquad y=3' }
      ], check: 'Substitution makes both partial derivatives zero.' }
    ],
    questions: [
      { id: 'op1', type: 'choice', prompt: 'What type of quantity is the gradient of a scalar field?', options: ['Scalar', 'Vector', 'Matrix only', 'Always zero'], answer: 'Vector', hint: 'It must point toward steepest increase.', solution: 'Gradient has both magnitude and direction, so it is a vector.' },
      { id: 'op2', type: 'number', prompt: 'For F = (x/4, y/4, 0), calculate divergence.', answer: 0.5, tolerance: 0.0001, hint: 'Differentiate matching components with respect to matching coordinates.', solution: '1/4 + 1/4 + 0 = 1/2.' },
      { id: 'op3', type: 'number', prompt: 'For F = (y/4, 0, 0), calculate the z component of curl.', answer: -0.25, tolerance: 0.0001, hint: 'Use partial_x F_y - partial_y F_x.', solution: '0 - 1/4 = -1/4.' },
      { id: 'op4', type: 'explain', prompt: 'Explain how a field can have zero divergence but nonzero curl.', criteria: ['No net local source or sink', 'The field may still circulate', 'Divergence and curl measure different local behavior'], solution: 'A rotational field can move around a point without creating or destroying flow there. Its outgoing and incoming flux balance even while a paddle wheel spins.' },
      { id: 'op5', type: 'number', prompt: 'For f = x² + 3y, what is the magnitude of grad f at (2, -1)?', answer: 5, tolerance: 0.0001, hint: 'grad f = (2x, 3).', solution: 'At the point, grad f = (4, 3), whose magnitude is 5.' },
      { id: 'op6', type: 'choice', prompt: 'For F = (-y, x, 0), which pair is correct?', options: ['div = 0, curl_z = 2', 'div = 2, curl_z = 0', 'div = -2, curl_z = 0', 'div = 0, curl_z = 0'], answer: 'div = 0, curl_z = 2', hint: 'Differentiate matching components for divergence and crossed components for curl.', solution: 'Divergence is 0 + 0. Curl_z = partial_x(x) - partial_y(-y) = 1 - (-1) = 2.' }
    ],
    keyResults: ['Gradient points toward fastest increase', 'Divergence identifies local sources and sinks', 'Curl identifies local circulation', 'Zero divergence does not imply zero field or zero curl']
  },

  'l1-charge-coulomb': {
    id: 'l1-charge-coulomb', lecture: 'L1', title: 'Electric charge and Coulomb force', subtitle: 'Charge signs determine attraction or repulsion, while geometry determines direction and inverse-square strength.',
    objectives: ['State charge properties and units', 'Use elementary charge', 'Apply scalar and vector Coulomb law', 'Predict force direction', 'Use Newton third law and scaling'],
    sections: [
      { title: 'Charge is a property of matter', paragraphs: ['Electric charge is a property of elementary particles that enables electromagnetic interaction. It occurs in positive and negative types.', 'The SI unit is coulomb: 1 C = 1 A s. The smallest freely occurring magnitude is the elementary charge e = 1.602 × 10^-19 C. A neutral carbon atom has +6e in its nucleus and -6e in its electrons.'], equations: ['e=1.602\\times10^{-19}\\;\\mathrm C'] },
      { title: 'Coulomb observations', paragraphs: ['Like signs repel and opposite signs attract. The force lies along the line connecting two point charges.', 'Magnitude is directly proportional to both charge magnitudes and inversely proportional to squared separation.'], equations: ['F=\\frac{|q_1q_2|}{4\\pi\\epsilon_0r^2}', '\\epsilon_0=8.854\\times10^{-12}\\;\\mathrm{F/m}'] },
      { title: 'One vector equation handles both signs', paragraphs: ['For force on q1 caused by q2, construct the vector from q2 to q1. The product q1q2 automatically reverses direction for opposite signs.'], equations: ['\\vec F_{21}=\\frac{q_2q_1}{4\\pi\\epsilon_0|\\vec r_1-\\vec r_2|^3}(\\vec r_1-\\vec r_2)', '\\vec F_{12}=-\\vec F_{21}'], note: 'The L1 slide line for opposite charges incorrectly prints q1q2 > 0. Opposite signs require q1q2 < 0.' },
      { title: 'Scaling before arithmetic', paragraphs: ['Doubling either charge doubles force. Doubling distance reduces force to one quarter. Tripling distance reduces force to one ninth. These predictions are mandatory checks.'] }
    ],
    examples: [
      { title: 'Attractive force magnitude', prompt: 'q1 = +2 microC and q2 = -3 microC are 0.5 m apart.', steps: [
        { text: 'The signs predict attraction.' },
        { text: 'Calculate magnitude.', equation: 'F=(8.987\\times10^9)\\frac{(2\\times10^{-6})(3\\times10^{-6})}{0.5^2}=0.216\\;\\mathrm N' },
        { text: 'Assign direction toward the other charge for each force.' }
      ], check: 'The forces have equal magnitude and opposite direction.' },
      { title: 'Inverse-square comparison', prompt: 'The separation grows from r to 3r.', steps: [{ text: 'Apply the ratio before calculating.', equation: '\\frac{F(3r)}{F(r)}=\\frac{r^2}{(3r)^2}=\\frac19' }], check: 'Force becomes nine times smaller.' },
      { title: 'Neutral carbon still contains charge', prompt: 'Show why a neutral carbon atom has zero net charge without having zero charged particles.', steps: [
        { text: 'The nucleus contains six positive elementary charges.', equation: 'q_+=+6e' },
        { text: 'The electrons contain six negative elementary charges.', equation: 'q_-=-6e' },
        { text: 'Add signed charge.', equation: 'q_\\mathrm{net}=+6e-6e=0' }
      ], check: 'Neutral means balanced positive and negative charge, not absence of charge carriers.' }
    ],
    questions: [
      { id: 'cq1', type: 'choice', prompt: 'Two charges have opposite signs. The force is:', options: ['Repulsive', 'Attractive', 'Perpendicular to the connecting line', 'Always zero'], answer: 'Attractive', hint: 'Opposite signs pull together.', solution: 'Each charge is forced toward the other.' },
      { id: 'cq2', type: 'number', prompt: 'If separation triples, by what factor is the force divided?', answer: 9, tolerance: 0.0001, hint: 'Coulomb force varies as 1/r².', solution: 'The denominator becomes 3² = 9.' },
      { id: 'cq3', type: 'number', prompt: 'Approximately how many elementary charges make 1 coulomb? Enter in scientific notation.', answer: 6.242e18, tolerance: 1e16, hint: 'Calculate 1/e.', solution: '1/(1.602 × 10^-19) ≈ 6.242 × 10^18.' },
      { id: 'cq4', type: 'explain', prompt: 'Explain how the vector Coulomb equation produces attraction without manually inserting a direction rule.', criteria: ['The separation vector points source to observation', 'Opposite signs make q1q2 negative', 'The negative scalar reverses the vector'], solution: 'The geometry vector points from q2 to q1. When q1q2 is negative, the force reverses and points from q1 toward q2.' },
      { id: 'cq5', type: 'number', prompt: 'One charge doubles while separation also doubles. By what factor does Coulomb force change?', answer: 0.5, tolerance: 0.0001, hint: 'Combine the charge factor 2 with distance factor 1/4.', solution: 'The net factor is 2/4 = 1/2.' },
      { id: 'cq6', type: 'choice', prompt: 'How are F12 and F21 related?', options: ['They are identical vectors', 'They have equal magnitude and opposite direction', 'One is always larger', 'They are perpendicular'], answer: 'They have equal magnitude and opposite direction', hint: 'Use Newton third law.', solution: 'The mutual forces form an action-reaction pair.' }
    ],
    keyResults: ['Same signs repel and opposite signs attract', 'Force follows 1/r²', 'The signed vector equation handles direction', 'Action and reaction are equal and opposite']
  },

  'l1-superposition': {
    id: 'l1-superposition', lecture: 'L1', title: 'Multiple charges and superposition', subtitle: 'Calculate each source contribution independently, then add vectors component by component.',
    objectives: ['Identify source and observation charges', 'Construct every source-to-observation vector', 'Apply superposition', 'Separate geometry from charge signs', 'Check components, units and direction'],
    sections: [
      { title: 'Superposition is linear addition', paragraphs: ['Each charge creates its force independently of the others. The total force is the vector sum of individual contributions.'], equations: ['\\vec F_j=\\frac{q_j}{4\\pi\\epsilon_0}\\sum_{i\\ne j}\\frac{q_i(\\vec r_j-\\vec r_i)}{|\\vec r_j-\\vec r_i|^3}'] },
      { title: 'Five-step workflow', paragraphs: ['A reliable solution keeps source and observation roles explicit.'], bullets: ['Write position vectors of known source charges', 'Identify observed charge qj and position rj', 'Construct rj - ri from each source to observation', 'Calculate every separation magnitude', 'Substitute, calculate contributions and add components'] },
      { title: 'Units and structure', paragraphs: ['Charge is in coulombs, separation in metres and force in newtons. The cubic magnitude in the denominator combines with one separation vector in the numerator to produce inverse-square magnitude.'] },
      { title: 'Symmetry can replace calculation', paragraphs: ['Equal sources at symmetric positions can cancel selected components. Predict cancellation before computing to catch sign errors.'] }
    ],
    examples: [
      { title: 'Lecture three-charge example', prompt: 'q1 = 0.6 microC at (0,0,0) cm, q2 = -0.8 microC at (0,3,0) cm and q3 = -0.4 microC at (4,3,0) cm. Find force on q3.', steps: [
        { text: 'Construct separations.', equation: '\\vec r_3-\\vec r_1=(4,3,0)\\;\\mathrm{cm},\\quad|\\vec r_3-\\vec r_1|=5\\;\\mathrm{cm}' },
        { text: 'Second separation.', equation: '\\vec r_3-\\vec r_2=(4,0,0)\\;\\mathrm{cm},\\quad|\\vec r_3-\\vec r_2|=4\\;\\mathrm{cm}' },
        { text: 'Add the two vector forces.', equation: '\\vec F_3\\approx(1.11\\hat u_x-0.52\\hat u_y)\\;\\mathrm N' }
      ], check: 'q1 attracts q3 down-left, while q2 repels q3 to the right. The final x component is positive and y component negative.' },
      { title: 'Symmetric cancellation', prompt: 'Equal positive charges sit at x = -a and x = +a. Find electric force on a positive charge at the origin.', steps: [{ text: 'The two magnitudes are equal and directions opposite.', equation: '\\vec F_\\mathrm{total}=0' }], check: 'Zero results from symmetry, not from absence of individual forces.' },
      { title: 'Symmetric sources above the midpoint', prompt: 'Equal positive sources are at x = -a and x = +a. An observation point lies on the positive y axis.', steps: [
        { text: 'The distances and contribution magnitudes are equal.' },
        { text: 'The x components are opposite and cancel.', equation: 'E_x=0' },
        { text: 'Both y components point upward and add.', equation: 'E_y=2E_1\\cos\\alpha' }
      ], check: 'The result must lie on the symmetry axis.' }
    ],
    questions: [
      { id: 'sp1', type: 'choice', prompt: 'For contribution from source qi to observation qj, the separation vector is:', options: ['ri - rj', 'rj - ri', 'ri + rj', '|rj|'], answer: 'rj - ri', hint: 'Start at the source and end at observation.', solution: 'Endpoint minus start gives rj - ri.' },
      { id: 'sp2', type: 'number', prompt: 'Two equal and opposite force components are +4 N and -4 N along x. What is their total x component?', answer: 0, tolerance: 0.0001, hint: 'Superposition is signed vector addition.', solution: '+4 + (-4) = 0.' },
      { id: 'sp3', type: 'choice', prompt: 'When may individual force magnitudes be added directly?', options: ['Always', 'Only when all contributions point along the same direction', 'Only for negative charges', 'Never'], answer: 'Only when all contributions point along the same direction', hint: 'Force is a vector.', solution: 'Magnitudes alone may be added only when directions are already identical.' },
      { id: 'sp4', type: 'explain', prompt: 'Describe two checks that should be made before accepting a many-charge result.', criteria: ['Compare direction with attraction and repulsion predictions', 'Check symmetry or limiting behavior', 'Check units and inverse-square scale'], solution: 'A strong solution checks sign-based directions, symmetry or cancellation, units and whether distance scaling is physically plausible.' },
      { id: 'sp5', type: 'number', prompt: 'Perpendicular force components are 3 N and 4 N. What is the resultant magnitude?', answer: 5, tolerance: 0.0001, suffix: 'N', hint: 'Use the magnitude of the component vector.', solution: 'sqrt(3² + 4²) = 5 N.' },
      { id: 'sp6', type: 'choice', prompt: 'Why does the vector Coulomb form contain a cubic separation magnitude?', options: ['It produces inverse-square magnitude after multiplying by the separation vector', 'Force actually follows inverse cube', 'It removes charge signs', 'It changes newtons to coulombs'], answer: 'It produces inverse-square magnitude after multiplying by the separation vector', hint: 'The numerator vector itself has one factor of distance.', solution: 'The separation vector contributes magnitude r, so r/r³ = 1/r².' }
    ],
    keyResults: ['Treat every source separately', 'Use one observation point consistently', 'Add vectors, not magnitudes', 'Predict symmetry and direction before arithmetic']
  },

  'l1-electric-field': {
    id: 'l1-electric-field', lecture: 'L1', title: 'Electric field, point charges and field lines', subtitle: 'The field describes what source charges establish in space before a test charge is placed there.',
    objectives: ['Distinguish field from force', 'Calculate point-charge field', 'Handle negative test charges', 'Interpret field vectors and field lines', 'Identify impossible field-line diagrams'],
    sections: [
      { title: 'Field removes the observation charge', paragraphs: ['Dividing force on a test charge by that charge defines electric field. The field is created by source charges and exists even if no test charge is present.'], equations: ['\\vec E(\\vec r)=\\frac{\\vec F}{q_\\mathrm{test}}', '\\vec F=q_\\mathrm{test}\\vec E'], note: 'A positive test charge feels force along E. A negative test charge feels force opposite E.' },
      { title: 'Point-charge field', paragraphs: ['A point charge at the origin creates a spherically symmetric field. Positive source charge points outward and negative source charge points inward.'], equations: ['\\vec E(\\vec r)=\\frac{q}{4\\pi\\epsilon_0r^2}\\hat u_r', '|\\vec E|=\\frac{|q|}{4\\pi\\epsilon_0r^2}'], bullets: ['Units: N/C = V/m', 'Doubling source charge doubles field', 'Doubling distance reduces field to one quarter'] },
      { title: 'Field lines are a representation', paragraphs: ['A field-line tangent gives field direction. Line density represents magnitude. Lines start on positive charge and terminate on negative charge.', 'Field lines never intersect because the field at one point cannot have two directions. Between charges they are continuous.'], note: 'Arrow length represents magnitude in vector plots. Line density represents magnitude in field-line plots.' },
      { title: 'Field and force must not be confused', paragraphs: ['The field direction is defined using a positive test charge. The force direction additionally depends on the sign of the actual charge placed in the field.'] }
    ],
    examples: [
      { title: 'Point-charge field magnitude', prompt: 'Find field 0.30 m from a +2 nC point charge.', steps: [{ text: 'Use point-charge magnitude.', equation: 'E=(8.987\\times10^9)\\frac{2\\times10^{-9}}{0.30^2}=199.7\\;\\mathrm{N/C}' }, { text: 'Positive source means outward direction.' }], check: 'At twice the distance, the result would be one quarter as large.' },
      { title: 'Force on a negative charge', prompt: 'An electric field points upward and a charge q = -3 nC is placed there.', steps: [{ text: 'Multiply by signed charge.', equation: '\\vec F=q\\vec E' }, { text: 'Negative q reverses the direction, so force points downward.' }], check: 'Field direction itself does not change when the test charge changes.' },
      { title: 'Convert field into force', prompt: 'A uniform field is 500 u_x N/C. Find the force on q = -2 microC.', steps: [
        { text: 'Use the signed test charge.', equation: '\\vec F=q\\vec E=(-2\\times10^{-6})(500\\hat u_x)' },
        { text: 'Simplify magnitude and direction.', equation: '\\vec F=-1.0\\times10^{-3}\\hat u_x\\;\\mathrm N' }
      ], check: 'The negative charge makes force point opposite the field.' }
    ],
    questions: [
      { id: 'ef1', type: 'choice', prompt: 'A field points upward. What is the force direction on a negative charge?', options: ['Upward', 'Downward', 'Right', 'Zero'], answer: 'Downward', hint: 'Use signed q in F = qE.', solution: 'A negative charge reverses the field direction.' },
      { id: 'ef2', type: 'number', prompt: 'Approximately what is E in N/C at 0.30 m from +2 nC?', answer: 199.7, tolerance: 1, hint: 'Use kq/r².', solution: 'E ≈ 199.7 N/C.' },
      { id: 'ef3', type: 'choice', prompt: 'Which field-line diagram is impossible?', options: ['Lines radiate from a positive charge', 'Lines terminate on a negative charge', 'Two field lines intersect', 'Line density increases where field is stronger'], answer: 'Two field lines intersect', hint: 'A field has one direction at one point.', solution: 'An intersection would assign two directions to the same field point.' },
      { id: 'ef4', type: 'explain', prompt: 'Explain why electric field can be evaluated where no charge is placed.', criteria: ['Source charges create the field', 'A test charge only probes the field', 'Removing the test charge does not remove the source configuration'], solution: 'The source charges establish E throughout space. A test charge is only a hypothetical probe used to define or measure it.' },
      { id: 'ef5', type: 'choice', prompt: 'Which way does the electric field of a negative point charge point?', options: ['Radially inward', 'Radially outward', 'Azimuthally', 'It has no direction'], answer: 'Radially inward', hint: 'Field direction follows the force on a positive test charge.', solution: 'A positive test charge is attracted toward a negative source.' },
      { id: 'ef6', type: 'number', prompt: 'If observation distance is halved, by what factor does point-charge field magnitude increase?', answer: 4, tolerance: 0.0001, hint: 'Use inverse-square scaling.', solution: '1/(r/2)² is four times 1/r².' }
    ],
    keyResults: ['E belongs to the source configuration', 'F = qE uses the signed test charge', 'Point-charge field is radial and inverse square', 'Field lines encode direction by tangent and magnitude by density']
  },

  'l1-distributions': {
    id: 'l1-distributions', lecture: 'L1', title: 'Continuous charge distributions', subtitle: 'Replace a sum over point charges with an integral over infinitesimal charge elements.',
    objectives: ['Distinguish lambda, sigma and rho', 'Construct dq from geometry', 'Separate source r prime from observation r', 'Build line, surface and volume field integrals', 'Use units and symmetry to check setup'],
    sections: [
      { title: 'Three charge densities', paragraphs: ['Continuous charge is described by charge per length, area or volume. The geometry determines which density and differential element belong together.'], equations: ['dq=\\lambda(\\vec r\u0027)\\,dl', 'dq=\\sigma(\\vec r\u0027)\\,dS', 'dq=\\rho(\\vec r\u0027)\\,dV'], bullets: ['lambda: C/m', 'sigma: C/m²', 'rho: C/m³'] },
      { title: 'One charge element acts like a point charge', paragraphs: ['The source element is located at r prime. The field is evaluated at observation point r. Every contribution points along r - r prime, with charge sign included.'], equations: ['d\\vec E=\\frac{dq}{4\\pi\\epsilon_0|\\vec r-\\vec r\u0027|^3}(\\vec r-\\vec r\u0027)'] },
      { title: 'Integrate over the source only', paragraphs: ['The integration variables describe source locations. The observation point remains fixed while all source elements are summed.'], equations: ['\\vec E(\\vec r)=\\frac{1}{4\\pi\\epsilon_0}\\int_L\\frac{\\lambda(\\vec r\u0027)(\\vec r-\\vec r\u0027)}{|\\vec r-\\vec r\u0027|^3}\\,dl', '\\vec E(\\vec r)=\\frac{1}{4\\pi\\epsilon_0}\\iint_S\\frac{\\sigma(\\vec r\u0027)(\\vec r-\\vec r\u0027)}{|\\vec r-\\vec r\u0027|^3}\\,dS', '\\vec E(\\vec r)=\\frac{1}{4\\pi\\epsilon_0}\\iiint_V\\frac{\\rho(\\vec r\u0027)(\\vec r-\\vec r\u0027)}{|\\vec r-\\vec r\u0027|^3}\\,dV'] },
      { title: 'Symmetry before integration', paragraphs: ['Pair source elements related by symmetry. Their unwanted components often cancel while desired components add. This can reduce a vector integral to one scalar component.'] }
    ],
    examples: [
      { title: 'Small line-charge element', prompt: 'A uniform wire has lambda = 3 microC/m. Find charge in dl = 2 cm.', steps: [{ text: 'Convert length to metres.', equation: 'dl=0.02\\;\\mathrm m' }, { text: 'Use dq = lambda dl.', equation: 'dq=(3\\times10^{-6})(0.02)=6\\times10^{-8}\\;\\mathrm C=60\\;\\mathrm{nC}' }], check: 'C/m times m gives C.' },
      { title: 'Disc surface element', prompt: 'Build dq for a circular disc in cylindrical coordinates.', steps: [{ text: 'Use the area element in the xy plane.', equation: 'dS=\\rho\\,d\\rho\\,d\\phi' }, { text: 'Multiply by surface density.', equation: 'dq=\\sigma\\rho\\,d\\rho\\,d\\phi' }], check: 'Integrating phi from 0 to 2pi and rho from 0 to R gives total charge sigma pi R².' },
      { title: 'Total charge of a uniform wire segment', prompt: 'A 0.50 m wire has constant lambda = 4 microC/m. Find its total charge.', steps: [
        { text: 'Integrate density over length.', equation: 'Q=\\int_L\\lambda\\,dl=\\lambda L' },
        { text: 'Insert the uniform values.', equation: 'Q=(4\\;\\mathrm{\\mu C/m})(0.50\\;\\mathrm m)=2\\;\\mathrm{\\mu C}' }
      ], check: 'Length cancels the per-metre unit.' }
    ],
    questions: [
      { id: 'cd1', type: 'choice', prompt: 'Which expression gives dq for a surface charge?', options: ['lambda dl', 'sigma dS', 'rho dV', 'sigma dV'], answer: 'sigma dS', hint: 'Surface density has units C/m².', solution: 'Multiplying sigma by area produces charge.' },
      { id: 'cd2', type: 'number', prompt: 'A wire has lambda = 3 microC/m. How many nC lie in 2 cm?', answer: 60, tolerance: 0.001, suffix: 'nC', hint: 'Convert 2 cm to 0.02 m.', solution: '3 microC/m × 0.02 m = 0.06 microC = 60 nC.' },
      { id: 'cd3', type: 'choice', prompt: 'During integration, which position remains fixed?', options: ['Source r prime', 'Observation r', 'Both must vary', 'Neither exists'], answer: 'Observation r', hint: 'The field is requested at one chosen point.', solution: 'Source coordinates vary through the distribution while observation r stays fixed.' },
      { id: 'cd4', type: 'explain', prompt: 'Explain why symmetry should be used before evaluating a charge integral.', criteria: ['Paired elements can cancel components', 'The surviving field direction can be predicted', 'The vector integral becomes simpler'], solution: 'Symmetry reveals which components cancel in pairs and which add, often leaving only one component to integrate.' },
      { id: 'cd5', type: 'choice', prompt: 'What are the SI units of volume charge density rho?', options: ['C/m', 'C/m²', 'C/m³', 'N/C'], answer: 'C/m³', hint: 'It is charge per volume.', solution: 'Volume charge density is measured in coulombs per cubic metre.' },
      { id: 'cd6', type: 'number', prompt: 'A patch has sigma = 2 microC/m² and area 3 cm². How much charge does it carry in nC?', answer: 0.6, tolerance: 0.001, suffix: 'nC', hint: '3 cm² equals 3 × 10^-4 m².', solution: 'Q = 2 × 10^-6 × 3 × 10^-4 C = 6 × 10^-10 C = 0.6 nC.' }
    ],
    keyResults: ['Density times geometric element gives dq', 'r prime labels source and r labels observation', 'Integrate over source coordinates', 'Use symmetry before algebra']
  },

  'l1-ring-disc-plane': {
    id: 'l1-ring-disc-plane', lecture: 'L1', title: 'Fields of a ring, disc and infinite plane', subtitle: 'Axial symmetry removes transverse components and turns distributed sources into tractable integrals.',
    objectives: ['Derive the ring-axis field', 'Derive the disc-axis field', 'Explain component cancellation', 'Take far and infinite-plane limits', 'Handle field direction above and below a surface'],
    sections: [
      { title: 'Charged ring on its axis', paragraphs: ['Place a ring of radius R in the xy plane and observe at z on its axis. Every element has a partner whose radial component cancels. All axial components add.'], equations: ['\\vec r=z\\hat u_z,\\quad\\vec r\u0027=R\\hat u_\\rho', '\\vec r-\\vec r\u0027=-R\\hat u_\\rho+z\\hat u_z', '\\vec E(z)=\\frac{\\lambda zR}{2\\epsilon_0(z^2+R^2)^{3/2}}\\hat u_z'], note: 'With total ring charge Q = 2pi R lambda, this is kQz/(z²+R²)^(3/2).' },
      { title: 'Charged disc as concentric rings', paragraphs: ['For a disc, use dS = rho drho dphi. Radial components cancel after azimuthal integration, leaving only z.'], equations: ['\\vec E(z)=\\frac{\\sigma z}{2\\epsilon_0}\\left[\\frac{1}{\\sqrt{z^2}}-\\frac{1}{\\sqrt{z^2+R^2}}\\right]\\hat u_z', '\\vec E(z>0)=\\frac{\\sigma}{2\\epsilon_0}\\left(1-\\frac{z}{\\sqrt{z^2+R^2}}\\right)\\hat u_z'], note: 'The simplified second formula assumes z > 0. Below the disc, direction reverses for positive sigma.' },
      { title: 'Infinite-plane limit', paragraphs: ['When R tends to infinity, the edge becomes irrelevant and field magnitude no longer depends on distance. The field is perpendicular to the plane on both sides.'], equations: ['|\\vec E|=\\frac{|\\sigma|}{2\\epsilon_0}'], bullets: ['Positive sigma points away from the plane', 'Negative sigma points toward the plane', 'No z dependence remains'] },
      { title: 'Limiting checks', paragraphs: ['At the ring centre z = 0, ring field is zero by symmetry. Far from a finite ring or disc, the source behaves like a point charge with the same total charge. Near a very large disc, the field approaches the infinite-plane result.'] }
    ],
    examples: [
      { title: 'Ring derivation', prompt: 'Derive the axial field of a ring with constant lambda.', steps: [
        { text: 'Start from one element.', equation: 'd\\vec E=\\frac{\\lambda\\,dl}{4\\pi\\epsilon_0(z^2+R^2)^{3/2}}(-R\\hat u_\\rho+z\\hat u_z)' },
        { text: 'Cancel radial components by symmetry.', equation: 'dE_z=\\frac{\\lambda z\\,dl}{4\\pi\\epsilon_0(z^2+R^2)^{3/2}}' },
        { text: 'Integrate dl around the circumference.', equation: 'E_z=\\frac{\\lambda z}{4\\pi\\epsilon_0(z^2+R^2)^{3/2}}(2\\pi R)' },
        { text: 'Simplify.', equation: '\\vec E=\\frac{\\lambda zR}{2\\epsilon_0(z^2+R^2)^{3/2}}\\hat u_z' }
      ], check: 'The result is zero at z = 0 and changes sign below the ring.' },
      { title: 'Disc to plane', prompt: 'Take R to infinity in the disc field for z > 0.', steps: [{ text: 'The second term vanishes.', equation: '\\lim_{R\\to\\infty}\\frac{z}{\\sqrt{z^2+R^2}}=0' }, { text: 'The remaining field is constant.', equation: '\\vec E=\\frac{\\sigma}{2\\epsilon_0}\\hat u_z' }], check: 'Distance disappears only for the infinite plane, not a finite disc.' },
      { title: 'Far-field reduction of a ring', prompt: 'Show how the ring field becomes a point-charge field when z is much larger than R.', steps: [
        { text: 'Use total charge Q = 2 pi R lambda.', equation: 'E_z=\\frac{1}{4\\pi\\epsilon_0}\\frac{Qz}{(z^2+R^2)^{3/2}}' },
        { text: 'For z much larger than R, the denominator approaches z cubed.', equation: 'E_z\\approx\\frac{1}{4\\pi\\epsilon_0}\\frac{Q}{z^2}' }
      ], check: 'This is exactly the point-charge magnitude at distance z.' }
    ],
    questions: [
      { id: 'rd1', type: 'number', prompt: 'What is the electric field magnitude at the exact centre of a uniformly charged ring?', answer: 0, tolerance: 0.0001, hint: 'Pair opposite charge elements.', solution: 'Every contribution is cancelled by the opposite element at the centre.' },
      { id: 'rd2', type: 'choice', prompt: 'Which components survive on the symmetry axis of a charged ring?', options: ['Only radial', 'Only axial', 'Only azimuthal', 'All components'], answer: 'Only axial', hint: 'Opposite ring elements cancel sideways components.', solution: 'All transverse components cancel, leaving the z component.' },
      { id: 'rd3', type: 'choice', prompt: 'How does infinite-plane field magnitude depend on distance?', options: ['1/z', '1/z²', 'It is constant', 'It grows with z'], answer: 'It is constant', hint: 'Take R to infinity in the disc formula.', solution: 'The infinite-plane result is |sigma|/(2 epsilon0), with no z dependence.' },
      { id: 'rd4', type: 'explain', prompt: 'Explain why a finite ring looks like a point charge far away.', criteria: ['Distance is much larger than source size', 'Detailed source geometry becomes negligible', 'Total charge controls the leading field'], solution: 'When z is much larger than R, all elements are nearly the same distance and direction from the observer. The leading term is the point-charge field of total Q.' },
      { id: 'rd5', type: 'choice', prompt: 'For positive sigma, which way does the disc field point directly below the disc?', options: ['Negative z', 'Positive z', 'Radially outward in the plane', 'It is always zero'], answer: 'Negative z', hint: 'A positive surface field points away on both sides.', solution: 'Below the disc, away from the positively charged surface is the negative z direction.' },
      { id: 'rd6', type: 'number', prompt: 'An infinite-plane field is measured at distance d. What is the ratio E(2d)/E(d)?', answer: 1, tolerance: 0.0001, hint: 'The infinite-plane magnitude contains no distance.', solution: 'The field magnitude is constant, so the ratio is one.' }
    ],
    keyResults: ['Symmetry cancels transverse components', 'Ring field is zero at its centre', 'A finite source becomes point-like far away', 'Infinite-plane field is constant and normal to the plane']
  }
}
