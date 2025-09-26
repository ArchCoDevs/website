import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /* The body HTML to display */
  rawHtml: string;

  /*
   * Make centrally aligned
   * @default false
   */
  centered?: boolean;
}

/**
 * The Raw HTML dangerously outputs unfiltered HTML.
 * You should only use it with trusted HTML form trusted sources.
 *
 * NEVER output any untrusted user-generated content through this.
 */
export const RawHtml: React.FC<Props> = ({
  className,
  rawHtml,
  centered,
  ...props
}: Props) => (
  <div
    className={cx(
      styles['raw-html'],
      {
        [styles['centered']]: centered
      },
      className
    )}
    {...props}
    tabIndex={0}
    dangerouslySetInnerHTML={{ __html: rawHtml }}
  />
);

export default RawHtml;
