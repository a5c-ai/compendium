/* eslint-disable no-undef */
/**
 * Catalog demo part 2 — Overlays, Layout, Data
 */

const Row2 = window.DemoRow;

// ─── Plate 7: Tooltip / Popover / Modal / Drawer ───────────────
const PlateOverlays = () => {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const toasts = useToasts();
  return (
    <div className="tkc-demo">
      <Row2 num="§.25" name="Tooltip" hint="Ink label with brass rule. 250ms delay, fades in.">
        <div className="tkc-demo__inline">
          <Tooltip text="Sealed on the 4th folio"><Button>Hover me</Button></Tooltip>
          <Tooltip text="Discard the dispatch" placement="bottom"><IconButton icon="x" label="discard" /></Tooltip>
          <Tooltip text="Export to CSV"><IconButton icon="file" label="export" /></Tooltip>
        </div>
      </Row2>
      <Row2 num="§.26" name="Modal" hint="Brass-framed dialog; Escape or scrim closes.">
        <Button variant="primary" onClick={() => setModal(true)}>Open dialog</Button>
        <Modal
          open={modal} onClose={() => setModal(false)}
          title={<><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6-4.5-4 6-1z" /></svg><span>Seal this run?</span></>}
          footer={<>
            <Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setModal(false); toasts.push({ kind: 'success', title: 'Sealed', message: 'Run committed to the ledger.' }); }}>Seal</Button>
          </>}
        >
          <p style={{ marginTop: 0, lineHeight: 1.55 }}>Sealing this run writes an immutable entry into the codex. The agents will stand down and their findings locked.</p>
          <p><em>This action cannot be undone. The wax is warm.</em></p>
        </Modal>
      </Row2>
      <Row2 num="§.27" name="Drawer" hint="Right-side sheet with brass spine. Slides in 280ms.">
        <Button onClick={() => setDrawer(true)}>Open drawer</Button>
        <Drawer
          open={drawer} onClose={() => setDrawer(false)}
          title="Run R-1189"
          footer={<>
            <Button variant="ghost" onClick={() => setDrawer(false)}>Dismiss</Button>
            <Button variant="primary" onClick={() => setDrawer(false)}>Acknowledge</Button>
          </>}
        >
          <Field label="Workflow"><Input defaultValue="pr-review / strict-gate" readOnly /></Field>
          <div style={{ height: 12 }} />
          <Field label="Crew"><Input defaultValue="seat-i, seat-iii" readOnly /></Field>
          <div style={{ height: 12 }} />
          <Field label="Notes" hint="Scribe adds context here.">
            <Textarea placeholder="The audit surfaced two findings worth revisiting…" />
          </Field>
        </Drawer>
      </Row2>
      <Row2 num="§.28" name="Toast" hint="Stacked at bottom-right. Auto-dismiss or manual.">
        <div className="tkc-demo__inline">
          <Button onClick={() => toasts.push({ title: 'The crew has arrived', message: 'Seats I–V reporting.' })}>Info</Button>
          <Button onClick={() => toasts.push({ kind: 'success', title: 'Ledger sealed', message: 'R-1187 committed.' })}>Success</Button>
          <Button onClick={() => toasts.push({ kind: 'warn', title: 'Gate near threshold', message: 'Latency 870ms / 1000ms.' })}>Warn</Button>
          <Button onClick={() => toasts.push({ kind: 'error', title: 'Connection severed', message: 'Retrying the signal…' })}>Error</Button>
        </div>
      </Row2>
    </div>
  );
};

