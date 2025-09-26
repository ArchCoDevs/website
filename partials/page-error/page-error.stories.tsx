import type { Meta, StoryObj } from '@storybook/react';
import { PageError } from './index';

const meta: Meta<typeof PageError> = {
  component: PageError as React.FC,
  parameters: {
    overflow: 'hide-both',
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PageError>;

export const Default: Story = {
  args: {
    message: 'Page not found',
    referrer: {
      title: 'Home',
      href: '/'
    }
  }
};
export const NoneHomeReferrer: Story = {
  args: {
    message: 'Page not found',
    referrer: {
      title: 'Find a space',
      href: '/find-a-space'
    }
  }
};

export const CustomMessage: Story = {
  args: {
    message: 'Abandon all hope, ye who enter here'
  }
};

export const Error404: Story = {
  args: {
    code: 404
  }
};

export const Error500: Story = {
  args: {
    code: 500
  }
};
