import type { Meta, StoryObj } from '@storybook/react';

import { PressOfficeCard } from './index';

const meta: Meta<typeof PressOfficeCard> = {
  component: PressOfficeCard,
  tags: ['autodocs'],
  args: {
    phoneNumber: '01234 567890',
    email: 'info@example.com'
  }
};

export default meta;

type Story = StoryObj<typeof PressOfficeCard>;

export const Default: Story = {};
