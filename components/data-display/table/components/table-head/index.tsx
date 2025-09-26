import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'thead'> {
  /**
   * Use a solid colour for the table head
   */
  solid?: boolean;
}

/**
 * The TableHead component is used to group the body content in a table.
 * It is a wrapper component for the `thead` HTML element with an extra prop to make the header solid.
 */
export const TableHead: React.FC<Props> = ({
  className,
  children,
  solid
}: Props) => (
  <thead className={cx(styles['thead'], solid && styles['solid'], className)}>
    {children}
  </thead>
);

TableHead.displayName = 'TableHead';

export default TableHead;
