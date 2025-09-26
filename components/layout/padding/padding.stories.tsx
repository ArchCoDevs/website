import type { Meta, StoryObj } from '@storybook/react';

// Import component files
import { Padding } from './index';

const meta: Meta<typeof Padding> = {
  component: Padding,
  args: {
    children: <p>This is an example of some body text in a padding component</p>
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof Padding>;

export const Default: Story = {};
