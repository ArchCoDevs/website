import type { Meta, StoryObj } from '@storybook/react';

import { RawHtml } from './index';

const meta: Meta<typeof RawHtml> = {
  component: RawHtml,
  args: {
    rawHtml: '<h1>This is a title</h1><p>And this is a paragraph</p>',
    centered: false
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof RawHtml>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    centered: true
  }
};
