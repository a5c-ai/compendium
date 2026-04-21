import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  GlyphDivider,
  GlyphModeForever,
  GlyphModeInteractive,
  GlyphModePlan,
  GlyphModeYolo,
  IllustrationConvergenceLoop,
  IllustrationQualityGates,
  LogoMonogram,
  LogoMonogramDark,
  LogoWordmark,
  SealGatePassed,
} from '.';

const meta = {
  title: 'Icons/Gallery',
} satisfies Meta;

export default meta;
type Story = StoryObj;

const IconCard = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: 16,
      border: '1px solid color-mix(in oklab, #1B1611 18%, transparent)',
      borderRadius: 2,
      minWidth: 140,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 48 }}>
      {children}
    </div>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.05em', textAlign: 'center' }}>
      {name}
    </span>
  </div>
);

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <IconCard name="GlyphDivider"><GlyphDivider width={120} height={10} /></IconCard>
      <IconCard name="GlyphModeForever"><GlyphModeForever width={40} height={40} /></IconCard>
      <IconCard name="GlyphModeInteractive"><GlyphModeInteractive width={40} height={40} /></IconCard>
      <IconCard name="GlyphModePlan"><GlyphModePlan width={40} height={40} /></IconCard>
      <IconCard name="GlyphModeYolo"><GlyphModeYolo width={40} height={40} /></IconCard>
      <IconCard name="IllustrationConvergenceLoop"><IllustrationConvergenceLoop width={80} height={80} /></IconCard>
      <IconCard name="IllustrationQualityGates"><IllustrationQualityGates width={80} height={80} /></IconCard>
      <IconCard name="LogoMonogram"><LogoMonogram width={40} height={40} /></IconCard>
      <IconCard name="LogoMonogramDark"><LogoMonogramDark width={40} height={40} /></IconCard>
      <IconCard name="LogoWordmark"><LogoWordmark width={160} height={32} /></IconCard>
      <IconCard name="SealGatePassed"><SealGatePassed width={48} height={48} /></IconCard>
    </div>
  ),
};

export const Logos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Monogram (Light)</h4>
        <LogoMonogram width={64} height={64} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Monogram (Dark)</h4>
        <div style={{ background: '#0B0A0F', padding: 16, borderRadius: 2, display: 'inline-block' }}>
          <LogoMonogramDark width={64} height={64} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Wordmark</h4>
        <LogoWordmark width={240} height={48} />
      </div>
    </div>
  ),
};

export const Glyphs: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <IconCard name="Forever"><GlyphModeForever width={48} height={48} /></IconCard>
      <IconCard name="Interactive"><GlyphModeInteractive width={48} height={48} /></IconCard>
      <IconCard name="Plan"><GlyphModePlan width={48} height={48} /></IconCard>
      <IconCard name="Yolo"><GlyphModeYolo width={48} height={48} /></IconCard>
    </div>
  ),
};
