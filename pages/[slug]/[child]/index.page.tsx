import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { sanityClient } from 'lib/helpers/sanity-client';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import BaseLayout from 'templates/base-layout';
import {
  GeneralInformation as GeneralInformationType,
  TwoColumnEditorial as TwoColumnEditorialType,
  LandingPage as LandingPageType
} from 'lib/types/sanity.types';
import { Loader } from 'components/feedback/loader';
import { PageGeneralInformation } from 'partials/page-general-information';
import { PageTwoColumnEditorial } from 'partials/page-two-column-editorial';
import changeCase from 'lib/helpers/change-case';
import PageLandingPage from 'partials/landing-page/index.page';
import appConfig from 'app-config';

interface PageProps extends BaseQuery {
  pageData: GeneralInformationType | TwoColumnEditorialType | LandingPageType;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  preview = false
}) => {
  const slug = params?.slug as string;
  const childSlug = params?.child as string; // The child slug part of the URL
  const client = sanityClient(preview);

  // Fetch the page data including the parent reference
  const pageData = await client.fetch<{
    _id: string;
    parent: { _ref: string };
  }>(
    `*[_type in ["generalInformation", "twoColumnEditorial", "landingPage"] && slug.current == $childSlug][0]{
      _id,
      parent
    }`,
    { childSlug }
  );

  if (!pageData) {
    console.error('Page data not found for slug:', slug);
    return { notFound: true };
  }

  const parentId = pageData.parent?._ref;

  if (!parentId) {
    console.error('Parent ID is not found.');
    return { notFound: true };
  }

  // Fetch the full page data now that we have the parent ID
  const fullPageData = await sanityQuery({
    query: `"pageData": *[_type in ["generalInformation", "twoColumnEditorial", "landingPage"] && references($parentId) && slug.current == $childSlug][0]`,
    params: { parentId, childSlug },
    preview
  });

  if (!fullPageData.pageData) {
    console.error('Full page data not found for slug:', slug);
    return { notFound: true };
  }

  return {
    props: {
      ...fullPageData,
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

  if (router.isFallback) {
    return <Loader />;
  }

  if (!pageData) {
    return router.push('/404');
  }

  const slug = router.query.slug as string;
  const child = router.query.child as string;

  const breadcrumbs = [
    {
      label: changeCase(slug.replace(/-/g, ' '), 'title'),
      href: `/${slug}`
    },
    {
      label: pageData.title,
      href: `/${slug}/${child}`
    }
  ];

  return (
    <BaseLayout
      title={`${pageData.title}`}
      description={pageData.metadata?.description || undefined}
      globals={globals}
      navigation={navigation}
      preview={preview}
      noFollow={pageData?.metadata?.noFollow || false}
      noIndex={pageData?.metadata?.noIndex || false}
    >
      {pageData._type === 'generalInformation' && (
        <PageGeneralInformation
          data={pageData}
          breadcrumbs={breadcrumbs}
          data-testid="general-information"
        />
      )}
      {pageData._type === 'twoColumnEditorial' && (
        <PageTwoColumnEditorial
          data={pageData}
          breadcrumbs={breadcrumbs}
          data-testid="two-column-editorial"
        />
      )}
      {pageData._type === 'landingPage' && (
        <PageLandingPage
          data={pageData}
          breadcrumbs={breadcrumbs}
          data-testid="landing-page"
        />
      )}
    </BaseLayout>
  );
};

export default Page;
