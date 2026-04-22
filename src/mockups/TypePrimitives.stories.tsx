import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '../components';
import { TypeAtlasGrid, TypePairGrid } from './TypePrimitives';

const meta: Meta<typeof TypeAtlasGrid> = {
  title: 'Mockups/Type Primitives',
  component: TypeAtlasGrid,
};

export default meta;
type Story = StoryObj<typeof TypeAtlasGrid>;

export const Specimens: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <TypeAtlasGrid
        items={[
          { name: 'eyebrow', demo: <div className="mk-atlas-demo mk-atlas-demo--mono">Vol. i · Chapter iii</div>, caption: 'JetBrains Mono · 11 · .28em · uppercase' },
          { name: 'folio', demo: <div className="mk-atlas-demo mk-atlas-demo--folio">fol. iii / viii</div>, caption: 'JetBrains Mono · 10 · .3em · uppercase' },
          { name: 'caption', demo: <div className="mk-atlas-demo mk-atlas-demo--caption">fig. iv — the ruby halts all further iteration.</div>, caption: 'EB Garamond italic · 13 · 1.45' },
          { name: 'glyph · string', demo: <div className="mk-atlas-demo mk-atlas-demo--glyph">⟡ ✦ ✧ ◊ ✦ ⟡</div>, caption: 'JetBrains Mono · .3em · decorative rule' },
          { name: 'code · block', demo: <CodeBlock tone="terminal" language="bash" code={`$ babysitter init`} />, caption: 'Reusable code surface · terminal tone' },
          { name: 'chip · label', demo: <div className="mk-atlas-demo"><span className="mk-inline-chip">gate · passed</span></div>, caption: 'JetBrains Mono · 10 · .22em · uppercase' },
        ]}
      />
      <TypePairGrid
        items={[
          {
            tag: 'display · over · body',
            title: 'The recipes are more valuable than the kitchen.',
            body: <p>A short paragraph in EB Garamond sits beneath a Cormorant display. The italic of one answers the upright of the other.</p>,
          },
          {
            tag: 'display · over · mono',
            title: 'Proof of done',
            body: <CodeBlock tone="terminal" language="bash" code={`$ babysitter seal\n// receipt issued · 2048-bit · archive`} />,
          },
        ]}
      />
      <TypePairGrid
        wide
        items={[
          {
            tag: 'eyebrow · over · display',
            aside: <div className="mk-type-pair__eyebrow">chapter iv · convergence</div>,
            title: <span className="mk-type-pair__headline">The loop is the product.</span>,
          },
        ]}
      />
    </div>
  ),
};
