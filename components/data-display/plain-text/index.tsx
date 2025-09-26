import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /* The title text to display */
  title: string;
  /* The body text to display */
  body: string;
  /*
   * Make centrally aligned
   * @default false
   */
  centered?: boolean;
}

/**
 * The Plain Text component displays a header and a paragraph of text below it.
 * It is very similar to the IntroText component but is used in different contexts.
 * It outputs a h2 instead of a h1 and can contain more than one paragraph.
 */
export const PlainText: React.FC<Props> = ({
  className,
  title,
  body,
  centered,
  ...props
}: Props) => (
  <div
    className={cx(
      styles['plain-text'],
      {
        [styles['centered']]: centered
      },
      className
    )}
    {...props}
  >
    <h2>{title}</h2>
    <p>{body}</p>
  </div>
);

export default PlainText;
