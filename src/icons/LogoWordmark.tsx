import React from 'react';

const LogoWordmark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 120"
    width={400}
    height={120}
    {...props}
  >
    <g stroke="#1B1611" strokeWidth={1} fill="none">
      <path d="M10 10 h14 M10 10 v14" />
      <path d="M390 10 h-14 M390 10 v14" />
      <path d="M10 110 h14 M10 110 v-14" />
      <path d="M390 110 h-14 M390 110 v-14" />
    </g>

    <g transform="translate(36, 30)" fill="none" stroke="#1B1611" strokeWidth={1.6} strokeLinecap="round">
      <circle cx={30} cy={30} r={28} />
      <path d="M14 44 L30 10 L46 44 M20 36 H40" />
      <text x={30} y={56} textAnchor="middle" className="wm-mono" fontSize={9} fill="#1B1611" stroke="none">V.c</text>
    </g>

    <text x={112} y={62} className="wm-serif" fontSize={44} fill="#1B1611">
      a5c<tspan fill="#C03A2B">.</tspan>ai
    </text>

    <text x={112} y={86} className="wm-mono" fontSize={9} fill="#5A4E3C">CODEX · OF · RELIABLE · AUTONOMY</text>

    <text x={390} y={118} textAnchor="end" className="wm-mono" fontSize={8} fill="#8C7E65">fol. I</text>
  </svg>
);

export default LogoWordmark;
