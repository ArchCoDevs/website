import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

/* Types */
export type Props = React.HTMLAttributes<HTMLDivElement>;

/* Import Stylesheet */
import styles from './styles.module.scss';
import Button from 'components/data-input/button';

const cx = classNames.bind(styles);
/**
 * The 'Cookie Banner' component displays a banner to the user, informing them of the use of cookies on the site.
 * Note: This component uses local storage to store the user's cookie consent, so if you want to test it, you may need to clear your local storage.
 */
export const CookieBanner: React.FC<Props> = ({
  className,
  ...props
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cx(styles['cookie-banner'], className)}
      role="status"
      {...props}
    >
      <h3 className="heading-small mb-1">We value your privacy</h3>
      <p className="body-text">
        We use cookies to enhance your experience, analyse site usage, and
        assist in our marketing efforts. By clicking &quot;Accept All
        Cookies&quot;, you agree to the storing of cookies on your device. You
        can manage your preferences or withdraw your consent at any time by
        visiting our{' '}
        <a href="/privacy-policy" className="link">
          privacy policy
        </a>
        .
      </p>
      <div className={styles['buttons']}>
        <Button onClick={handleAccept}>Accept Cookies</Button>
        <Button onClick={handleDecline} link>
          Decline
        </Button>
        {/* <a href="/cookie-settings">Manage Preferences</a> */}
      </div>
    </div>
  );
};

export default CookieBanner;
