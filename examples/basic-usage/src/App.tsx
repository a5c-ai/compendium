// ================================================================
// a5c.ai Compendium — Example App
// Codex Seraphinianus aesthetic: vellum + void, brass, cinnabar
// ================================================================

import '@a5c-ai/compendium/css';           // tokens + reset + base typography
import '@a5c-ai/compendium/css/Toast';     // toast component styles
import './App.css';

import { useState } from 'react';
import {
  Button,
  Input,
  Toggle,
  Select,
  Modal,
  Accordion,
  Tabs,
  ToastProvider,
  useToasts,
  Progress,
  Tag,
  Checkbox,
  RadioGroup,
  Slider,
} from '@a5c-ai/compendium/react';
import {
  LogoWordmark,
  LogoMonogram,
  SealGatePassed,
  GlyphDivider,
} from '@a5c-ai/compendium/icons';

/* ================================================================
   HERO SECTION — vellum ground, display headline, install block
   ================================================================ */
function HeroSection() {
  return (
    <section className="section section--hero paper-grain">
      <div className="wrap">
        <div className="eyebrow">Codex of Reliable Autonomy</div>

        <div className="hero-grid">
          <div className="hero">
            <h1>
              Build with<br />
              certainty<span className="dot">.</span>
            </h1>
            <p className="lede">
              Compendium is the a5c.ai design system &mdash; tokens, components,
              and icons forged for products that ship with confidence.
            </p>
            <div className="hero__cta">
              <Button variant="primary">Get Started</Button>
              <Button variant="default">Documentation</Button>
            </div>
          </div>

          <div className="hero__plate">
            <div className="install-block">
              <div className="install-block__code">
                <span className="prompt">$</span> npm install @a5c-ai/compendium
              </div>
            </div>
            <div className="hero__plate-cap">
              <span>fig. 1 &middot; installation</span>
              <span>v0.1.0</span>
            </div>
          </div>
        </div>

        <div className="folio" style={{ marginTop: 'var(--s-5)' }}>fol. I</div>
      </div>
    </section>
  );
}

/* ================================================================
   TOKENS SECTION — color swatches on vellum
   ================================================================ */
function TokensSection() {
  const swatches = [
    { name: '--ground-vellum', hex: '#EDE3CF', color: 'var(--ground-vellum)' },
    { name: '--ground-parchment', hex: '#D9CBAE', color: 'var(--ground-parchment)' },
    { name: '--ground-void', hex: '#0B0A0F', color: 'var(--ground-void)' },
    { name: '--ground-ink', hex: '#181624', color: 'var(--ground-ink)' },
    { name: '--accent-cinnabar', hex: '#C03A2B', color: 'var(--accent-cinnabar)' },
    { name: '--accent-viridian', hex: '#2F6F5E', color: 'var(--accent-viridian)' },
    { name: '--accent-indigo', hex: '#2B2A6B', color: 'var(--accent-indigo)' },
    { name: '--accent-sulphur', hex: '#D4A84B', color: 'var(--accent-sulphur)' },
    { name: '--brass', hex: '#C98A3E', color: 'var(--brass)' },
    { name: '--gem-cyan', hex: '#16D7E6', color: 'var(--gem-cyan)' },
    { name: '--gem-emerald', hex: '#3EA676', color: 'var(--gem-emerald)' },
    { name: '--gem-ruby', hex: '#D81F3D', color: 'var(--gem-ruby)' },
  ];

  return (
    <section className="section paper-grain">
      <div className="wrap">
        <div className="eyebrow">Chapter I</div>
        <h2 className="sec-title">
          Design Tokens<span className="dot">.</span>
        </h2>
        <p className="sec-lede">
          Grounds, inks, accents, and gemstones &mdash; every surface in the
          Codex draws from a controlled palette of CSS custom properties.
        </p>

        <div className="swatch-grid">
          {swatches.map((s) => (
            <div key={s.name} className="swatch">
              <div
                className="swatch__color"
                style={{ background: s.color }}
              />
              <span className="swatch__name">{s.name}</span>
              <span className="swatch__hex">{s.hex}</span>
            </div>
          ))}
        </div>

        <div className="fig-caption" style={{ marginTop: 'var(--s-5)' }}>
          fig. 2 &middot; colour palette &mdash; vellum &amp; cipher edition
        </div>
        <div className="folio">fol. II</div>
      </div>
    </section>
  );
}

