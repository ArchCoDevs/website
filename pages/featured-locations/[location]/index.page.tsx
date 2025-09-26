import React from 'react';

import styles from './styles.module.scss';
import { FeaturedLocations as FeaturedLocationsType } from 'lib/types/sanity.types';
import { RentalSpaceData } from 'lib/types/keystone-types';
import { GetStaticPaths, GetStaticProps } from 'next';
import BaseLayout from 'templates/base-layout';
import { useRouter } from 'next/router';

import BrandFolderImage from 'lib/types/brandfolder-image';

import type { PortableTextBlock } from '@portabletext/react';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';
import { Grid } from 'components/layout/grid';
import { IntroText } from 'components/data-display/intro-text';
import { RichText } from 'components/data-display/rich-text';
import { InfoCta } from 'components/data-display/info-cta';
import { ContentCard } from 'components/data-display/content-card';
import { Map } from 'components/data-display/map';
import { ImageRow } from 'components/data-display/image-row';
import { ErrorBoundary } from 'components/feedback/error-boundary';
import { ComponentFactory } from 'components/factories/component-factory';
import PropertySearchResult from 'lib/types/property-search-result';
import { useSession } from 'next-auth/react';
import toggleFavourite from 'lib/helpers/toggle-favourite';
import FeaturedProperties from 'components/data-display/featured-properties';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import { PropertyModel } from 'lib/types/property-model';
import appConfig from 'app-config';

interface LocationPageProps extends BaseQuery {
  searchResults: RentalSpaceData;
  featuredProperties: {
    title: string;
    properties: PropertySearchResult[];
  };
  locationData: FeaturedLocationsType | null;
}

