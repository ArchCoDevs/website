import { GoogleTagManager } from '@next/third-parties/google';
import Link from 'components/data-display/link';
import { useEffect, useState } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

export function AnalyticsWithConsent(): JSX.Element | null {
  const [allowAnalytics, setAllowAnalytics] = useState(false);

  useEffect(() => {
    setAllowAnalytics(getCookieConsentValue('analytics_consent') === 'true');
  });
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept optional cookies"
        declineButtonText="Decline optional cookies"
        enableDeclineButton={true}
        cookieName="analytics_consent"
        style={{ background: 'rgb(0, 24, 51)' }}
        buttonStyle={{ background: 'hsl(14, 100%, 44%)', color: '#ffffff' }}
        declineButtonStyle={{
          background: 'rgb(250, 250, 250)',
          color: 'rgb(0, 24, 51)'
        }}
        expires={365}
        onAccept={() => setAllowAnalytics(true)}
        onDecline={() => setAllowAnalytics(false)}
      >
        We use cookies on our website to see how you interact with it. By
        accepting, you agree to our use of such cookies according to our{' '}
        <Link href="/cookie-policy">Cookie Policy</Link>
      </CookieConsent>
      {allowAnalytics && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      )}
    </>
  );
}

export default AnalyticsWithConsent;
