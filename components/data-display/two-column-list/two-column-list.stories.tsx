import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';

import { TwoColumnList } from './index';

import styles from './styles.module.scss';

const listItemData = [
  {
    id: '1',
    title:
      'Lorem ipsum dolor sit amet, eu velit veniam officia officia sunt Lorem do irure dolore in esse quis voluptate Lorem. Labore laboris culpa eu magna. Culpa quis sunt labore incididunt occaecat est quis nisi duis Lorem cillum incididunt commodo veniam.'
  },
  {
    id: '2',
    title:
      'Lorem ipsum dolor sit amet, eu velit veniam officia officia sunt Lorem do irure dolore in esse quis voluptate Lorem. Labore laboris culpa eu magna. Culpa quis sunt labore incididunt occaecat est quis nisi duis Lorem cillum incididunt commodo veniam.'
  },
  {
    id: '3',
    title:
      'Lorem ipsum dolor sit amet, eu velit veniam officia officia sunt Lorem do irure dolore in esse quis voluptate Lorem. Labore laboris culpa eu magna. Culpa quis sunt labore incididunt occaecat est quis nisi duis Lorem cillum incididunt commodo veniam.'
  }
];

const meta: Meta<typeof TwoColumnList> = {
  component: TwoColumnList,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    children: listItemData.map((item) => (
      <TwoColumnList.Item key={item.id}>{item.title}</TwoColumnList.Item>
    ))
  },
  argTypes: {
    type: {
      control: {
        type: 'select'
      },
      options: ['ordered', 'unordered', 'none']
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TwoColumnList>;

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

export const OrderedList: Story = {
  args: {
    type: 'ordered'
  },
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered', async () => {
      // Expect 3 list items
      expect(list.children.length).toBe(3);
      // Expect the list to be an ordered list
      expect(list.tagName).toBe('OL');
    });
  }
};

export const UnorderedList: Story = {
  args: {
    type: 'unordered'
  },
  play: async ({ canvasElement, step }) => {
    const list = within(canvasElement).getByRole('list');
    await step('The list is rendered', async () => {
      // Expect 3 list items
      expect(list.children.length).toBe(3);
      // Expect the list to be an unordered list
      expect(list.tagName).toBe('UL');
    });
  }
};

export const WithTitle: Story = {
  args: {
    title: 'List Title'
  },
  play: async ({ canvasElement, step }) => {
    const title = within(canvasElement).getByRole('heading');
    await step('The title is rendered', async () => {
      // Expect the title to be rendered
      expect(title).toHaveTextContent('List Title');
    });
  }
};
export const WithBackground: Story = {
  args: {
    showBackground: true
  },
  play: async ({ canvasElement, step }) => {
    const container = within(canvasElement).getByTestId('list-container');
    await step('The list is rendered with a background', async () => {
      // Expect the container to have a background
      expect(container).toHaveClass(styles['with-bg']);
    });
  }
};

export const WithTitleAndBackground: Story = {
  args: {
    title: 'List Title',
    showBackground: true
  },
  play: async ({ canvasElement, step }) => {
    const container = within(canvasElement).getByTestId('list-container');
    const title = within(canvasElement).getByRole('heading');
    await step('The list is rendered with a background and title', async () => {
      // Expect the container to have a background
      expect(container).toHaveClass(styles['with-bg']);
      // Expect the title to be rendered
      expect(title).toHaveTextContent('List Title');
    });
  }
};
