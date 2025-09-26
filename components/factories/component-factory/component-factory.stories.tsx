import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import ComponentFactory, {
  FourCardSectionComponent,
  HorizontalContentCardComponent,
  ImageRowComponent,
  TextBlockComponent,
  ThreeCardSectionComponent,
  TwoCardSectionComponent
} from 'components/factories/component-factory';
import { Props as PlainTextProps } from 'components/data-display/plain-text';
import { Props as GridProps } from 'components/layout/grid';
import { Props as ContentCardProps } from 'components/data-display/content-card';
import { Props as ImageRowProps } from 'components/data-display/image-row';

// TODO: This is not a complete list of components that can be rendered by the factory
// Add more components when time allows

const plainTextProps: PlainTextProps = {
  title: 'this is a test title',
  body: 'This is a plain text block.'
};

const cardProps: ContentCardProps = {
  title: 'Card Title',
  content: 'This is a content card.',
  image: {
    url: '/mocks/images/featured-1.jpg',
    alt_text: 'An image description'
  },
  ctaType: 'link',
  linkText: 'Read more',
  linkUrl: '#'
};

const imageRowProps: ImageRowProps = {
  title: 'Image Row Title',
  content: 'This is an image row.',
  image: {
    url: '/mocks/images/featured-2.jpg',
    alt_text: 'An image description for image row'
  },
  overlayText: false,
  ctaText: 'Click me',
  ctaUrl: '#',
  ctaColour: 'navy'
};

const cardPropsNoImage: ContentCardProps = {
  title: 'Card Title',
  content: 'This is a content card.',
  ctaType: 'link',
  linkText: 'Read more',
  linkUrl: '#'
};

const cardGridProps: GridProps & { cards: ContentCardProps[] } = {
  columns: 2,
  cards: [cardProps, cardProps]
};

const meta: Meta<typeof ComponentFactory> = {
  component: ComponentFactory
};

export default meta;

type Story = StoryObj<typeof ComponentFactory>;

export const PlainText: Story = {
  args: {
    componentType: 'plainText',
    componentProps: plainTextProps as unknown as TextBlockComponent
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the plain text block is rendered', async () => {
      const textBlock = canvas.getByText('This is a plain text block.');
      expect(textBlock).toBeInTheDocument();
    });
  }
};

export const TwoCardSection: Story = {
  args: {
    componentType: 'twoCardSection',
    componentProps: cardGridProps as unknown as TwoCardSectionComponent
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the two card section is rendered', async () => {
      const cards = canvas.getAllByText('This is a content card.');
      expect(cards).toHaveLength(2);
    });
  }
};

export const ThreeCardSection: Story = {
  args: {
    componentType: 'threeCardSection',
    componentProps: {
      cards: [cardProps, cardProps, cardProps],
      columns: 3
    } as unknown as ThreeCardSectionComponent
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the three card section is rendered', async () => {
      const cards = canvas.getAllByText('This is a content card.');
      expect(cards).toHaveLength(3);
    });
  }
};

export const FourCardSection: Story = {
  args: {
    componentType: 'fourCardSection',
    componentProps: {
      cards: [cardProps, cardProps, cardProps, cardProps],
      columns: 4
    } as unknown as FourCardSectionComponent
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the four card section is rendered', async () => {
      const cards = canvas.getAllByText('This is a content card.');
      expect(cards).toHaveLength(4);
    });
  }
};

export const ImageRow: Story = {
  args: {
    componentType: 'imageRow',
    componentProps: imageRowProps as unknown as ImageRowComponent
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the image row is rendered', async () => {
      const imageRowTitle = canvas.getByText('Image Row Title');
      const imageRowContent = canvas.getByText('This is an image row.');
      expect(imageRowTitle).toBeInTheDocument();
      expect(imageRowContent).toBeInTheDocument();
    });

    await step('Check that the image is rendered', async () => {
      const image = canvas.getByAltText('An image description for image row');
      expect(image).toBeInTheDocument();
    });

    await step('Check that the CTA button is correct', async () => {
      const button = canvas.getByTestId('cta');
      expect(button).toBeInTheDocument();
    });
  }
};

export const HorizontalContentCard: Story = {
  args: {
    componentType: 'horizontalContentCard',
    componentProps: {
      ...cardProps,
      orientation: 'landscape'
    } as unknown as HorizontalContentCardComponent
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'Check that the horizontal content card is rendered',
      async () => {
        const cardTitle = canvas.getByText('Card Title');
        const cardContent = canvas.getByText('This is a content card.');
        expect(cardTitle).toBeInTheDocument();
        expect(cardContent).toBeInTheDocument();
      }
    );

    await step('Check that the image is rendered', async () => {
      const image = canvas.getByAltText('An image description');
      expect(image).toBeInTheDocument();
    });

    await step('Check that the CTA button is correct', async () => {
      const button = canvas.getByTestId('arrow-link');
      expect(button).toBeInTheDocument();
    });
  }
};

export const HorizontalContentCardNoImage: Story = {
  args: {
    componentType: 'horizontalContentCard',
    componentProps: {
      ...cardPropsNoImage,
      orientation: 'landscape'
    } as unknown as HorizontalContentCardComponent
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'Check that the horizontal content card is rendered',
      async () => {
        const cardTitle = canvas.getByText('Card Title');
        const cardContent = canvas.getByText('This is a content card.');
        expect(cardTitle).toBeInTheDocument();
        expect(cardContent).toBeInTheDocument();
      }
    );

    await step('Check that the CTA button is correct', async () => {
      const button = canvas.getByTestId('arrow-link');
      expect(button).toBeInTheDocument();
    });
  }
};
