import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Prop Types */
export type Props = React.ComponentProps<'div'>;

/**
 * The 'Main' component is a content wrapper, which wraps the main content of the page.
 */
export const Main: React.FC<Props> = ({ children, className }: Props) => (
  <div className={cx(styles['main'], className)} id="maincontent">
    {children}
  </div>
);

export default Main;
