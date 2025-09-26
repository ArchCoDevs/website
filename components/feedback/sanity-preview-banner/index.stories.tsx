import type { Meta, StoryObj } from '@storybook/react';

// Import component files
import { SanityPreviewBanner } from './index';

const meta: Meta<typeof SanityPreviewBanner> = {
  component: SanityPreviewBanner,
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical',
    controls: { hideNoControlsWarning: true }
  }
};

export default meta;

type Story = StoryObj<typeof SanityPreviewBanner>;

export const Default: Story = {};
