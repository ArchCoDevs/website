import React from 'react';
import {
  PlainText,
  Props as PlainTextProps
} from 'components/data-display/plain-text';
import { Grid } from 'components/layout/grid';
import { Padding } from 'components/layout/padding';
import {
  ContentCard,
  Props as ContentCardProps
} from 'components/data-display/content-card';
import {
  ImageRow,
  Props as ImageRowProps
} from 'components/data-display/image-row';
import {
  RichText,
  Props as RichTextProps
} from 'components/data-display/rich-text';
import {
  CTARichText,
  Props as CTARichTextProps
} from 'components/data-display/cta-rich-text';
import {
  TwoColumnList,
  Props as TwoColumnListProps
} from 'components/data-display/two-column-list';
import {
  RichTextAndImage,
  Props as RichTextAndImageProps
} from 'components/data-display/rich-text-and-image';
import {
  RichTextAndForm,
  Props as RichTextAndFormProps
} from 'components/data-display/rich-text-and-form';
import {
  FullWidthImage,
  Props as FullWidthImageProps
} from 'components/data-display/full-width-image';
import {
  VerticalTabs,
  Props as VerticalTabsProps
} from 'components/data-display/vertical-tabs';
import {
  LinkList,
  Props as LinkListProps
} from 'components/data-display/link-list';
import {
  RawHtml,
  Props as RawHtmlProps
} from 'components/data-display/raw-html';
import {
  VideoEmbed,
  Props as VideoEmbedProps
} from 'components/data-display/video-embed';
import {
  PDFButton,
  Props as PDFButtonProps
} from 'components/data-input/pdf-button';
import {
  TwoSlotRichTextImage,
  Props as TwoSlotRichTextImageProps
} from 'components/data-display/two-slot-rich-text-image';
import {
  SanityTableFactory,
  Props as SanityTableFactoryProps
} from 'components/factories/sanity-table-factory';
import {
  GoogleReviews,
  Props as GoogleReviewsProps
} from 'components/google/Reviews';
import {
  CaseStudies,
  Props as CaseStudiesProps
} from 'components/data-display/case-studies';

export interface RichTextComponent extends RichTextProps {
  _key: string;
  _type: 'richText';
}

export interface RichTextAndImageComponent extends RichTextAndImageProps {
  _key: string;
  _type: 'twoColumnRichTextAndImage';
}

export interface RichTextAndFormComponent extends RichTextAndFormProps {
  _key: string;
  _type: 'richTextAndForm';
}

export interface TextBlockComponent {
  _key: string;
  _type: 'plainText';
}
export interface TwoCardSectionComponent {
  _key: string;
  _type: 'twoCardSection';
  cards: ContentCardProps[];
}

export interface ThreeCardSectionComponent {
  _key: string;
  _type: 'threeCardSection';
  cards: ContentCardProps[];
}

export interface FourCardSectionComponent {
  _key: string;
  _type: 'fourCardSection';
  cards: ContentCardProps[];
}

export interface ImageRowComponent {
  _key: string;
  _type: 'imageRow';
}

export interface HorizontalContentCardComponent {
  _key: string;
  _type: 'horizontalContentCard';
}

export interface FullWidthImageComponent extends FullWidthImageProps {
  _key: string;
  _type: 'fullWidthImage';
}

export interface SpacerComponent {
  _key: string;
  _type: 'spacer';
  size: 'spacer-small' | 'spacer-medium' | 'spacer-large';
}

export interface TwoColumnListComponent extends TwoColumnListProps {
  _key: string;
  _type: 'twoColumnList';
}

export interface VerticalTabsComponent extends VerticalTabsProps {
  _key: string;
  _type: 'verticalTabs';
}

export interface LinkListComponent extends LinkListProps {
  _key: string;
  _type: 'linkList';
}

export interface RawHtmlComponent extends RawHtmlProps {
  _key: string;
  _type: 'rawHtml';
}

export interface VideoEmbedComponent extends VideoEmbedProps {
  _key: string;
  _type: 'videoEmbed';
}

export interface PDFDownloadComponent extends PDFButtonProps {
  _key: string;
  _type: 'pdfDownload';
}

export interface TwoSlotRichTextImageComponent
  extends TwoSlotRichTextImageProps {
  _key: string;
  _type: 'twoSlotRichTextImage';
}

export interface SanityTableFactoryComponent extends SanityTableFactoryProps {
  _key: string;
  _type: 'sanityTableFactory';
}

export interface CTARichTextComponent extends CTARichTextProps {
  _key: string;
  _type: 'ctaRichText';
}

export interface GoogleReviewsComponent extends GoogleReviewsProps {
  _key: string;
  _type: 'googleReviews';
  reviews?: number;
}

export interface CaseStudiesComponent extends CaseStudiesProps {
  _key: string;
  _type: 'caseStudies';
}

type ComponentProps =
  | RichTextComponent
  | CTARichTextComponent
  | TwoColumnListComponent
  | RichTextAndImageComponent
  | RichTextAndFormComponent
  | TextBlockComponent
  | TwoCardSectionComponent
  | ThreeCardSectionComponent
  | FourCardSectionComponent
  | ImageRowComponent
  | SpacerComponent
  | FullWidthImageComponent
  | VerticalTabsComponent
  | LinkListComponent
  | HorizontalContentCardComponent
  | RawHtmlComponent
  | VideoEmbedComponent
  | PDFDownloadComponent
  | TwoSlotRichTextImageComponent
  | SanityTableFactoryComponent
  | GoogleReviewsComponent
  | CaseStudiesComponent;

interface ComponentFactoryProps {
  componentType: string;
  componentProps: ComponentProps;
}

/**
 * The ComponentFactory component is a factory for rendering different types of components.
 */
