import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { validateConfig } from 'lib/helpers/validate-config';

import { ErrorBoundaryProvider } from 'lib/providers/error-boundary';
import { ToastProvider } from 'lib/providers/toast';

import { VisualEditing } from '@sanity/visual-editing/next-pages-router';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/next';

import config from 'app-config';
import 'styles/index.scss';
import JWTExpirationCheck from 'components/feedback/jwt-expiration-check';
import { APIProvider } from '@vis.gl/react-google-maps';
// import AnalyticsWithConsent from 'components/feedback/analytics-with-consent';
import TrackingCode from 'components/data-display/tracking-code';
import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect } from 'react';

export function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  validateConfig(config);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Store the current URL before navigating away
      sessionStorage.setItem('prevPage', window.location.href);

      // Blur the currently focused element when the page changes
      document?.activeElement instanceof HTMLElement &&
        document?.activeElement?.blur();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <TrackingCode />
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <SessionProvider session={session}>
          <ErrorBoundaryProvider>
            <JWTExpirationCheck />
            <ThemeProvider defaultTheme="light">
              <ToastProvider>
                <Component {...pageProps} />
                <Analytics />
                {router.isPreview && <VisualEditing zIndex={1000} />}
              </ToastProvider>
            </ThemeProvider>
          </ErrorBoundaryProvider>
        </SessionProvider>
      </APIProvider>
      {/* <AnalyticsWithConsent /> Removed as replaced with cookiebot. Will remove permanently when can confirm working */}
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
    </>
  );
}

export default App;
