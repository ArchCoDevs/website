import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import BaseLayout from 'templates/base-layout';
import {
  GeneralInformation as GeneralInformationType,
  TwoColumnEditorial as TwoColumnEditorialType,
  LandingPage as LandingPageType
} from 'lib/types/sanity.types';
import { PageGeneralInformation } from 'partials/page-general-information';
import { PageTwoColumnEditorial } from 'partials/page-two-column-editorial';
import PageLoader from 'partials/page-loader';
import { PageLandingPage } from 'partials/landing-page/index.page';
import appConfig from 'app-config';

interface PageProps extends BaseQuery {
  pageData:
    | GeneralInformationType
    | TwoColumnEditorialType
    | LandingPageType
    | null;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  preview = false
}) => {
  const slug = params?.slug as string;

  const data = await sanityQuery({
    query: `"pageData": *[_type in ["generalInformation", "twoColumnEditorial", "landingPage"] && slug.current == $slug && !defined(parent)][0]`,
    params: { slug },
    preview
  });

  if (!data.pageData) {
    console.error('Page data not found for slug:', slug);
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

  // Redirect to 404 if pageData is not available
  useEffect(() => {
    if (!pageData) {
      router.push('/404');
    }
  }, [router, pageData]);

  // Uncomment if you want to get the data from Sanity to create mock responses
  // console.log('pageData:', JSON.stringify(pageData, null, 2));

  if (router.isFallback || !pageData) {
    return <PageLoader />;
  }

  const breadcrumbs = [
    {
      label: pageData.title,
      href: router.asPath
    }
  ];

  return (
    <BaseLayout
      title={`${pageData.title}`}
      description={pageData?.metadata?.description || undefined}
      globals={globals}
      navigation={navigation}
      preview={preview}
      noFollow={pageData?.metadata?.noFollow || false}
      noIndex={pageData?.metadata?.noIndex || false}
    >
      {pageData._type === 'generalInformation' && (
        <PageGeneralInformation data={pageData} breadcrumbs={breadcrumbs} />
      )}
      {pageData._type === 'twoColumnEditorial' && (
        <PageTwoColumnEditorial data={pageData} breadcrumbs={breadcrumbs} />
      )}
      {pageData._type === 'landingPage' && (
        <PageLandingPage data={pageData} breadcrumbs={breadcrumbs} />
      )}
    </BaseLayout>
  );
};

export default Page;
