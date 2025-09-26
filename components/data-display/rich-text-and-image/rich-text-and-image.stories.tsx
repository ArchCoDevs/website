import type { Meta, StoryObj } from '@storybook/react';

import { RichTextAndImage } from './index';

const richText = [
  {
    markDefs: [],
    children: [
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
        _key: '63448b7b56af0',
        _type: 'span',
        marks: []
      }
    ],
    _type: 'block',
    style: 'normal',
    _key: '6396917b5052'
  },
  {
    markDefs: [],
    children: [
      {
        text: 'Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum.',
        _key: 'd310dba998980',
        _type: 'span',
        marks: []
      }
    ],
    _type: 'block',
    style: 'normal',
    _key: 'acf8fee71925'
  },
  {
    markDefs: [],
    children: [
      {
        text: 'Maecenas tristique orci ac sem. Duis ultricies pharetra magna. Donec accumsan malesuada orci.',
        _key: '8081391d5f100',
        _type: 'span',
        marks: []
      }
    ],
    _type: 'block',
    style: 'normal',
    _key: '9cbf4902289d'
  }
];

const image = {
  name: 'Row of Arches',
  id: 'wxcqwn3mv3w5jffvx55g63xf',
  url: '/mocks/images/featured-1.jpg',
  alt_text: 'A row of railway arches'
};

const meta: Meta<typeof RichTextAndImage> = {
  component: RichTextAndImage,
  args: {
    richText,
    image
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof RichTextAndImage>;

export const Default: Story = {};

export const Swapped: Story = {
  args: {
    swapSides: true
  }
};
