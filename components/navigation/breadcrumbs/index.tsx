import React, { Fragment } from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

import type LinkObject from 'lib/types/link-object';
import Link from 'components/data-display/link';

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The breadcrumbs to render.
   */
  breadcrumbs: LinkObject[];
}

const cx = classNames.bind(styles);

/**
 * The breadcrumbs component provides a list of links to help users navigate through a tree structure.
 */
export const Breadcrumbs: React.FC<Props> = ({
  breadcrumbs,
  className,
  ...props
}: Props) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx(styles['breadcrumbs'], className)}
      {...props}
    >
      <ol data-testid="breadcrumb-list">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li className={styles['separator']}>
          <svg focusable="false" viewBox="0 0 23 23" aria-hidden="true">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </li>
        {breadcrumbs?.map((breadcrumb, index) => {
          return (
            <Fragment key={breadcrumb.label}>
              <li></li>
              <li>
                {breadcrumb.current ? (
                  <a aria-current="page" className={styles['current-page']}>
                    {breadcrumb.label}
                  </a>
                ) : (
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                )}
              </li>
              {index < breadcrumbs.length - 1 && (
                <li className={styles['separator']}>
                  <svg focusable="false" viewBox="0 0 23 23" aria-hidden="true">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                  </svg>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
