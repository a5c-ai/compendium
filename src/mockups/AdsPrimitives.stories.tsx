import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import { AdsCatalog } from './AdsPrimitives';

const meta: Meta<typeof AdsCatalog> = {
  title: 'Mockups/Ads Primitives',
  component: AdsCatalog,
};

export default meta;
type Story = StoryObj<typeof AdsCatalog>;

export const Catalog: Story = {
  render: () => (
    <AdsCatalog
      title="Standard display"
      emphasis="ad set"
      meta={['Four IAB standard slots', 'Non-animated · legible at 100%']}
      slots={[
        {
          number: 'I.',
          size: '300 × 250',
          name: 'medium rectangle',
          note: 'The medium rectangle carries the most weight in the set. Chapter numeral earns its height and the CTA stays isolated at the lower right.',
          specs: [
            { label: 'Format', value: 'JPG · 40 KB ceiling' },
            { label: 'Type stack', value: 'Cormorant · JetBrains Mono' },
          ],
          sheets: [
            {
              rule: { left: 'Var. A · paper ground', right: '300 × 250' },
              card: {
                kind: 'mr',
                folio: 'Leaflet Nº I · mr-01',
                chapter: { number: '03', label: 'Chapter III', detail: 'Gates & verdicts' },
                headline: <>Every agent turn ends in a <em>written verdict</em>.</>,
                brandTitle: 'a5c.ai',
                brandBody: 'The foundry for multi-agent work',
                action: <Button variant="primary">Request a demo</Button>,
                tickerLeft: 'Ed. 4.2 · Aug 26',
                tickerRight: 'Vellum ground',
              },
            },
            {
              rule: { left: 'Var. B · blueprint ground', right: '300 × 250' },
              card: {
                kind: 'mr',
                theme: 'blueprint',
                folio: 'Leaflet Nº I · mr-02',
                chapter: { number: '03', label: 'Chapter III', detail: 'Gates & verdicts' },
                headline: <>Two strangers, <em>same answer</em>. The rest is ornament.</>,
                brandTitle: 'a5c.ai',
                brandBody: 'Convergence, in plain prose',
                action: <Button variant="default">Read chapter III</Button>,
                tickerLeft: 'Ed. 4.2 · Aug 26',
                tickerRight: 'Blueprint ground',
              },
            },
          ],
        },
      ]}
    />
  ),
};
