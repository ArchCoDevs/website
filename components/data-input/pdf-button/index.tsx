import React from 'react';
import classNames from 'classnames';
import Link from 'components/data-display/link';

// Import components
import { Icon } from 'components/flourishes/icon';

/* Import Types */
export interface Props extends React.ComponentProps<'a'> {
  /**
   * Text to display on button.
   */
  text?: string;
  /**
   * PDF Link
   */
  href: string;
  /**
   * Is a small button?
   */
  small?: boolean;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The PDF Button component is a button that links to a PDF.
 */
export const PDFButton: React.FC<Props> = ({
  small,
  text = 'Download PDF',
  href,
  className,
  ...props
}: Props) => {
  return (
    <Link
      href={href}
      tabIndex={-1}
      className={cx(styles['pdf-button'], small && styles['small'], className)}
      {...props}
    >
      <Icon use="docdownload" className={styles['icon']} />
      <span className={styles['text']}>{text}</span>
    </Link>
  );
};

PDFButton.displayName = 'Button';

export default PDFButton;

export type CallButtonProps = Props;
