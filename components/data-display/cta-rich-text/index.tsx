import React from 'react';
import classNames from 'classnames';
import { PortableText, PortableTextBlock } from 'next-sanity';
import Grid from 'components/layout/grid';
import Link from 'components/data-display/link';

import styles from './styles.module.scss';
import { portableTextComponents } from 'lib/helpers/portable-text-components';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'section'> {
  /*
   * Make centrally aligned
   * @default false
   */
  centered?: boolean;
  /**
   * The number of columns to display the content in
   */
  columns?: 1 | 2 | 3;
  /**
   * Use the Portable Text component to render the content
   */
  pageIntroText?: {
    richText?: PortableTextBlock[];
  };
  /**
   * The title of the CTA
   */
  pageIntroCTATitle: string;
  /**
   * The paragraph of the CTA
   */
  pageIntroCTADescription?: string;
  /**
   * The text for the button
   * @default 'Contact us'
   */
  pageIntroCTALinkText?: string;
  /**
   * The URL to link to when the button is clicked
   * @default '/contact-us'
   */
  pageIntroCTALinkUrl?: string;
}

/**
 * The Rich Text component displays a variety of HTML elements in a single
 * component all styled to match the design system.
 */
export const CTARichText: React.FC<Props> = ({
  className,
  centered,
  columns = 1,
  pageIntroText,
  pageIntroCTATitle,
  pageIntroCTADescription,
  pageIntroCTALinkText = 'Contact us',
  pageIntroCTALinkUrl = '/contact-us',
  ...sectionProps
}: Props) => {
  return (
    <Grid columns={2} columnSizes={'4:1'}>
      <Grid columns={1}>
        <section
          className={cx(
            styles['rich-text'],
            {
              [styles['centered']]: centered
            },
            styles[`columns-${columns}`],
            className
          )}
          {...sectionProps}
        >
          {pageIntroText && (
            <PortableText
              value={pageIntroText.richText as PortableTextBlock[]}
              components={portableTextComponents}
            />
          )}
        </section>
      </Grid>
      <aside className={styles['aside']}>
        <Grid columns={1}>
          <div className={cx(styles['info-cta'], className)}>
            <div className={styles['border']}>
              <h2>{pageIntroCTATitle}</h2>
              {pageIntroCTADescription && <p>{pageIntroCTADescription}</p>}
              <div className={cx(styles['cta'])}>
                <Link
                  href={pageIntroCTALinkUrl || ''}
                  className={cx(styles['link-button'], 'button')}
                >
                  <span>{pageIntroCTALinkText}</span>
                </Link>
              </div>
            </div>
          </div>
        </Grid>
      </aside>
    </Grid>
  );
};

export default CTARichText;