/* ================================================================
   FORM CONTROLS — vellum ground
   ================================================================ */
function FormSection() {
  const [toggleOn, setToggleOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [sliderVal, setSliderVal] = useState(65);

  const roleOptions = [
    { label: 'Scribe', value: 'scribe' },
    { label: 'Artificer', value: 'artificer' },
    { label: 'Cartographer', value: 'cartographer' },
    { label: 'Alchemist', value: 'alchemist' },
  ];

  return (
    <section className="section paper-grain">
      <div className="wrap">
        <hr className="rule" />
        <div className="eyebrow">Chapter II</div>
        <h2 className="sec-title">
          Form Controls<span className="dot">.</span>
        </h2>
        <p className="sec-lede">
          Brass-and-vellum surfaces for every input. Mechanical press buttons,
          engraved toggles, and quill-style text fields.
        </p>

        <div className="demo-grid">
          <div className="demo-field">
            <label className="demo-label">Name</label>
            <Input
              placeholder="Enter your name"
              value={inputVal}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputVal(e.target.value)
              }
            />
          </div>

          <div className="demo-field">
            <label className="demo-label">Guild</label>
            <Select
              options={roleOptions}
              value={selected}
              onChange={(val: string) => setSelected(val)}
              placeholder="Select a guild..."
            />
          </div>

          <div className="demo-field">
            <label className="demo-label">Notifications</label>
            <div className="demo-row">
              <Toggle
                checked={toggleOn}
                onChange={(val: boolean) => setToggleOn(val)}
              />
              <span style={{ fontSize: 'var(--fs-small)', color: 'var(--fg-2)' }}>
                {toggleOn ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          <div className="demo-field">
            <label className="demo-label">Agreement</label>
            <Checkbox
              checked={checked}
              onChange={(val: boolean) => setChecked(val)}
              label="I accept the codex terms"
            />
          </div>
        </div>

        <div style={{ marginTop: 'var(--s-6)' }}>
          <label className="demo-label">Confidence Threshold</label>
          <div style={{ marginTop: 'var(--s-2)', maxWidth: 400 }}>
            <Slider
              value={sliderVal}
              onChange={setSliderVal}
              min={0}
              max={100}
              ticks={11}
              format={(v) => `${v}%`}
            />
          </div>
        </div>

        <hr className="rule" style={{ margin: 'var(--s-6) 0' }} />

        <div className="sub-title">Buttons</div>
        <div className="demo-row demo-row--gap-lg">
          <Button variant="primary">Primary</Button>
          <Button variant="default">Default</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="default" loading>Loading</Button>
        </div>

        <div style={{ marginTop: 'var(--s-6)' }}>
          <div className="sub-title">Tags</div>
          <div className="demo-row">
            <Tag>Design System</Tag>
            <Tag>React</Tag>
            <Tag>Published</Tag>
            <Tag>Draft</Tag>
            <Tag>v0.1.0</Tag>
          </div>
        </div>

        <div className="fig-caption" style={{ marginTop: 'var(--s-6)' }}>
          fig. 3 &middot; interactive brass-and-vellum controls
        </div>
        <div className="folio">fol. III</div>
      </div>
    </section>
  );
}

/* ================================================================
   TOAST DEMO (must be inside ToastProvider)
   ================================================================ */
function ToastDemo() {
  const { push } = useToasts();

  return (
    <div className="demo-row demo-row--gap-lg">
      <Button
        variant="primary"
        onClick={() =>
          push({ title: 'Gate Passed', message: 'All checks completed successfully.', kind: 'success' })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="default"
        onClick={() =>
          push({ title: 'Seal Broken', message: 'Verification has failed.', kind: 'error' })
        }
      >
        Error Toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          push({ title: 'New Inscription', message: 'A codex update is available.', kind: 'info' })
        }
      >
        Info Toast
      </Button>
    </div>
  );
}

/* ================================================================
   DARK / VOID SECTION — accordion, tabs, progress, toasts, icons
   ================================================================ */
function VoidSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const accordionItems = [
    {
      title: 'What is the Compendium?',
      body: (
        <p style={{ color: 'var(--glyph-bone)' }}>
          The Compendium is a5c.ai's design system &mdash; a curated folio of React
          components, design tokens, and ornamental icons built for reliability.
        </p>
      ),
    },
    {
      title: 'How do I install it?',
      body: (
        <pre style={{ margin: 0 }}>
          npm install @a5c-ai/compendium
        </pre>
      ),
    },
    {
      title: 'What tokens are included?',
      body: (
        <p style={{ color: 'var(--glyph-bone)' }}>
          Grounds, inks, accents, gemstones, typography scales, spacing, radii,
          shadows, and motion &mdash; all as CSS custom properties.
        </p>
      ),
    },
  ];

  const tabItems = [
    {
      value: 'overview',
      label: 'Overview',
      body: (
        <p style={{ padding: 'var(--s-4) 0', color: 'var(--glyph-bone)' }}>
          Compendium provides a complete design language for building a5c.ai
          products. Components are themeable via CSS variables and work in both
          vellum (light) and void (dark) contexts.
        </p>
      ),
    },
    {
      value: 'components',
      label: 'Components',
      badge: '14+',
      body: (
        <p style={{ padding: 'var(--s-4) 0', color: 'var(--glyph-bone)' }}>
          Buttons, Inputs, Selects, Toggles, Checkboxes, Radios, Sliders,
          Modals, Drawers, Accordions, Tabs, Toasts, Progress, Tags, and more.
        </p>
      ),
    },
    {
      value: 'icons',
      label: 'Icons',
      body: (
        <p style={{ padding: 'var(--s-4) 0', color: 'var(--glyph-bone)' }}>
          SVG icons including glyphs, logos, seals, and illustrations &mdash; all
          importable as React components from <code>@a5c-ai/compendium/icons</code>.
        </p>
      ),
    },
  ];

  return (
    <section className="section section--void void" data-theme="void">
      <div className="wrap">
        <div className="eyebrow">Chapter III</div>
        <h2 className="sec-title">
          The Void<span className="dot">.</span>
        </h2>
        <p className="sec-lede">
          Dark contexts for deep focus. Interactive panels, progress gauges,
          and the full icon bestiary rendered against the void ground.
        </p>

        {/* -- Accordion -- */}
        <div className="sub-title" style={{ marginBottom: 'var(--s-4)' }}>
          Accordion
        </div>
        <Accordion items={accordionItems} />

        <hr className="rule" />

        {/* -- Tabs -- */}
        <div className="sub-title" style={{ marginBottom: 'var(--s-4)' }}>
          Tabs
        </div>
        <Tabs items={tabItems} />

        <hr className="rule" />

        {/* -- Progress Bars -- */}
        <div className="sub-title" style={{ marginBottom: 'var(--s-4)' }}>
          Progress
        </div>
        <div className="progress-stack">
          <div className="progress-row">
            <span className="progress-label">Coverage</span>
            <div style={{ flex: 1 }}><Progress value={87} /></div>
          </div>
          <div className="progress-row">
            <span className="progress-label">Build</span>
            <div style={{ flex: 1 }}><Progress value={42} /></div>
          </div>
          <div className="progress-row">
            <span className="progress-label">Deploy</span>
            <div style={{ flex: 1 }}><Progress value={96} /></div>
          </div>
        </div>

        <hr className="rule" />

        {/* -- Radio Group -- */}
        <div className="sub-title" style={{ marginBottom: 'var(--s-4)' }}>
          Radio Group
        </div>
        <RadioGroup
          options={[
            { value: 'interactive', label: 'Interactive mode' },
            { value: 'plan', label: 'Plan mode' },
            { value: 'yolo', label: 'Yolo mode' },
          ]}
          defaultValue="interactive"
          direction="horizontal"
        />

        <hr className="rule" />

        {/* -- Toasts -- */}
        <div className="sub-title" style={{ marginBottom: 'var(--s-4)' }}>
          Toast Notifications
        </div>
        <ToastDemo />

        <hr className="rule" />

        {/* -- Modal -- */}
        <div className="sub-title" style={{ marginBottom: 'var(--s-4)' }}>
          Modal Dialog
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Codex Inscription"
        >
          <p style={{ marginBottom: 'var(--s-4)' }}>
            This modal handles focus trapping, keyboard dismissal, and backdrop
            clicks. It is the ceremonial dialog of the Codex.
          </p>
          <div className="demo-row">
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>

        <hr className="rule" />

        {/* -- Icons -- */}
        <div className="sub-title" style={{ marginBottom: 'var(--s-4)' }}>
          Icons &amp; Seals
        </div>
        <div className="icons-grid">
          <div className="icon-item">
            <LogoWordmark style={{ height: 40, width: 'auto' }} />
            <span className="icon-item__label">LogoWordmark</span>
          </div>
          <div className="icon-item">
            <LogoMonogram style={{ height: 64, width: 'auto' }} />
            <span className="icon-item__label">LogoMonogram</span>
          </div>
          <div className="icon-item">
            <SealGatePassed style={{ height: 80, width: 'auto' }} />
            <span className="icon-item__label">SealGatePassed</span>
          </div>
          <div className="icon-item">
            <GlyphDivider style={{ height: 20, width: 'auto' }} />
            <span className="icon-item__label">GlyphDivider</span>
          </div>
        </div>

        <div className="fig-caption" style={{ marginTop: 'var(--s-6)' }}>
          fig. 4 &middot; void context &mdash; components &amp; icon bestiary
        </div>
        <div className="folio">fol. IV</div>
      </div>
    </section>
  );
}

