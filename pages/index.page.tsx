import BaseLayout from 'templates/base-layout';

import { Main } from 'components/layout/main';
import { Hero } from 'components/layout/hero';
import { Padding } from 'components/layout/padding';
import { Grid } from 'components/layout/grid';
import { IntroText } from 'components/data-display/intro-text';
import { ContentCard } from 'components/data-display/content-card';
import { RichText } from 'components/data-display/rich-text';
import { ComponentFactory } from 'components/factories/component-factory';

import { MiniSearch } from 'partials/mini-search';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import { Homepage } from 'lib/types/sanity.types';
import { PortableTextBlock } from 'next-sanity';
import appConfig from 'app-config';

interface HomePageProps extends BaseQuery {
  homepage: Homepage;
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview,
    query: `"homepage": *[_type == "homepage"][0]`
  });

  return {
    props: data,
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
}

export const Home = ({
  globals,
  navigation,
  homepage,
  preview
}: HomePageProps) => {
  const cardCount = homepage.contentCards?.cards.length || 0;

  const onSearch = (data: { area: string; distance: string }) => {
    const url = `/properties?area=${encodeURIComponent(
      data.area
    )}&distance=${encodeURIComponent(data.distance)}&order-by=distance-asc`;
    window.location.href = url;
  };

  return (
    <BaseLayout
      title={homepage?.metadata?.title}
      description={homepage?.metadata?.description}
      globals={globals}
      navigation={navigation}
      preview={preview}
    >
      <Main>
        <Hero
          image={homepage?.heroImage || undefined}
          video_url={homepage?.videoUrl}
        >
          <MiniSearch onSearch={onSearch} extended />
        </Hero>
        <Padding vertical={true}>
          <IntroText
            title={homepage?.title}
            paragraph={homepage?.pageIntroText}
            centered
          />
        </Padding>
        {cardCount > 0 && (
          <Padding vertical={false}>
            <Grid columns={cardCount}>
              {homepage.contentCards?.cards.map((card, index) => (
                <ContentCard
                  key={index}
                  title={card.title}
                  content={card.content}
                  image={card.image}
                  ctaType={card.ctaType || 'link'}
                  linkText={card.linkText}
                  linkUrl={card.linkUrl}
                />
              ))}
            </Grid>
          </Padding>
        )}
        {homepage?.textSection && (
          <Padding vertical={false}>
            <RichText
              centered
              richText={homepage?.textSection as PortableTextBlock[]}
            />
          </Padding>
        )}
        {/* Begin composable section */}
        {homepage?.content?.map((component, index) => (
          <ComponentFactory
            key={index}
            componentType={component._type}
            // TODO: Fix the type mismatch issue when time allows
            // @ts-ignore - the issue is coming from a type mismatch with the use of portable text
            componentProps={component}
          />
        ))}
        {/* End composable section */}
      </Main>
    </BaseLayout>
  );
};

export default Home;
