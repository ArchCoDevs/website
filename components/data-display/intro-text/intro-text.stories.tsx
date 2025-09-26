import type { Meta, StoryObj } from '@storybook/react';

import { IntroText } from './index';

const meta: Meta<typeof IntroText> = {
  component: IntroText,
  args: {
    title: 'Hello, World!',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et nunc.'
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof IntroText>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    centered: true
  }
};