/* ================================================================
   QUOTE SECTION — vellum ground, pull quote
   ================================================================ */
function QuoteSection() {
  return (
    <section className="section paper-grain">
      <div className="wrap">
        <div className="quote-block">
          <blockquote>
            Tasks converge. PRs get merged.
            Done means done.
          </blockquote>
          <cite>a5c.ai &middot; Codex of Reliable Autonomy</cite>
        </div>

        <div className="glyph-string" style={{ marginTop: 'var(--s-7)' }}>
          &#x27E1; &#x25CA; &#x27E1;
        </div>
        <div className="folio">fol. V</div>
      </div>
    </section>
  );
}

/* ================================================================
   ROOT APP
   ================================================================ */
export default function App() {
  return (
    <ToastProvider>
      <div className="app">
        {/* Top cinnabar rule */}
        <div className="top-rule">Compendium &middot; Design System</div>

        {/* Navigation */}
        <nav className="nav">
          <div className="nav__brand">
            <LogoMonogram style={{ width: 36, height: 36 }} />
            <div>
              <span className="nav__tag">a5c.ai Compendium</span>
            </div>
          </div>
          <div className="nav__links">
            <a href="#tokens">Tokens</a>
            <a href="#controls">Controls</a>
            <a href="#void">Void</a>
          </div>
        </nav>

        <main>
          <HeroSection />
          <TokensSection />
          <FormSection />
          <VoidSection />
          <QuoteSection />
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="wrap">
            <GlyphDivider className="footer__glyph" style={{ margin: '0 auto var(--s-3)', height: 16, width: 'auto' }} />
            <div className="footer__text">
              a5c.ai &middot; Compendium v0.1.0 &middot; Codex Edition
            </div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
