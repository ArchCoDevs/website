import React from 'react';
import classNames from 'classnames';
import Link from 'components/data-display/link';

// Import components
import { Icon } from 'components/flourishes/icon';

/* Import Types */
export interface Props extends React.ComponentProps<'a'> {
  /**
   * Telephone number to display on button.
   */
  tel: string;
  /**
   * Is a small button?
   */
  small?: boolean;
  /**
   * Optional button variant.
   * @default 'primary'
   */
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The Call Button component allows a user to place a button on the page which displays a phone icon and number.
 */
export const CallButton: React.FC<Props> = ({
  small,
  tel,
  className,
  ...props
}: Props) => {
  return (
    <Link href={`tel:${tel}`} tabIndex={-1}>
      <span
        className={cx(
          styles['call-button'],
          small && styles['small'],
          className
        )}
        {...props}
      >
        <span className={styles['text']}>Talk to us</span>
        <span className={styles['number']}>
          <Icon use="phone" className={styles['icon']} />
          <strong>{tel}</strong>
        </span>
      </span>
    </Link>
  );
};

CallButton.displayName = 'Button';

export default CallButton;

export type CallButtonProps = Props;
