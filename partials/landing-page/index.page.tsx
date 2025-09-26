import { useRouter } from 'next/router';

import { LandingPage as LandingPageType } from 'lib/types/sanity.types';
import { Loader } from 'components/feedback/loader';

import Hero from 'components/layout/hero';
import { Main } from 'components/layout/main';
import ComponentFactory from 'components/factories/component-factory';
import Grid from 'components/layout/grid';
import Breadcrumbs from 'components/navigation/breadcrumbs';

type Props = {
  /**
   * The data for the page.
   */
  data: LandingPageType;
  /**
   * The breadcrumbs for the page.
   */
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
};

export const PageLandingPage = ({ data, breadcrumbs = [] }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  if (!data) {
    return router.push('/404');
  }

  return (
    <>
      <Hero
        image={data?.heroImage || undefined}
        overlay={true}
        title={data.title}
        body={data.pageIntroText}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Main>
        {/* Begin composable section */}
        <Grid columns={1}>
          {data?.content?.map((component, index) => (
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
    </>
  );
};

export default PageLandingPage;
