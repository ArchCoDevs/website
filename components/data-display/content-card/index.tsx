import classNames from 'classnames';
import Image from 'next/image';

/* Components */
import ArrowLink from 'components/navigation/arrow-link';
import { DateBox } from '../date-box';
import Chip from '../chip';

import Link from 'components/data-display/link';

import styles from './styles.module.scss';

import type BrandFolderImage from 'lib/types/brandfolder-image';
import { PortableTextBlock } from 'next-sanity';
import RichText from '../rich-text';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'section'> {
  title: string;
  contentType?: string;
  content?: string;
  richText?: PortableTextBlock[];
  linkText?: string;
  linkUrl?: string;
  ctaType?: 'button' | 'link' | 'clickable' | 'none';
  link2Text?: string;
  link2Url?: string;
  cta2Type?: 'button' | 'link' | 'none';
  featured?: boolean;
  orientation?: 'portrait' | 'landscape';
  bgTakeover?: boolean;
  swapSides?: boolean;
  image?: BrandFolderImage;
  tag?: 'news' | 'report';
  author?: string;
  date?: string;
}

const renderImage = (image: BrandFolderImage) => (
  <Image
    className={styles['image']}
    loading="lazy"
    placeholder="empty"
    fill
    sizes="400px"
    src={image.url || ''}
    alt={image.alt_text || ''}
  />
);

const renderCTA = ({
  linkUrl,
  ctaType,
  linkText
}: {
  linkUrl?: string;
  ctaType: 'button' | 'link' | 'clickable' | 'none';
  linkText?: string;
}) => {
  if (!linkUrl || !linkText) return null;
  switch (ctaType) {
    case 'button':
      return (
        <Link href={linkUrl} className="button" data-testid="button">
          <span>{linkText}</span>
        </Link>
      );
    case 'link':
      return (
        <ArrowLink href={linkUrl} label={linkText} data-testid="arrow-link" />
      );
    case 'clickable':
    case 'none':
      return null; // Handle clickable logic elsewhere
    default:
      return null;
  }
};

/**
 * The Content Card component displays an image and some text along with an optional call to action.
 * It is designed to be used inside a container and will expand to fill the available space.
 */
export const ContentCard: React.FC<Props> = (props) => {
  const {
    title,
    contentType,
    content,
    richText,
    linkText,
    linkUrl,
    ctaType = 'link',
    link2Text,
    link2Url,
    cta2Type,
    featured = false,
    orientation = 'portrait',
    bgTakeover = false,
    image,
    swapSides = false,
    tag,
    author,
    date
  } = props;

  const LinkWrap = ({
    children,
    tabIndex
  }: {
    children: React.ReactNode;
    tabIndex?: number;
  }) => {
    if (linkUrl !== undefined && ctaType !== 'none') {
      return (
        <Link href={linkUrl} className={styles['link']} tabIndex={tabIndex}>
          {children}
        </Link>
      );
    } else {
      return children;
    }
  };

  return (
    <section
      className={cx(
        styles['content-card'],
        styles[orientation],
        {
          [styles['bg-takeover']]: bgTakeover,
          [styles['no-image']]: !image,
          [styles['clickable']]: ctaType === 'clickable',
          [styles['featured']]: featured,
          [styles['swapped']]: swapSides
        },
        'needs-bottom-margin'
      )}
      data-testid="content-card"
      onClick={() =>
        ctaType === 'clickable' ? window.open(linkUrl) : undefined
      }
    >
      <div className={styles['top']}>
        {tag && <Chip className={styles[`tag-${tag}`]} text={tag} />}
        {date && <DateBox date={date} className={styles['date']} />}
        <LinkWrap>
          {image && renderImage(image)}
          {(!image || bgTakeover) && (
            <h2 className={styles['title']}>{title}</h2>
          )}
        </LinkWrap>
        {(!image || bgTakeover) && author && (
          <p className={styles['author-no-image']}>By {author}</p>
        )}
      </div>
      <div className={styles['bottom']}>
        {image && (
          <div className={styles['metadata']}>
            <LinkWrap>
              <h2 className={styles['title']}>{title}</h2>
            </LinkWrap>
            {author && <p className={styles['author']}>By {author}</p>}
          </div>
        )}
        {contentType !== 'block' && content && (
          <p className={styles['content']}>{content}</p>
        )}
        {contentType === 'block' && richText && (
          <RichText richText={richText} className={styles['rich-text']} />
        )}
        <div
          className={cx(styles['cta'], styles[`cta-${cta2Type || ctaType}`])}
        >
          {renderCTA({ linkText, linkUrl, ctaType })}
          {link2Text &&
            link2Url &&
            renderCTA({
              linkText: link2Text,
              linkUrl: link2Url,
              ctaType: cta2Type as 'button' | 'link' | 'none'
            })}
        </div>
      </div>
    </section>
  );
};

export default ContentCard;
