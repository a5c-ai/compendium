/* eslint-disable no-undef */
/**
 * Catalog demo part 1 — Controls, Pickers, Feedback
 * Uses the window-exposed component primitives.
 */

// Small helpers
const Row = ({ num, name, hint, children }) => (
  <div className="tkc-demo__row">
    <div className="tkc-demo__label">
      <span style={{ opacity: .6 }}>{num}</span>
      <span className="n">{name}</span>
      {hint && <span className="h">{hint}</span>}
    </div>
    <div className="tkc-demo__body">{children}</div>
  </div>
);

// ─── Plate 1: Buttons ──────────────────────────────────────────
const PlateButtons = () => {
  const [loading, setLoading] = useState(false);
  const toasts = useToasts();
  return (
    <div className="tkc-demo">
      <Row num="§.01" name="Button — kinds" hint="Primary (cinnabar), Default (vellum), Ghost. Hover lifts, press sinks.">
        <div className="tkc-demo__inline">
          <Button variant="primary">Begin the run</Button>
          <Button>Preview</Button>
          <Button variant="ghost">Cancel</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => { setLoading(false); toasts.push({ kind: 'success', title: 'Ledger sealed', message: 'The run completed without objection.' }); }, 1400);
            }}
          >Seal ledger</Button>
        </div>
      </Row>
      <Row num="§.02" name="Icon button">
        <div className="tkc-demo__inline">
          <IconButton icon="gear" label="settings" />
          <IconButton icon="bell" label="notifications" />
          <IconButton icon="search" label="search" />
          <IconButton icon="plus" label="add" variant="primary" />
        </div>
      </Row>
      <Row num="§.03" name="Menu" hint="Trigger a popover of navigable items.">
        <Menu
          trigger={<Button trailing={<Icon name="chevronDown" size={11} />}>Actions</Button>}
          items={[
            { type: 'group', label: 'Ledger' },
            { icon: 'file',   label: 'Export CSV',   shortcut: '⌘E', onClick: () => toasts.push('Exported.') },
            { icon: 'upload', label: 'Upload batch', shortcut: '⌘U' },
            { type: 'sep' },
            { icon: 'gear',   label: 'Preferences' },
            { icon: 'x',      label: 'Archive',      disabled: true },
          ]}
        />
      </Row>
    </div>
  );
};

// ─── Plate 2: Toggles / Checks / Radios ────────────────────────
const PlateToggles = () => {
  const [items, setItems] = useState({ runs: true, ledger: false, gates: true });
  const all = items.runs && items.ledger && items.gates;
  const some = (items.runs || items.ledger || items.gates) && !all;
  return (
    <div className="tkc-demo">
      <Row num="§.04" name="Toggle — switch" hint="Brass lever. 180ms glide; track shifts from ink to emerald.">
        <div className="tkc-demo__inline">
          <Toggle defaultChecked label="Require approval gate" />
          <Toggle label="Notify on error" />
          <Toggle disabled label="Telemetry (locked)" />
        </div>
      </Row>
      <Row num="§.05" name="Checkbox — tri-state" hint="Parent shows dashed mid-state when children are mixed.">
        <div className="tkc-demo__stack">
          <Checkbox
            checked={all}
            indeterminate={some}
            onChange={() => { const nv = !all; setItems({ runs: nv, ledger: nv, gates: nv }); }}
            label="All notifications"
          />
          <div style={{ paddingLeft: 28, display: 'grid', gap: 8 }}>
            <Checkbox checked={items.runs}   onChange={(v) => setItems((s) => ({ ...s, runs: v }))}   label="Runs completed" />
            <Checkbox checked={items.ledger} onChange={(v) => setItems((s) => ({ ...s, ledger: v }))} label="Ledger sealed" />
            <Checkbox checked={items.gates}  onChange={(v) => setItems((s) => ({ ...s, gates: v }))}  label="Gate failures" />
          </div>
        </div>
      </Row>
      <Row num="§.06" name="Radio group" hint="Single-select gem in brass socket.">
        <RadioGroup
          defaultValue="strict"
          options={[
            { value: 'strict',  label: 'Strict — block on any fail' },
            { value: 'warn',    label: 'Warn — proceed with annotation' },
            { value: 'advise',  label: 'Advise — report only' },
            { value: 'off',     label: 'Off', disabled: true },
          ]}
        />
      </Row>
    </div>
  );
};

