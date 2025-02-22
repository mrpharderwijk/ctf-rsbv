import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './loader';

const meta = {
  title: 'Components/Atoms/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        className="w-20 h-20 bg-primary relative"
        style={{ maxWidth: '280px' }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    size: 'md',
  },
};

export const Small: Story = {
  ...Default,
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  ...Default,
  args: {
    size: 'lg',
  },
};
