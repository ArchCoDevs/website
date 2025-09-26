import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * Include vertical padding
   * @default false
   **/
  vertical?: boolean;
  /**
   * Include horizontal padding
   * @default true
   **/
  horizontal?: boolean;
}

/**
 * The 'Padding' component is a content wrapper, which allows you to add a content area which always has some padding around it on mobile but not on desktop.
 */
export const Padding: React.FC<Props> = ({
  children,
  vertical = false,
  horizontal = true,
  className
}: Props) => (
  <div
    className={cx(
      styles['padding'],
      {
        [styles['vertical']]: vertical,
        [styles['horizontal']]: horizontal
      },
      className
    )}
  >
    {children}
  </div>
);

export default Padding;
