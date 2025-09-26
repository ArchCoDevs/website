import type { Meta, StoryObj } from '@storybook/react';

// Import component files
import { Paper } from './index';

const meta: Meta<typeof Paper> = {
  component: Paper,
  args: {
    children: <p>This is an example of some body text in a paper component</p>
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof Paper>;

export const Default: Story = {};
