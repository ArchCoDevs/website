import type { Meta, StoryObj } from '@storybook/react';

import { PropertyTag } from './index';

const meta: Meta<typeof PropertyTag> = {
  component: PropertyTag,
  args: {
    type: 'new'
  }
};

export default meta;

type Story = StoryObj<typeof PropertyTag>;

export const Default: Story = {};
