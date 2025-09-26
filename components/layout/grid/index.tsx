import React from 'react';
import classNames from 'classnames';

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The DOM element to render the root of the grid as
   * can be either a div, ul, or ol
   * @default 'div'
   */
  as?: 'div' | 'ul' | 'ol';
  /**
   * The number of columns in the grid.
   * @default 1
   */
  columns?: number;
  /**
   * The column sizes for the grid, specified as a ratio (only applies to 2 column grids)
   * @example '3:1'
   * @default undefined
   * @options '1:2', '1:3', '2:1', '3:1', '1:4', '4:1'
   */
  columnSizes?: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The 'Grid' component is a component that is used to display a set of items in a collapsible manner.
 * The number of columns in the grid will automatically increase or decrease based on the screen size
 */
export const Grid: React.FC<Props> = ({
  children,
  as = 'div',
  columns = 1,
  columnSizes,
  className
}: Props) => {
  const RootNode = as;
  const columnSizeClass = columnSizes
    ? `grid-${columnSizes.replace(':', '-')}`
    : '';
  return (
    <RootNode
      data-testid="grid"
      data-colcount={columns}
      className={cx(
        styles['grid'],
        columns && styles[`grid-${columns}-up`],
        styles[columnSizeClass],
        className
      )}
    >
      {children}
    </RootNode>
  );
};
export default Grid;
