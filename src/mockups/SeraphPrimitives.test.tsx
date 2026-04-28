import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SeraphSidebar } from './SeraphPrimitives';

describe('Seraph primitive surfaces', () => {
  it('renders thread rows as keyboard-focusable buttons with current state metadata', () => {
    const html = renderToStaticMarkup(
      <SeraphSidebar
        rail={{ sigil: '✺', topTotemClass: 'mk-seraph__totem--serpent', bottomTotemClass: 'mk-seraph__totem--relic' }}
        crest={<div>crest</div>}
        threads={[
          { title: 'Auth middleware refactor', subtitle: 'Refactor, tracing, tests', when: '10:42 AM', current: true },
          { title: 'Fix flaky tests', subtitle: 'Investigate and stabilize', when: '9:18 AM' },
        ]}
        medallion="✺"
        planTitle="Pro Plan"
        planSubtitle="Codex Seraphinianus"
      />,
    );

    expect(html).toContain('class="mk-seraph__thread is-current"');
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-current="true"');
  });
});
