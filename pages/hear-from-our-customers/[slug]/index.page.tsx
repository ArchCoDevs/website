import React from 'react';
import styles from './styles.module.scss';
import { CaseStudy } from 'lib/types/sanity.types';

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
import appConfig from 'app-config';

interface PageProps extends BaseQuery {
  pageData: CaseStudy | null;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  preview = false
}) => {
  const slug = params?.slug as string;

  const data = await sanityQuery({
    query: `"pageData": *[_type == 'caseStudy' && slug.current == $slug][0]`,
    params: { slug },
    preview
  });

  if (!data.pageData) {
    return { notFound: true };
  }

  return {
    props: {
      ...data,
      preview
    },
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const Page = ({ pageData, globals, navigation, preview }: PageProps) => {
  const router = useRouter();

  if (!pageData) {
    return router.push('/404');
  }

  const { metadata, title, summary, heroImage, content, sideContent } =
    pageData;

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
            {
              label: 'Hear from our customers',
              href: '/hear-from-our-customers'
            },
            {
              label: title,
              href: `/hear-from-our-customers/${pageData.slug.current}`
            }
          ]}
        />
        <Main className={styles['news-page']}>
          <Padding>
            <IntroText title={title} fullWidth />
            {heroImage && <FullWidthImage image={heroImage} className="mb-2" />}
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
        </Main>
      </BaseLayout>
    </>
  );
};

export default Page;
