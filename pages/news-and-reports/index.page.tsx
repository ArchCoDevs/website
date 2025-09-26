import React from 'react';
import {
  IndexHeroes,
  NewsArticle,
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
import { PressOfficeCard } from 'components/data-display/press-office-card';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import appConfig from 'app-config';

interface NewsReportsPageProps extends BaseQuery {
  pageData: NewsArticle[] | null;
  propertiesCta: PropertiesCtaType;
  indexHeroes: IndexHeroes;
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    query: `
      "pageData": *[_type == "newsArticle"] | order(date desc),
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

export const NewsAndReportsIndex = ({
  pageData,
  indexHeroes,
  propertiesCta,
  navigation,
  globals,
  preview
}: NewsReportsPageProps) => {
  return (
    <BaseLayout
      title={'News and Reports'}
      globals={globals}
      navigation={navigation}
      preview={preview}
    >
      <Hero image={indexHeroes?.indexHeroImages?.newsAndReports}></Hero>
      <Breadcrumbs
        breadcrumbs={[{ label: 'News and Reports', href: '/news-and-reports' }]}
      />
      <Main>
        <Padding>
          <Grid columns={1}>
            <IntroText title="News and Reports" />
            <Grid columns={3} as="ul">
              {pageData?.length &&
                pageData.map((pdata, index) => (
                  <React.Fragment key={pdata._id}>
                    {/* Insert PressOfficeCard at position 3 */}
                    {index === 2 && (
                      <li key="press-office">
                        <PressOfficeCard
                          phoneNumber={appConfig.contactDetails.pressOffice.tel}
                          email={appConfig.contactDetails.pressOffice.email}
                        />
                      </li>
                    )}
                    <li key={pdata._id}>
                      <ContentCard
                        title={pdata.title || ''}
                        content={pdata.summary || ''}
                        image={pdata.heroImage}
                        ctaType="button"
                        linkText={pdata.linkText || 'Read More'}
                        linkUrl={`/news-and-reports/${pdata.slug.current}`}
                        tag={pdata.articleType || 'news'}
                        author={pdata.author || 'The Arch Company'}
                      />
                    </li>
                  </React.Fragment>
                ))}
              {/* If pageData has less than 3 items, ensure PressOfficeCard is rendered */}
              {pageData?.length && pageData.length < 3 && (
                <li key="press-office">
                  <PressOfficeCard
                    phoneNumber={appConfig.contactDetails.pressOffice.tel}
                    email={appConfig.contactDetails.pressOffice.email}
                  />
                </li>
              )}
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

export default NewsAndReportsIndex;
