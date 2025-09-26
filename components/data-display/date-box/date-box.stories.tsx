import type { Meta, StoryObj } from '@storybook/react';

import { DateBox } from './index';

const meta: Meta<typeof DateBox> = {
  component: DateBox,
  tags: ['autodocs'],
  args: {
    date: '2022-01-01'
  }
};

export default meta;

type Story = StoryObj<typeof DateBox>;

export const Default: Story = {};
