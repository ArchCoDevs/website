import styles from './styles.module.scss';
import { Suspense } from 'react';
import { TwoColumnEditorial as TwoColumnEditorialType } from 'lib/types/sanity.types';
import Image from 'next/image';

/* Import components */
import Main from 'components/layout/main';
import Padding from 'components/layout/padding';
import Grid from 'components/layout/grid';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import IntroText from 'components/data-display/intro-text';
import Loader from 'components/feedback/loader';
import ErrorBoundary from 'components/feedback/error-boundary';
import ComponentFactory from 'components/factories/component-factory';

type Props = {
  /**
   * The data for the page
   */
  data: TwoColumnEditorialType;
  /**
   * The breadcrumbs for the page.
   */
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
};

/**
 * The Outage partial shows a message to the user when the application is
 * unavailable.
 */
export const PageTwoColumnEditorial = ({ data, breadcrumbs = [] }: Props) => {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Main className={styles['child-page']}>
        <Grid columns={1}>
          <Padding>
            <IntroText title={data.title} />
          </Padding>
          {data.heroImage && (
            <Padding>
              <div className={styles['hero-image']}>
                <Suspense fallback={<Loader label="Image loading..." />}>
                  <Image
                    src={data.heroImage.url || ''}
                    alt={data.heroImage.alt_text || ''}
                    fill
                    priority
                    placeholder="empty"
                  />
                </Suspense>
              </div>
            </Padding>
          )}
          <Grid
            columns={2}
            columnSizes="2:1"
            className={styles['columns-grid']}
          >
            {/* Begin composable section */}
            <Grid columns={1}>
              <Suspense fallback={<Loader />}>
                {data.content?.map((component, index) => (
                  <ErrorBoundary
                    key={`${component._key}-${index}`}
                    message={`${component._type} failed to load`}
                  >
                    <ComponentFactory
                      key={`${component._key}-${index}-${component._type}`}
                      componentType={component._type}
                      // TODO: Fix the type mismatch issue when time allows
                      // @ts-ignore - the issue is coming from a type mismatch with the use of portable text
                      componentProps={component}
                    />
                  </ErrorBoundary>
                ))}
                {/* End composable section */}
              </Suspense>
            </Grid>
            <aside className={styles['aside']}>
              <Grid columns={1}>
                <Suspense fallback={<Loader />}>
                  {data.sideContent?.map((component, index) => (
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
                </Suspense>
              </Grid>
            </aside>
          </Grid>
        </Grid>
      </Main>
    </>
  );
};

export default PageTwoColumnEditorial;
