import BaseLayout from 'templates/base-layout';

import { Errors, Globals, Navigation } from 'lib/types/sanity.types';
import { PageError } from 'partials/page-error';
import sanityQuery from 'lib/helpers/sanity-query';
import appConfig from 'app-config';

interface HomePageProps {
  globals: Globals;
  navigation: Navigation;
  errors: Errors;
  preview: boolean;
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    query: `"errors": *[_type == "errors"][0]`,
    preview
  });

  return {
    props: data,
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
}

export const Error400 = ({ errors, globals, navigation }: HomePageProps) => {
  return (
    <BaseLayout
      title={'Error: Bad request'}
      globals={globals}
      navigation={navigation}
      noFollow
      noIndex
    >
      <PageError code={400} message={errors.errors?.fourhundred} />
    </BaseLayout>
  );
};

export default Error400;
