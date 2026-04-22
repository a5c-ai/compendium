import type { Meta, StoryObj } from '@storybook/react';
import {
  SpacingElevationRow,
  SpacingGridSheet,
  SpacingLadder,
  SpacingMeasureGrid,
  SpacingRadiusRow,
  SpacingRhythmBlock,
} from './SpacingPrimitives';

const meta: Meta<typeof SpacingLadder> = {
  title: 'Mockups/Spacing Primitives',
  component: SpacingLadder,
};

export default meta;
type Story = StoryObj<typeof SpacingLadder>;

export const MeasureCatalog: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <SpacingLadder
        cap="ruler · Σ"
        items={[
          { name: 's-1', token: 'hair', value: 4, note: 'chip interior, icon offset' },
          { name: 's-2', token: 'fine', value: 8, note: 'inline gap, gem-to-label' },
          { name: 's-3', token: 'short', value: 12, note: 'form rows, chip padding' },
          { name: 's-4', token: 'step', value: 16, note: 'default padding, gutters' },
          { name: 's-5', token: 'line', value: 24, note: 'paragraphs, card interiors' },
        ]}
      />
      <SpacingMeasureGrid
        items={[
          { cap: 'too narrow · 32ch', mark: 'i', text: 'Short measure chatters.' },
          { cap: 'just right · 58ch', mark: 'ii', text: 'The eye returns without searching.', emphasis: true },
          { cap: 'too wide · 88ch', mark: 'iii', text: 'Wide measure loses the next line.' },
        ]}
      />
      <SpacingRadiusRow
        items={[
          { name: 'r-0', spec: '0 · plates' },
          { name: 'r-1', spec: '2 · code, inputs' },
          { name: 'r-2', spec: '6 · buttons' },
          { name: 'r-3', spec: '12 · cartouches' },
          { name: 'r-∞', spec: 'pill · chips, gems' },
        ]}
      />
      <SpacingElevationRow
        items={[
          { level: 0, mark: '—', spec: 'inline · no offset' },
          { level: 1, mark: 'i', spec: 'card · 0 2px 0 ink' },
          { level: 2, mark: 'ii', spec: 'button · 0 4px 0 ink' },
          { level: 3, mark: 'iii', spec: 'panel · 0 6px 0 ink' },
        ]}
      />
      <SpacingGridSheet
        numbers={Array.from({ length: 12 }, (_, index) => `${index + 1}`)}
        labels={['4 col · rail', '8 col · body']}
      />
      <SpacingRhythmBlock
        sections={[
          {
            cap: 'baseline · 24 px',
            title: 'The recipe, not the kitchen.',
            body: [
              'AI models change; proven workflows do not.',
              'When a measurement disagrees, the measurement is wrong, not the grid.',
            ],
          },
        ]}
      />
    </div>
  ),
};
