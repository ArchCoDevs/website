import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import BaseLayout from 'templates/base-layout';
import {
  WhyUs,
  PropertiesCta as PropertiesCtaType
} from 'lib/types/sanity.types';
import { Loader } from 'components/feedback/loader';

import Hero from 'components/layout/hero';
import { Main } from 'components/layout/main';
import ComponentFactory from 'components/factories/component-factory';
import Grid from 'components/layout/grid';
import PropertiesCta from 'components/data-display/properties-cta';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import appConfig from 'app-config';

interface PageProps extends BaseQuery {
  pageData: WhyUs;
  propertiesCta: PropertiesCtaType;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  preview = false
}) => {
  const data = await sanityQuery({
    query: `"pageData": *[_type == "whyUs"][0], "propertiesCta": *[_type == "propertiesCta"][0]`,
    preview
  });

  return {
    props: {
      ...data,
      preview
    },
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
};

export const Page = ({
  pageData,
  globals,
  propertiesCta,
  navigation,
  preview
}: PageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  if (!pageData) {
    return router.push('/404');
  }

  return (
    <>
      <BaseLayout
        title={`${pageData.title}`}
        globals={globals}
        navigation={navigation}
        preview={preview}
      >
        <Hero
          image={pageData?.heroImage || undefined}
          overlay={true}
          title={pageData.title}
          body={pageData.pageIntroText}
        />
        <Breadcrumbs breadcrumbs={[{ label: 'Why us', href: '/why-us' }]} />
        <Main>
          {/* Begin composable section */}
          <Grid columns={1}>
            {pageData?.content?.map((component, index) => (
              <ComponentFactory
                key={index}
                componentType={component._type}
                // TODO: Fix the type mismatch issue when time allows
                // @ts-ignore - the issue is coming from a type mismatch with the use of the spacer component
                componentProps={component}
              />
            ))}
            {/* End composable section */}
          </Grid>
        </Main>
        <PropertiesCta
          title={propertiesCta.title}
          content={propertiesCta.content}
          ctaLink={propertiesCta.ctaLink}
        />
      </BaseLayout>
    </>
  );
};

export default Page;
