import type { Meta, StoryObj } from '@storybook/react';

import { FullWidthImage } from './index';

const meta: Meta<typeof FullWidthImage> = {
  component: FullWidthImage,
  args: {
    image: {
      url: '/mocks/images/featured-1.jpg',
      alt_text: 'A beautiful image of a shop at night'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof FullWidthImage>;

export const Default: Story = {};
