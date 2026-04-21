import React from 'react';

const GlyphDivider = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 20"
    width={240}
    height={20}
    {...props}
  >
    <g stroke="currentColor" strokeWidth={1} fill="none" strokeLinecap="round">
      <path d="M0 10 H90" />
      <path d="M150 10 H240" />
      <g transform="translate(120 10)">
        <path d="M-6 0 L0 -6 L6 0 L0 6 Z" />
        <path d="M-12 0 L-6 0 M6 0 L12 0" strokeDasharray="1 2" />
      </g>
    </g>
  </svg>
);

export default GlyphDivider;