// ─── Plate 8: Tabs / Segmented / Accordion / Tree / Crumbs / Pager / Empty
const PlateLayout = () => {
  const [pg, setPg] = useState(3);
  const [seg, setSeg] = useState('week');
  const [tab, setTab] = useState('runs');
  return (
    <div className="tkc-demo">
      <Row2 num="§.29" name="Tabs" hint="Underline slides under active; badge optional.">
        <Tabs
          value={tab} onChange={setTab}
          items={[
            { value: 'runs',     label: 'Runs',     badge: 12, body: <div style={{ fontFamily: 'var(--font-body)', color: 'var(--tkc-ink)' }}>12 runs today — <strong>8 sealed</strong>, 3 in progress, 1 failed gate.</div> },
            { value: 'agents',   label: 'Agents',             body: <div style={{ fontFamily: 'var(--font-body)', color: 'var(--tkc-ink)' }}>5 seats occupied · 2 idle · 0 on leave.</div> },
            { value: 'workflows',label: 'Workflows',          body: <div style={{ fontFamily: 'var(--font-body)', color: 'var(--tkc-ink)' }}>7 workflows on the shelf.</div> },
          ]}
        />
      </Row2>
      <Row2 num="§.30" name="Segmented" hint="Brass-capped thumb glides between segments.">
        <Segmented
          value={seg} onChange={setSeg}
          options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }, { value: 'quarter', label: 'Qtr' }]}
        />
      </Row2>
      <Row2 num="§.31" name="Accordion" hint="Disclosure with rotating caret and panel slide.">
        <Accordion
          defaultOpen={0}
          items={[
            { title: 'What is a seat?',     body: 'A seat is a dedicated agent persona. Each seat carries a ledger, a crew, and a set of workflows. Seats do not multitask across runs — they finish one folio before starting the next.' },
            { title: 'How does billing work?', body: 'Billing is per-seat per-month. Runs consumed within a seat are included. Overage applies only to overflow model tokens beyond the seat allotment.' },
            { title: 'Can agents call humans?', body: 'Yes — via gates. Any gate can be set to human-in-the-loop, pausing the run until a clerk (you) signs off.' },
          ]}
        />
      </Row2>
      <Row2 num="§.32" name="Tree view" hint="Folders collapse/expand; selection highlights.">
        <Tree
          defaultExpanded={['root', 'run-1189']}
          defaultSelected="plate-02"
          data={[{
            id: 'root', label: 'runs / today', count: 12, children: [
              { id: 'run-1189', label: 'R-1189 · Review', count: 6, children: [
                { id: 'plate-01', label: 'plate.01 — diff' },
                { id: 'plate-02', label: 'plate.02 — tests' },
                { id: 'plate-03', label: 'plate.03 — ledger' },
              ]},
              { id: 'run-1188', label: 'R-1188 · Benchmark', count: 4, children: [
                { id: 'b-01', label: 'latency' }, { id: 'b-02', label: 'throughput' },
              ]},
              { id: 'run-1187', label: 'R-1187 · Triage', count: 2 },
            ]
          }]}
        />
      </Row2>
      <Row2 num="§.33" name="Breadcrumbs" hint="Small-caps path; last segment is current.">
        <Breadcrumbs items={[
          { label: 'a5c' }, { label: 'runs' }, { label: 'today' }, { label: 'R-1189' },
        ]} />
      </Row2>
      <Row2 num="§.34" name="Pagination" hint="First, last, and window of siblings around current.">
        <Pagination page={pg} total={18} onChange={setPg} />
      </Row2>
      <Row2 num="§.35" name="Empty state" hint="For when the plate is blank.">
        <div style={{ maxWidth: 420 }}>
          <EmptyState
            icon="folder"
            title="No runs on this folio"
            message="When the crew files their first dispatch, it appears here."
            action={<Button variant="primary" leading={<Icon name="plus" size={12} />}>Begin a run</Button>}
          />
        </div>
      </Row2>
    </div>
  );
};

