import BaseLayout from 'templates/base-layout';

import { Globals, Navigation } from 'lib/types/sanity.types';

import styles from './styles.module.scss';
import Padding from 'components/layout/padding';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import MiniSearch from 'partials/mini-search';
import Link from 'next/link';

interface PageProps {
  globals: Globals;
  navigation: Navigation;
  preview: boolean;
}

export const PropertyNotFound = ({ globals, navigation }: PageProps) => {
  const onSearch = (data: { area: string; distance: string }) => {
    window.location.href = `/properties?area=${data.area}&distance=${data.distance}`;
  };

  return (
    <BaseLayout
      title={'Property not found'}
      globals={globals}
      navigation={navigation}
      noIndex
      noFollow
    >
      <main className={styles['property-not-found']}>
        <Padding>
          <Breadcrumbs
            breadcrumbs={[
              {
                label: 'Property not found',
                href: '#',
                current: true
              }
            ]}
          />
          <section>
            <h1>This Property cannot be found.</h1>
            <p>
              It may not exist or no longer be available, however we still have
              other properties to let.
            </p>
            <p>
              Please{' '}
              <Link href="/find-a-space">browse our available listings</Link>,
              or contact our customer enquiries team at{' '}
              <a href="mailto:leasing@thearchco.com">leasing@thearchco.com</a>{' '}
              or <a href="tel:0800 830 840">0800 830 840</a> for further
              guidance with your property search.
            </p>
            <hr />
            <MiniSearch onSearch={onSearch} fullWidth />
          </section>
        </Padding>
      </main>
    </BaseLayout>
  );
};

export default PropertyNotFound;
