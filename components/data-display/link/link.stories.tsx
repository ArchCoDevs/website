import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './index';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof Link> = {
  component: Link,
  parameters: {
    controls: { hideNoControlsWarning: true },
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '/path/to/document',
    children: 'Relative URL'
  },
  play: async ({ canvasElement, step }) => {
    const link = within(canvasElement).getByRole('link');
    step('Check that the href and content are correct', () => {
      expect(link.getAttribute('href')).toEqual('/path/to/document');
      expect(link.getAttribute('target')).toBeNull();
      expect(link.getAttribute('rel')).toBeNull();
      expect(
        within(canvasElement).getByText('Relative URL')
      ).toBeInTheDocument();
    });
  }
};

export const WithReplacedAbsolute: Story = {
  args: {
    href: 'http://localhost:3000/path/to/document',
    children: 'Absolute URL which will be converted to relative'
  },
  play: async ({ canvasElement, step }) => {
    const link = within(canvasElement).getByRole('link');
    step('Check that the href and content are correct', () => {
      expect(link.getAttribute('href')).toEqual('/path/to/document');
      expect(link.getAttribute('target')).toBeNull();
      expect(link.getAttribute('rel')).toBeNull();
      expect(
        within(canvasElement).getByText(
          'Absolute URL which will be converted to relative'
        )
      ).toBeInTheDocument();
    });
  }
};

export const WithAllowedAbsoluteUrl: Story = {
  args: {
    href: 'https://www.google.com/',
    children: 'Absolute URL which will be left as-is'
  },
  play: async ({ canvasElement, step }) => {
    const link = within(canvasElement).getByRole('link');
    step('Check that the title and content are correct', () => {
      expect(link.getAttribute('href')).toEqual('https://www.google.com/');
      expect(link.getAttribute('target')).toEqual('_blank');
      expect(link.getAttribute('rel')).toEqual('noopener');
      expect(
        within(canvasElement).getByText('Absolute URL which will be left as-is')
      ).toBeInTheDocument();
    });
  }
};
