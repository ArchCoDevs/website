import styles from './styles.module.scss';
import { Suspense } from 'react';
import { GeneralInformation as GeneralInformationType } from 'lib/types/sanity.types';

/* Import components */
import Main from 'components/layout/main';
import Grid from 'components/layout/grid';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import IntroText from 'components/data-display/intro-text';
import Loader from 'components/feedback/loader';
import ErrorBoundary from 'components/feedback/error-boundary';
import ComponentFactory from 'components/factories/component-factory';
import Padding from 'components/layout/padding';

type Props = {
  /**
   * The data for the page.
   */
  data: GeneralInformationType;
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
export const PageGeneralInformation = ({ data, breadcrumbs = [] }: Props) => {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Main className={styles['child-page']}>
        <Grid columns={1}>
          <Padding>
            <IntroText title={data.title} />
          </Padding>
          {/* Begin composable section */}
          <Suspense fallback={<Loader />}>
            {data.content?.map((component, index) => (
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
            {/* End composable section */}
          </Suspense>
        </Grid>
      </Main>
    </>
  );
};

export default PageGeneralInformation;
