import React from 'react';
import {
  CaseStudy,
  IndexHeroes,
  PropertiesCta as PropertiesCtaType
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
  pageData: CaseStudy[] | null;
  propertiesCta: PropertiesCtaType;
  indexHeroes: IndexHeroes;
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    query: `
      "pageData": *[_type == "caseStudy"] | order(orderRank),
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
  pageData,
  indexHeroes,
  propertiesCta,
  navigation,
  globals,
  preview
}: LocationsPageProps) => {
  const title = 'Hear from our customers';

  return (
    <BaseLayout
      title={title}
      globals={globals}
      navigation={navigation}
      preview={preview}
    >
      <Hero image={indexHeroes?.indexHeroImages?.newsAndReports}></Hero>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: title,
            href: '/hear-from-our-customers'
          }
        ]}
      />
      <Main>
        <Padding>
          <Grid columns={1}>
            <IntroText title={title} />
            <Grid columns={3} as="ul">
              {pageData?.length &&
                pageData.map((pdata) => (
                  <>
                    <li key={pdata._id}>
                      <ContentCard
                        title={pdata.title || ''}
                        content={pdata.summary || ''}
                        image={pdata.heroImage}
                        ctaType="button"
                        linkText={pdata.linkText || 'Read More'}
                        linkUrl={`/hear-from-our-customers/${pdata.slug.current}`}
                      />
                    </li>
                  </>
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
