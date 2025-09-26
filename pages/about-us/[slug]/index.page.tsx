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
import PageLandingPage from 'partials/landing-page/index.page';
import appConfig from 'app-config';

interface ExistingCustomersSubProps extends BaseQuery {
  pageData: GeneralInformationType | TwoColumnEditorialType | LandingPageType;
}

export const getStaticProps: GetStaticProps<
  ExistingCustomersSubProps
> = async ({ params, preview = false }) => {
  const slug = params?.slug as string;

  const client = sanityClient(preview);

  // Try to fetch the parent ID dynamically
  let parentId: string | undefined;

  try {
    const parentData = await client.fetch<{ _id: string }>(
      `*[_type == "aboutUs"][0]{_id}`
    );
    parentId = parentData?._id;
  } catch (error) {
    console.error('Failed to fetch parent ID dynamically:', error);
  }

  if (!parentId) {
    console.error('Parent ID is not found.');
    return { notFound: true };
  }

  const data = await sanityQuery({
    query: `"pageData": *[_type in ["generalInformation", "twoColumnEditorial", "landingPage"] && references($parentId) && slug.current == $slug][0]`,
    params: { parentId, slug },
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

export const Page = ({
  pageData,
  globals,
  navigation,
  preview
}: ExistingCustomersSubProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  if (!pageData) {
    return router.push('/404');
  }

  const breadcrumbs = [
    {
      label: pageData.title,
      href: `/about-us/${pageData.slug.current}`
    }
  ];

  return (
    <>
      <BaseLayout
        title={`${pageData.title}`}
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
    </>
  );
};

export default Page;
