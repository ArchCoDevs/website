import type { Meta, StoryObj } from '@storybook/react';

// Import component files
import ArrowLink from './index';

const meta: Meta<typeof ArrowLink> = {
  component: ArrowLink,
  tags: ['autodocs'],
  args: {
    label: 'Home',
    href: '#'
  }
};

export default meta;

type Story = StoryObj<typeof ArrowLink>;

export const Default: Story = {};

export const Reverse: Story = {
  args: {
    label: 'Back',
    reverse: true
  }
};
