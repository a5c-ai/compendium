import React from 'react';

const GlyphModeInteractive = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={48}
    height={48}
    {...props}
  >
    <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
      <circle cx={24} cy={24} r={18} />
      <path d="M14 24 H34" />
      <path d="M24 14 V34" />
      <circle cx={24} cy={24} r={3} fill="currentColor" />
    </g>
  </svg>
);

export default GlyphModeInteractive;