export const getStaticProps: GetStaticProps<LocationPageProps> = async ({
  params,
  preview = false
}) => {
  const slug = params?.location as string;

  const data = await sanityQuery({
    query: `"locationData": *[_type == 'featuredLocations' && slug.current == $slug][0]`,
    params: { slug },
    preview
  });

  if (!data.locationData) {
    return { notFound: true };
  }
  // If locationData is set, use it to run a query on keystone to get the search results for the location
  const apiUrl = `${
    process.env.KEYSTONE_API_URL
  }/RentalSpace/Search?SearchString=${
    data.locationData.keystoneSearchTerm
  }&radius=${
    data.locationData.radius || 10
  }&MinPrice=0&MaxPrice=999999&PageSize=99999`;

  const response = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.SERVICE_ACCOUNT_TOKEN as string
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch search results');
    return { notFound: true };
  }

  const searchResultsResponse: RentalSpaceData = await response.json();

  const searchResults = searchResultsResponse;

  const featuredPropertiesRefs = data.locationData.featuredProperties || [];

  // Get the featured properties from keystone
  const featuredPropertiesResponse = await Promise.all(
    featuredPropertiesRefs.properties
      ? featuredPropertiesRefs.properties.map(async (ref: string) => {
          const featuredPropertyUrl = `${process.env.KEYSTONE_API_URL}/RentalSpace/Search?SearchString=${ref}`;
          const propertyResponse = await fetch(featuredPropertyUrl, {
            headers: {
              'Content-Type': 'application/json',
              Token: process.env.SERVICE_ACCOUNT_TOKEN as string
            }
          });

          if (!propertyResponse.ok) {
            console.error('Failed to fetch property');
            return null;
          }

          return await propertyResponse.json();
        })
      : []
  );

  const properties: PropertySearchResult[] = featuredPropertiesResponse
    .filter((property: RentalSpaceData) => property?.rental_space_model_list)
    .map((property) => property?.rental_space_model_list[0]);

  const featuredProperties = {
    title: featuredPropertiesRefs.title || 'Featured Properties',
    properties
  };

  return {
    props: {
      ...data,
      searchResults,
      featuredProperties,
      preview
    },
    revalidate: appConfig.defaultRevalidationSeconds.propertyDetails
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const FeaturedLocation = ({
  searchResults,
  locationData,
  featuredProperties,
  globals,
  navigation,
  preview
}: LocationPageProps) => {
  const router = useRouter();
  const session = useSession();
  if (!locationData) {
    return router.push('/404');
  }

  const onToggleFavourite = toggleFavourite(session);

  const {
    title,
    metadata,
    textArea,
    contactUsCTATitle,
    contactUsCTADescription,
    contentCardHeading,
    composableContentHeading,
    locationImage,
    contentCards,
    content,
    contentCardsLocation,
    keystoneSearchTerm
  } = locationData;

  const contentCardsHtml = (
    <Padding vertical={false}>
      {contentCardHeading && (
        <h2 className={styles['large-h2']}>{contentCardHeading}</h2>
      )}
      {contentCards.length && (
        <Grid columns={contentCards.length}>
          {contentCards.map((card) => (
            <ContentCard
              key={card._key}
              title={card.title}
              content={card.content}
              ctaType={card.ctaType}
              linkText={card.linkText}
              linkUrl={card.linkUrl}
              featured={card.isFeatured}
              bgTakeover={card.isFeatured || !card.image}
              image={
                card.image
                  ? ({
                      url: card.image.url || '',
                      alt_text: card.image.alt_text || ''
                    } as BrandFolderImage)
                  : undefined
              }
            />
          ))}
        </Grid>
      )}
    </Padding>
  );

  const onMapPropertyClick = (property: PropertyModel) => {
    if (property?.reference) {
      router.push(`/properties/${property.reference}`);
    }
  };

  return (
    <>
      <BaseLayout
        title={title}
        description={metadata?.description || undefined}
        globals={globals}
        navigation={navigation}
        preview={preview}
      >
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Featured Locations', href: '/featured-locations' },
            { label: title, href: router.asPath }
          ]}
        />
        <Main className={styles['location-page']}>
          <Padding>
            <IntroText title={title} />
            <Grid columns={1}>
              <Map
                properties={
                  searchResults?.rental_space_model_list ||
                  featuredProperties.properties ||
                  []
                }
                className={styles.map}
                onSelectionChange={onMapPropertyClick}
              />

              <Grid columns={2} columnSizes="3:1">
                <RichText
                  richText={textArea?.richText as PortableTextBlock[]}
                />
                <InfoCta
                  title={contactUsCTATitle}
                  paragraph={contactUsCTADescription}
                />
              </Grid>

              {featuredProperties.properties?.length > 1 && (
                <FeaturedProperties
                  {...featuredProperties}
                  onSavedChange={onToggleFavourite}
                />
              )}
            </Grid>
          </Padding>
          <ImageRow
            className={styles['image-row']}
            image={locationImage}
            overlayText={true}
            title={`Browse available properties in ${title}`}
            ctaColour="orange"
            ctaText="Search"
            ctaUrl={`/properties?area=${encodeURIComponent(
              keystoneSearchTerm
            )}&order-by=distance-asc`}
          />
          <Grid columns={1}>
            {contentCardsLocation === 'before-content' && contentCardsHtml}

            {composableContentHeading && (
              <h2 className={styles['large-h2']}>{composableContentHeading}</h2>
            )}
            {/* Begin composable section */}
            {content?.map((component, index) => (
              <ErrorBoundary
                key={index}
                message={`${component._type} failed to load`}
              >
                <ComponentFactory
                  key={index}
                  componentType={component._type}
                  // TODO: Fix the type mismatch issue when time allows
                  // @ts-ignore - the issue is coming from a type mismatch with the use of portable text
                  componentProps={component}
                />
              </ErrorBoundary>
            ))}
            {/* End composable section */}

            {contentCardsLocation !== 'before-content' && contentCardsHtml}
          </Grid>
        </Main>
      </BaseLayout>
    </>
  );
};

export default FeaturedLocation;
