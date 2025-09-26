import type { Meta, StoryObj } from '@storybook/react';

import { PDFCard } from './index';

const meta: Meta<typeof PDFCard> = {
  component: PDFCard,
  args: {
    flippingbookLink: 'https://www.example.com',
    directLink: 'https://www.example.com'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PDFCard>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    content:
      'This is the content of the PDF card. You can get away with upto a large paragraph here.'
  }
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Custom title'
  }
};

export const OnlyFlippingbookLink: Story = {
  args: {
    directLink: undefined
  }
};

export const OnlyDirectLink: Story = {
  args: {
    flippingbookLink: undefined
  }
};

export const WithCustomBackgroundImage: Story = {
  args: {
    backgroundImage: 'https://picsum.photos/id/193/800/600'
  }
};
