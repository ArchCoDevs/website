import type { Meta, StoryObj } from '@storybook/react';

import { within, expect } from '@storybook/test';

import { PropertiesCta } from './index';

const meta: Meta<typeof PropertiesCta> = {
  component: PropertiesCta,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PropertiesCta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const title = within(canvasElement).getByRole('heading');
    step('Check that the title and content are correct', () => {
      expect(title).toHaveTextContent(
        'Interested in making one of our spaces your own?'
      );
      expect(
        within(canvasElement).getByText('Browse available properties near you')
      ).toBeInTheDocument();
    });
  }
};
