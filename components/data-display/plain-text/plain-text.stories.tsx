import type { Meta, StoryObj } from '@storybook/react';

import { PlainText } from './index';

const meta: Meta<typeof PlainText> = {
  component: PlainText,
  args: {
    title: 'Hello, World!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et nunc.'
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof PlainText>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    centered: true
  }
};
