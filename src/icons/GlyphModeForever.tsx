import React from 'react';

const GlyphModeForever = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={48}
    height={48}
    {...props}
  >
    <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
      <path d="M16 24 A6 6 0 1 1 22 30 L26 18 A6 6 0 1 1 32 24 A6 6 0 1 1 26 30 L22 18 A6 6 0 1 1 16 24 Z" />
    </g>
  </svg>
);

export default GlyphModeForever;
