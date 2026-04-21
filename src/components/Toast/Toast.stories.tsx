import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToasts } from '.';
import { Button } from '../Button';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastDemo = () => {
  const { push } = useToasts();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button onClick={() => push('Simple notification')}>Info Toast</Button>
      <Button
        variant="primary"
        onClick={() => push({ title: 'Saved', message: 'Your changes have been saved.', kind: 'success' })}
      >
        Success Toast
      </Button>
      <Button
        onClick={() => push({ title: 'Warning', message: 'Disk space running low.', kind: 'warn' })}
      >
        Warning Toast
      </Button>
      <Button
        onClick={() => push({ title: 'Error', message: 'Failed to connect to server.', kind: 'error' })}
      >
        Error Toast
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};

const LongDurationDemo = () => {
  const { push } = useToasts();
  return (
    <Button
      onClick={() =>
        push({
          title: 'Persistent',
          message: 'This toast stays for 10 seconds.',
          kind: 'info',
          duration: 10000,
        })
      }
    >
      Long Duration Toast
    </Button>
  );
};

export const LongDuration: Story = {
  render: () => <LongDurationDemo />,
};

const AllKindsDemo = () => {
  const { push } = useToasts();
  const fire = () => {
    push({ title: 'Info', message: 'Informational message.', kind: 'info' });
    push({ title: 'Success', message: 'Operation completed.', kind: 'success' });
    push({ title: 'Warning', message: 'Check your settings.', kind: 'warn' });
    push({ title: 'Error', message: 'Something went wrong.', kind: 'error' });
  };
  return <Button variant="primary" onClick={fire}>Show All Kinds</Button>;
};

export const AllKinds: Story = {
  render: () => <AllKindsDemo />,
};
