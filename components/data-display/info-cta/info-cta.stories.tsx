import type { Meta, StoryObj } from '@storybook/react';

import { InfoCta } from './index';

const meta: Meta<typeof InfoCta> = {
  component: InfoCta,
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

type Story = StoryObj<typeof InfoCta>;

export const Default: Story = {};
