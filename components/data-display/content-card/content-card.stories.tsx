import type { Meta, StoryObj } from '@storybook/react';

import { within, userEvent, expect, fn } from '@storybook/test';

import { ContentCard } from './index';

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

const meta: Meta<typeof ContentCard> = {
  component: ContentCard,
  args: {
    title: 'Discounts for small business customers',
    image: {
      url: '/mocks/images/featured-3.jpg',
      alt_text: 'Placeholder image'
    },
    linkUrl: '#',
    linkText: 'Read more',
    content:
      "Up to 100 small business customers can now get discounted membership to FSB, the UK's voice for small businesses"
  },
  argTypes: {
    image: {
      control: {
        type: 'select'
      },
      options: Object.keys(imageOptions),
      mapping: imageOptions
    },
    bgTakeover: {
      control: {
        type: 'boolean'
      }
    },
    featured: {
      control: {
        type: 'boolean'
      }
    },
    orientation: {
      control: {
        type: 'select',
        labels: {
          portrait: 'Portrait',
          landscape: 'Landscape'
        }
      },
      options: ['portrait', 'landscape']
    },
    swapSides: {
      control: {
        type: 'boolean'
      },
      if: { arg: 'orientation', eq: 'landscape' }
    },
    ctaType: {
      control: {
        type: 'select'
      },
      options: ['link', 'button', 'clickable']
    }
  }
};

export default meta;

type Story = StoryObj<typeof ContentCard>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const image = within(canvasElement).getByRole('img');
    step('Check that the image is correct', () => {
      expect(image).toHaveAttribute(
        'src',
        '/mocks/images/featured-3.jpg?w=3840&q=75'
      );
      expect(image).toHaveAttribute('alt', 'Placeholder image');
    });
  }
};

export const NoImage: Story = {
  args: {
    title: 'New to renting?',
    image: undefined
  },
  play: async ({ canvasElement, step }) => {
    const title = within(canvasElement).getByRole('heading');
    step('Check that the title and content are correct', () => {
      expect(title).toHaveTextContent('New to renting?');
      expect(
        within(canvasElement).getByText(
          "Up to 100 small business customers can now get discounted membership to FSB, the UK's voice for small businesses"
        )
      ).toBeInTheDocument();
    });
  }
};

export const WithBgTakeover: Story = {
  args: {
    image: undefined,
    bgTakeover: true
  }
};

export const Featured: Story = {
  args: {
    featured: true
  }
};

export const Landscape: Story = {
  args: {
    orientation: 'landscape'
  }
};

export const WithCtaLink: Story = {
  play: async ({ canvasElement, step }) => {
    const cta = within(canvasElement).getByTestId('arrow-link');
    step('Check that the call to action is correct', () => {
      expect(cta).toHaveTextContent('Read more');
    });
  }
};

export const WithCtaButton: Story = {
  args: {
    ctaType: 'button'
  },
  play: async ({ canvasElement, step }) => {
    const cta = within(canvasElement).getByTestId('button');

    step('Check that the call to action is correct', () => {
      expect(cta).toHaveTextContent('Read more');
    });
  }
};

export const WithCtaClickable: Story = {
  args: {
    ctaType: 'clickable'
  },
  play: async ({ canvasElement, step }) => {
    const cta = within(canvasElement).getByTestId('content-card');

    step('Intercept the click and prevent the default behavior', () => {
      cta.addEventListener('click', (event) => {
        event.preventDefault();
      });
    });

    await step(
      'Check that the call to action is clickable and works',
      async () => {
        const originalWindowOpen = window.open;
        const windowOpenMock = fn();
        window.open = windowOpenMock;

        await userEvent.click(cta);

        expect(windowOpenMock).toHaveBeenCalledWith('#');

        // Restore the original window.open function
        window.open = originalWindowOpen;
      }
    );
  }
};

export const WithImageAndCta: Story = {
  args: {
    image: {
      url: '/mocks/images/featured-3.jpg',
      alt_text: 'Placeholder image'
    },
    linkUrl: '#',
    linkText: 'Read more'
  },
  play: async ({ canvasElement, step }) => {
    const image = within(canvasElement).getByRole('img');
    const cta = within(canvasElement).getByTestId('arrow-link');
    step('Check that the image and call to action are correct', () => {
      expect(image).toHaveAttribute(
        'src',
        '/mocks/images/featured-3.jpg?w=3840&q=75'
      );
      expect(image).toHaveAttribute('alt', 'Placeholder image');
      expect(cta).toHaveTextContent('Read more');
    });
  }
};

export const WithSecondaryCta: Story = {
  args: {
    ctaType: 'button',
    link2Text: 'Learn more',
    link2Url: '#',
    cta2Type: 'link'
  }
};

export const WithNewsTag: Story = {
  args: {
    tag: 'news'
  }
};

export const WithReportsTag: Story = {
  args: {
    tag: 'report'
  }
};

export const WithAuthor: Story = {
  args: {
    author: 'John Doe'
  }
};

export const WithAuthorNoImage: Story = {
  args: {
    author: 'John Doe',
    image: undefined
  }
};

export const WithDate: Story = {
  args: {
    date: '2022-01-01'
  }
};
