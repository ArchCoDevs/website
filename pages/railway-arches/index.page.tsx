import BaseLayout from 'templates/base-layout';

import { Main } from 'components/layout/main';
import { Hero } from 'components/layout/hero';
import { Padding } from 'components/layout/padding';

import { IntroText } from 'components/data-display/intro-text';

import { ComponentFactory } from 'components/factories/component-factory';

import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import { RailwayArches } from 'lib/types/sanity.types';

import FeaturedProperties from 'components/data-display/featured-properties';
import toggleFavourite from 'lib/helpers/toggle-favourite';
import { useSession } from 'next-auth/react';
import { RentalSpaceData } from 'lib/types/keystone-types';
import PropertySearchResult from 'lib/types/property-search-result';
import MiniSearch from 'partials/mini-search';
import appConfig from 'app-config';

interface PageProps extends BaseQuery {
  pageData: RailwayArches;
  featuredProperties: {
    title: string;
    properties: PropertySearchResult[];
  };
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview,
    query: `"pageData": *[_type == "railwayArches"][0]`
  });

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
    title: featuredPropertiesRefs.title || '',
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
}

export const Page = ({
  globals,
  navigation,
  pageData,
  featuredProperties,
  preview
}: PageProps) => {
  const session = useSession();

  const onToggleFavourite = toggleFavourite(session);

  const onSearch = (data: { area: string; distance: string }) => {
    const url = `/properties?area=${encodeURIComponent(
      data.area
    )}&distance=${encodeURIComponent(data.distance)}&order-by=distance-asc`;
    window.location.href = url;
  };

  return (
    <BaseLayout
      title={pageData?.metadata?.title}
      description={pageData?.metadata?.description}
      globals={globals}
      navigation={navigation}
      preview={preview}
    >
      <Hero image={pageData?.heroImage || undefined}></Hero>
      <Main>
        <Padding>
          <IntroText title={pageData?.title} />
          <MiniSearch onSearch={onSearch} align="left" className="mb-2" />
        </Padding>
        <hr className="mb-2" />
        {/* Begin composable section */}
        {pageData?.content?.map((component, index) => (
          <ComponentFactory
            key={index}
            componentType={component._type}
            // TODO: Fix the type mismatch issue when time allows
            // @ts-ignore - the issue is coming from a type mismatch with the use of portable text
            componentProps={component}
          />
        ))}
        {/* End composable section */}
        <br />
        <Padding>
          {featuredProperties?.properties?.length > 1 && (
            <FeaturedProperties
              {...featuredProperties}
              onSavedChange={onToggleFavourite}
            />
          )}
        </Padding>
      </Main>
    </BaseLayout>
  );
};

export default Page;
