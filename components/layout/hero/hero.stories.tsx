import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';

// Import component files
import { Hero } from './index';

const mockImage = {
  url: '/mocks/images/property-8.jpg',
  alt_text: 'A beautiful image of a property'
};

const mockImageWithSizes = {
  ...mockImage,
  width: 450,
  height: 300
};

const meta: Meta<typeof Hero> = {
  component: Hero,
  args: {
    image: mockImage,
    children: <p>Children go here</p>
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Check if the children render correctly
  const childrenText = await canvas.getByText('Children go here');
  expect(childrenText).toBeInTheDocument();
};

export const WithVideo: Story = {
  args: {
    video_url: '/mocks/video.mp4'
  }
};

export const WithOverlay: Story = {
  args: {
    overlay: true
  }
};

export const WithImageSizes: Story = {
  args: {
    image: mockImageWithSizes
  }
};
