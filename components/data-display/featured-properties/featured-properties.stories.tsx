import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, expect, fn } from '@storybook/test';

import { FeaturedProperties } from './index';

import PropertyResults from 'lib/mocks/keystone/search-results.json';
import PropertySearchResult from 'lib/types/property-search-result';

// Get 3 items from the mock data
const properties = PropertyResults.rental_space_model_list.slice(
  0,
  3
) as PropertySearchResult[];

const meta: Meta<typeof FeaturedProperties> = {
  component: FeaturedProperties,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    properties,
    onSavedChange: fn()
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof FeaturedProperties>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the title is present
    expect(canvas.getByText('Featured Properties')).toBeInTheDocument();

    // Check if the correct number of properties is rendered
    const cards = canvas.getAllByTestId('property-card');
    expect(cards.length).toBe(3);

    // Validate the presence of key information in each PropertyCard
    properties.forEach((property) => {
      expect(canvas.getByText(property.address)).toBeInTheDocument();
      expect(
        canvas.getByText(new RegExp(`${property.price} Per Month`, 'i'))
      ).toBeInTheDocument();
    });
  }
};

export const TwoPoperties: Story = {
  args: {
    properties: properties.slice(0, 2)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the title is present
    expect(canvas.getByText('Featured Properties')).toBeInTheDocument();

    // Check if the correct number of properties is rendered
    const cards = canvas.getAllByTestId('property-card');
    expect(cards.length).toBe(2);

    // Validate the presence of key information in each PropertyCard
    properties.slice(0, 2).forEach((property) => {
      expect(canvas.getByText(property.address)).toBeInTheDocument();
      expect(
        canvas.getByText(new RegExp(`${property.price} Per Month`, 'i'))
      ).toBeInTheDocument();
    });
  }
};

export const WithTitle: Story = {
  args: {
    title: 'Custom title'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the custom title is present
    expect(canvas.getByText('Custom title')).toBeInTheDocument();
  }
};

export const WithSavedChange: Story = {
  args: {
    onSavedChange: fn()
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Check if the title is present
    expect(canvas.getByText('Featured Properties')).toBeInTheDocument();

    // Check if the correct number of properties is rendered
    const cards = canvas.getAllByTestId('property-card');
    expect(cards.length).toBe(3);

    // Simulate saving a property
    const saveButton = canvas.getAllByLabelText(/Save property/i)[0];
    await userEvent.click(saveButton);

    // Assert that the onSavedChange function was called with the correct parameters
    await waitFor(() => {
      expect(args.onSavedChange).toHaveBeenCalledWith(
        properties[0].rental_space_id,
        true
      );
    });

    // Simulate unsaving the property
    const unsaveButton = canvas.getAllByLabelText(/Remove from saved/i)[0];
    await userEvent.click(unsaveButton);

    // Assert that the onSavedChange function was called again with the correct parameters
    await waitFor(() => {
      expect(args.onSavedChange).toHaveBeenCalledWith(
        properties[0].rental_space_id,
        false
      );
    });
  }
};
