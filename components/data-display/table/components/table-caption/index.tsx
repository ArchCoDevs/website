import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'caption'> {
  /**
   * The content of the caption.
   */
  children: string;
}

/**
 * The 'TableCaption' component is a component that is used to display a caption in a table.
 */
export const TableCaption: React.FC<Props> = ({
  className,
  children,
  ...props
}: Props) => {
  return (
    <caption className={cx(styles['table-caption'], className)} {...props}>
      {children}
    </caption>
  );
};

TableCaption.displayName = 'TableCaption';

export default TableCaption;
