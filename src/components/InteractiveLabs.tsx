import { useMemo, useState, type ReactNode } from 'react'

import { Equation } from './Equation'

interface InteractiveLabsProps {
  topicId: string
}

const COULOMB_CONSTANT = 8.9875517923e9

function chargeClass(charge: number) {
  if (charge > 0) return 'charge charge--positive'
  if (charge < 0) return 'charge charge--negative'
  return 'charge charge--neutral'
}

function chargeSymbol(charge: number) {
  if (charge > 0) return '+'
  if (charge < 0) return '−'
  return '0'
}

function RangeControl({ label, min, max, step = 1, value, onChange }: { label: string; min: number; max: number; step?: number; value: number; onChange: (value: number) => void }) {
  return (
    <label className="range-control">
      <span>{label}</span>
      <input min={min} max={max} onChange={(event) => onChange(Number(event.target.value))} step={step} type="range" value={value} />
      <output>{Number.isInteger(value) ? value : value.toFixed(2)}</output>
    </label>
  )
}

function LabShell({ title, instruction, children, controls }: { title: string; instruction: string; children: ReactNode; controls: ReactNode }) {
  return (
    <section className="interactive-lab">
      <div className="interactive-lab__heading">
        <div>
          <span className="eyebrow">Interactive diagram</span>
          <h2>{title}</h2>
          <p>{instruction}</p>
        </div>
        <span className="live-badge">Live model</span>
      </div>
      <div className="interactive-lab__layout">
        <div className="lab-canvas">{children}</div>
        <div className="lab-controls">{controls}</div>
      </div>
    </section>
  )
}

