import React from 'react';

const IllustrationQualityGates = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 400"
    width={600}
    height={400}
    {...props}
  >
    <g className="e">
      <path d="M8 8 h10 M8 8 v10" />
      <path d="M592 8 h-10 M592 8 v10" />
      <path d="M8 392 h10 M8 392 v-10" />
      <path d="M592 392 h-10 M592 392 v-10" />
    </g>

    <text x={300} y={32} textAnchor="middle" className="cap">fig · ii · the · quality · gates</text>

    <g transform="translate(80,180)">
      <path d="M-30 -40 L30 -40 L10 0 L-10 0 Z" className="e2" />
      <path d="M-25 -35 L25 -35" className="e" strokeDasharray="1 2" />
      <text textAnchor="middle" y={20} className="h">the task</text>
      <text textAnchor="middle" y={36} className="cap">input</text>
    </g>

    <g className="e2">
      <path d="M120 200 H160" />
      <path d="M240 200 H280" />
      <path d="M360 200 H400" />
      <path d="M480 200 H520" />
    </g>

    <g transform="translate(200,200)">
      <circle r={28} className="e2" />
      <circle r={22} className="e" strokeDasharray="1 3" />
      <text textAnchor="middle" y={4} className="serif">lint</text>
      <text textAnchor="middle" y={-40} className="cap">gate · i</text>
    </g>

    <g transform="translate(320,200)">
      <circle r={28} className="e2" />
      <circle r={22} className="e" strokeDasharray="1 3" />
      <text textAnchor="middle" y={4} className="serif">test</text>
      <text textAnchor="middle" y={-40} className="cap">gate · ii</text>
    </g>

    <g transform="translate(440,200)">
      <circle r={28} className="e2" />
      <circle r={22} className="e" strokeDasharray="1 3" />
      <text textAnchor="middle" y={4} className="serif">audit</text>
      <text textAnchor="middle" y={-40} className="cap">gate · iii</text>
    </g>

    <g transform="translate(550,200)">
      <circle r={24} className="e2" stroke="#C03A2B" />
      <path d="M-10 0 L-3 7 L12 -8" stroke="#C03A2B" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text textAnchor="middle" y={40} className="cap" fill="#C03A2B">sealed</text>
    </g>

    <g transform="translate(300,300)">
      <path d="M-240 0 H240" className="e" />
      <text textAnchor="middle" y={22} className="serif">each gate must be passed, else the loop converges anew</text>
      <text textAnchor="middle" y={40} className="cap">∴ · convergence · is · the · only · exit</text>
    </g>

    <text x={590} y={388} textAnchor="end" className="cap">fol · iv</text>
  </svg>
);

export default IllustrationQualityGates;
