import type { Meta, StoryObj } from '@storybook/react';

import { ShareDialog } from './index';

const meta: Meta<typeof ShareDialog> = {
  component: ShareDialog,
  args: {
    url: 'https://www.example.com'
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof ShareDialog>;

export const Default: Story = {};
