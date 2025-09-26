import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBoundary } from './index';

const meta: Meta<typeof ErrorBoundary> = {
  component: ErrorBoundary,
  tags: ['autodocs'],
  args: {
    forceError: true
  },
  argTypes: {
    forceError: {
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  args: {
    message: "That did't work"
  }
};
