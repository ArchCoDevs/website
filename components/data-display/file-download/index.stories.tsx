import type { Meta, StoryObj } from '@storybook/react';

import { FileDownload } from './index';

const meta: Meta<typeof FileDownload> = {
  component: FileDownload,
  args: {
    filePath: 'https://example.com/the-file-name.pdf',
    fileSize: 123456,
    name: 'The File Name'
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof FileDownload>;

export const Default: Story = {};
