import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import {
  AdsCardActionColumn,
  AdsCard,
  AdsCatalog,
  AdsCardFigure,
  AdsCardFolio,
  AdsCardFooter,
  AdsCardProof,
  AdsChapterBand,
  AdsNotes,
  AdsSheet,
  AdsSlot,
  AdsSpecs,
  AdsCardSpine,
} from './AdsPrimitives';

const meta: Meta<typeof AdsCatalog> = {
  title: 'Mockups/Ads Primitives',
  component: AdsCatalog,
  parameters: {
    layout: 'padded',
  },
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

export const PrimitiveComposition: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <AdsSlot
        index="I."
        size="300 × 250"
        name="medium rectangle"
        notes={(
          <AdsNotes
            body="Shared ad slot chrome is exercised directly here instead of through the preview page."
            specs={<AdsSpecs items={[{ label: 'Safe area', value: '10 px inset' }, { label: 'CTA', value: 'Primary or default' }]} />}
          />
        )}
      >
        <AdsSheet label="Var. A · paper ground" size="300 × 250">
          <AdsCard variant="medium-rectangle">
            <AdsCardFolio>mr-01</AdsCardFolio>
            <AdsChapterBand index="03" title="Chapter III" subtitle="Gates & verdicts" />
            <h3>Every agent turn ends in a <em>written verdict</em>.</h3>
            <AdsCardFooter
              brand="a5c.ai"
              body="The foundry for multi-agent work"
              cta={<Button variant="primary">Request a demo</Button>}
            />
          </AdsCard>
        </AdsSheet>
        <AdsSheet label="Var. B · blueprint ground" size="300 × 250">
          <AdsCard variant="medium-rectangle" tone="blueprint">
            <AdsCardFolio>mr-02</AdsCardFolio>
            <AdsChapterBand index="03" title="Chapter III" subtitle="Gates & verdicts" />
            <h3>Two strangers, <em>same answer</em>.</h3>
            <AdsCardFooter
              brand="a5c.ai"
              body="Convergence, in plain prose"
              cta={<Button variant="default">Read chapter III</Button>}
            />
          </AdsCard>
        </AdsSheet>
      </AdsSlot>
      <AdsSlot
        index="II."
        size="160 × 600"
        name="wide skyscraper"
        stackClassName="mk-ads-stack--row"
      >
        <AdsSheet label="Var. A · paper" size="160 × 600">
          <AdsCard variant="skyscraper">
            <AdsCardFolio>sky-01</AdsCardFolio>
            <AdsChapterBand index="02" title="Chapter II" subtitle="Agents & seats" stacked />
            <AdsCardSpine title={<><em>Seats</em>, not seats of software.</>} />
            <AdsCardProof>An agent is a seat in a room; replay is how the room remembers.</AdsCardProof>
            <AdsCardActionColumn>
              <Button variant="ghost">Chapter II</Button>
              <Button variant="primary">Try a5c.ai</Button>
            </AdsCardActionColumn>
          </AdsCard>
        </AdsSheet>
      </AdsSlot>
      <AdsSlot index="III." size="300 × 600" name="half-page poster">
        <AdsSheet label="Var. A · figure-driven" size="300 × 600">
          <AdsCard variant="poster">
            <AdsCardFolio>poster-01</AdsCardFolio>
            <AdsChapterBand index="01" title="Book I · Foundations" subtitle="A first acquaintance" />
            <h3>The foundry, <em>in one page</em>.</h3>
            <AdsCardFigure label="FIG. A · editor → artefact → verifier → human" />
            <AdsCardFooter
              brand="a5c.ai"
              body="The foundry for multi-agent work"
              cta={<Button variant="primary">Request a demo</Button>}
            />
          </AdsCard>
        </AdsSheet>
      </AdsSlot>
    </div>
  ),
};
