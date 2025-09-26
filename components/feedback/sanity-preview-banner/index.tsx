import React from 'react';
import { Icon } from 'components/flourishes/icon';

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * The browser warning banner displays a message to a user if they are using an
 * unsupported browser.
 */
export const SanityPreviewBanner: React.FC = () => (
  <div className={styles['sanity-preview']} role="status">
    <span>
      <Icon use="eye" className={styles['icon']} /> Preview Mode Enabled
    </span>
    <a href="/api/exit-preview">Exit Preview Mode</a>
  </div>
);

export default SanityPreviewBanner;
