import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { expect } from '@storybook/test';

import Grid from './index';

const meta: Meta<typeof Grid> = {
  component: Grid,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    columns: 3
  },
  argTypes: {
    as: {
      control: {
        type: 'select',
        options: ['div', 'ul', 'ol']
      }
    },
    columns: {
      control: {
        type: 'number'
      }
    }
  }
};

const items = [
  {
    id: 1,
    name: 'Item-1'
  },
  {
    id: 2,
    name: 'Item-2'
  },
  {
    id: 3,
    name: 'Item-3'
  },
  {
    id: 4,
    name: 'Item-4'
  },
  {
    id: 5,
    name: 'Item-5'
  },
  {
    id: 6,
    name: 'Item-6'
  },
  {
    id: 7,
    name: 'Item-7'
  },
  {
    id: 8,
    name: 'Item-8'
  }
];

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    children: items.map((item) => (
      <div
        style={{ border: '1px solid rebeccapurple', padding: '1rem' }}
        key={item.id}
      >
        {item.name}
      </div>
    ))
  }
};

export const RenderAsUl: Story = {
  args: {
    as: 'ul',
    children: items.map((item) => (
      <li
        style={{ border: '1px solid rebeccapurple', padding: '1rem' }}
        key={item.id}
      >
        {item.name}
      </li>
    ))
  },
  play: async ({ canvasElement, step }) => {
    step('Check if the grid is rendered as an unordered list', () => {
      const grid = within(canvasElement).getByTestId('grid');
      const isUl = grid.tagName.toLowerCase() === 'ul';
      expect(isUl).toBe(true);
    });
  }
};

export const RenderAsOl: Story = {
  args: {
    ...RenderAsUl.args,
    as: 'ol'
  },
  play: async ({ canvasElement, step }) => {
    step('Check if the grid is rendered as an ordered list', () => {
      const grid = within(canvasElement).getByTestId('grid');
      const isOl = grid.tagName.toLowerCase() === 'ol';
      expect(isOl).toBe(true);
    });
  }
};

export const WithFourColumns: Story = {
  args: {
    ...Default.args,
    columns: 3
  },
  play: async ({ canvasElement, step }) => {
    step('Check if the grid has three columns', () => {
      const grid = within(canvasElement).getByTestId('grid');
      expect(grid.getAttribute('data-colcount')).toBe('3');
    });
  }
};

export const WithThreeColumns: Story = {
  args: {
    ...Default.args,
    columns: 3
  },
  play: async ({ canvasElement, step }) => {
    step('Check if the grid has three columns', () => {
      const grid = within(canvasElement).getByTestId('grid');
      expect(grid.getAttribute('data-colcount')).toBe('3');
    });
  }
};

export const WithTwoColumns: Story = {
  args: {
    ...Default.args,
    columns: 2
  },
  play: async ({ canvasElement, step }) => {
    step('Check if the grid has two columns', () => {
      const grid = within(canvasElement).getByTestId('grid');
      expect(grid.getAttribute('data-colcount')).toBe('2');
    });
  }
};

export const WithTwoColumnsCustomRatio: Story = {
  args: {
    ...Default.args,
    columns: 2,
    columnSizes: '3:1'
  },
  play: async ({ canvasElement, step }) => {
    step('Check if the grid has two columns with a custom ratio', () => {
      const grid = within(canvasElement).getByTestId('grid');
      expect(grid.classList.contains('grid-3-1')).toBe(true);
    });
  }
};

export const WithOneColumn: Story = {
  args: {
    ...Default.args,
    columns: 1
  },
  play: async ({ canvasElement, step }) => {
    step('Check if the grid has one column', () => {
      const grid = within(canvasElement).getByTestId('grid');
      expect(grid.getAttribute('data-colcount')).toBe('1');
    });
  }
};
