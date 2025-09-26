import type { Meta, StoryObj } from '@storybook/react';

// Import component files
import { Main } from './index';

const meta: Meta<typeof Main> = {
  component: Main,
  args: {
    children: <p>This is an example of some body text in a Main component</p>
  },
  parameters: {
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {};
