import React from 'react';

const GlyphModePlan = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={48}
    height={48}
    {...props}
  >
    <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
      <path d="M10 10 H38 V38 H10 Z" />
      <path d="M10 18 H38 M18 18 V38" />
      <path d="M22 24 H34 M22 30 H30" />
      <circle cx={14} cy={14} r={1.5} fill="currentColor" />
    </g>
  </svg>
);

export default GlyphModePlan;
