import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Drawer } from '.';
import { Button } from '../Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    open: false,
    title: 'Modal Title',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function ModalStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Confirm Action">
          <p style={{ margin: 0 }}>Are you sure you want to proceed? This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: function ModalWithFooter() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open with Footer</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Save Changes"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>You have unsaved changes. Would you like to save before closing?</p>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: function ModalLong() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Long Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Terms of Service">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </Modal>
      </>
    );
  },
};

export const DrawerDefault: Story = {
  render: function DrawerStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Settings">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ margin: 0 }}>Drawer content slides in from the right side of the screen.</p>
            <p style={{ margin: 0 }}>Useful for settings panels, detail views, and secondary navigation.</p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const DrawerWithFooter: Story = {
  render: function DrawerFooterStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open Drawer with Footer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          width={420}
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Update</Button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>Edit your profile settings here. Changes will be applied after saving.</p>
        </Drawer>
      </>
    );
  },
};
