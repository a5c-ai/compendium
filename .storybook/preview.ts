import type { Preview } from '@storybook/react';
import '../src/tokens/index.css';
import '../src/components/components.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'vellum',
      values: [
        { name: 'vellum', value: '#EDE3CF' },
        { name: 'void', value: '#0B0A0F' },
        { name: 'parchment', value: '#D9CBAE' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
