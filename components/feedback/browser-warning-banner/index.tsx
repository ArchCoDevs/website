import React from 'react';
import { Icon } from 'components/flourishes/icon';

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * The browser warning banner displays a message to a user if they are using an
 * unsupported browser.
 */
export const BrowserWarningBanner: React.FC = () => (
  <div className={styles['browser-warning']} role="status">
    <Icon use="warning" className={styles['icon']} /> Your internet browser is
    out of date or is unsupported. Your experience may be degraded.{' '}
    <a
      className={styles['link']}
      href="https://browser-update.org/update.html"
      title="This link will take you to browser-update.org"
    >
      Click here for more information.
    </a>
  </div>
);

export default BrowserWarningBanner;
