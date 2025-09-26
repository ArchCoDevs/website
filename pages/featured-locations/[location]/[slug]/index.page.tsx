// /pages/featured-locations/[location]/[slug].tsx

import React, { Suspense } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import BaseLayout from 'templates/base-layout';
import {
  FeaturedLocations as FeaturedLocationsType,
  FeaturedLocationsSub
} from 'lib/types/sanity.types';
// import { RentalSpaceData } from 'lib/types/keystone-types';
import styles from './styles.module.scss';
import Image from 'next/image';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import type { PortableTextBlock } from 'next-sanity';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';
import { Grid } from 'components/layout/grid';
import { IntroText } from 'components/data-display/intro-text';
import { RichText } from 'components/data-display/rich-text';
import { InfoCta } from 'components/data-display/info-cta';
import { Breadcrumbs } from 'components/navigation/breadcrumbs';
import { Loader } from 'components/feedback/loader';
import { ComponentFactory } from 'components/factories/component-factory';
import { ErrorBoundary } from 'components/feedback/error-boundary';
import PropertySearchResult from 'lib/types/property-search-result';
import { RentalSpaceData } from 'lib/types/keystone-types';
import FeaturedProperties from 'components/data-display/featured-properties';
import toggleFavourite from 'lib/helpers/toggle-favourite';
import { useSession } from 'next-auth/react';
import appConfig from 'app-config';

interface LocationPageProps extends BaseQuery {
  locationData: FeaturedLocationsType | null;
  featuredProperties: {
    title: string;
    properties: PropertySearchResult[];
  };
  childPageData: FeaturedLocationsSub;
  parentLocation: string;
}

export const getStaticProps: GetStaticProps<LocationPageProps> = async ({
  params,
  preview = false
}) => {
  const slug = params?.slug as string;
  const location = params?.location as string;

  const data = await sanityQuery({
    query: `"locationData": *[_type == 'featuredLocations' && slug.current == $location][0],
    "childPageData": *[_type == 'featuredLocationsSub' && slug.current == $slug][0]`,
    params: { location, slug },
    preview
  });

  if (!data.locationData || !data.childPageData) {
    return { notFound: true };
  }

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
      parentLocation: location,
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

export const FeaturedHubSub = ({
  locationData,
  childPageData,
  featuredProperties,
  globals,
  navigation,
  preview,
  parentLocation
}: LocationPageProps) => {
  const session = useSession();
  const router = useRouter();

  if (!locationData || !childPageData) {
    return router.push('/404');
  }

  const onToggleFavourite = toggleFavourite(session);

  return (
    <>
      <BaseLayout
        title={`${locationData.title} - ${childPageData.title}`}
        description={childPageData.metadata?.description || undefined}
        globals={globals}
        navigation={navigation}
        preview={preview}
      >
        <>
          <Breadcrumbs
            breadcrumbs={[
              {
                label: 'Featured Locations',
                href: `/featured-locations`
              },
              {
                label: locationData.title,
                href: `/featured-locations/${parentLocation}`
              },
              {
                label: childPageData.title,
                href: `/featured-locations/${parentLocation}/${childPageData.slug.current}`
              }
            ]}
          />
          <Main className={styles['child-page']}>
            <Grid columns={1}>
              <Padding>
                <IntroText
                  title={childPageData.title}
                  paragraph={childPageData.pageIntroText}
                  fullWidth
                />
              </Padding>
              {childPageData.heroImage && (
                <Padding>
                  <Suspense fallback={<Loader label="Image loading..." />}>
                    <Image
                      src={childPageData.heroImage.url || ''}
                      alt={childPageData.heroImage.alt_text || ''}
                      width={1200}
                      height={350}
                      priority
                      placeholder="empty"
                      className={styles['hero-image']}
                    />
                  </Suspense>
                </Padding>
              )}
              <Padding>
                <Grid columns={2} columnSizes="3:1">
                  <RichText
                    richText={
                      childPageData.textArea.richText as PortableTextBlock[]
                    }
                  />
                  <InfoCta
                    title={childPageData.contactUsCTATitle}
                    paragraph={childPageData.contactUsCTADescription}
                  />
                </Grid>
              </Padding>

              {featuredProperties.properties?.length > 1 && (
                <Padding>
                  <FeaturedProperties
                    {...featuredProperties}
                    onSavedChange={onToggleFavourite}
                  />
                </Padding>
              )}
              {/* Begin composable section */}
              {childPageData.content?.map((component, index) => (
                <ErrorBoundary
                  key={index}
                  message={`${component._type} failed to load`}
                >
                  <Grid columns={1}>
                    <ComponentFactory
                      key={index}
                      componentType={component._type}
                      // TODO: Fix the type mismatch issue when time allows
                      // @ts-ignore - the issue is coming from a type mismatch with the use of portable text
                      componentProps={component}
                    />
                  </Grid>
                </ErrorBoundary>
              ))}
              {/* End composable section */}
            </Grid>
          </Main>
        </>
      </BaseLayout>
    </>
  );
};

export default FeaturedHubSub;
