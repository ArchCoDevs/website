import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { PropertyMetaBar } from './index';

const meta: Meta<typeof PropertyMetaBar> = {
  component: PropertyMetaBar,
  tags: ['autodocs'],
  args: {
    use: 'Retail',
    size_sqft: 1850,
    size_sqm: 135.64,
    brochureLink: 'https://example.com'
  }
};

export default meta;

type Story = StoryObj<typeof PropertyMetaBar>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'Check that the property type and size are rendered correctly',
      async () => {
        const type = canvas.getByText(/Retail/i);
        const size = canvas.getByText(/1850 sq ft | 135.64 sq m/i);

        expect(type).toBeInTheDocument();
        expect(size).toBeInTheDocument();
      }
    );

    await step(
      'Check that the brochure link is rendered correctly',
      async () => {
        const brochureLink = canvas.getByRole('link', {
          name: /Download Brochure/i
        });

        expect(brochureLink).toBeInTheDocument();
        expect(brochureLink).toHaveAttribute('href', 'https://example.com');
      }
    );
  }
};

export const NoBrochureLink: Story = {
  args: {
    brochureLink: undefined
  },
  play: async ({ canvasElement, step }) => {
    const noBrochureCanvas = within(canvasElement);

    await step(
      'Check that the component renders correctly without a brochure link',
      async () => {
        const noBrochureLink = noBrochureCanvas.queryByRole('link', {
          name: /Download Brochure/i
        });

        expect(noBrochureLink).not.toBeInTheDocument();
      }
    );
  }
};
