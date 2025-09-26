import type { StoryObj, Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { CallButton } from './index';

const meta: Meta<typeof CallButton> = {
  component: CallButton,
  args: {
    tel: '0208 123 4567',
    onClick: fn()
  },
  argTypes: {
    small: {
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    status: 'alpha',
    controls: {
      exclude: ['onClick'],
      sort: 'requiredFirst'
    },
    storySource: {
      source: '<CallButton />',
      importPath: "import { CallButton } from 'components"
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof CallButton>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    small: true
  }
};
