import type { Meta, StoryObj } from '@storybook/react';
import { Outage } from '.';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Outage> = {
  component: Outage as React.FC,
  parameters: {
    actions: {
      handles: ['click']
    },
    overflow: 'hide-both',
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof Outage>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: 'Abandon all hope, ye who enter here'
  }
};

export const CustomHTMLMessage: Story = {
  args: {
    message: (
      <p>
        Prepare for dissapointment!{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            action('link-clicked')('I told you, you would be dissapointed');
          }}
        >
          Click here
        </a>
      </p>
    )
  }
};
