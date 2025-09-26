import type { Meta, StoryObj } from '@storybook/react';

import { LocationAutocomplete } from './index';
import { Label } from 'components/data-input/label';

const meta: Meta<typeof LocationAutocomplete> = {
  component: LocationAutocomplete,
  args: {
    name: 'location-autocomplete'
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['default', 'success', 'warning', 'danger', 'info']
      }
    }
  },
  tags: ['autodocs'],
  parameters: {
    worksWith: 'InputFactory'
  },
  decorators: [
    (Story) => (
      <Label text="Label for the input" id="autocomplete">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof LocationAutocomplete>;

export const Default: Story = {};
