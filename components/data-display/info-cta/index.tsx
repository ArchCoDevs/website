import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Link from 'components/data-display/link';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /* The title text to display */
  title: string;
  /* The paragraph text to display */
  paragraph?: string;
  /**
   * The text for the button
   * @default 'Contact us'
   */
  buttonText?: string;
  /**
   * The URL to link to when the button is clicked
   * @default '/contact-us'
   */
  buttonUrl?: string;
}

/**
 * The Intro Text component displays a header and a paragraph of text below it.
 */
export const InfoCta: React.FC<Props> = ({
  className,
  title,
  paragraph,
  buttonText = 'Contact us',
  buttonUrl = '/contact-us',
  ...props
}: Props) => (
  <div
    className={cx(styles['info-cta'], className && styles['full-height'])}
    {...props}
  >
    <div className={styles['border']}>
      <h2>{title}</h2>
      {paragraph && <p>{paragraph}</p>}

      <div className={cx(styles['cta'])}>
        <Link
          href={buttonUrl || ''}
          className={cx(styles['link-button'], 'button')}
        >
          <span>{buttonText}</span>
        </Link>
      </div>
    </div>
  </div>
);

export default InfoCta;