function VectorFoundationsLab() {
  const [qx, setQx] = useState(4)
  const [qy, setQy] = useState(2)
  const px = 1
  const py = -2
  const dx = qx - px
  const dy = qy - py
  const magnitude = Math.hypot(dx, dy)

  return (
    <LabShell
      title="Build a displacement vector"
      instruction="Move Q. Watch endpoint minus start determine the components, magnitude and unit direction."
      controls={<>
        <RangeControl label="Q x coordinate" min={-4} max={6} value={qx} onChange={setQx} />
        <RangeControl label="Q y coordinate" min={-4} max={6} value={qy} onChange={setQy} />
        <div className="lab-result"><Equation>{`\\overrightarrow{PQ}=(${dx},${dy})`}</Equation><br /><Equation>{`|\\overrightarrow{PQ}|=${magnitude.toFixed(2)}`}</Equation><br />{magnitude > 0 && <Equation>{`\\hat u_{PQ}=(${(dx / magnitude).toFixed(2)},${(dy / magnitude).toFixed(2)})`}</Equation>}</div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive displacement vector">
        <defs><marker id="v-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" /></marker></defs>
        <path d="M50 180 H480 M260 330 V30" className="lab-axis" />
        <line x1={260 + px * 35} y1={180 - py * 35} x2={260 + qx * 35} y2={180 - qy * 35} className="lab-vector" markerEnd="url(#v-arrow)" />
        <circle cx={260 + px * 35} cy={180 - py * 35} r="7" className="lab-point" /><text x={270 + px * 35} y={200 - py * 35}>P ({px}, {py})</text>
        <circle cx={260 + qx * 35} cy={180 - qy * 35} r="7" className="lab-point lab-point--accent" /><text x={270 + qx * 35} y={170 - qy * 35}>Q ({qx}, {qy})</text>
      </svg>
    </LabShell>
  )
}

function VectorProductsLab() {
  const [angle, setAngle] = useState(60)
  const [magnitudeA, setMagnitudeA] = useState(4)
  const [magnitudeB, setMagnitudeB] = useState(3)
  const radians = angle * Math.PI / 180
  const dot = magnitudeA * magnitudeB * Math.cos(radians)
  const cross = magnitudeA * magnitudeB * Math.sin(radians)
  const lengthA = magnitudeA * 35
  const lengthB = magnitudeB * 35

  return (
    <LabShell title="Rotate one vector" instruction="Change angle and magnitudes. Compare cosine projection with sine area."
      controls={<>
        <RangeControl label="Angle theta in degrees" min={0} max={180} value={angle} onChange={setAngle} />
        <RangeControl label="Magnitude A" min={1} max={6} value={magnitudeA} onChange={setMagnitudeA} />
        <RangeControl label="Magnitude B" min={1} max={6} value={magnitudeB} onChange={setMagnitudeB} />
        <div className="lab-result"><Equation>{`A\\cdot B=${dot.toFixed(2)}`}</Equation><br /><Equation>{`|A\\times B|=${cross.toFixed(2)}`}</Equation><p>{dot > 0.01 ? 'Acute angle: positive alignment.' : dot < -0.01 ? 'Obtuse angle: negative alignment.' : 'Perpendicular: zero dot product.'}</p></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive dot and cross product geometry">
        <defs><marker id="p-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" /></marker></defs>
        <path d="M90 270 H460" className="lab-axis" />
        <line x1="130" y1="270" x2={130 + lengthA} y2="270" className="lab-vector" markerEnd="url(#p-arrow)" />
        <line x1="130" y1="270" x2={130 + lengthB * Math.cos(radians)} y2={270 - lengthB * Math.sin(radians)} className="lab-vector lab-vector--accent" markerEnd="url(#p-arrow)" />
        <path d={`M190 270 A60 60 0 0 0 ${130 + 60 * Math.cos(radians)} ${270 - 60 * Math.sin(radians)}`} className="lab-angle" />
        <text x="300" y="295">A</text><text x={145 + lengthB * Math.cos(radians)} y={255 - lengthB * Math.sin(radians)}>B</text><text x="185" y="245">{angle}°</text>
      </svg>
    </LabShell>
  )
}

function CoordinateLab() {
  const [x, setX] = useState(1)
  const [y, setY] = useState(3)
  const [z, setZ] = useState(-2)
  const rho = Math.hypot(x, y)
  const r = Math.hypot(x, y, z)
  const phi = Math.atan2(y, x) * 180 / Math.PI
  const theta = r === 0 ? 0 : Math.acos(z / r) * 180 / Math.PI

  return (
    <LabShell title="Describe one point three ways" instruction="Move the Cartesian point and inspect the cylindrical and spherical coordinates."
      controls={<>
        <RangeControl label="x" min={-4} max={4} value={x} onChange={setX} />
        <RangeControl label="y" min={-4} max={4} value={y} onChange={setY} />
        <RangeControl label="z" min={-4} max={4} value={z} onChange={setZ} />
        <div className="lab-result"><strong>Cylindrical</strong><p>rho = {rho.toFixed(2)}, phi = {phi.toFixed(1)}°, z = {z}</p><strong>Spherical</strong><p>r = {r.toFixed(2)}, theta = {theta.toFixed(1)}°, phi = {phi.toFixed(1)}°</p></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive coordinate conversion">
        <defs><marker id="c-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" /></marker></defs>
        <path d="M260 285 L470 285 M260 285 L85 330 M260 285 V35" className="lab-axis" />
        <line x1="260" y1="285" x2={260 + x * 28 + y * 12} y2={285 - z * 38 - y * 10} className="lab-vector" markerEnd="url(#c-arrow)" />
        <circle cx={260 + x * 28 + y * 12} cy={285 - z * 38 - y * 10} r="8" className="lab-point lab-point--accent" />
        <text x="474" y="300">x</text><text x="70" y="340">y</text><text x="250" y="28">z</text>
        <text x={275 + x * 28 + y * 12} y={278 - z * 38 - y * 10}>({x}, {y}, {z})</text>
      </svg>
    </LabShell>
  )
}

function FluxLab() {
  const [angle, setAngle] = useState(30)
  const [field, setField] = useState(5)
  const [area, setArea] = useState(3)
  const radians = angle * Math.PI / 180
  const flux = field * area * Math.cos(radians)

  return (
    <LabShell title="Tilt the field relative to the normal" instruction="Only the normal projection crosses the surface."
      controls={<>
        <RangeControl label="Angle to normal" min={0} max={180} value={angle} onChange={setAngle} />
        <RangeControl label="Field magnitude" min={0} max={10} value={field} onChange={setField} />
        <RangeControl label="Area" min={1} max={8} value={area} onChange={setArea} />
        <div className="lab-result"><Equation>{`\\Phi=FS\\cos\\theta=${flux.toFixed(2)}`}</Equation><p>{flux > 0.01 ? 'Positive crossing along the chosen normal.' : flux < -0.01 ? 'Crossing opposite the chosen normal.' : 'Zero normal crossing.'}</p></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive flux through a surface">
        <defs><marker id="f-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" /></marker></defs>
        <polygon points="110,250 360,250 430,175 180,175" className="lab-surface" />
        <line x1="270" y1="215" x2="270" y2="65" className="lab-normal" markerEnd="url(#f-arrow)" />
        <line x1="270" y1="215" x2={270 + 150 * Math.sin(radians)} y2={215 - 150 * Math.cos(radians)} className="lab-vector lab-vector--accent" markerEnd="url(#f-arrow)" />
        <text x="280" y="70">n</text><text x={285 + 150 * Math.sin(radians)} y={215 - 150 * Math.cos(radians)}>F</text>
      </svg>
    </LabShell>
  )
}

type FieldKind = 'constant' | 'source' | 'sink' | 'rotation' | 'shear'

function FieldOperatorLab() {
  const [kind, setKind] = useState<FieldKind>('source')
  const fieldInfo: Record<FieldKind, { divergence: string; curl: string; label: string }> = {
    constant: { divergence: '0', curl: '0', label: 'Constant translation' },
    source: { divergence: '+2', curl: '0', label: 'Radial source' },
    sink: { divergence: '-2', curl: '0', label: 'Radial sink' },
    rotation: { divergence: '0', curl: '+2 u_z', label: 'Rigid rotation' },
    shear: { divergence: '0', curl: '-1 u_z', label: 'Shear flow' }
  }
  const arrows = useMemo(() => {
    const points: Array<{ x: number; y: number; dx: number; dy: number }> = []
    for (let x = -3; x <= 3; x += 1) {
      for (let y = -3; y <= 3; y += 1) {
        let dx = 1
        let dy = 0.5
        if (kind === 'source') { dx = x; dy = y }
        if (kind === 'sink') { dx = -x; dy = -y }
        if (kind === 'rotation') { dx = -y; dy = x }
        if (kind === 'shear') { dx = y; dy = 0 }
        const length = Math.hypot(dx, dy) || 1
        points.push({ x, y, dx: dx / length, dy: dy / length })
      }
    }
    return points
  }, [kind])

  return (
    <LabShell title="Switch between local field behaviors" instruction="Compare arrows with divergence and curl. A field can circulate without diverging."
      controls={<>
        <label className="select-control"><span>Vector field</span><select value={kind} onChange={(event) => setKind(event.target.value as FieldKind)}>{Object.entries(fieldInfo).map(([value, info]) => <option key={value} value={value}>{info.label}</option>)}</select></label>
        <div className="lab-result"><Equation>{`\\nabla\\cdot F=${fieldInfo[kind].divergence}`}</Equation><br /><Equation>{`\\nabla\\times F=${fieldInfo[kind].curl}`}</Equation></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive vector field operator explorer">
        <defs><marker id="o-arrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0, 7 2.5, 0 5" /></marker></defs>
        {arrows.map((arrow) => {
          const sx = 260 + arrow.x * 55
          const sy = 180 - arrow.y * 45
          return <line key={`${arrow.x}-${arrow.y}`} x1={sx - arrow.dx * 12} y1={sy + arrow.dy * 12} x2={sx + arrow.dx * 15} y2={sy - arrow.dy * 15} className="field-arrow" markerEnd="url(#o-arrow)" />
        })}
        <circle cx="260" cy="180" r="5" className="lab-point" />
      </svg>
    </LabShell>
  )
}

function CoulombLab() {
  const [q1, setQ1] = useState(2)
  const [q2, setQ2] = useState(-3)
  const [distance, setDistance] = useState(0.5)
  const force = COULOMB_CONSTANT * Math.abs(q1 * q2) * 1e-12 / distance ** 2
  const attractive = q1 * q2 < 0

  return (
    <LabShell title="Change charge signs and separation" instruction="Predict attraction or repulsion before reading the force arrows."
      controls={<>
        <RangeControl label="q1 in microC" min={-5} max={5} value={q1} onChange={setQ1} />
        <RangeControl label="q2 in microC" min={-5} max={5} value={q2} onChange={setQ2} />
        <RangeControl label="Distance in metres" min={0.2} max={2} step={0.1} value={distance} onChange={setDistance} />
        <div className="lab-result"><strong>{q1 === 0 || q2 === 0 ? 'No Coulomb force' : attractive ? 'Attraction' : 'Repulsion'}</strong><p>Magnitude = {force.toFixed(3)} N</p></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive two-charge Coulomb force">
        <defs><marker id="q-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" /></marker></defs>
        <line x1="120" y1="180" x2="400" y2="180" className="charge-line" />
        <circle cx="145" cy="180" r="34" className={chargeClass(q1)} /><text x="145" y="188" textAnchor="middle" className="charge-label">{chargeSymbol(q1)}</text>
        <circle cx="375" cy="180" r="34" className={chargeClass(q2)} /><text x="375" y="188" textAnchor="middle" className="charge-label">{chargeSymbol(q2)}</text>
        {q1 !== 0 && q2 !== 0 && <>
          <line x1="105" y1="125" x2={attractive ? 185 : 55} y2="125" className="lab-vector" markerEnd="url(#q-arrow)" />
          <line x1="415" y1="235" x2={attractive ? 335 : 465} y2="235" className="lab-vector" markerEnd="url(#q-arrow)" />
        </>}
      </svg>
    </LabShell>
  )
}

function SuperpositionLab() {
  const [qLeft, setQLeft] = useState(1)
  const [qRight, setQRight] = useState(1)
  const [x, setX] = useState(0)
  const [y, setY] = useState(1)
  const sources = [{ q: qLeft, x: -2, y: 0 }, { q: qRight, x: 2, y: 0 }]
  const contributions = sources.map((source) => {
    const dx = x - source.x
    const dy = y - source.y
    const r = Math.hypot(dx, dy)
    return { ex: source.q * dx / r ** 3, ey: source.q * dy / r ** 3 }
  })
  const ex = contributions.reduce((sum, item) => sum + item.ex, 0)
  const ey = contributions.reduce((sum, item) => sum + item.ey, 0)

  return (
    <LabShell title="Add two source fields" instruction="Move the observation point and change source signs. Watch components cancel or reinforce."
      controls={<>
        <RangeControl label="Left source charge" min={-2} max={2} value={qLeft} onChange={setQLeft} />
        <RangeControl label="Right source charge" min={-2} max={2} value={qRight} onChange={setQRight} />
        <RangeControl label="Observation x" min={-1.5} max={1.5} step={0.1} value={x} onChange={setX} />
        <RangeControl label="Observation y" min={0.5} max={3} step={0.1} value={y} onChange={setY} />
        <div className="lab-result"><Equation>{`E_x\\propto${ex.toFixed(3)}`}</Equation><br /><Equation>{`E_y\\propto${ey.toFixed(3)}`}</Equation></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive field superposition">
        <defs><marker id="s-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" /></marker></defs>
        <path d="M50 285 H470 M260 330 V30" className="lab-axis" />
        {sources.map((source, index) => <g key={source.x}><circle cx={260 + source.x * 70} cy="285" r="24" className={chargeClass(source.q)} /><text x={260 + source.x * 70} y="292" textAnchor="middle" className="charge-label">{chargeSymbol(source.q)}</text><line x1={260 + source.x * 70} y1="285" x2={260 + x * 70} y2={285 - y * 70} className={`contribution contribution--${index}`} markerEnd="url(#s-arrow)" /></g>)}
        <circle cx={260 + x * 70} cy={285 - y * 70} r="7" className="lab-point" />
        <line x1={260 + x * 70} y1={285 - y * 70} x2={260 + x * 70 + ex * 80} y2={285 - y * 70 - ey * 80} className="lab-vector" markerEnd="url(#s-arrow)" />
      </svg>
    </LabShell>
  )
}

function ElectricFieldLab() {
  const [sourceCharge, setSourceCharge] = useState(2)
  const [radius, setRadius] = useState(1)
  const [testCharge, setTestCharge] = useState(1)
  const field = COULOMB_CONSTANT * Math.abs(sourceCharge) * 1e-9 / radius ** 2
  const outward = sourceCharge > 0
  const forceAlongField = testCharge >= 0
  const lineCount = sourceCharge === 0 ? 0 : Math.max(4, Math.abs(sourceCharge) * 4)

  return (
    <LabShell title="Separate source field from test force" instruction="Change source and test signs independently. Field belongs to the source; force also depends on the test charge."
      controls={<>
        <RangeControl label="Source charge in nC" min={-4} max={4} value={sourceCharge} onChange={setSourceCharge} />
        <RangeControl label="Observation radius in m" min={0.5} max={3} step={0.1} value={radius} onChange={setRadius} />
        <RangeControl label="Test charge sign" min={-1} max={1} step={2} value={testCharge} onChange={setTestCharge} />
        <div className="lab-result"><p>E = {field.toFixed(1)} N/C, {sourceCharge === 0 ? 'zero field' : outward ? 'outward' : 'inward'}</p><p>Test force is {forceAlongField ? 'along E' : 'opposite E'}.</p></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive point-charge field lines">
        <defs><marker id="e-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" /></marker></defs>
        {Array.from({ length: lineCount }, (_, index) => {
          const angle = index * 2 * Math.PI / lineCount
          const inner = outward ? 48 : 145
          const outer = outward ? 145 : 48
          return <line key={index} x1={260 + inner * Math.cos(angle)} y1={180 + inner * Math.sin(angle)} x2={260 + outer * Math.cos(angle)} y2={180 + outer * Math.sin(angle)} className="field-line" markerEnd="url(#e-arrow)" />
        })}
        <circle cx="260" cy="180" r="38" className={chargeClass(sourceCharge)} /><text x="260" y="190" textAnchor="middle" className="charge-label">{chargeSymbol(sourceCharge)}</text>
      </svg>
    </LabShell>
  )
}

type DensityKind = 'line' | 'surface' | 'volume'

function DistributionLab() {
  const [kind, setKind] = useState<DensityKind>('line')
  const [density, setDensity] = useState(3)
  const [element, setElement] = useState(0.2)
  const charge = density * element
  const symbols = { line: ['lambda', 'dl', 'C/m'], surface: ['sigma', 'dS', 'C/m²'], volume: ['rho', 'dV', 'C/m³'] } as const

  return (
    <LabShell title="Match density to geometry" instruction="Switch source dimension and see how density combines with its differential element."
      controls={<>
        <label className="select-control"><span>Distribution</span><select value={kind} onChange={(event) => setKind(event.target.value as DensityKind)}><option value="line">Line charge</option><option value="surface">Surface charge</option><option value="volume">Volume charge</option></select></label>
        <RangeControl label={`Density in ${symbols[kind][2]}`} min={0.5} max={5} step={0.5} value={density} onChange={setDensity} />
        <RangeControl label={`Element ${symbols[kind][1]}`} min={0.1} max={1} step={0.1} value={element} onChange={setElement} />
        <div className="lab-result"><Equation>{`dq=${symbols[kind][0]}${symbols[kind][1]}=${charge.toFixed(2)}\\;\\mathrm C`}</Equation></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive charge density geometry">
        {kind === 'line' && <><path d="M90 245 C180 70 340 310 440 105" className="density-line" /><circle cx="262" cy="190" r="10" className="density-element" /><text x="278" y="178">dl</text></>}
        {kind === 'surface' && <><ellipse cx="260" cy="190" rx="175" ry="92" className="density-surface" /><rect x="250" y="180" width="20" height="20" className="density-element" /><text x="278" y="178">dS</text></>}
        {kind === 'volume' && <><path d="M135 105 H365 V270 H135 Z M135 105 L205 65 H435 V230 L365 270 M365 105 L435 65" className="density-volume" /><rect x="250" y="170" width="22" height="22" className="density-element" /><text x="280" y="168">dV</text></>}
      </svg>
    </LabShell>
  )
}

type AxialKind = 'ring' | 'disc' | 'plane'

function AxialFieldLab() {
  const [kind, setKind] = useState<AxialKind>('ring')
  const [radius, setRadius] = useState(2)
  const [z, setZ] = useState(1)
  const [density, setDensity] = useState(1)
  const normalizedField = kind === 'ring'
    ? density * z * radius / (z ** 2 + radius ** 2) ** 1.5
    : kind === 'disc'
      ? density * Math.sign(z) * (1 - Math.abs(z) / Math.sqrt(z ** 2 + radius ** 2))
      : density * Math.sign(z)

  return (
    <LabShell title="Move along the symmetry axis" instruction="Compare a finite ring, finite disc and infinite plane. Observe symmetry and limiting behavior."
      controls={<>
        <label className="select-control"><span>Source geometry</span><select value={kind} onChange={(event) => setKind(event.target.value as AxialKind)}><option value="ring">Charged ring</option><option value="disc">Charged disc</option><option value="plane">Infinite plane</option></select></label>
        {kind !== 'plane' && <RangeControl label="Radius R" min={0.5} max={4} step={0.1} value={radius} onChange={setRadius} />}
        <RangeControl label="Axis coordinate z" min={-4} max={4} step={0.1} value={z} onChange={setZ} />
        <RangeControl label="Positive density scale" min={0.5} max={3} step={0.5} value={density} onChange={setDensity} />
        <div className="lab-result"><p>Normalized axial field = {normalizedField.toFixed(3)}</p><p>{Math.abs(z) < 0.05 && kind !== 'ring' ? 'At the charged surface, use the two one-sided field limits.' : kind === 'plane' ? 'Magnitude stays constant with distance.' : Math.abs(z) < 0.05 ? 'Ring centre: exact cancellation.' : 'Sign follows the side of the source.'}</p></div>
      </>}
    >
      <svg viewBox="0 0 520 360" role="img" aria-label="Interactive axial field of ring disc and plane">
        <defs><marker id="a-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" /></marker></defs>
        {kind === 'ring' && <ellipse cx="260" cy="245" rx={radius * 45} ry={radius * 15} className="axial-ring" />}
        {kind === 'disc' && <ellipse cx="260" cy="245" rx={radius * 45} ry={radius * 15} className="axial-disc" />}
        {kind === 'plane' && <polygon points="65,265 360,265 455,210 160,210" className="axial-plane" />}
        <line x1="260" y1="310" x2="260" y2="35" className="lab-axis" />
        <circle cx="260" cy={245 - z * 45} r="7" className="lab-point lab-point--accent" />
        <line x1="275" y1={245 - z * 45} x2="275" y2={245 - z * 45 - normalizedField * 90} className="lab-vector" markerEnd="url(#a-arrow)" />
        <text x="285" y={240 - z * 45}>P</text>
      </svg>
    </LabShell>
  )
}

export function InteractiveLabs({ topicId }: InteractiveLabsProps) {
  if (topicId === 'l0-vector-foundations') return <VectorFoundationsLab />
  if (topicId === 'l0-vector-products') return <VectorProductsLab />
  if (topicId === 'l0-coordinate-systems') return <CoordinateLab />
  if (topicId === 'l0-elements-and-flux') return <FluxLab />
  if (topicId === 'l0-field-operators') return <FieldOperatorLab />
  if (topicId === 'l1-charge-coulomb') return <CoulombLab />
  if (topicId === 'l1-superposition') return <SuperpositionLab />
  if (topicId === 'l1-electric-field') return <ElectricFieldLab />
  if (topicId === 'l1-distributions') return <DistributionLab />
  return <AxialFieldLab />
}
