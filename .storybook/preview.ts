import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import '../src/tokens/index.css';
import '../src/components/components.css';

const THEMES = {
  vellum: { background: '#EDE3CF', color: '#1B1611' },
  void:   { background: '#0B0A0F', color: '#F0E6D1' },
} as const;

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as keyof typeof THEMES) ?? 'vellum';
  const { background, color } = THEMES[theme] ?? THEMES.vellum;
  return React.createElement(
    'div',
    {
      'data-theme': theme,
      className: theme === 'void' ? 'void' : undefined,
      style: {
        background,
        color,
        minHeight: '100vh',
        padding: '24px',
        boxSizing: 'border-box',
      },
    },
    React.createElement(Story, null)
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'vellum',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'vellum', icon: 'sun',  title: 'Vellum (light)' },
          { value: 'void',   icon: 'moon', title: 'Void (dark)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
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
