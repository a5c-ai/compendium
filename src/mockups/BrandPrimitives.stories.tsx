import type { Meta, StoryObj } from '@storybook/react';
import {
  GlyphModeForever,
  GlyphModeInteractive,
  GlyphModePlan,
  GlyphModeYolo,
  LogoMonogram,
  LogoMonogramDark,
  LogoWordmark,
  SealGatePassed,
} from '../icons';
import { CodexPlate } from './CodexPrimitives';
import {
  BrandGlyphAtlas,
  BrandHero,
  BrandMonoGrid,
  BrandSealRow,
  BrandSpecimenGrid,
  BrandVoiceGrid,
} from './BrandPrimitives';

const meta: Meta<typeof BrandHero> = {
  title: 'Mockups/Brand Primitives',
  component: BrandHero,
};

export default meta;
type Story = StoryObj<typeof BrandHero>;

const word = <>a<span>·</span>5<span>·</span>c<span>·</span>ai</>;

export const Registry: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <BrandHero
        cap="wordmark · master"
        icon={<LogoMonogram style={{ width: 84, height: 84 }} />}
        wordmark={word}
        under="atelier for exacting multi-agent work"
        statement="Build with certainty. Done means done."
      />
      <BrandSpecimenGrid
        items={[
          { label: 'light field', wordmark: word, caption: 'editorial application' },
          { label: 'void field', wordmark: word, caption: 'product shell', dark: true },
        ]}
      />
      <BrandMonoGrid
        items={[
          { label: 'ink', icon: <LogoMonogram style={{ width: 84 }} />, caption: 'primary seal' },
          { label: 'void', icon: <LogoMonogramDark style={{ width: 84 }} />, caption: 'night shell', tone: 'void' },
          { label: 'dispatch', icon: <GlyphModeInteractive style={{ width: 72 }} />, caption: 'interactive', tone: 'cinnabar' },
          { label: 'modes', icon: <div className="mk-brand-glyphs"><GlyphModePlan style={{ width: 48 }} /><GlyphModeYolo style={{ width: 48 }} /><GlyphModeForever style={{ width: 48 }} /></div>, caption: 'plan · yolo · forever', tone: 'brass' },
        ]}
      />
      <CodexPlate>
        <BrandGlyphAtlas
          cap="alphabet · mode"
          items={[
            { label: 'mono', icon: <LogoMonogram style={{ width: 56, height: 56 }} /> },
            { label: 'mono dark', icon: <LogoMonogramDark style={{ width: 56, height: 56 }} /> },
            { label: 'interactive', icon: <GlyphModeInteractive style={{ width: 56, height: 56 }} /> },
            { label: 'plan', icon: <GlyphModePlan style={{ width: 56, height: 56 }} /> },
            { label: 'yolo', icon: <GlyphModeYolo style={{ width: 56, height: 56 }} /> },
            { label: 'forever', icon: <GlyphModeForever style={{ width: 56, height: 56 }} /> },
            { label: 'seal', icon: <SealGatePassed style={{ width: 56, height: 56 }} /> },
            { label: 'wordmark', icon: <LogoWordmark style={{ width: 72, height: 32 }} /> },
          ]}
          footer="⟡ ✦ ✧ ◊ ✦ ⟡ · atlas of marks"
        />
      </CodexPlate>
      <BrandVoiceGrid
        columns={[
          {
            cap: 'do',
            title: 'Quiet authority',
            tone: 'yes',
            items: [
              'Say what the system does in plain prose, then prove it.',
              'Reserve italics for emphasis and utterance, not decoration.',
              'Make the seal feel earned, never theatrical.',
            ],
          },
          {
            cap: 'avoid',
            title: 'Chrome and slogans',
            tone: 'no',
            items: [
              'Do not make the product sound like a startup landing page.',
              'Do not decorate technical surfaces with arbitrary gem color.',
              'Do not overstate certainty where a gate has not yet passed.',
            ],
          },
        ]}
      />
      <CodexPlate>
        <div className="mk-catalog-cap">seals · row</div>
        <BrandSealRow
          items={[
            { tone: 'cinnabar', name: 'human seal', description: 'the struck verdict' },
            { tone: 'viridian', name: 'healthy run', description: 'stable and passing' },
            { tone: 'brass', name: 'mechanism', description: 'casing and apparatus' },
            { tone: 'indigo', name: 'reference', description: 'cold diagrammatic register' },
          ]}
        />
      </CodexPlate>
    </div>
  ),
};
