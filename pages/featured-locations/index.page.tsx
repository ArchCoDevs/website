import React from 'react';
import {
  FeaturedLocations as FeaturedLocationsType,
  PropertiesCta as PropertiesCTAType,
  IndexHeroes
} from 'lib/types/sanity.types';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import BaseLayout from 'templates/base-layout';

/* import components */

import { Main } from 'components/layout/main';
import { Hero } from 'components/layout/hero';
import { Padding } from 'components/layout/padding';
import { Grid } from 'components/layout/grid';
import { IntroText } from 'components/data-display/intro-text';
import { ContentCard } from 'components/data-display/content-card';
import { PropertiesCta } from 'components/data-display/properties-cta';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import appConfig from 'app-config';

interface LocationsPageProps extends BaseQuery {
  locationsData: FeaturedLocationsType[] | null;
  propertiesCta: PropertiesCTAType;
  indexHeroes: IndexHeroes;
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    query: `
      "locationsData": *[_type == "featuredLocations"] | order(orderRank),
      "propertiesCta": *[_type == "propertiesCta"][0],
      "indexHeroes": *[_type == "indexHeroes"][0]
    `,
    preview
  });

  return {
    props: data,
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
}

export const FeaturedLocationsIndex = ({
  locationsData,
  propertiesCta,
  indexHeroes,
  navigation,
  globals,
  preview
}: LocationsPageProps) => {
  return (
    <BaseLayout
      title={'Featured locations'}
      globals={globals}
      navigation={navigation}
      preview={preview}
    >
      <Hero image={indexHeroes?.indexHeroImages?.featuredLocations}></Hero>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Featured locations', href: '/featured-locations' }
        ]}
      />
      <Main>
        <Padding>
          <Grid columns={1}>
            <IntroText title="Featured locations" />
            <Grid columns={3} as="ul">
              {locationsData?.length &&
                locationsData.map((locationData) => (
                  <li key={locationData._id}>
                    <ContentCard
                      title={locationData.title || ''}
                      content={locationData.cardSummary || ''}
                      image={locationData.locationImage || undefined}
                      ctaType="button"
                      linkText={`Discover ${locationData.title}` || ''}
                      linkUrl={`/featured-locations/${locationData.slug.current}`}
                    />
                  </li>
                ))}
            </Grid>
          </Grid>
        </Padding>
      </Main>
      <PropertiesCta
        title={propertiesCta.title}
        content={propertiesCta.content}
        ctaLink={propertiesCta.ctaLink}
      />
    </BaseLayout>
  );
};

export default FeaturedLocationsIndex;
