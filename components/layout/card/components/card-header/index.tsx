import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * Adds a background colour to the header
   * @default undefined ('transparent')
   */
  bg?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'transparent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';
}

/**
 * The card header component is used to display a header within a card or a componet that works with cards.
 */
export const CardHeader: React.FC<Props> = ({ bg, children }: Props) => (
  <header className={cx(styles['header'], styles[`bg-${bg}`])}>
    {children}
  </header>
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
