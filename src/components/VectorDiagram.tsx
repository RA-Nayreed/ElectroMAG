export function VectorDiagram() {
  return (
    <svg
      className="vector-diagram"
      viewBox="0 0 520 300"
      role="img"
      aria-labelledby="vector-diagram-title vector-diagram-description"
    >
      <title id="vector-diagram-title">Vector from point A to point B</title>
      <desc id="vector-diagram-description">
        A coordinate sketch showing point A, point B and the displacement vector from A to B.
      </desc>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
        </marker>
        <linearGradient id="vector-orb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a7e5d3" />
          <stop offset="0.55" stopColor="#c8b8e0" />
          <stop offset="1" stopColor="#f4c5a8" />
        </linearGradient>
      </defs>
      <circle cx="380" cy="85" r="108" fill="url(#vector-orb)" opacity="0.52" />
      <path d="M85 238 H468" className="axis" markerEnd="url(#arrowhead)" />
      <path d="M85 238 V36" className="axis" markerEnd="url(#arrowhead)" />
      <text x="474" y="244" className="diagram-label">x</text>
      <text x="75" y="30" className="diagram-label">y</text>
      <circle cx="155" cy="206" r="7" className="point" />
      <circle cx="385" cy="84" r="7" className="point" />
      <path
        d="M162 200 L377 90"
        className="displacement-arrow"
        markerEnd="url(#arrowhead)"
      />
      <path d="M155 206 H385 V84" className="guide" />
      <text x="128" y="230" className="diagram-label diagram-label--strong">A</text>
      <text x="397" y="79" className="diagram-label diagram-label--strong">B</text>
      <text x="254" y="123" className="diagram-label diagram-label--strong">B − A</text>
    </svg>
  )
}
