import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  argTypes: {
    defaultValue: { control: 'color' },
    colors:       { control: 'object' },
  },
  args: {
    defaultValue: '#C03A2B',
    colors: [
      '#C03A2B',
      '#B37E3E',
      '#2F6F5E',
      '#2B2A6B',
      '#8E1B1B',
      '#D9A96A',
      '#2E7C8A',
      '#1B1611',
      '#F0E6D1',
    ],
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    colors: ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#FF9FF3', '#54A0FF', '#5F27CD', '#1DD1A1'],
    defaultValue: '#FF6B6B',
  },
};

export const Controlled: Story = {
  render: () => {
    const [color, setColor] = useState('#2F6F5E');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ColorPicker value={color} onChange={setColor} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: color,
              border: '2px solid rgba(0,0,0,0.1)',
            }}
          />
          <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{color}</span>
        </div>
      </div>
    );
  },
};

export const FewColors: Story = {
  args: {
    colors: ['#000000', '#FFFFFF', '#FF0000'],
    defaultValue: '#000000',
  },
};
