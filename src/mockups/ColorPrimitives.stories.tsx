import type { Meta, StoryObj } from '@storybook/react';
import { Button, Tag } from '../components';
import { CodexPlate } from './CodexPrimitives';
import {
  ColorBrassRow,
  ColorGemShelf,
  ColorGroundGrid,
  ColorLadderGroup,
  ColorUsageGrid,
  ColorVerdictStrip,
} from './ColorPrimitives';

const meta: Meta<typeof ColorGroundGrid> = {
  title: 'Mockups/Color Primitives',
  component: ColorGroundGrid,
};

export default meta;
type Story = StoryObj<typeof ColorGroundGrid>;

export const Atlas: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <CodexPlate>
        <div className="mk-catalog-cap">grounds · α</div>
        <ColorGroundGrid
          items={[
            { label: 'Vellum', color: 'var(--ground-vellum)', meta: '#EDE3CF · ground · base', note: 'The default marketing surface. Warm ground, rests the eye.' },
            { label: 'Parchment', color: 'var(--ground-parchment)', meta: '#D9CBAE · ground · alt', note: 'The deeper leaf. Used beneath vellum for section breaks and cards.' },
            { label: 'Void', color: 'var(--ground-void)', meta: '#0B0A0F · ground · deep', note: 'The workshop at midnight. Product shell, code, and technical reference.', dark: true },
            { label: 'Ink', color: 'var(--ground-ink)', meta: '#181624 · ground · layer', note: 'A shade warmer than void. Sits beneath void for layered panels.', dark: true },
          ]}
        />
      </CodexPlate>
      <CodexPlate>
        <div className="mk-catalog-cap">ladder · β</div>
        <ColorLadderGroup
          title="on vellum"
          items={[
            { label: 'Pigment', color: '#1B1611', note: 'body, headings — the voice' },
            { label: 'Fade', color: '#5A4E3C', note: 'captions, marginalia, hints' },
            { label: 'Ghost', color: '#8C7E65', note: 'folio numbers, hairline labels' },
          ]}
        />
        <ColorLadderGroup
          title="on void"
          items={[
            { label: 'Bone', color: '#F0E6D1', note: 'body, headings — against dark' },
            { label: 'Fade (dark)', color: '#A89980', note: 'captions on dark surfaces' },
          ]}
        />
      </CodexPlate>
      <ColorBrassRow items={['light · #F2C88F', 'gilt · #D9A96A', 'brass · #B37E3E', 'deep · #8E5A26', 'leather · #5B3817', 'mahogany · #2A1607']} />
      <CodexPlate dark>
        <div className="mk-catalog-cap">gem shelf · γ</div>
        <ColorGemShelf
          items={[
            { label: 'Cinnabar', color: 'var(--accent-cinnabar)', note: 'the seal · brand · failure verdict' },
            { label: 'Emerald', color: 'var(--gem-emerald)', note: 'gate passed · verdict · healthy' },
            { label: 'Ruby', color: 'var(--gem-ruby)', note: 'halt · terminal error · unrecoverable' },
            { label: 'Amber', color: 'var(--accent-sulphur)', note: 'pending · advisory · warning' },
          ]}
        />
      </CodexPlate>
      <ColorVerdictStrip
        items={[
          { label: 'Passed', color: 'var(--gem-emerald)', body: 'Gate has cleared; proof will be issued.', meta: '#3EA676 · emerald' },
          { label: 'Halted', color: 'var(--gem-ruby)', body: 'The run has stopped; human review required.', meta: '#D81F3D · ruby' },
          { label: 'Pending', color: 'var(--accent-sulphur)', body: 'Advisory; the loop is adjusting.', meta: '#E0A63A · amber' },
          { label: 'Sealed', color: 'var(--accent-cinnabar)', body: 'The seal has been struck. Run complete.', meta: '#C03A2B · cinnabar' },
        ]}
      />
      <ColorUsageGrid
        items={[
          {
            cap: 'light proof',
            tone: 'light',
            title: 'Proof on vellum.',
            body: 'Editorial surfaces stay warm and quiet, with brass used sparingly to carry hierarchy.',
            actions: <><Button variant="primary">Gate passed</Button><Tag>stable</Tag></>,
          },
          {
            cap: 'night shell',
            tone: 'dark',
            title: 'Proof in the workshop.',
            body: 'Dark surfaces carry brighter gems, deeper brass, and a tighter contrast floor.',
            actions: <><Button variant="default">Needs review</Button><Tag>critical</Tag></>,
          },
        ]}
      />
    </div>
  ),
};
