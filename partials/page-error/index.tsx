import { MiniSearch } from 'partials/mini-search';

import styles from './styles.module.scss';

/* Import components */
import Main from 'components/layout/main';
import Padding from 'components/layout/padding';
import Breadcrumbs from 'components/navigation/breadcrumbs';

type Props = {
  /**
   * Error code
   * @default 404
   */
  code?: 404 | 500 | 400;
  /**
   * The message to display to the user (if you don't want to use the default message)
   * @default 'This application is currently unavailable.'
   */
  message?: string | JSX.Element;
  /**
   * The HTTP referrer
   */
  referrer?: {
    /**
     * The title of the referring page
     */
    title: string;
    /**
     * The URL of the referring page
     */
    href: string;
  };
  /**
   * Is this a property search?
   */
  propertySearch?: boolean;
};

const generateBreadcrumb = (
  referrer: Props['referrer'],
  errorMessage: string
) => {
  if (!referrer || referrer?.href == '/') {
    return [{ label: errorMessage, href: '#', current: true }];
  } else {
    return [
      { label: referrer.title, href: referrer.href },
      { label: errorMessage, href: '#', current: true }
    ];
  }
};
/**
 * The Outage partial shows a message to the user when the application is
 * unavailable.
 */
export const PageError = ({
  code,
  message,
  referrer,
  propertySearch
}: Props) => {
  const breadcrumbMessage = propertySearch
    ? 'Property not found'
    : `Error ${code || ''} Page`;

  const onSearch = (data: { area: string; distance: string }) => {
    window.location.href = `/properties?area=${data.area}&distance=${data.distance}`;
  };

  return (
    <div className={styles['page-error']}>
      <Main>
        <Padding>
          <Breadcrumbs
            breadcrumbs={generateBreadcrumb(referrer, breadcrumbMessage)}
          />
          <section>
            <h1>
              {message ||
                'An unknown error has occurred. Please try again later.'}
            </h1>
            <p>
              Want to find your next business space? Search for properties
              available near you.
            </p>
            <hr />
            <MiniSearch onSearch={onSearch} fullWidth />
          </section>
        </Padding>
      </Main>
    </div>
  );
};

PageError.displayName = 'PageError';

export default PageError;
