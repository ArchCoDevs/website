import type { StoryObj, Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { PDFButton } from './index';

const meta: Meta<typeof PDFButton> = {
  component: PDFButton,
  args: {
    href: 'https://example.com',
    onClick: fn()
  },
  argTypes: {
    small: {
      control: {
        type: 'boolean'
      }
    }
  },
  tags: ['autodocs'],
  parameters: {
    status: 'alpha',
    controls: {
      exclude: ['onClick'],
      sort: 'requiredFirst'
    },
    storySource: {
      source: '<PDFButton />',
      importPath: "import { PDFButton } from 'components"
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
type Story = StoryObj<typeof PDFButton>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    text: 'Download Brochure'
  }
};

export const Small: Story = {
  args: {
    small: true
  }
};
