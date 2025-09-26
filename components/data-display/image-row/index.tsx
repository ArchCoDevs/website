import classNames from 'classnames';
import Image from 'next/image';

import Link from 'components/data-display/link';

import type BrandFolderImage from 'lib/types/brandfolder-image';
import Icon, { IconTypes } from 'components/flourishes/icon';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type ctaColour = 'navy' | 'teal' | 'orange' | 'white';

export interface Props extends React.ComponentProps<'section'> {
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The content of the card.
   */
  content?: string;
  /**
   * The image to display.
   */
  image?: BrandFolderImage;
  /**
   * Image Caption
   */
  caption?: string;
  /**
   * Image Attribution
   */
  attribution?: string;
  /**
   * Should the text overlay the iamge?
   * @default false
   */
  overlayText?: boolean;
  /**
   * The button text
   */
  ctaText?: string;
  ctaUrl: string;
  ctaColour: ctaColour;
  ctaIcon?: IconTypes;
  /**
   * The 2nd button text
   */
  cta2text?: string;
  cta2url?: string;
  cta2colour?: ctaColour;
  cta2icon?: IconTypes;
  /**
   * Show a light background or a dark background.
   * @default false
   */
  dark?: boolean;
  /**
   * Use the 'sustainable' variant of the image row
   */
  sustainable?: boolean;
}

/**
 * The ImageRow component displays an image and some text along with an optional call to action.
 * It is designed to fill an entire row.
 */
export const ImageRow: React.FC<Props> = ({
  image,
  caption,
  attribution,
  overlayText,
  title,
  content,
  dark,
  ctaText = 'Read More',
  ctaColour = 'navy',
  ctaUrl,
  ctaIcon,
  cta2text,
  cta2colour = 'white',
  cta2icon,
  cta2url,
  sustainable
}: Props) => {
  const mapColourToVariant = (colour: ctaColour) => {
    switch (colour) {
      case 'navy':
        return 'primary';
      case 'teal':
        return 'quaternary';
      case 'orange':
        return 'tertiary';
      case 'white':
        return 'secondary';
    }
  };

  return (
    <section
      className={cx(styles['image-row'], {
        [styles['text-overlay']]: overlayText,
        [styles['dark']]: dark,
        [styles['sustainable']]: sustainable
      })}
      data-testid="image-row"
    >
      <div className={styles['top']}>
        <div className={styles['image-wrapper']}>
          <Image
            className={styles['image']}
            loading="lazy"
            placeholder="empty"
            fill
            src={image?.url || ''}
            alt={image?.alt_text || ''}
            sizes="1000px"
            quality={100}
          />
          {attribution && (
            <div className={styles['attribution-box']}>
              <p className={styles['attribution']}>© {attribution}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles['bottom']}>
        {image && caption && <p className={styles['caption']}>{caption}</p>}
        {title && <h2 className={styles['title']}>{title}</h2>}
        {content && <p className={styles['content']}>{content}</p>}

        <div className={styles['ctas']}>
          {ctaUrl && ctaText && (
            <Link
              href={ctaUrl}
              className={cx(
                'button',
                `button--${mapColourToVariant(ctaColour)}`,
                { [styles['icon']]: ctaIcon }
              )}
              data-testid="cta"
            >
              <span>
                {ctaIcon && <Icon use={ctaIcon as IconTypes} />}
                {ctaText}
              </span>
            </Link>
          )}
          {cta2url && cta2text && (
            <Link
              href={cta2url}
              className={cx(
                'button',
                styles[`color-${mapColourToVariant(cta2colour)}`],
                { [styles['icon']]: cta2icon }
              )}
              data-testid="cta2"
            >
              <span>
                {cta2icon && <Icon use={cta2icon as IconTypes} />}
                {cta2text}
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageRow;
