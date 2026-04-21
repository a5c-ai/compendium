import '@a5c-ai/compendium/css/tokens';
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
} from '@a5c-ai/compendium/react';
import {
  LogoWordmark,
  SealGatePassed,
  GlyphDivider,
} from '@a5c-ai/compendium/icons';

// ---- Toast Demo (must be inside ToastProvider) ----
function ToastDemo() {
  const { add } = useToasts();

  return (
    <div className="demo-row">
      <Button
        variant="primary"
        onClick={() =>
          add({ message: 'Operation completed successfully!', variant: 'success' })
        }
      >
        Show Success Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          add({ message: 'Something went wrong.', variant: 'error' })
        }
      >
        Show Error Toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          add({ message: 'Heads up — new update available.', variant: 'info' })
        }
      >
        Show Info Toast
      </Button>
    </div>
  );
}

// ---- Form Section (light / vellum) ----
function LightSection() {
  const [toggleOn, setToggleOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const roleOptions = [
    { label: 'Designer', value: 'designer' },
    { label: 'Engineer', value: 'engineer' },
    { label: 'Product Manager', value: 'pm' },
    { label: 'QA Engineer', value: 'qa' },
  ];

  return (
    <section
      className="demo-section"
      style={{
        background: 'var(--color-surface-vellum, #f5f1eb)',
        color: 'var(--color-text-primary, #1a1a1a)',
      }}
    >
      <h2 className="demo-section-title">Form Controls — Light (Vellum)</h2>

      <div className="demo-grid">
        <div className="demo-field">
          <label className="demo-label">Name</label>
          <Input
            placeholder="Enter your name"
            value={inputVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)}
          />
        </div>

        <div className="demo-field">
          <label className="demo-label">Role</label>
          <Select
            options={roleOptions}
            value={selected}
            onChange={(val: string | undefined) => setSelected(val)}
            placeholder="Select a role..."
          />
        </div>

        <div className="demo-field">
          <label className="demo-label">Notifications</label>
          <div className="demo-row">
            <Toggle
              checked={toggleOn}
              onChange={() => setToggleOn((v) => !v)}
            />
            <span style={{ fontSize: '0.875rem' }}>
              {toggleOn ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        <div className="demo-field">
          <label className="demo-label">Agree to terms</label>
          <Checkbox
            checked={checked}
            onChange={() => setChecked((v) => !v)}
            label="I accept the terms and conditions"
          />
        </div>
      </div>

      <div className="demo-row" style={{ marginTop: '1.5rem' }}>
        <Button variant="primary">Submit</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="ghost">Reset</Button>
        <Button variant="destructive" size="sm">Delete</Button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 className="demo-subsection-title">Tags</h3>
        <div className="demo-row">
          <Tag>Design System</Tag>
          <Tag variant="accent">React</Tag>
          <Tag variant="success">Published</Tag>
          <Tag variant="warning">Draft</Tag>
          <Tag variant="error">Deprecated</Tag>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 className="demo-subsection-title">Progress</h3>
        <div className="demo-field" style={{ maxWidth: '400px' }}>
          <Progress value={65} max={100} />
          <Progress value={30} max={100} variant="accent" />
          <Progress value={90} max={100} variant="success" />
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 className="demo-subsection-title">Toast Notifications</h3>
        <ToastDemo />
      </div>
    </section>
  );
}

// ---- Accordion + Tabs Section ----
function InteractiveSection() {
  const accordionItems = [
    {
      id: 'what',
      label: 'What is Compendium?',
      content: (
        <p>
          Compendium is the A5C design system — a curated set of React
          components, design tokens, and icons built for consistency and speed.
        </p>
      ),
    },
    {
      id: 'install',
      label: 'How do I install it?',
      content: (
        <pre style={{ margin: 0, fontSize: '0.85rem' }}>
          npm install @a5c-ai/compendium
        </pre>
      ),
    },
    {
      id: 'tokens',
      label: 'What tokens are included?',
      content: (
        <p>
          Color, typography, spacing, border-radius, shadow, and motion tokens —
          all exposed as CSS custom properties.
        </p>
      ),
    },
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <p style={{ padding: '1rem 0' }}>
          Compendium provides a complete design language for building A5C
          products. Components are themeable via CSS variables and work in both
          light and dark contexts.
        </p>
      ),
    },
    {
      id: 'components',
      label: 'Components',
      content: (
        <p style={{ padding: '1rem 0' }}>
          Buttons, Inputs, Selects, Toggles, Checkboxes, Modals, Drawers,
          Accordions, Tabs, Toasts, Progress bars, Tags, and many more.
        </p>
      ),
    },
    {
      id: 'icons',
      label: 'Icons',
      content: (
        <p style={{ padding: '1rem 0' }}>
          SVG icons including glyphs, logos, seals, and illustrations — all
          importable as React components.
        </p>
      ),
    },
  ];

  return (
    <section
      className="demo-section"
      style={{
        background: 'var(--color-surface-default, #ffffff)',
        color: 'var(--color-text-primary, #1a1a1a)',
      }}
    >
      <h2 className="demo-section-title">Accordion</h2>
      <Accordion items={accordionItems} />

      <h2 className="demo-section-title" style={{ marginTop: '2.5rem' }}>
        Tabs
      </h2>
      <Tabs tabs={tabs} />
    </section>
  );
}

// ---- Modal Demo ----
function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="demo-section"
      style={{
        background: 'var(--color-surface-vellum, #f5f1eb)',
        color: 'var(--color-text-primary, #1a1a1a)',
      }}
    >
      <h2 className="demo-section-title">Modal</h2>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
      >
        <p>
          This is a modal dialog from Compendium. It handles focus trapping,
          keyboard dismissal, and backdrop clicks out of the box.
        </p>
        <div className="demo-row" style={{ marginTop: '1.5rem' }}>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Confirm
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </section>
  );
}

// ---- Dark / Void Section (icons) ----
function DarkSection() {
  return (
    <section
      className="demo-section"
      style={{
        background: 'var(--color-surface-void, #0d0d0d)',
        color: 'var(--color-text-on-dark, #f0ebe3)',
      }}
    >
      <h2 className="demo-section-title" style={{ color: 'inherit' }}>
        Icons — Dark (Void)
      </h2>

      <div className="demo-row demo-icons-row">
        <div className="demo-icon-item">
          <LogoWordmark style={{ height: 32 }} />
          <span className="demo-icon-label">LogoWordmark</span>
        </div>
        <div className="demo-icon-item">
          <SealGatePassed style={{ height: 64 }} />
          <span className="demo-icon-label">SealGatePassed</span>
        </div>
        <div className="demo-icon-item">
          <GlyphDivider style={{ height: 24 }} />
          <span className="demo-icon-label">GlyphDivider</span>
        </div>
      </div>
    </section>
  );
}

// ---- Root App ----
export default function App() {
  return (
    <ToastProvider>
      <div className="app">
        <header className="app-header">
          <LogoWordmark style={{ height: 28 }} />
          <span className="app-header-subtitle">Compendium · Basic Usage Example</span>
        </header>

        <main>
          <LightSection />
          <DarkSection />
          <InteractiveSection />
          <ModalDemo />
        </main>
      </div>
    </ToastProvider>
  );
}
