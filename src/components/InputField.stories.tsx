import type { Meta, StoryObj } from '@storybook/react';
import { Search, Mail, Lock, User } from 'lucide-react';
import InputField from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input field component with multiple variants, states, and features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
    helperText: 'This field is required',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    leftIcon: <Search className="h-4 w-4" />,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    helperText: 'At least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    success: 'Username is available!',
    leftIcon: <User className="h-4 w-4" />,
  },
};

export const Loading: Story = {
  args: {
    label: 'Processing',
    placeholder: 'Please wait...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    helperText: 'This field cannot be edited',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        size="small"
        label="Small"
        placeholder="Small input"
      />
      <InputField
        size="medium"
        label="Medium (Default)"
        placeholder="Medium input"
      />
      <InputField
        size="large"
        label="Large"
        placeholder="Large input"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        variant="default"
        label="Default"
        placeholder="Default variant"
      />
      <InputField
        variant="filled"
        label="Filled"
        placeholder="Filled variant"
      />
      <InputField
        variant="outline"
        label="Outline"
        placeholder="Outline variant"
      />
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <InputField
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        required
        helperText="We'll never share your email"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        leftIcon={<Lock className="h-4 w-4" />}
        showPasswordToggle
        required
        helperText="Must be at least 8 characters"
      />
      <InputField
        label="Search Products"
        placeholder="Search our catalog..."
        leftIcon={<Search className="h-4 w-4" />}
        variant="filled"
        size="large"
      />
    </div>
  ),
};