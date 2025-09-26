import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent, waitFor, expect } from '@storybook/test';

import { PropertyCard } from './index';
import PropertyCardSkeleton from './skeleton';

// Import mock data
import properties from 'lib/mocks/keystone/search-results.json';

const {
  reference,
  address,
  // @ts-ignore - data is a mock object
  price_title,
  use,
  favourite,
  size_sq_ft,
  tag,
  thumbnail
} = properties.rental_space_model_list[0];

const onSavedChangeWrapper = async (
  rental_space_id: number,
  favourite: boolean
) => {
  action('onSavedChange')({ rental_space_id, favourite });
  return Promise.resolve();
};

const meta: Meta<typeof PropertyCard> = {
  component: PropertyCard,
  args: {
    reference,
    address,
    price_title,
    use,
    favourite,
    size_sq_ft,
    tag,
    thumbnail,
    onSavedChange: onSavedChangeWrapper
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: '2rem' }}>{Story()}</div>]
};

export default meta;

type Story = StoryObj<typeof PropertyCard>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const image = within(canvasElement).getByRole('img');
    const detailsButton = within(canvasElement).getByTestId('view-details');
    const contactButton = within(canvasElement).getByTestId('contact-us');
    await step('Render the default property card', async () => {
      expect(canvasElement).toBeInTheDocument();
      expect(canvasElement).toHaveTextContent('CGD12345');
      expect(canvasElement).toHaveTextContent('1 COVENT GARDEN, LONDON');
      expect(canvasElement).toHaveTextContent('£1200 per month');
      expect(canvasElement).toHaveTextContent('Office | 750 sq ft');
      expect(canvasElement).toHaveTextContent('New space');
      const srcAttribute = image.getAttribute('src');
      const expectedPath = '/mocks/images/property-1.jpg';

      expect(srcAttribute).toContain(expectedPath);
    });

    await step('Details button renders as expected', async () => {
      const detailsLink = detailsButton.closest('a');
      if (detailsLink) {
        detailsLink.click();
      }
      await waitFor(() => {
        expect(detailsButton).toHaveAccessibleName(/View details/i);
        expect(detailsLink).toHaveAttribute(
          'href',
          '/properties/CGD12345#maincontent'
        );
      });
    });

    await step('Contact button renders as expected', async () => {
      const contactLink = contactButton.closest('a');
      if (contactLink) {
        contactLink.click();
      }
      await waitFor(() => {
        expect(contactButton).toHaveAccessibleName(/Contact Us/i);
        expect(contactLink).toHaveAttribute(
          'href',
          '/properties/CGD12345/enquiry'
        );
      });
    });
  }
};

export const SavedProperty: Story = {
  args: {
    favourite: true
  },
  play: async ({ canvasElement, step }) => {
    const button = within(canvasElement).getByRole('button', { name: /save/i });
    await step('Unsave the property', async () => {
      userEvent.click(button);
      await waitFor(() =>
        expect(button).toHaveAccessibleName(/Save property/i)
      );
    });

    await step('Save the property again (restore state)', async () => {
      userEvent.click(button);
      await waitFor(() =>
        expect(button).toHaveAccessibleName(/Remove from saved/i)
      );
    });
  }
};

export const Mini: Story = {
  args: {
    mini: true
  },
  play: async ({ canvasElement, step }) => {
    const detailsButton = within(canvasElement).getByTestId('view-details');
    const image = within(canvasElement).getByRole('img');
    await step('Render the mini property card', async () => {
      expect(canvasElement).toBeInTheDocument();
      expect(canvasElement).not.toHaveTextContent('CGD12345');
      expect(canvasElement).toHaveTextContent('1 COVENT GARDEN, LONDON');
      expect(canvasElement).not.toHaveTextContent('£1200 Per Month');
      expect(canvasElement).not.toHaveTextContent('Office | 750 sq ft');
      expect(canvasElement).toHaveTextContent('New space');
      const srcAttribute = image.getAttribute('src');
      const expectedPath = '/mocks/images/property-1.jpg';

      expect(srcAttribute).toContain(expectedPath);
    });

    await step('Details button renders as expected', async () => {
      const detailsLink = detailsButton.closest('a');
      if (detailsLink) {
        detailsLink.click();
      }
      await waitFor(() => {
        expect(detailsButton).toHaveAccessibleName(/View details/i);
        expect(detailsLink).toHaveAttribute(
          'href',
          '/properties/CGD12345#maincontent'
        );
      });
    });

    await step('Contact button does not appear', async () => {
      expect(canvasElement).not.toHaveTextContent(/Contact Us/i);
    });
  }
};

export const FlexLeaseAvailable: Story = {
  args: {
    is_flex_lease: true
  },
  play: async ({ canvasElement, step }) => {
    await step('Render the property card with is_flex_lease tag', async () => {
      expect(canvasElement).toBeInTheDocument();
      expect(canvasElement).toHaveTextContent('Flexible lease available');
    });
  }
};

export const Skeleton: Story = {
  args: {
    mini: false
  },
  render: (args) => <PropertyCardSkeleton {...args} />
};

export const MiniSkeleton: Story = {
  args: {
    mini: true
  },
  render: (args) => <PropertyCardSkeleton {...args} />
};
