import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tokens/Design Tokens',
} satisfies Meta;

export default meta;
type Story = StoryObj;

/* ── Color swatch helper ────────────────────────────────── */

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 2,
        background: value,
        border: '1px solid rgba(0,0,0,.12)',
        flexShrink: 0,
      }}
    />
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.04em' }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8A7B64' }}>{value}</div>
    </div>
  </div>
);

const SwatchGroup = ({ title, swatches }: { title: string; swatches: { name: string; value: string }[] }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, marginBottom: 10 }}>{title}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 4 }}>
      {swatches.map((s) => <Swatch key={s.name} {...s} />)}
    </div>
  </div>
);

export const ColorPalette: Story = {
  render: () => (
    <div>
      <SwatchGroup
        title="Grounds"
        swatches={[
          { name: '--ground-vellum', value: '#EDE3CF' },
          { name: '--ground-parchment', value: '#D9CBAE' },
          { name: '--ground-void', value: '#0B0A0F' },
          { name: '--ground-ink', value: '#181624' },
        ]}
      />
      <SwatchGroup
        title="Ink (Light Text)"
        swatches={[
          { name: '--ink-pigment', value: '#1B1611' },
          { name: '--ink-fade', value: '#5A4E3C' },
          { name: '--ink-ghost', value: '#8C7E65' },
        ]}
      />
      <SwatchGroup
        title="Glyph (Dark Text)"
        swatches={[
          { name: '--glyph-bone', value: '#F0E6D1' },
          { name: '--glyph-fade', value: '#A89980' },
        ]}
      />
      <SwatchGroup
        title="Accents"
        swatches={[
          { name: '--accent-cinnabar', value: '#C03A2B' },
          { name: '--accent-indigo', value: '#2B2A6B' },
          { name: '--accent-viridian', value: '#2F6F5E' },
          { name: '--accent-sulphur', value: '#D4A84B' },
        ]}
      />
      <SwatchGroup
        title="Gemstones"
        swatches={[
          { name: '--gem-cyan', value: '#16D7E6' },
          { name: '--gem-magenta', value: '#E23FB4' },
          { name: '--gem-ruby', value: '#D81F3D' },
          { name: '--gem-emerald', value: '#3EA676' },
          { name: '--gem-amber', value: '#E0A63A' },
          { name: '--gem-deep', value: '#4A2518' },
          { name: '--gem-bronze', value: '#C98A3E' },
          { name: '--gem-bronze-dk', value: '#7C4E1F' },
        ]}
      />
      <SwatchGroup
        title="Brass"
        swatches={[
          { name: '--brass-light', value: '#F2C88F' },
          { name: '--brass', value: '#C98A3E' },
          { name: '--brass-deep', value: '#8E5A26' },
          { name: '--brass-dark', value: '#5C3A14' },
          { name: '--brass-shadow', value: '#3E1E0E' },
          { name: '--leather', value: '#5B3817' },
          { name: '--mahogany', value: '#2A1607' },
        ]}
      />
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, marginBottom: 12 }}>
          Font Families
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A7B64', marginBottom: 4 }}>
              --font-display
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36 }}>
              Cormorant Garamond
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A7B64', marginBottom: 4 }}>
              --font-body
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 20 }}>
              EB Garamond body text for reading
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A7B64', marginBottom: 4 }}>
              --font-mono
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>
              JetBrains Mono for code
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, marginBottom: 12 }}>
          Type Scale
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { token: '--fs-display', size: '120px', sample: 'Display' },
            { token: '--fs-h1', size: '84px', sample: 'Heading 1' },
            { token: '--fs-h2', size: '52px', sample: 'Heading 2' },
            { token: '--fs-h3', size: '36px', sample: 'Heading 3' },
            { token: '--fs-h4', size: '28px', sample: 'Heading 4' },
            { token: '--fs-h5', size: '22px', sample: 'Heading 5' },
            { token: '--fs-lead', size: '20px', sample: 'Lead text' },
            { token: '--fs-body', size: '17px', sample: 'Body text for reading' },
            { token: '--fs-small', size: '14px', sample: 'Small text' },
            { token: '--fs-caption', size: '13px', sample: 'Caption text' },
            { token: '--fs-hairline', size: '11px', sample: 'Hairline text' },
          ].map(({ token, size, sample }) => (
            <div key={token} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8A7B64', width: 120, flexShrink: 0 }}>
                {token}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8A7B64', width: 48, flexShrink: 0 }}>
                {size}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: size, lineHeight: 1.1 }}>
                {sample}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const SpacingScale: Story = {
  render: () => (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, marginBottom: 16 }}>
        Spacing Scale (4px base)
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { token: '--s-1', value: '4px' },
          { token: '--s-2', value: '8px' },
          { token: '--s-3', value: '12px' },
          { token: '--s-4', value: '16px' },
          { token: '--s-5', value: '24px' },
          { token: '--s-6', value: '32px' },
          { token: '--s-7', value: '48px' },
          { token: '--s-8', value: '64px' },
          { token: '--s-9', value: '96px' },
          { token: '--s-10', value: '128px' },
        ].map(({ token, value }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, width: 60, flexShrink: 0 }}>{token}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A7B64', width: 48, flexShrink: 0 }}>{value}</span>
            <div
              style={{
                width: value,
                height: 20,
                background: '#C03A2B',
                borderRadius: 1,
                opacity: 0.75,
              }}
            />
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, marginTop: 32, marginBottom: 16 }}>
        Technical Spacing
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { token: '--tk-pad-sm', value: '8px' },
          { token: '--tk-pad-md', value: '14px' },
          { token: '--tk-pad-lg', value: '20px' },
          { token: '--tk-pad-xl', value: '32px' },
        ].map(({ token, value }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, width: 100, flexShrink: 0 }}>{token}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8A7B64', width: 48, flexShrink: 0 }}>{value}</span>
            <div
              style={{
                width: value,
                height: 20,
                background: '#2B2A6B',
                borderRadius: 1,
                opacity: 0.75,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};
