import React from 'react';

const LogoMonogram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 120"
    width={120}
    height={120}
    {...props}
  >
    <g fill="none" stroke="#1B1611" strokeWidth={1.8} strokeLinecap="round">
      <circle cx={60} cy={60} r={52} />
      <circle cx={60} cy={60} r={42} strokeDasharray="2 4" />
      <path d="M36 86 L60 28 L84 86 M44 72 H76" />
      <circle cx={60} cy={60} r={3} fill="#C03A2B" stroke="none" />
    </g>
    <g fontFamily="JetBrains Mono, monospace" fontSize={7} fill="#5A4E3C" letterSpacing=".18em">
      <text x={60} y={18} textAnchor="middle">a5c</text>
      <text x={60} y={108} textAnchor="middle">.ai</text>
    </g>
  </svg>
);

export default LogoMonogram;