// ─── Plate 3: Sliders, Steppers, Progress ──────────────────────
const PlateSliders = () => {
  const [temp, setTemp] = useState(42);
  const [rng, setRng] = useState([15, 80]);
  const [qty, setQty] = useState(4);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => (p + 7) % 108), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="tkc-demo">
      <Row num="§.07" name="Slider — single" hint="Brass rail; cinnabar jewel. Readout floats above on hover/drag.">
        <div style={{ maxWidth: 440 }}>
          <Slider value={temp} onChange={setTemp} min={0} max={100} ticks={11} />
          <div className="tkc-demo__readout" style={{ marginTop: 10 }}>value · <span style={{ color: 'var(--tkc-ink)' }}>{temp}</span></div>
        </div>
      </Row>
      <Row num="§.08" name="Slider — range" hint="Two thumbs. Fill painted between them.">
        <div style={{ maxWidth: 440 }}>
          <RangeSlider value={rng} onChange={setRng} min={0} max={100} />
          <div className="tkc-demo__readout" style={{ marginTop: 10 }}>between · <span style={{ color: 'var(--tkc-ink)' }}>{rng[0]}</span> – <span style={{ color: 'var(--tkc-ink)' }}>{rng[1]}</span></div>
        </div>
      </Row>
      <Row num="§.09" name="Stepper — number" hint="Numeric spinner, clamps between bounds.">
        <div className="tkc-demo__inline">
          <Stepper value={qty} onChange={setQty} min={0} max={12} />
          <span className="tkc-demo__readout">seats · <span style={{ color: 'var(--tkc-ink)' }}>{qty}</span></span>
        </div>
      </Row>
      <Row num="§.10" name="Progress" hint="Determinate + indeterminate (brass shuttle).">
        <div className="tkc-demo__stack" style={{ maxWidth: 440 }}>
          <Progress value={pct > 100 ? 100 : pct} />
          <Progress indeterminate />
        </div>
      </Row>
      <Row num="§.11" name="Spinner — loading" hint="Classic wheel and cogged gear variant.">
        <div className="tkc-demo__inline">
          <Spinner />
          <Spinner gear />
          <span className="tkc-demo__readout">binding the ledger…</span>
        </div>
      </Row>
      <Row num="§.12" name="Skeleton — placeholder" hint="Shimmering vellum strips while the plate is being set.">
        <div style={{ display: 'grid', gap: 8, maxWidth: 440 }}>
          <Skeleton w="70%" h={18} />
          <Skeleton w="95%" h={11} />
          <Skeleton w="60%" h={11} />
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <Skeleton w={46} h={46} r={6} />
            <div style={{ flex: 1, display: 'grid', gap: 6 }}>
              <Skeleton w="40%" h={13} />
              <Skeleton w="80%" h={11} />
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

// ─── Plate 4: Inputs / Fields / Tags / Inline / Color ──────────
const PlateInputs = () => {
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState(['steampunk', 'ivory']);
  const [name, setName] = useState('Lady Ramona Welles');
  const [color, setColor] = useState('#C03A2B');
  const valid = /^\S+@\S+\.\S+$/.test(email);
  return (
    <div className="tkc-demo">
      <Row num="§.13" name="Input + field" hint="Label, hint, error states. Focus blooms to cinnabar.">
        <div className="tkc-demo__grid-2" style={{ maxWidth: 520 }}>
          <Field label="Email" hint={email && !valid ? null : 'We’ll send the sealed ledger here.'} error={email && !valid ? 'Not a valid address.' : null}>
            <Input placeholder="clerk@a5c.ai" value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!email && !valid} />
          </Field>
          <Field label="API key" hint="Keep it folio-locked.">
            <Input placeholder="sk_•••••••••••••" type="password" />
          </Field>
        </div>
        <Field label="Dispatch" hint="Up to 500 words.">
          <Textarea placeholder="Write the instructions for the crew…" />
        </Field>
      </Row>
      <Row num="§.14" name="Tag input" hint="Press Enter or comma to seal. Backspace removes the last.">
        <div style={{ maxWidth: 520 }}>
          <TagInput value={tags} onChange={setTags} placeholder="Add a tag…" />
          <div className="tkc-demo__readout" style={{ marginTop: 8 }}>sealed · {tags.join(' · ') || '(none)'}</div>
        </div>
      </Row>
      <Row num="§.15" name="Inline edit" hint="Click to edit in-place. Enter commits, Escape cancels.">
        <div style={{ fontSize: 18, fontFamily: 'var(--font-display)' }}>
          Dispatch for <InlineEdit value={name} onChange={setName} /> has been sealed.
        </div>
      </Row>
      <Row num="§.16" name="Color swatch" hint="Gem palette; selected ring outside, ink inside.">
        <div className="tkc-demo__stack">
          <ColorPicker value={color} onChange={setColor} />
          <span className="tkc-demo__readout">chosen · <span style={{ color: 'var(--tkc-ink)' }}>{color}</span></span>
        </div>
      </Row>
    </div>
  );
};

