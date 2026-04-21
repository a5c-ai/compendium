import React from 'react';

const IllustrationConvergenceLoop = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 400"
    width={600}
    height={400}
    {...props}
  >
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#1B1611" />
      </marker>
    </defs>

    <g className="engrave-thin">
      <path d="M8 8 h10 M8 8 v10" />
      <path d="M592 8 h-10 M592 8 v10" />
      <path d="M8 392 h10 M8 392 v-10" />
      <path d="M592 392 h-10 M592 392 v-10" />
    </g>

    <g className="engrave">
      <ellipse cx={300} cy={200} rx={220} ry={130} />
      <ellipse cx={300} cy={200} rx={210} ry={120} strokeDasharray="2 4" />
    </g>

    <g transform="translate(120, 200)">
      <circle r={42} className="engrave" />
      <circle r={36} className="engrave" strokeDasharray="1 2" />
      <text textAnchor="middle" y={-50} className="cap">FIG · A</text>
      <text textAnchor="middle" y={4} className="serif">the agent</text>
      <text textAnchor="middle" y={20} className="cap" style={{ fontSize: '8px' }}>runs · the · task</text>
    </g>

    <g transform="translate(480, 200)">
      <rect x={-46} y={-46} width={92} height={92} className="engrave" />
      <rect x={-40} y={-40} width={80} height={80} className="engrave" strokeDasharray="1 2" />
      <text textAnchor="middle" y={-60} className="cap">FIG · B</text>
      <text textAnchor="middle" y={0} className="serif">the gate</text>
      <text textAnchor="middle" y={18} className="cap" style={{ fontSize: '8px' }}>verifies · done</text>
      <circle cx={0} cy={-80} r={4} className="seal" />
    </g>

    <g className="engrave" strokeWidth={1.2}>
      <path d="M160 165 Q300 90 440 165" markerEnd="url(#arr)" />
      <path d="M440 235 Q300 310 160 235" markerEnd="url(#arr)" />
    </g>

    <text x={300} y={105} textAnchor="middle" className="serif">output →</text>
    <text x={300} y={305} textAnchor="middle" className="serif">← verdict</text>

    <g transform="translate(300, 200)" className="engrave">
      <circle r={22} />
      <path d="M-10 0 H10 M0 -10 V10" />
      <circle cx={0} cy={0} r={2} fill="#C03A2B" stroke="none" />
    </g>
    <text x={300} y={245} textAnchor="middle" className="cap">the · loop</text>

    <text x={300} y={380} textAnchor="middle" className="cap">fol · iii · the · convergence</text>
  </svg>
);

export default IllustrationConvergenceLoop;