// ─── Plate 9: DataTable (ledger) ───────────────────────────────
const LEDGER = [
  { id: 'R-1189', run: 'pr-review · strict', verdict: 'PASS',  ms: 842,  when: '09:12', crew: 3 },
  { id: 'R-1188', run: 'benchmark · perf',   verdict: 'PASS',  ms: 2410, when: '08:58', crew: 2 },
  { id: 'R-1187', run: 'triage · intake',    verdict: 'FAIL',  ms: 1204, when: '08:44', crew: 1 },
  { id: 'R-1186', run: 'release · signed',   verdict: 'PASS',  ms: 3122, when: '08:21', crew: 5 },
  { id: 'R-1185', run: 'pr-review · loose',  verdict: 'WARN',  ms: 654,  when: '07:55', crew: 2 },
  { id: 'R-1184', run: 'audit · monthly',    verdict: 'PASS',  ms: 7820, when: '07:12', crew: 4 },
  { id: 'R-1183', run: 'pr-review · strict', verdict: 'PASS',  ms: 904,  when: '06:40', crew: 3 },
  { id: 'R-1182', run: 'triage · intake',    verdict: 'FAIL',  ms: 1130, when: '06:15', crew: 1 },
  { id: 'R-1181', run: 'benchmark · perf',   verdict: 'WARN',  ms: 2890, when: '05:48', crew: 2 },
  { id: 'R-1180', run: 'release · signed',   verdict: 'PASS',  ms: 2988, when: '05:10', crew: 4 },
  { id: 'R-1179', run: 'pr-review · strict', verdict: 'PASS',  ms: 870,  when: '04:32', crew: 3 },
  { id: 'R-1178', run: 'triage · intake',    verdict: 'PASS',  ms: 1022, when: '03:58', crew: 1 },
];
const verdictPill = (v) => (
  <span className={cx('tk-stamp', v === 'PASS' ? 'tk-stamp--pass' : v === 'FAIL' ? 'tk-stamp--fail' : 'tk-stamp--pend')}>
    {v}
  </span>
);

const PlateTable = () => {
  const toasts = useToasts();
  const [filter, setFilter] = useState(new Set());
  const [q, setQ] = useState('');
  const rows = LEDGER.filter((r) => {
    if (filter.size && !filter.has(r.verdict)) return false;
    if (q && !(r.id.toLowerCase().includes(q.toLowerCase()) || r.run.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });
  const toggle = (v) => {
    const n = new Set(filter);
    n.has(v) ? n.delete(v) : n.add(v);
    setFilter(n);
  };
  return (
    <div className="tkc-demo">
      <Row2 num="§.36" name="Data table" hint="Sortable columns; filter pills add/remove; paginated.">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ width: 240 }}>
            <Input placeholder="Search runs…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {['PASS','WARN','FAIL'].map((v) => (
            <button key={v} type="button" className="tkc-tag"
              style={{ cursor: 'pointer', opacity: filter.has(v) ? 1 : .55,
                       borderColor: filter.has(v) ? 'var(--tkc-ink)' : 'var(--tkc-rule-m)',
                       background: filter.has(v) ? 'linear-gradient(180deg,#F5E8CA,#DDC490)' : undefined }}
              onClick={() => toggle(v)}>
              {v} <Icon name={filter.has(v) ? 'x' : 'plus'} size={10} />
            </button>
          ))}
          {(filter.size || q) ? (
            <Button variant="ghost" size="sm" onClick={() => { setFilter(new Set()); setQ(''); }}>Clear</Button>
          ) : null}
          <span style={{ marginLeft: 'auto' }} className="tkc-demo__readout">{rows.length} folios</span>
        </div>
        <DataTable
          rows={rows}
          pageSize={6}
          onRowClick={(r) => toasts.push({ title: `Opened ${r.id}`, message: r.run })}
          columns={[
            { key: 'id',      label: 'id',      mono: true, width: 90 },
            { key: 'run',     label: 'run' },
            { key: 'verdict', label: 'verdict', width: 110, render: (r) => verdictPill(r.verdict) },
            { key: 'ms',      label: 'ms',      num: true, width: 90 },
            { key: 'crew',    label: 'crew',    num: true, width: 80 },
            { key: 'when',    label: 'when',    mono: true, width: 80 },
          ]}
        />
      </Row2>
    </div>
  );
};

Object.assign(window, {
  PlateOverlays, PlateLayout, PlateTable, LEDGER, verdictPill,
});
