import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import {
  AdsCardActionColumn,
  AdsCard,
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

const meta: Meta<typeof AdsSlot> = {
  title: 'Mockups/Ads Primitives',
  component: AdsSlot,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof AdsSlot>;

export const Catalog: Story = {
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