// ─── Plate 5: Select family & Autocomplete ─────────────────────
const RUN_KINDS = [
  { value: 'review', label: 'Review — code diff audit' },
  { value: 'bench',  label: 'Benchmark — perf ledger' },
  { value: 'triage', label: 'Triage — bug intake' },
  { value: 'release', label: 'Release — signed cut' },
];

const PlateSelects = () => {
  const [seats, setSeats] = useState(['seat-i', 'seat-iii']);
  return (
    <div className="tkc-demo">
      <Row num="§.17" name="Select — single" hint="Keyboard-navigable popover; selection mirrored on trigger.">
        <Select options={RUN_KINDS} defaultValue="review" placeholder="Choose a run…" />
      </Row>
      <Row num="§.18" name="Combobox — filterable" hint="Type to narrow; enter to pick.">
        <Combobox
          options={['Foundry Hall', 'Brass Parlour', 'Ink Studio', 'Ledger Vault', 'Plate-works', 'Signal Room', 'Print House']}
          placeholder="Search rooms…"
        />
      </Row>
      <Row num="§.19" name="Multi-select — chips" hint="Each pick becomes a dismissable chip.">
        <div style={{ maxWidth: 520 }}>
          <MultiSelect
            value={seats} onChange={setSeats}
            options={[
              { value: 'seat-i',   label: 'Seat I · architect' },
              { value: 'seat-ii',  label: 'Seat II · scribe' },
              { value: 'seat-iii', label: 'Seat III · auditor' },
              { value: 'seat-iv',  label: 'Seat IV · runner' },
              { value: 'seat-v',   label: 'Seat V · sentinel' },
            ]}
          />
        </div>
      </Row>
      <Row num="§.20" name="Search — autocomplete" hint="Suggestions surface as you type.">
        <div style={{ maxWidth: 520 }}>
          <SearchAutocomplete
            placeholder="Search the codex…"
            suggestions={[
              { label: 'Runs · ledger',      hint: 'R' },
              { label: 'Agents · roster',    hint: 'A' },
              { label: 'Workflows · library',hint: 'W' },
              { label: 'Gates · policies',   hint: 'G' },
              { label: 'Integrations',       hint: 'I' },
              { label: 'Settings · billing', hint: 'S' },
              { label: 'Audit log',          hint: 'L' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
};

// ─── Plate 6: Date / Time / Upload ─────────────────────────────
const PlatePickers = () => {
  const [d, setD] = useState(null);
  const [r, setR] = useState([null, null]);
  const [t, setT] = useState('09:30');
  return (
    <div className="tkc-demo">
      <Row num="§.21" name="Date picker" hint="Monthly folio; today is outlined.">
        <DatePicker value={d} onChange={setD} />
      </Row>
      <Row num="§.22" name="Date range" hint="Click a start, then an end. Dates between are inked.">
        <DateRangePicker value={r} onChange={setR} />
      </Row>
      <Row num="§.23" name="Time picker" hint="Two-column scroll; 5-minute steps by default.">
        <TimePicker value={t} onChange={setT} />
      </Row>
      <Row num="§.24" name="File upload" hint="Dropzone highlights cinnabar while dragging.">
        <FileUpload />
      </Row>
    </div>
  );
};

Object.assign(window, {
  PlateButtons, PlateToggles, PlateSliders, PlateInputs, PlateSelects, PlatePickers,
  DemoRow: Row,
});
