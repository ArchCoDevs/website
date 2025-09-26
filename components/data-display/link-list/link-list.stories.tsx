import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { expect } from '@storybook/test';

import { LinkList } from './index';

const listItemData = [
  {
    title: 'Item 1',
    url: '#'
  },
  {
    title: 'Item 2',
    url: '#'
  },
  {
    title: 'Item 3',
    url: '#'
  }
];

const meta: Meta<typeof LinkList> = {
  component: LinkList,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    items: listItemData
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof LinkList>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered', async () => {
      // Expect 3 list items
      expect(list.children.length).toBe(3);
      // Expect the list to be an unordered list
      expect(list.tagName).toBe('UL');
    });
    await step('The list items are rendered correctly', async () => {
      // Expect the first list item to be the first in the list
      expect(list.children[0]).toHaveTextContent(listItemData[0].title);
      // Expect the second list item to be the second in the list
      expect(list.children[1]).toHaveTextContent(listItemData[1].title);
      // Expect the third list item to be the third in the list
      expect(list.children[2]).toHaveTextContent(listItemData[2].title);
    });
  }
};
