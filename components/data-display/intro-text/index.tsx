import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /* The title text to display */
  title: string;
  /* The paragraph text to display */
  paragraph?: string;
  /*
   * Make centrally aligned
   * @default false
   */
  centered?: boolean;
  /**
   * Make the component full width
   */
  fullWidth?: boolean;
}

/**
 * The Intro Text component displays a header and a paragraph of text below it.
 */
export const IntroText: React.FC<Props> = ({
  className,
  title,
  paragraph,
  centered,
  fullWidth,
  ...props
}: Props) => (
  <div
    className={cx(
      styles['intro-text'],
      {
        [styles['centered']]: centered,
        [styles['full-width']]: fullWidth
      },
      className
    )}
    {...props}
  >
    <h1>{title}</h1>
    {paragraph && <p>{paragraph}</p>}
  </div>
);

export default IntroText;
