import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ChatMemo, ChatRail, ChatShell } from './ChatPrimitives';

describe('Chat primitive surfaces', () => {
  it('renders the dark workspace shell variant', () => {
    const html = renderToStaticMarkup(
      <ChatShell
        theme="dark"
        rail={<div>rail</div>}
        wall={<div>wall</div>}
        inspector={<div>inspector</div>}
      />,
    );

    expect(html).toContain('class="mk-chat-app mk-chat-app--dark"');
  });

  it('renders rail counts and current-thread state', () => {
    const html = renderToStaticMarkup(
      <ChatRail
        brand="Atelier."
        pinned={[
          {
            mark: '★',
            title: 'Freight claims Oct batch review',
            preview: 'archivist: Six claims flagged.',
            when: '14:32',
            current: true,
          },
          {
            mark: '★',
            title: 'SOC-2 evidence narrative',
            preview: 'scribe-04: Section 3 expanded.',
            when: 'yest.',
          },
        ]}
        today={[
          {
            mark: '1',
            title: 'Customer escalation r-8840',
            preview: 'concierge-02: Refund exceeds soft-cap.',
            when: '14:17',
          },
        ]}
        foot={<div>budget</div>}
      />,
    );

    expect(html).toContain('Pinned</span><i>2</i>');
    expect(html).toContain('Today</span><i>1</i>');
    expect(html).toContain('mk-chat-rail__item current');
    expect(html).toContain('Freight claims Oct batch review');
  });

  it('renders full and brief memo states distinctly', () => {
    const fullHtml = renderToStaticMarkup(
      <ChatMemo
        title="Memo · 01"
        seat="archivist · ledger reconciler"
        timestamp="14:02:11 UTC"
        body={<p>Thirty-six are internally consistent.</p>}
        footnote="Seat 03 · 1.42s · ¢3.8"
        actions={[{ label: 'Reply' }, { label: 'Copy' }]}
      />,
    );
    const briefHtml = renderToStaticMarkup(
      <ChatMemo
        title="Memo · brief"
        seat="verifier-03"
        timestamp="14:04:11 UTC"
        body={<p>Short follow-up.</p>}
        brief
      />,
    );

    expect(fullHtml).toContain('mk-chat-memo__corner');
    expect(fullHtml).toContain('Seat 03 · 1.42s · ¢3.8');
    expect(fullHtml).toContain('Reply');
    expect(briefHtml).toContain('mk-chat-memo mk-chat-memo--brief');
    expect(briefHtml).not.toContain('mk-chat-memo__corner');
    expect(briefHtml).not.toContain('mk-chat-memo__foot');
  });
});
