import BaseLayout from 'templates/base-layout';

import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import { Main } from 'components/layout/main';
import { Hero } from 'components/layout/hero';
import { ComponentFactory } from 'components/factories/component-factory';
import { PropertiesCta } from 'components/data-display/properties-cta';

import {
  ExistingCustomers,
  PropertiesCta as PropertiesCTAType
} from 'lib/types/sanity.types';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import appConfig from 'app-config';

interface ExistingCustomersPageProps extends BaseQuery {
  existingCustomers: ExistingCustomers;
  propertiesCta: PropertiesCTAType;
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    query: `
      "existingCustomers": *[_type == "existingCustomers"][0],
      "propertiesCta": *[_type == "propertiesCta"][0]
    `,
    preview
  });

  return {
    props: data,
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
}

export const ExistingCustomersPage = ({
  existingCustomers,
  propertiesCta,
  globals,
  navigation
}: ExistingCustomersPageProps) => {
  return (
    <BaseLayout
      title={existingCustomers?.metadata?.title}
      description={existingCustomers?.metadata?.description}
      globals={globals}
      navigation={navigation}
    >
      <Hero
        image={existingCustomers?.heroImage}
        overlay
        title={existingCustomers.title}
        body={existingCustomers.pageIntroText}
      />
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Support for existing customers',
            href: '/support-for-existing-customers'
          }
        ]}
      />
      <Main>
        {/* Begin composable section */}
        {existingCustomers?.content?.map((component, index) => (
          <ComponentFactory
            key={index}
            componentType={component._type}
            // TODO: Fix the type mismatch issue when time allows
            // @ts-ignore - the issue is coming from a type mismatch with the use of the spacer component
            componentProps={component}
          />
        ))}
        {/* End composable section */}
      </Main>
      <PropertiesCta
        title={propertiesCta.title}
        content={propertiesCta.content}
        ctaLink={propertiesCta.ctaLink}
      />
    </BaseLayout>
  );
};

export default ExistingCustomersPage;
