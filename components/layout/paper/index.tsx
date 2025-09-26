import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Prop Types */
export type Props = React.ComponentProps<'div'>;

/**
 * The 'Paper' component is a content wrapper, which allows you to add a content area which always has a background which is always a little bit offset from the page background.
 */
export const Paper: React.FC<Props> = ({ children, className }: Props) => (
  <div className={cx(styles['paper'], className)}>{children}</div>
);

export default Paper;
