import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, expect, fn } from '@storybook/test';
import { PropertyTitleBar } from './index';

const meta: Meta<typeof PropertyTitleBar> = {
  component: PropertyTitleBar,
  args: {
    rental_space_id: 123,
    address: '123 Fake Street, London, E1 4UD',
    price_per_month: 3333,
    property_ref: '1234',
    isSaved: false,
    onSavedChange: fn()
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PropertyTitleBar>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'Check that the property address and price are rendered correctly',
      async () => {
        const address = canvas.getByText(/123 Fake Street, London, E1 4UD/i);
        const price = canvas.getByText(/3,333 per month \+ VAT/i);

        expect(address).toBeInTheDocument();
        expect(price).toBeInTheDocument();
      }
    );

    await step('Check that the save button works correctly', async () => {
      const saveButton = canvas.getByRole('button', { name: /Save/i });

      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(saveButton).toHaveTextContent('Unsave');
        expect(meta?.args?.onSavedChange).toHaveBeenCalledWith(123, true);
      });
    });

    await step('Check that the share link is rendered correctly', async () => {
      const shareLink = canvas.getByRole('link', { name: /Share/i });

      expect(shareLink).toBeInTheDocument();
    });
  }
};

export const Saved: Story = {
  args: {
    isSaved: true
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the unsave button works correctly', async () => {
      const saveButton = canvas.getByRole('button', { name: /Unsave/i });

      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(saveButton).toHaveTextContent('Save');
        expect(meta?.args?.onSavedChange).toHaveBeenCalledWith(123, false);
      });
    });
  }
};
