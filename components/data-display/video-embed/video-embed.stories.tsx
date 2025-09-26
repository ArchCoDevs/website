import type { Meta, StoryObj } from '@storybook/react';

import { VideoEmbed } from './index';

const meta: Meta<typeof VideoEmbed> = {
  component: VideoEmbed,
  args: {
    video: {
      title: 'Rickroll',
      id: 'dQw4w9WgXcQ'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof VideoEmbed>;

export const Default: Story = {};
