import React from 'react';

const GlyphModeYolo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={48}
    height={48}
    {...props}
  >
    <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
      <path d="M12 34 L24 10 L36 34 Z" />
      <path d="M18 28 H30" />
      <circle cx={24} cy={22} r={2} fill="#C03A2B" stroke="none" />
    </g>
  </svg>
);

export default GlyphModeYolo;
