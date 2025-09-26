import React from 'react';

import styles from './styles.module.scss';
import { FindYourSpace } from 'lib/types/sanity.types';

import { GetStaticPaths, GetStaticProps } from 'next';
import BaseLayout from 'templates/base-layout';
import { useRouter } from 'next/router';

import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';

import { ErrorBoundary } from 'components/feedback/error-boundary';
import { ComponentFactory } from 'components/factories/component-factory';

import Breadcrumbs from 'components/navigation/breadcrumbs';
import IntroText from 'components/data-display/intro-text';
import Grid from 'components/layout/grid';
import FullWidthImage from 'components/data-display/full-width-image';
import RichText from 'components/data-display/rich-text';
import { PortableTextBlock } from 'next-sanity';
import InfoCta from 'components/data-display/info-cta';
import FeaturedProperties from 'components/data-display/featured-properties';
import PropertySearchResult from 'lib/types/property-search-result';
import { RentalSpaceData } from 'lib/types/keystone-types';
import toggleFavourite from 'lib/helpers/toggle-favourite';
import { useSession } from 'next-auth/react';
import appConfig from 'app-config';

interface PageProps extends BaseQuery {
  pageData: FindYourSpace | null;
  featuredProperties: {
    title: string;
    properties: PropertySearchResult[];
  };
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  preview = false
}) => {
  const space = params?.space as string;

  const data = await sanityQuery({
    query: `"pageData": *[_type == 'findYourSpace' && slug.current == $space][0]`,
    params: { space },
    preview
  });

  if (!data.pageData) {
    return { notFound: true };
  }

  const featuredPropertiesRefs = data.pageData.featuredProperties || [];

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

export const Page = ({
  pageData,
  globals,
  navigation,
  featuredProperties,
  preview
}: PageProps) => {
  const router = useRouter();
  const session = useSession();
  if (!pageData) {
    return router.push('/404');
  }

  const onToggleFavourite = toggleFavourite(session);

  const {
    metadata,
    title,
    summary,
    heroImage,
    pageIntroText,
    pageIntroCTATitle,
    pageIntroCTADescription,
    pageIntroCTALinkText,
    pageIntroCTALinkUrl,
    content,
    sideContent
  } = pageData;

  const hasSideContent = sideContent && sideContent.length > 0;

  return (
    <>
      <BaseLayout
        title={metadata?.title || title}
        description={metadata?.description || summary || undefined}
        globals={globals}
        navigation={navigation}
        preview={preview}
      >
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Find your space', href: '/find-your-space' },
            { label: title, href: `/find-your-space/${pageData.slug.current}` }
          ]}
        />
        <Main>
          <Padding>
            <IntroText title={title} fullWidth />
            {heroImage && <FullWidthImage image={heroImage} className="mb-2" />}
            {pageIntroText?.richText && (
              <Grid columns={2} columnSizes="3:1">
                <RichText
                  richText={pageIntroText.richText as PortableTextBlock[]}
                />
                <InfoCta
                  title={pageIntroCTATitle}
                  paragraph={pageIntroCTADescription}
                  buttonText={pageIntroCTALinkText}
                  buttonUrl={pageIntroCTALinkUrl}
                />
              </Grid>
            )}
          </Padding>
          <Grid
            columns={hasSideContent ? 2 : 1}
            columnSizes={hasSideContent ? '4:1' : undefined}
          >
            {/* Begin composable section */}
            <Grid columns={1}>
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
            </Grid>
            {/* End composable section */}
            {sideContent && sideContent.length > 0 && (
              <aside className={styles['aside']}>
                <Grid columns={1}>
                  {sideContent?.map((component, index) => (
                    <ErrorBoundary
                      key={`aside-${component._key}-${index}`}
                      message={`${component._type} failed to load`}
                    >
                      <ComponentFactory
                        key={`aside-${component._key}-${index}-${component._type}`}
                        componentType={component._type}
                        // TODO: Fix the type mismatch issue when time allows
                        // @ts-ignore - the issue is coming from a type mismatch with the use of portable text
                        componentProps={component}
                      />
                    </ErrorBoundary>
                  ))}
                  {/* End composable section */}
                </Grid>
              </aside>
            )}
          </Grid>
          {featuredProperties.properties?.length > 1 && (
            <Padding>
              <FeaturedProperties
                {...featuredProperties}
                onSavedChange={onToggleFavourite}
              />
            </Padding>
          )}
        </Main>
      </BaseLayout>
    </>
  );
};

export default Page;
