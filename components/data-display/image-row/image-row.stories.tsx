import type { Meta, StoryObj } from '@storybook/react';

import { within, expect } from '@storybook/test';

import { ImageRow } from './index';

const ctas = {
  primary: {
    text: 'Read more',
    href: '#'
  },
  secondary: {
    text: 'Click me!',
    href: '#'
  },
  tertiary: {
    text: 'Execute order 66',
    href: '#'
  },
  quaternary: {
    text: 'Do it!',
    href: '#'
  }
};

const imageOptions = {
  'Image 1': {
    url: '/mocks/images/featured-1.jpg',
    alt_text: 'Placeholder image 1'
  },
  'Image 2': {
    url: '/mocks/images/featured-2.jpg',
    alt_text: 'Placeholder image 2'
  },
  'Image 3': {
    url: '/mocks/images/featured-3.jpg',
    alt_text: 'Placeholder image 3'
  },
  'Image 4': {
    url: '/mocks/images/featured-4.jpg',
    alt_text: 'Placeholder image 4'
  }
};

const meta: Meta<typeof ImageRow> = {
  component: ImageRow,
  args: {
    title: 'Discounts for small business customers',
    content:
      "Up to 100 small business customers can now get discounted membership to FSB, the UK's voice for small businesses",
    image: {
      url: '/mocks/images/featured-1.jpg',
      alt_text: 'A beautiful image of a shop at night'
    },
    ctaText: ctas.primary.text,
    ctaUrl: ctas.primary.href,
    ctaColour: 'navy'
  },
  argTypes: {
    image: {
      control: {
        type: 'select'
      },
      options: Object.keys(imageOptions),
      mapping: imageOptions
    },
    dark: {
      control: {
        type: 'boolean'
      }
    },
    overlayText: {
      control: {
        type: 'boolean'
      }
    },
    ctaColour: {
      control: {
        type: 'select'
      },
      options: ['navy', 'teal', 'orange', 'white']
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ImageRow>;

export const Default: Story = {
  args: {
    title: 'New to renting?'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the title and content are correct', async () => {
      const title = canvas.getByRole('heading', { name: 'New to renting?' });
      const content = canvas.getByText(
        "Up to 100 small business customers can now get discounted membership to FSB, the UK's voice for small businesses"
      );

      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    await step('Check that the image is rendered', async () => {
      const image = canvas.getByAltText('A beautiful image of a shop at night');
      expect(image).toBeInTheDocument();
    });

    await step('Check that the CTA button is correct', async () => {
      const button = canvas.getByTestId('cta');
      expect(button).toBeInTheDocument();
    });
  }
};

export const Dark: Story = {
  args: {
    dark: true
  }
};

export const OverlayText: Story = {
  args: {
    overlayText: true
  }
};

export const PrimaryCTA: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the primary CTA button is correct', async () => {
      const button = canvas.getByTestId('cta');
      expect(button).toBeInTheDocument();
    });
  }
};

export const SecondaryCTA: Story = {
  args: {
    ctaColour: 'white',
    ctaText: ctas.secondary.text
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the secondary CTA button is correct', async () => {
      const button = canvas.getByTestId('cta');
      expect(button).toBeInTheDocument();
    });
  }
};

export const TertiaryCTA: Story = {
  args: {
    ctaColour: 'orange',
    ctaText: ctas.tertiary.text
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the tertiary CTA button is correct', async () => {
      const button = canvas.getByTestId('cta');
      expect(button).toBeInTheDocument();
    });
  }
};

export const QuaternaryCTA: Story = {
  args: {
    ctaColour: 'teal',
    ctaText: ctas.quaternary.text
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the quaternary CTA button is correct', async () => {
      const button = canvas.getByTestId('cta');
      expect(button).toBeInTheDocument();
    });
  }
};
/**
 * Whilst most of the time there will only be one button, it is possible to add a second button.
 */
export const TwoButtons: Story = {
  args: {
    cta2text: ctas.secondary.text,
    cta2url: ctas.secondary.href
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that both buttons render', async () => {
      const button = canvas.getByTestId('cta');
      const button2 = canvas.getByTestId('cta2');
      expect(button).toBeInTheDocument();
      expect(button2).toBeInTheDocument();
    });
  }
};
/**
 * It is possible to add icons to the buttons. However this should only be added when the button is a white button.
 * Other colours should not have icons as they are not accessible.
 */
export const TwoButtonsWithIcons: Story = {
  args: {
    ctaIcon: 'phone',
    ctaColour: 'white',
    cta2text: ctas.secondary.text,
    cta2url: ctas.secondary.href,
    cta2icon: 'email'
  }
};

export const SustainableVariant: Story = {
  args: {
    sustainable: true
  }
};

export const WithCaption: Story = {
  args: {
    caption: 'A beautiful image of a shop at night'
  }
};

export const WithAttribution: Story = {
  args: {
    attribution: 'Photo by John Smith'
  }
};

export const WithCaptionAndAttribution: Story = {
  args: {
    caption: 'A beautiful image of a shop at night',
    attribution: 'Photo by John Smith'
  }
};
