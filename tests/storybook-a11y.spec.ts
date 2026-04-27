import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const stories = [
  {
    id: 'components-button--all-variants',
    text: 'Small Ghost',
  },
  {
    id: 'components-input--all-input-variants',
    text: 'Invalid Field',
  },
  {
    id: 'mockups-project-previews--gallery-controls-only',
    text: 'Mockup Preview Gallery',
  },
  {
    id: 'components-code--dark-mode-audit',
    text: 'Chat attachment diff',
  },
  {
    id: 'motifs-chat--dark-state-audit',
    text: 'Freight claims',
  },
  {
    id: 'motifs-seraph--dark-surface-audit',
    text: 'Dark-mode manuscript hierarchy audit',
  },
  {
    id: 'mockups-codex-primitives--docs-shell-dark',
    text: 'Convergence',
  },
];

for (const story of stories) {
  test(`storybook accessibility smoke: ${story.id}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await page.locator('#storybook-root').waitFor();
    await expect(page.locator('#storybook-root')).toContainText(story.text);

    const scan = await new AxeBuilder({ page }).include('#storybook-root').analyze();
    expect(scan.violations).toEqual([]);
  });
}