export const ComponentFactory: React.FC<ComponentFactoryProps> = ({
  componentType,
  componentProps
}) => {
  switch (componentType) {
    case 'plainText':
      return (
        <Padding vertical={false}>
          <PlainText {...(componentProps as unknown as PlainTextProps)} />
        </Padding>
      );
    case 'richText':
      return (
        <Padding vertical={false}>
          <RichText {...(componentProps as RichTextComponent)} />
        </Padding>
      );
    case 'ctaRichText':
      return (
        <Padding vertical={false}>
          <CTARichText {...(componentProps as CTARichTextComponent)} />
        </Padding>
      );
    case 'twoColumnRichText':
      return (
        <Padding vertical={false}>
          <RichText {...(componentProps as RichTextComponent)} columns={2} />
        </Padding>
      );
    case 'contentCard':
      return (
        <Padding vertical={false}>
          <ContentCard {...(componentProps as unknown as ContentCardProps)} />
        </Padding>
      );
    case 'fullWidthImage':
      return (
        <FullWidthImage {...(componentProps as FullWidthImageComponent)} />
      );
    case 'verticalTabs':
      return <VerticalTabs {...(componentProps as VerticalTabsComponent)} />;
    case 'twoCardSection':
      return (
        <Padding vertical={false}>
          <Grid columns={2}>
            {(componentProps as TwoCardSectionComponent).cards.map(
              (card: ContentCardProps, index: React.Key | null | undefined) => (
                <ContentCard key={index} {...card} />
              )
            )}
          </Grid>
        </Padding>
      );
    case 'threeCardSection':
      return (
        <Padding vertical={false}>
          <Grid columns={3}>
            {(componentProps as ThreeCardSectionComponent).cards.map(
              (card: ContentCardProps, index: React.Key | null | undefined) => (
                <ContentCard key={index} {...card} />
              )
            )}
          </Grid>
        </Padding>
      );
    case 'fourCardSection':
      return (
        <Padding vertical={false}>
          <Grid columns={4}>
            {(componentProps as FourCardSectionComponent).cards.map(
              (card: ContentCardProps, index: React.Key | null | undefined) => (
                <ContentCard key={index} {...card} />
              )
            )}
          </Grid>
        </Padding>
      );
    case 'imageRow':
      return <ImageRow {...(componentProps as unknown as ImageRowProps)} />;
    case 'horizontalContentCard':
      return (
        <Padding vertical={false}>
          <ContentCard
            {...(componentProps as unknown as ContentCardProps)}
            orientation="landscape"
          />
        </Padding>
      );
    case 'spacer':
      switch ((componentProps as unknown as SpacerComponent).size) {
        case 'spacer-small':
          return <div style={{ height: '10px' }} />;
        case 'spacer-medium':
          return <div style={{ height: '20px' }} />;
        case 'spacer-large':
          return <div style={{ height: '30px' }} />;
        default:
          return null;
      }
    case 'twoColumnList':
      return (
        <Padding vertical={false}>
          <TwoColumnList {...(componentProps as TwoColumnListComponent)} />
        </Padding>
      );
    case 'linkList':
      return (
        <Padding vertical={false}>
          <LinkList {...(componentProps as LinkListComponent)} />
        </Padding>
      );
    case 'twoColumnRichTextAndImage':
      return (
        <Padding vertical={false}>
          <RichTextAndImage
            {...(componentProps as RichTextAndImageComponent)}
          />
        </Padding>
      );
    case 'twoColumnRichTextAndForm':
      return (
        <Padding vertical={false}>
          <RichTextAndForm {...(componentProps as RichTextAndFormComponent)} />
        </Padding>
      );
    case 'rawHtml':
      return (
        <Padding vertical={false}>
          <RawHtml {...(componentProps as RawHtmlComponent)} />
        </Padding>
      );
    case 'videoEmbed':
      const videoProps = componentProps as VideoEmbedComponent;
      if (
        !videoProps.video ||
        !videoProps.video.id ||
        !videoProps.video.title
      ) {
        console.error('Invalid video data:', videoProps.video);
        return null; // Graceful fallback
      }
      return (
        <Padding vertical={false}>
          <VideoEmbed {...videoProps} />
        </Padding>
      );
    case 'pdfDownload':
      return (
        <Padding vertical={false}>
          <PDFButton {...(componentProps as PDFDownloadComponent)} />
        </Padding>
      );
    case 'twoSlotRichTextImage':
      return (
        <Padding vertical={false}>
          <TwoSlotRichTextImage
            {...(componentProps as TwoSlotRichTextImageComponent)}
          />
        </Padding>
      );
    case 'infoTable':
      return (
        <Padding vertical={false}>
          <SanityTableFactory
            data={{
              // @ts-ignore-next-line -- This is a valid type
              title: componentProps.title,
              // @ts-ignore-next-line -- This is a valid type
              description: componentProps.description,
              // @ts-ignore-next-line -- This is a valid type
              firstRowHeader: componentProps.firstRowHeader,
              // @ts-ignore-next-line -- This is a valid type
              infoTable: componentProps.infoTable
            }}
          />
        </Padding>
      );
    case 'googleReviews':
      return (
        <Padding vertical={false}>
          <GoogleReviews
            // @ts-ignore-next-line -- This is a valid type
            limit={componentProps.reviews}
            placeId={'ChIJL_t-B5uh2EcR864mHd379G4'}
          />
        </Padding>
      );
    case 'caseStudies':
      return (
        <Padding vertical={false}>
          <CaseStudies
            caseStudies={(componentProps as CaseStudiesComponent).caseStudies}
            orderRank={(componentProps as CaseStudiesComponent).orderRank}
          />
        </Padding>
      );
    default:
      return null;
  }
};

export default ComponentFactory;
