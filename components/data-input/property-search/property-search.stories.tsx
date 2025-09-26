import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PropertySearch } from './index';

const meta: Meta<typeof PropertySearch> = {
  component: PropertySearch,
  args: {
    name: 'PropertySearch',
    onChange: fn(),
    value: {
      area: '',
      distance: '0'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof PropertySearch>;

export const Default: Story = {};
