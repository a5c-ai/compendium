import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea, Field } from '.';

const inputMeta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
  },
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    invalid: false,
    type: 'text',
  },
} satisfies Meta<typeof Input>;

export default inputMeta;
type InputStory = StoryObj<typeof inputMeta>;

export const Default: InputStory = {};

export const WithValue: InputStory = {
  args: {
    defaultValue: 'Hello, Compendium',
  },
};

export const Invalid: InputStory = {
  args: {
    invalid: true,
    defaultValue: 'bad-email',
    type: 'email',
  },
};

export const Disabled: InputStory = {
  args: {
    disabled: true,
    defaultValue: 'Cannot edit',
  },
};

export const Password: InputStory = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const TextareaDefault: StoryObj = {
  render: (args) => <Textarea {...args} />,
  args: {
    placeholder: 'Write something...',
    rows: 3,
  },
};

export const TextareaInvalid: StoryObj = {
  render: (args) => <Textarea placeholder="Required field" invalid {...args} />,
};

export const FieldWithInput: StoryObj = {
  render: () => (
    <Field label="Email address" hint="We'll never share your email.">
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
};

export const FieldWithError: StoryObj = {
  render: () => (
    <Field label="Username" error="This username is already taken.">
      <Input defaultValue="admin" invalid />
    </Field>
  ),
};

export const FieldWithTextarea: StoryObj = {
  render: () => (
    <Field label="Description" hint="Max 500 characters.">
      <Textarea placeholder="Describe your project..." rows={4} />
    </Field>
  ),
};

export const AllInputVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
      <Field label="Name">
        <Input placeholder="Full name" />
      </Field>
      <Field label="Email" hint="Required">
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Field label="Invalid Field" error="Something went wrong">
        <Input invalid defaultValue="oops" />
      </Field>
      <Field label="Disabled">
        <Input disabled defaultValue="Read only" />
      </Field>
      <Field label="Notes">
        <Textarea placeholder="Additional notes..." />
      </Field>
    </div>
  ),
};
