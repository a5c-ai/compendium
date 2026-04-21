import React from 'react';

const SealGatePassed = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 140 140"
    width={140}
    height={140}
    {...props}
  >
    <g transform="translate(70,70)" fill="none" stroke="#C03A2B" strokeWidth={2}>
      <circle r={62} />
      <circle r={52} strokeDasharray="1 3" />
      <circle r={40} />
    </g>
    <path d="M 45 68 L 62 85 L 95 55" stroke="#C03A2B" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <g fontFamily="JetBrains Mono, monospace" fill="#C03A2B" fontSize={8} letterSpacing=".28em">
      <defs>
        <path id="topCurve" d="M 22 70 A 48 48 0 0 1 118 70" />
        <path id="botCurve" d="M 22 70 A 48 48 0 0 0 118 70" />
      </defs>
      <text><textPath href="#topCurve" startOffset="50%" textAnchor="middle">GATE · PASSED · a5c.ai</textPath></text>
      <text><textPath href="#botCurve" startOffset="50%" textAnchor="middle">CRYPTOGRAPHIC · PROOF</textPath></text>
    </g>
  </svg>
);

export default SealGatePassed;
