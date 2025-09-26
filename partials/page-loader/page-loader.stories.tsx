import type { Meta, StoryObj } from '@storybook/react';

// Import component files
import PageLoader from './index';

const meta: Meta<typeof PageLoader> = {
  component: PageLoader,
  parameters: {
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PageLoader>;

export const Default: Story = {};
