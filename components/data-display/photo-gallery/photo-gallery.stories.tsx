import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, screen, expect } from '@storybook/test';

import { PhotoGallery } from './index';

const meta: Meta<typeof PhotoGallery> = {
  component: PhotoGallery,
  parameters: {
    controls: { hideNoControlsWarning: true },
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof PhotoGallery>;

const imageMocks = [
  {
    url: '/mocks/images/property-1.jpg',
    alt_text: 'Placeholder image 1'
  },
  {
    url: '/mocks/images/property-2.jpg',
    alt_text: 'Placeholder image 2'
  },
  {
    url: '/mocks/images/property-3.jpg',
    alt_text: 'Placeholder image 3'
  },
  {
    url: '/mocks/images/property-4.jpg',
    alt_text: 'Placeholder image 4'
  },
  {
    url: '/mocks/images/property-5.jpg',
    alt_text: 'Placeholder image 5'
  },
  {
    url: '/mocks/images/property-6.jpg',
    alt_text: 'Placeholder image 6'
  },
  {
    url: '/mocks/images/property-7.jpg',
    alt_text: 'Placeholder image 7'
  },
  {
    url: '/mocks/images/property-8.jpg',
    alt_text: 'Placeholder image 8'
  }
];

export const Default: Story = {
  args: {
    images: imageMocks
  }
};

export const OneImage: Story = {
  args: {
    images: imageMocks.slice(0, 1)
  }
};

export const ThreeImages: Story = {
  args: {
    images: imageMocks.slice(0, 3)
  }
};

export const EightImages: Story = {
  args: {
    images: imageMocks
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Load and display the first image', async () => {
      // Wait for the first image to load
      await waitFor(() =>
        expect(canvas.getByAltText('Placeholder image 1')).toBeInTheDocument()
      );
    });

    await step('Open and close the overlay', async () => {
      // Click on the first image to open the overlay
      const firstImage = canvas.getByAltText('Placeholder image 1');
      await userEvent.click(firstImage);

      // Check if the overlay opens
      await waitFor(() =>
        expect(screen.getByTestId('overlay')).toBeInTheDocument()
      );

      // Check if the close button is present
      const closeButton = screen.getByTestId('close-button');
      await waitFor(() => expect(closeButton).toBeInTheDocument());

      // Click on the close button to close the overlay
      await userEvent.click(closeButton);

      // Check if the overlay closes
      await waitFor(() =>
        expect(screen.queryByTestId('overlay')).not.toBeInTheDocument()
      );
    });

    await step('Navigate through images using arrows', async () => {
      // Click on the next arrow button
      const nextArrow = canvas.getByTestId('next-arrow');
      await userEvent.click(nextArrow);

      // Check if the second image is displayed in the main slot
      await waitFor(() =>
        expect(canvas.getByAltText('Placeholder image 2')).toBeInTheDocument()
      );

      // Navigate using keyboard arrows
      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() =>
        expect(canvas.getByAltText('Placeholder image 3')).toBeInTheDocument()
      );

      await userEvent.keyboard('{ArrowLeft}');
      await waitFor(() =>
        expect(canvas.getByAltText('Placeholder image 2')).toBeInTheDocument()
      );
    });

    await step(
      'Open overlay from a thumbnail and close with Escape key',
      async () => {
        // Click on a thumbnail to open the overlay
        const thumbnail = canvas.getByAltText('Placeholder image 4');
        await userEvent.click(thumbnail);

        // Check if the overlay opens with the correct image
        await waitFor(() =>
          expect(screen.getByTestId('overlay')).toBeInTheDocument()
        );
        await waitFor(() =>
          expect(screen.getByAltText('Placeholder image 4')).toBeInTheDocument()
        );

        // Close the overlay by pressing the Escape key
        await userEvent.keyboard('{Escape}');
        await waitFor(() =>
          expect(screen.queryByTestId('overlay')).not.toBeInTheDocument()
        );
      }
    );
  }
};
