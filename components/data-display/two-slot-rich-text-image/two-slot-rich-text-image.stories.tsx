import type { Meta, StoryObj } from '@storybook/react';
import { TwoSlotRichTextImage } from './index';

const imageOptions = {
  'Image 1': {
    url: '/mocks/images/featured-1.jpg',
    alt_text: 'Placeholder image 1',
    width: 1920,
    height: 1080
  },
  'Image 2': {
    url: '/mocks/images/featured-2.jpg',
    alt_text: 'Placeholder image 2',
    width: 1920,
    height: 1080
  },
  'Image 3': {
    url: '/mocks/images/featured-3.jpg',
    alt_text: 'Placeholder image 3',
    width: 1920,
    height: 1080
  },
  'Image 4': {
    url: '/mocks/images/featured-4.jpg',
    alt_text: 'Placeholder image 4',
    width: 1920,
    height: 1080
  }
};

const meta: Meta<typeof TwoSlotRichTextImage> = {
  component: TwoSlotRichTextImage,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    leftImage: {
      control: {
        type: 'select'
      },
      options: Object.keys(imageOptions),
      mapping: imageOptions
    },
    rightImage: {
      control: {
        type: 'select'
      },
      options: Object.keys(imageOptions),
      mapping: imageOptions
    }
  }
};

export default meta;
type Story = StoryObj<typeof TwoSlotRichTextImage>;

const sampleRichText = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'This is sample rich text content. It demonstrates how the component handles text-based content in either slot.'
      }
    ],
    style: 'normal'
  }
];

export const BothRichText: Story = {
  args: {
    leftSlotType: 'richText',
    leftRichText: sampleRichText,
    rightSlotType: 'richText',
    rightRichText: sampleRichText
  }
};

export const BothImages: Story = {
  args: {
    leftSlotType: 'image',
    leftImage: imageOptions['Image 1'],
    rightSlotType: 'image',
    rightImage: imageOptions['Image 2']
  }
};

export const LeftImageRightText: Story = {
  args: {
    leftSlotType: 'image',
    leftImage: imageOptions['Image 3'],
    rightSlotType: 'richText',
    rightRichText: sampleRichText
  }
};

export const LeftTextRightImage: Story = {
  args: {
    leftSlotType: 'richText',
    leftRichText: sampleRichText,
    rightSlotType: 'image',
    rightImage: imageOptions['Image 4']
  }
};

export const WithImageCaptions: Story = {
  args: {
    leftSlotType: 'image',
    leftImage: imageOptions['Image 1'],
    leftImageCaption: 'Left image caption',
    rightSlotType: 'image',
    rightImage: imageOptions['Image 2'],
    rightImageCaption: 'Right image caption'
  }
};

export const WithImageAttributions: Story = {
  args: {
    leftSlotType: 'image',
    leftImage: imageOptions['Image 1'],
    leftImageAttribution: 'Photo by John Doe',
    rightSlotType: 'image',
    rightImage: imageOptions['Image 2'],
    rightImageAttribution: 'Photo by Jane Smith'
  }
};

export const WithCaptionsAndAttributions: Story = {
  args: {
    leftSlotType: 'image',
    leftImage: imageOptions['Image 1'],
    leftImageCaption: 'Left image caption',
    leftImageAttribution: 'Photo by John Doe',
    rightSlotType: 'image',
    rightImage: imageOptions['Image 2'],
    rightImageCaption: 'Right image caption',
    rightImageAttribution: 'Photo by Jane Smith'
  }
};
