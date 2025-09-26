import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

// Import partials
import PageLoader from 'partials/page-loader';
import Outage from 'partials/outage';

// Import helpers
import getEndpointData from 'lib/helpers/endpoint-data-helper';

// Types
import type { SiteStatus } from 'lib/types/site-status';

const defaultStatus: SiteStatus = {
  // By default, assume everything is fine until told otherwise
  available: true
};

const StatusContext = createContext<{ siteStatus: SiteStatus }>({
  siteStatus: defaultStatus
});

type Props = React.PropsWithChildren<unknown>;

const SiteStatusProvider: React.FC<Props> = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [siteStatus, setSiteStatus] = useState<SiteStatus>(defaultStatus);

  const getSiteStatus = (source: CancelTokenSource) => {
    if (process.env.NEXT_PUBLIC_OUTAGE_API !== '') {
      getEndpointData(source, process.env.NEXT_PUBLIC_OUTAGE_API, true)
        .then(setSiteStatus)
        .catch((err) => {
          if (axios.isCancel(err)) return;
          // If the site status endpoint is offline, return a warning
          setSiteStatus({
            available: true,
            message:
              'Unable to connect to some data sources, the website may not function as expected',
            status: 'warning'
          });
        })
        .finally(() => setLoading(false));
    } else {
      setSiteStatus({
        available: true
      });
      setLoading(false);
    }
  };

  // Run on page load
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    getSiteStatus(source);
    return () => {
      source.cancel();
    };
  }, []);

  if (loading) return <PageLoader />;

  if (siteStatus.available !== false) {
    return (
      <StatusContext.Provider value={{ siteStatus }}>
        {children}
      </StatusContext.Provider>
    );
  }

  return (
    <StatusContext.Provider value={{ siteStatus }}>
      <Outage message={siteStatus.message} />
    </StatusContext.Provider>
  );
};

const useSiteStatus = (): { siteStatus: SiteStatus } =>
  useContext(StatusContext);

export { SiteStatusProvider, useSiteStatus };

export default SiteStatusProvider;
